import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import NotFoundClient from '@/components/notfound-client'
import { copyrightText } from '@/components/appverse-footer'

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: 'AmiVerse | 404 Not Found',
  description: 'The requested resource could not be found but may be available again in the future. Please check the URL or return to the homepage.',
  generator: 'aminetdevelopment.pages.dev',
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