"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Instagram, Twitter, Youtube, MessageCircle, ZoomIn } from "lucide-react"
import Image from "next/image"

interface FooterContent {
  tagline: string
  copyright: string
}

export const copyrightText = `© ${new Date().getFullYear()} — AmiNET Development. All rights reserved.`

const defaultContent: FooterContent = {
  tagline: "Explore My Journey in Online Games, Showcasing My Skills/Character, Past Projects, and Reviews Games.",
  copyright: copyrightText,
}

export function AppverseFooter() {
  const [content, setContent] = useState<FooterContent>(defaultContent)

  useEffect(() => {
    const savedContent = localStorage.getItem("amigames-content")
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        if (parsed.footer) {
          setContent(parsed.footer)
        }
      } catch (error) {
        console.error("Error parsing saved content:", error)
      }
    }
  }, [])

  return (
    <section className="text-white">
      <footer className="border-t border-white/10 pb-20 md:pb-10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <Image src="/icons/amigames.svg" alt="AmiGames Logo" width={24} height={24} className="h-6 w-6" />
                <span className="text-xl font-semibold text-lime-300">AMIGAMES</span>
              </div>
              <p className="max-w-sm text-sm text-neutral-400">{content.tagline}</p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-2">
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Navigation</h5>
                <ul className="space-y-2 text-sm text-neutral-300">
                {["Home", "Kertas", "Games", "About"].map((item) => {
                  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`
                  return (
                    <li key={item}>
                      <Link href={path} className="hover:text-lime-300 transition-colors">
                        {item}
                      </Link>
                    </li>
                   )
                })}
                </ul>
              </div>
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Social media</h5>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-center gap-2">
                    <ZoomIn className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://www.tiktok.com/@AmirumanGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors"
                      aria-label="Follow Amiruman on Tiktok"
                    >
                      Tiktok
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://twitter.com/AmirumanGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors"
                      aria-label="Follow Amiruman on X/Twitter"
                    >
                      X/Twitter
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://www.youtube.com/@Amirumangglive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors"
                      aria-label="Subscribe to Amiruman on YouTube"
                    >
                      YouTube
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://instagram.com/AmirumanGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors"
                      aria-label="Follow Amiruman on Instagram"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://threads.com/AmirumanGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors"
                      aria-label="Follow Amiruman on Threads"
                    >
                      Threads
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10">
            <p>{content.copyright}</p>
          </div>
        </div>
      </footer>
    </section>
  )
}
