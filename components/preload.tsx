'use client'

import React from "react"

const imagesToPreload = [
  '/images/asus.png', '/images/ba.png', '/images/delta.png', '/images/etheria.png', '/images/genshin.png',
  '/images/gt.png', '/images/hi3.png', '/images/hok.png', '/images/hsr.png', '/images/minecraft.png',
  '/images/mlbb.png', '/images/nova.png', '/images/oncehuman.png', '/images/pubg.png', '/images/rememento.png',
  '/images/reverse1999.png', '/images/roblox.png', '/images/snowbreak.png', '/images/strinova.png',
  '/images/valorant.png', '/images/wuwa.png', '/images/zzz.png'
];

const videosToPreload = [
  '/videos/miyabi.mp4'
];

export default function PreloadAssets({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let loaded = 0;
    const total = imagesToPreload.length + videosToPreload.length;

    imagesToPreload.forEach(src => {
      const img = new window.Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === total) setLoading(false);
      };
    });

    videosToPreload.forEach(src => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.oncanplaythrough = video.onerror = () => {
        loaded++;
        if (loaded === total) setLoading(false);
      };
    });
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-400 via-lime-300 to-cyan-300 animate-spin-slow shadow-2xl border-4 border-cyan-300 opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
                <circle cx="32" cy="32" r="28" stroke="#5cf1f6" strokeWidth="4" opacity="0.5" />
                <circle cx="32" cy="32" r="20" stroke="#a3e635" strokeWidth="4" opacity="0.7" />
                <circle cx="32" cy="32" r="12" stroke="#5cf1f6" strokeWidth="4" opacity="0.9" />
                <circle cx="32" cy="32" r="6" stroke="#fff" strokeWidth="2" opacity="0.8" className="animate-ping" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="animate-spin-fast">
                <circle cx="24" cy="24" r="20" stroke="#a3e635" strokeWidth="2" opacity="0.5" />
              </svg>
            </div>
            <span className="mt-8 text-cyan-300 text-2xl font-bold tracking-wide animate-pulse drop-shadow-lg">Loading assets...</span>
            <span className="mt-2 text-lime-300 text-base font-medium animate-bounce">Please wait</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
