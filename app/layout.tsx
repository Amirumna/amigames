import type React from "react"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import Plasma from "@/components/plasma"
import CursorTrail from '@/components/ui/cursor-trail'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "AmiGames | HOME",
  description:
    "Explore My Journey in Online Games, Showcasing My Skills/Character, Past Projects, and Reviews Games.",
  generator: "aminetdevelopment.pages.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="./fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const faviconHref = darkMode ? '/icons/amigames.svg' : '/icons/amigames.svg';
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = faviconHref;
            }
            updateFavicon();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>

        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K4W5MLFX');`}
        </Script>

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HLY1XHHNQ9" strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HLY1XHHNQ9');
          `}
        </Script>
        <Analytics/>
      </head>
      <body>
        <SpeedInsights/>
        <div className="fixed inset-0 z-0 bg-black">
          <Plasma
            color="#5cf1f6"
            speed={0.8}
            direction="forward"
            scale={1.5}
            opacity={0.4}
            mouseInteractive={true}
          />
          <CursorTrail 
            color="#5cf1f6" 
            trails={20} 
            size={50} 
            friction={0.5} 
            dampening={0.25} 
            tension={0.98} 
            lineWidth={1}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
