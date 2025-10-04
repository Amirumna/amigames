"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Image from "next/image"
import { Menu, Briefcase, Tag, FileText, Info, X } from "lucide-react"
import { useState, useEffect } from "react"
import ContactForm from '@/components/contact-form'
import { siteConfig } from "@/lib/config"

export function SiteHeader() {
  const [openContact, setOpenContact] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const links = [
    { href: "/", label: "Home", icon: Briefcase },
    { href: "/kertas", label: "Kertas", icon: Tag },
    { href: "/games", label: "Games", icon: FileText },
    { href: "/about", label: "About", icon: Info },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
            <Link href="/" className="flex items-center gap-1.5">
              <Image
                src={siteConfig.faviconPath}
                alt={`${siteConfig.appName} Logo`}
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="font-semibold tracking-wide text-white uppercase">{siteConfig.appName}</span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-lime-300 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex">
              <Button
                className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                           hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                           transition-all"
                onClick={() => setOpenContact(true)}
              >
                Chat With Me
              </Button>
            </div>

            <div className="md:hidden">
              <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800 
                               active:scale-95 transition-all duration-150 min-h-[44px] min-w-[44px]
                               touch-manipulation"
                    onClick={() => {
                      if ('vibrate' in navigator) {
                        navigator.vibrate(10)
                      }
                    }}
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="liquid-glass border-gray-800 p-0 w-72 flex flex-col"
                >
                  <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src={siteConfig.faviconPath}
                        alt={`${siteConfig.appName} Logo`}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      <SheetTitle className="font-semibold tracking-wide text-white text-lg uppercase">
                        {siteConfig.appName}
                      </SheetTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white min-h-[44px] min-w-[44px]"
                      onClick={() => setOpenSheet(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <SheetDescription className="sr-only">
                    Navigation menu for {siteConfig.appName}
                  </SheetDescription>

                  <nav className="flex flex-col gap-1 mt-2 text-gray-200">
                    {links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="flex items-center gap-3 px-4 py-4 hover:bg-gray-900 hover:text-lime-300 
                                   transition-colors min-h-[48px] touch-manipulation active:bg-gray-800"
                        onClick={() => {
                          setOpenSheet(false)
                          if ('vibrate' in navigator) {
                            navigator.vibrate(5)
                          }
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-6 h-6 text-gray-400">
                          <l.icon className="h-5 w-5" />
                        </span>
                        <span className="text-base font-medium">{l.label}</span>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto border-t border-gray-800 p-4">
                    <Button
                      className="w-full bg-lime-400 text-black font-medium rounded-lg px-6 py-4
                                 hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                                 active:scale-95 transition-all duration-150 min-h-[48px]
                                 touch-manipulation"
                      onClick={() => {
                        setOpenSheet(false)
                        if ('vibrate' in navigator) {
                          navigator.vibrate(15)
                        }
                        setTimeout(() => setOpenContact(true), 300)
                      }}
                    >
                      Chat With Me
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <ContactForm open={openContact} onClose={() => setOpenContact(false)} />
    </>
  )
}
