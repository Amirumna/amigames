"use client"

import { useState } from "react"
import Image from "next/image"

export function LogoMarquee() {
  const [pausedRow, setPausedRow] = useState<string | null>(null)

  const logos = [
    { name: "GENSHIN IMPACT", content: "image", color: "text-neutral-300", image: "/images/genshin.png" },
    { name: "WUTHERING WAVES", content: "image", color: "text-neutral-300", image: "/images/wuwa.png" },
    { name: "HONKAI: STAR RAIL", content: "image", color: "text-neutral-300", image: "/images/hsr.png" },
    { name: "REVERSE: 1999", content: "image", color: "text-neutral-300", image: "/images/reverse1999.png" },
    { name: "ZENLESS ZONE ZERO", content: "image", color: "text-neutral-300", image: "/images/zzz.png" },
    { name: "HONOR OF KINGS", content: "image", color: "text-neutral-300", image: "/images/hok.png" },
    { name: "BLUE ARCHIVE", content: "image", color: "text-neutral-300", image: "/images/ba.png" },
    { name: "ROBLOX", content: "image", color: "text-neutral-300", image: "/images/roblox.png" },
    { name: "VALORANT", content: "image", color: "text-neutral-300", image: "/images/valorant.png" },
    { name: "ONCE HUMAN", content: "image", color: "text-neutral-300", image: "/images/oncehuman.png" },
  ]

  const secondRowLogos = [
    { name: "PUBG: BATTLEGROUNDS", content: "image", color: "text-neutral-300", image: "/images/pubg.png" },
    { name: "GUARDIAN TALES", content: "image", color: "text-neutral-300", image: "/images/gt.png" },
    { name: "HONKAI IMPACT 3RD", content: "image", color: "text-neutral-300", image: "/images/hi3.png" },
    { name: "MOBILE LEGENDS: BANG BANG", content: "image", color: "text-neutral-300", image: "/images/mlbb.png" },
    { name: "SNOWBREAK: CONTAINMENT ZONE", content: "image", color: "text-neutral-300", image: "/images/snowbreak.png" },
    { name: "ETHERIA: RESTART", content: "image", color: "text-neutral-300", image: "/images/etheria.png" },
    { name: "DELTA FORCE", content: "image", color: "text-neutral-300", image: "/images/delta.png" },
    { name: "MINECRAFT", content: "image", color: "text-neutral-300", image: "/images/minecraft.png" },
    { name: "STRINOVA", content: "image", color: "text-neutral-300", image: "/images/strinova.png" },
    { name: "REMEMENTO: WHITE SHADOW", content: "image", color: "text-neutral-300", image: "/images/rememento.png" },
  ]

  const LogoCard = ({ logo, rowId }: { logo: any; rowId: string }) => (
    <div
      className="flex-shrink-0 mx-3"
      onMouseEnter={() => setPausedRow(rowId)}
      onMouseLeave={() => setPausedRow(null)}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center">
        {logo.image ? (
          <div className="relative w-16 h-8 sm:w-20 sm:h-10 lg:w-24 lg:h-12">
            <Image
              src={logo.image || "/placeholder.svg"}
              alt={logo.name}
              fill
              className="object-contain opacity-90"
              sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 96px"
            />
          </div>
        ) : logo.bg ? (
          <div className={`w-8 h-8 sm:w-12 sm:h-10 rounded-full ${logo.bg} flex items-center justify-center`}>
            <span className={`text-sm sm:text-lg font-bold ${logo.color}`}>{logo.content}</span>
          </div>
        ) : (
          <span className={`text-lg sm:text-xl lg:text-2xl font-semibold ${logo.color}`}>{logo.content}</span>
        )}
      </div>
    </div>
  )

  return (
    <section className="text-white py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between mb-12 sm:flex-row sm:items-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left px-30">
            Our <span className="text-lime-300">top-tier</span> Games
            <br />
            I've <span className="text-lime-300">Experienced</span>
          </h2>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden mb-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex animate-scroll-right whitespace-nowrap ${pausedRow === "first" ? "animation-play-state-paused" : ""}`}
              style={{
                animationPlayState: pausedRow === "first" ? "paused" : "running",
                width: "max-content",
              }}
            >
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <LogoCard key={`first-${index}`} logo={logo} rowId="first" />
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex animate-scroll-left whitespace-nowrap ${pausedRow === "second" ? "animation-play-state-paused" : ""}`}
              style={{
                animationPlayState: pausedRow === "second" ? "paused" : "running",
                width: "max-content",
              }}
            >
              {[...secondRowLogos, ...secondRowLogos, ...secondRowLogos].map((logo, index) => (
                <LogoCard key={`second-${index}`} logo={logo} rowId="second" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
