import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import NotFoundClient from '@/components/notfound-client'

export const metadata: Metadata = {
  title: 'AmiGames | 404 Not Found',
  description: 'Explore My Journey in Online Games, Showcasing My Skills/Character, Past Projects, and Reviews Games.',
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
          <p>© {new Date().getFullYear()} - AmiNET Development. All rights reserved.</p>
        </div>
      </footer>
      </main>
    </div>
  );
}