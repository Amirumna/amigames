import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import GearAnimation from '@/components/ui/gear-animation'
import { copyrightText } from '@/components/appverse-footer'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: siteConfig.pageTitles.maintenance,
  description: siteConfig.pageDescriptions.maintenance,
  generator: siteConfig.generator,
};

export default function MaintanancePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col justify-center items-center">
        <GearAnimation />
        <footer>
          <div className="px-4 text-white mt-18 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 mx-auto">
            <p>{copyrightText}</p>
          </div>
        </footer>
      </main>
    </div>
  );
}