import React, { Suspense } from "react"
import type { Metadata } from 'next'
import Script from "next/script"
import DriveSelectionGrid from "@/components/drive-selection-grid"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: siteConfig.pageTitles.kertas,
  description: siteConfig.pageDescriptions.kertas,
  generator: siteConfig.generator,
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
      <section className="w-full max-w-4xl mx-auto py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 text-center tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Kertas Gdrive Index
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 text-center max-w-2xl mx-auto leading-relaxed px-4">
            Welcome to The Google Drive Directory Index<br className="hidden sm:inline" />
            <span className="text-yellow-400 font-medium">Browse, Preview, and Download Files Securely</span>
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 px-4">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs sm:text-sm text-green-400 font-medium">Public Access</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-xs sm:text-sm text-yellow-400 font-medium">Password Protected</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
              <span className="text-xs sm:text-sm text-blue-400 font-medium">Secure Authentication</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="flex flex-col items-center w-full">
        <div className="w-full max-w-6xl">
          <Suspense fallback={
            <div className="text-center py-8 sm:py-12">
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-2 text-gray-300">
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm sm:text-lg">Loading drives...</span>
              </div>
            </div>
          }>
            <DriveSelectionGrid />
          </Suspense>
        </div>
      </section>
      
      {/* Spacer between content and footer */}
      <div className="h-16 sm:h-20 lg:h-24"></div>
      
      <AppverseFooter />
    </main>
  );
}


