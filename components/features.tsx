"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/lib/config"

interface FeaturesContent {
  title: string
  subtitle: string
}

const defaultContent: FeaturesContent = {
  title: "My Adventure Begins Here Powered By My Devices",
  subtitle: "Dive into the game with smooth gameplay and zero lag. We've optimized our hardware to make sure the game runs perfectly, allowing me to focus on strategy and victory, wherever I play.",
}

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent)

  useEffect(() => {
    const savedContent = localStorage.getItem(`${siteConfig.appName}-content`)
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        if (parsed.features) {
          setContent(parsed.features)
        }
      } catch (error) {
        console.error("Error parsing saved content:", error)
      }
    }
  }, [])

  return (
    <section id="features" className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
      <h2 className="mb-6 sm:mb-8 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {content.title}
        {content.subtitle && <span className="mt-2 block text-sm sm:text-base md:text-lg font-normal text-neutral-300">{content.subtitle}</span>}
      </h2>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="pb-3 sm:pb-4">
            <p className="text-center text-sm sm:text-base md:text-lg lg:text-[20px] tracking-widest text-neutral-100">SMARTPHONE</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl border border-white/10 mx-auto sm:mx-0 w-32 sm:w-full">
                <Image
                  src="/images/nova.png"
                  alt="HUAWEI NOVA 7I smartphone"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 240px, 128px"
                  priority={false}
                />
              </div>
              <div className="flex items-center sm:items-start justify-center sm:justify-start">
                <CardTitle className="text-lg sm:text-xl text-white text-center sm:text-left">HUAWEI NOVA 7I</CardTitle>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="pb-3 sm:pb-4">
            <p className="text-center text-sm sm:text-base md:text-lg lg:text-[20px] tracking-widest text-neutral-100">LAPTOP/DESKTOP</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center sm:items-start justify-center sm:justify-start order-2 sm:order-1">
                <CardTitle className="text-lg sm:text-xl text-white text-center sm:text-left">
                  ASUS TUF GAMING F15
                </CardTitle>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl border border-white/10 mx-auto sm:mx-0 w-32 sm:w-full order-1 sm:order-2">
                <Image
                  src="/images/asus.png"
                  width={280}
                  height={160}
                  alt="ASUS TUF GAMING F15 laptop"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
