import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import NotFoundClient from '@/components/notfound-client'
import { copyrightText } from '@/components/appverse-footer'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: siteConfig.pageTitles.notFound,
  description: siteConfig.pageDescriptions.notFound,
  generator: siteConfig.generator,
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col justify-center items-center">
      <NotFoundClient />
      <footer>
        <div className="px-4 text-white mt-18 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 mx-auto">
          <p>{copyrightText}</p>
        </div>
      </footer>
      </main>
    </div>
  );
}