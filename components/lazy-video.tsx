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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    let observer: IntersectionObserver | null = null

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !loaded) {
          el.src = src
          el.load()

          if (autoplay && !isMobile) {
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
        } else if (!entry.isIntersecting && loaded && autoplay && !isMobile) {
          try {
            el.pause()
          } catch (error) {
            console.log("Error pausing video:", error)
          }
        } else if (entry.isIntersecting && loaded && autoplay && !isMobile) {
          try {
            await el.play()
          } catch (error) {
            console.log("Error resuming video:", error)
          }
        }
      })
    }

    observer = new IntersectionObserver(onIntersect, {
      rootMargin: isMobile ? "100px" : "50px",
      threshold: 0.1,
    })
    observer.observe(el)

    return () => observer?.disconnect()
  }, [src, loaded, autoplay, isMobile])

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload={isMobile ? "metadata" : "none"}
      poster={poster}
      aria-label={ariaLabel}
      style={{
        objectFit: 'cover',
        ...(isMobile && { 
          WebkitPlaysinline: 'true',
          playsInline: true 
        })
      }}
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  )
}
