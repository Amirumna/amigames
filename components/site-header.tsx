"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { Menu, Briefcase, Tag, FileText, Info } from "lucide-react"
import { useState } from "react"
import ContactForm from '@/components/contact-form'

/**
 * Render the site's header with brand, responsive navigation, and contact controls.
 *
 * The header includes a logo and title, a desktop navigation and chat button, and a mobile slide-out sheet
 * that contains the same navigation and a chat action. The contact form is rendered and its visibility
 * is managed internally by the component.
 *
 * @returns The header element containing brand, navigation (desktop and mobile sheet), and the controlled contact form.
 */
export function SiteHeader() {
  const [openContact, setOpenContact] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)
  const links = [
    { href: "/", label: "Home", icon: Briefcase },
    { href: "/kertas", label: "Kertas", icon: Tag },
    { href: "/games", label: "Games", icon: FileText },
    { href: "/about", label: "About", icon: Info },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
            <Link href="/" className="flex items-center gap-1.5">
              <Image
                src="/icons/amigames.svg"
                alt="AmiNET Logo"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="font-semibold tracking-wide text-white uppercase">AmiGames</span>
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
                    className="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="liquid-glass border-gray-800 p-0 w-64 flex flex-col"
                  aria-labelledby="sidebar-title"
                >
                  <div className="flex items-center gap-1.5 px-4 py-4 border-b border-gray-800">
                    <Image
                      src="/icons/amigames.svg"
                      alt="AmiGames Logo"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    <h2
                      id="sidebar-title"
                      className="font-semibold tracking-wide text-white text-lg uppercase"
                    >
                      AmiGames
                    </h2>
                  </div>

                  <nav className="flex flex-col gap-1 mt-2 text-gray-200">
                    {links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-purple-300 transition-colors"
                      >
                        <span className="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                          <l.icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm">{l.label}</span>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto border-t border-gray-800 p-4">
                    <Button
                      className="w-full bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                                 hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                                 transition-all"
                      onClick={() => {
                        setOpenSheet(false)
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
