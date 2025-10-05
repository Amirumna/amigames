"use client"

import { siteConfig } from "@/lib/config"
import { useEffect, useState } from "react"
import { Instagram, Twitter, Youtube, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068c0-3.518.85-6.372 2.495-8.423C5.845 1.205 8.598.024 12.179 0h.007c3.581.024 6.334 1.205 8.184 3.509C22.65 5.56 23.5 8.414 23.5 11.932c0 3.518-.85 6.372-2.495 8.423C19.155 22.795 16.402 23.976 12.821 24h-.007zm-.007-1.5c2.744 0 4.95-.921 6.36-2.7 1.41-1.779 2.13-4.28 2.13-7.232 0-2.952-.72-5.453-2.13-7.232-1.41-1.779-3.616-2.7-6.36-2.7s-4.95.921-6.36 2.7c-1.41 1.779-2.13 4.28-2.13 7.232 0 2.952.72 5.453 2.13 7.232 1.41 1.779 3.616 2.7 6.36 2.7z"/>
  </svg>
)

interface FooterContent {
  tagline: string
  copyright: string
}

export const copyrightText = `© ${new Date().getFullYear()} — ${siteConfig.copyright}. All rights reserved.`

const defaultContent: FooterContent = {
  tagline: siteConfig.copyright_tagline,
  copyright: copyrightText,
}

export function AppverseFooter() {
  const [content, setContent] = useState<FooterContent>(defaultContent)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const savedContent = localStorage.getItem(`${siteConfig.appName}-content`)
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="text-white">
      <footer className="border-t border-white/10 pb-6 md:pb-6">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="grid gap-4 md:gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2">
                <Image 
                  src={siteConfig.faviconPath} 
                  alt={`${siteConfig.appName} Logo`} 
                  width={24} 
                  height={24} 
                  className="h-5 w-5 md:h-6 md:w-6" 
                />
                <span className="text-base md:text-lg lg:text-xl font-semibold text-lime-300">{siteConfig.appName.toUpperCase()}</span>
              </div>
              <p className="max-w-sm text-xs md:text-sm text-neutral-400 leading-relaxed">{content.tagline}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-2">
              <div>
                <h5 className="mb-1.5 md:mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Navigation</h5>
                <ul className="space-y-0.5 md:space-y-1 text-xs md:text-sm text-neutral-300">
                {["Home", "Kertas", "Games", "About"].map((item) => {
                  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`
                  return (
                    <li key={item}>
                      <Link 
                        href={path} 
                        className="hover:text-lime-300 transition-colors min-h-[32px] md:min-h-[28px] flex items-center touch-manipulation"
                      >
                        {item}
                      </Link>
                    </li>
                   )
                })}
                </ul>
              </div>
              <div>
                <h5 className="mb-1.5 md:mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Social Media</h5>
                <ul className="space-y-0.5 md:space-y-1 text-xs md:text-sm text-neutral-300">
                  <li className="flex items-center gap-2 md:gap-3 min-h-[32px] md:min-h-[28px]">
                    <TikTokIcon className="h-3.5 w-3.5 md:h-4 md:w-4 text-neutral-400 flex-shrink-0" />
                    <a
                      href="https://www.tiktok.com/@AmirumanGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors touch-manipulation"
                      aria-label="Follow Amiruman on TikTok"
                    >
                      TikTok
                    </a>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 min-h-[32px] md:min-h-[28px]">
                    <Twitter className="h-3.5 w-3.5 md:h-4 md:w-4 text-neutral-400 flex-shrink-0" />
                    <a
                      href="https://twitter.com/AmirumanGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors touch-manipulation"
                      aria-label="Follow Amiruman on X/Twitter"
                    >
                      X/Twitter
                    </a>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 min-h-[32px] md:min-h-[28px]">
                    <Youtube className="h-3.5 w-3.5 md:h-4 md:w-4 text-neutral-400 flex-shrink-0" />
                    <a
                      href="https://www.youtube.com/@Amirumangglive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors touch-manipulation"
                      aria-label="Subscribe to Amiruman on YouTube"
                    >
                      YouTube
                    </a>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 min-h-[32px] md:min-h-[28px]">
                    <Instagram className="h-3.5 w-3.5 md:h-4 md:w-4 text-neutral-400 flex-shrink-0" />
                    <a
                      href="https://instagram.com/AmirumanGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors touch-manipulation"
                      aria-label="Follow Amiruman on Instagram"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 min-h-[32px] md:min-h-[28px]">
                    <ThreadsIcon className="h-3.5 w-3.5 md:h-4 md:w-4 text-neutral-400 flex-shrink-0" />
                    <a
                      href="https://threads.com/AmirumanGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300 transition-colors touch-manipulation"
                      aria-label="Follow Amiruman on Threads"
                    >
                      Threads
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-6 flex flex-col items-center justify-center border-t border-white/10 pt-4 md:pt-6">
            <p className="text-xs md:text-sm font-medium text-white text-center">{content.copyright}</p>
          </div>
        </div>
      </footer>
    </section>
  )
}
