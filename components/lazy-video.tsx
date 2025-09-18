"use client"

import { useEffect, useRef, useState } from "react"

interface LazyVideoProps {
  src: string
  className?: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  playsInline?: boolean
  "aria-label"?: string
}

export default function LazyVideo({
  src,
  className = "",
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  controls = false,
  playsInline = true,
  "aria-label": ariaLabel,
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    let observer: IntersectionObserver | null = null

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !loaded) {
          el.src = src
          el.load()

          if (autoplay) {
            const playVideo = async () => {
              try {
                await el.play()
              } catch (error) {
                console.log("Autoplay blocked:", error)
              }
            }

            if (el.readyState >= 3) {
              playVideo()
            } else {
              el.addEventListener("canplay", playVideo, { once: true })
            }
          }

          setLoaded(true)
        } else if (!entry.isIntersecting && loaded && autoplay) {
          try {
            el.pause()
          } catch (error) {
            console.log("Error pausing video:", error)
          }
        } else if (entry.isIntersecting && loaded && autoplay) {
          try {
            await el.play()
          } catch (error) {
            console.log("Error resuming video:", error)
          }
        }
      })
    }

    observer = new IntersectionObserver(onIntersect, {
      rootMargin: "50px",
      threshold: 0.1,
    })
    observer.observe(el)

    return () => observer?.disconnect()
  }, [src, loaded, autoplay])

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload="none"
      poster={poster}
      aria-label={ariaLabel}
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  )
}
