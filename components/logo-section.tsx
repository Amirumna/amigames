"use client"

import { useState } from "react"
import Image from "next/image"

export function LogoSection() {
  const [paused, setPaused] = useState(false)

  const logos = [
    { name: "Next.js", image: "/images/nextjs.png" },
    { name: "NPM", image: "/images/npm.png" },
    { name: "Python", image: "/images/python.png" },
    { name: "Typescript", image: "/images/typescript.png" },
    { name: "JavaScript", image: "/images/javascript.png" },
    { name: "NodeJS", image: "/images/nodejs.png" },
    { name: "React", image: "/images/react.png" },
    { name: "Tailwind CSS", image: "/images/tailwindCSS.png" },
  ]

  return (
    <section className="text-white py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between mb-12 sm:flex-row sm:items-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left px-30">
            Our <span className="text-lime-300">top-tier</span> Tech Stack
          </h2>
        </div>
        <div className="relative">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex animate-scroll-right whitespace-nowrap ${paused ? "animation-play-state-paused" : ""}`}
              style={{
                animationPlayState: paused ? "paused" : "running",
                width: "max-content",
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 mx-6 flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      fill
                      className="object-contain opacity-90"
                      sizes="96px"
                    />
                  </div>
                  <span className="mt-2 text-base font-semibold text-neutral-300">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
