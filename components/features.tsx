"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    const savedContent = localStorage.getItem("amigames-content")
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
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {content.title}
        {content.subtitle && <span className="mt-2 block text-lg font-normal text-neutral-300">{content.subtitle}</span>}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <p className="text-center text-[20px] tracking-widest text-neutral-100">SMARTPHONE</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/nova.png"
                  alt="Close-up smartphone camera module on textured leather back"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 240px, 45vw"
                  priority={false}
                />
              </div>
            <CardTitle className="mt-1 text-xl text-white">HUAWEI NOVA 7I</CardTitle>
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <p className="text-center text-[20px] tracking-widest text-neutral-100">LAPTOP/DESKTOP</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
            <CardTitle className="mt-1 text-xl text-white h-full w-full rounded-xl object-cover">
              ASUS TUF GAMING F15
            </CardTitle>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
              <Image
                src="/images/asus.png"
                width={280}
                height={160}
                alt="Product sketch concepts of backpack on paper"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
