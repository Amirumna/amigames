import React, { Suspense } from "react"
import type { Metadata } from 'next'
import Script from "next/script"
import GDriveList from "@/components/gdrive-list"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"

export const metadata: Metadata = {
  title: 'AmiVerse | KERTAS',
  description: 'Kertas is a public Google Drive directory index. Browse, preview, and download files securely.',
  generator: 'aminetdevelopment.pages.dev',
};

export default function KertasPage() {
  return (
    <main className="min-h-[100dvh] text-white px-4 sm:px-6 md:px-8">
        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const faviconHref = darkMode ? '/images/roblox.png' : '/images/roblox.png';
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
      <SiteHeader />
      <section className="w-full max-w-2xl mx-auto py-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center tracking-tight">Kertas Directory Index</h1>
        <p className="text-base sm:text-lg text-gray-300 mb-8 text-center">
          Welcome to the public Google Drive directory index.<br className="hidden sm:inline" />Browse, preview, and download files securely.
        </p>
      </section>
      <section className="flex flex-col items-center w-full">
        <div className="w-full max-w-4xl rounded-lg shadow-lg bg-gray-950/80 p-4 sm:p-6 mb-8">
          <Suspense fallback={<div className="text-center py-8 text-gray-300">Loading...</div>}>
            <GDriveList />
          </Suspense>
        </div>
      </section>
    <AppverseFooter />
    </main>
  );
}


