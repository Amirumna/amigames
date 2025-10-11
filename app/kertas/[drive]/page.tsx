import React, { Suspense } from "react"
import type { Metadata } from 'next'
import Script from "next/script"
import { notFound, redirect } from 'next/navigation'
import GDriveList from "@/components/gdrive-list"
import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { getDriveBySlug, getPublicDrive } from "@/lib/drives-config"
import { getAuthenticatedDrive } from "@/lib/auth-utils"

interface DrivePageProps {
  params: {
    drive: string
  }
}

export async function generateMetadata({ params }: DrivePageProps): Promise<Metadata> {
  const { drive: driveSlug } = await params
  const drive = getDriveBySlug(driveSlug)
  
  if (!drive) {
    return {
      title: 'Drive Not Found',
      description: 'The requested drive could not be found.'
    }
  }

  return {
    title: `${drive.name} - Kertas`,
    description: drive.description,
    generator: 'aminetdevelopment.pages.dev',
  }
}

export default async function DrivePage({ params }: DrivePageProps) {
  const { drive: driveSlug } = await params
  const drive = getDriveBySlug(driveSlug)
  
  if (!drive) {
    notFound()
  }

  if (drive.requiresPassword) {
    const authenticatedDrive = await getAuthenticatedDrive()
    
    if (!authenticatedDrive || authenticatedDrive !== drive.slug) {
      redirect('/kertas')
    }
  }

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
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Kertas Gdrive Index
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 text-center max-w-2xl mx-auto leading-relaxed px-4">
          Welcome to {decodeURIComponent(drive.name)} of Google Drive Directory Index<br className="hidden sm:inline" />
        <span className="text-yellow-400 font-medium">Browse, Preview, and Download Files Securely</span>
        </p>
      </section>
      <section className="flex flex-col items-center w-full">
        <div className="w-full max-w-4xl rounded-lg shadow-lg bg-gray-950/80 p-4 sm:p-6 mb-8">
          <Suspense fallback={<div className="text-center py-8 text-gray-300">Loading files...</div>}>
            <GDriveList driveSlug={drive.slug} currentPathFolders={[]} />
          </Suspense>
        </div>
      </section>
      <AppverseFooter />
    </main>
  )
}
