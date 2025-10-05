import "@/styles/globals.css"
import type { Metadata } from "next"
import Script from "next/script"
import Plasma from "@/components/plasma"
import CursorTrail from '@/components/ui/cursor-trail'
import PreloadAssets from "@/components/preload"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist } from "next/font/google"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: siteConfig.pageTitles.home,
  description: siteConfig.pageDescriptions.home,
  generator: siteConfig.generator,
}

const geist = Geist({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.appName} />
        <link rel="icon" href={siteConfig.faviconPath} />
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
  <PreloadAssets>
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
  </PreloadAssets>
      </body>
    </html>
  )
}
