"use client"

import React from "react"

const imagesToPreload = [
  "/images/asus.png",
  "/images/ba.png",
  "/images/delta.png",
  "/images/etheria.png",
  "/images/genshin.png",
  "/images/gt.png",
  "/images/hi3.png",
  "/images/hok.png",
  "/images/hsr.png",
  "/images/minecraft.png",
  "/images/mlbb.png",
  "/images/nova.png",
  "/images/oncehuman.png",
  "/images/pubg.png",
  "/images/rememento.png",
  "/images/reverse1999.png",
  "/images/roblox.png",
  "/images/snowbreak.png",
  "/images/strinova.png",
  "/images/valorant.png",
  "/images/wuwa.png",
  "/images/zzz.png",
]

const videosToPreload = ["/videos/miyabi.mp4"]

export default function PreloadAssets({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    let loaded = 0
    const total = imagesToPreload.length + videosToPreload.length

    const updateProgress = () => {
      loaded++
      setProgress((loaded / total) * 100)
      if (loaded === total) {
        setTimeout(() => setLoading(false), 500)
      }
    }

    imagesToPreload.forEach((src) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.src = src
      img.onload = img.onerror = updateProgress
    })

    videosToPreload.forEach((src) => {
      const video = document.createElement("video")
      video.src = src
      video.preload = "auto"
      video.oncanplaythrough = video.onerror = updateProgress
    })
  }, [])

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative flex flex-col items-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 w-40 h-40 rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-lime-300 animate-spin shadow-2xl opacity-80"></div>
              <div className="absolute inset-1 w-38 h-38 rounded-full bg-black"></div>
              <div className="absolute inset-4 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 animate-pulse shadow-xl"></div>
              <div className="absolute inset-8 w-24 h-24 rounded-full bg-gradient-to-tr from-lime-300 via-cyan-300 to-blue-400 animate-bounce shadow-lg"></div>
              <div className="absolute inset-12 w-16 h-16 rounded-full bg-gradient-to-r from-white via-cyan-200 to-lime-200 animate-ping shadow-md"></div>
              <div
                className="absolute top-2 left-8 w-2 h-2 bg-cyan-300 rounded-full animate-bounce"
                style={{ animationDelay: "0s", animationDuration: "2s" }}
              ></div>
              <div
                className="absolute top-8 right-4 w-1.5 h-1.5 bg-lime-300 rounded-full animate-bounce"
                style={{ animationDelay: "0.5s", animationDuration: "1.5s" }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-2.5 h-2.5 bg-purple-300 rounded-full animate-bounce"
                style={{ animationDelay: "1s", animationDuration: "2.5s" }}
              ></div>
              <div
                className="absolute bottom-8 right-8 w-1 h-1 bg-blue-300 rounded-full animate-bounce"
                style={{ animationDelay: "1.5s", animationDuration: "1.8s" }}
              ></div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg"></div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "4s", animationDirection: "reverse" }}
              >
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2 h-2 bg-lime-400 rounded-full shadow-lg"></div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "5s" }}>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-lg"></div>
              </div>
            </div>

            <div className="mt-8 w-80 h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div className="absolute w-80 h-3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-lime-300 transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-cyan-300 text-2xl font-bold tracking-wide drop-shadow-lg">
                Loading assets
                <span className="animate-pulse">...</span>
              </span>
              <div className="mt-2 flex items-center justify-center space-x-2">
                <span className="text-lime-300 text-lg font-medium">{Math.round(progress)}% complete</span>
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-lime-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}
