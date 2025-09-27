import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero-games"
import { Features } from "@/components/features"
import { LogoSection } from "@/components/logo-section"
import { AppverseFooter } from "@/components/appverse-footer"

export const dynamic = "force-static"

export default function testPage() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <LogoSection />
        <Features />
        <AppverseFooter />
      </main>
    </>
  )
}