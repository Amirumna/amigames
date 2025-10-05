import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { AppverseFooter } from '@/components/appverse-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GamingStatsCard } from '@/components/gaming/gaming-stats-card'
import { GamingStatusIndicator } from '@/components/gaming/gaming-status-indicator'
import { AchievementShowcase } from '@/components/gaming/achievement-showcase'
import { GameLibraryGrid } from '@/components/gaming/game-library-grid'
import { Gamepad2, Trophy, Clock, Users, Star, Target, Award, Heart, Zap, Globe } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { gamingStats, gamingStatus, achievements, gameProfiles } from '@/lib/gaming-data'

export const metadata: Metadata = {
  title: siteConfig.pageTitles.games,
  description: siteConfig.pageDescriptions.games,
  generator: siteConfig.generator,
}

export default function GamingProfilePage() {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8 flex justify-center">
              <Avatar className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 border-2 sm:border-4 border-lime-300/20">
                <AvatarImage src="/placeholder-user.jpg" alt="Amiruman" />
                <AvatarFallback className="text-lg sm:text-2xl font-bold bg-lime-300/10 text-lime-300">
                  AM
                </AvatarFallback>
              </Avatar>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
              <span className="text-lime-300">Gaming</span> Profile
              <br />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-neutral-300">
                Where Every Achievement Tells a Story
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed px-4">
              Explore my gaming journey, achievements, and the games that define my digital adventures. 
              From AR 60 in Genshin Impact to Diamond rank in Valorant.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            <GamingStatsCard
              title="Total Games"
              value={gamingStats.totalGames}
              icon={Gamepad2}
              description="Games in library"
            />
            <GamingStatsCard
              title="Total Playtime"
              value={gamingStats.totalPlaytime}
              icon={Clock}
              description="Hours invested"
            />
            <GamingStatsCard
              title="Current Level"
              value={gamingStats.currentLevel}
              icon={Star}
              description="Overall progression"
            />
            <GamingStatsCard
              title="Achievements"
              value={gamingStats.totalAchievements}
              icon={Trophy}
              description="Unlocked milestones"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <GamingStatusIndicator
              currentGame={gamingStatus.currentGame}
              status={gamingStatus.status}
              lastActivity={gamingStatus.lastActivity}
              showDetails={true}
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              Recent <span className="text-lime-300">Achievements</span>
            </h2>
            
            <AchievementShowcase
              achievements={achievements}
              showDetails={true}
              layout="grid"
              maxItems={6}
            />
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700"
                asChild
              >
                <Link href="/games/achievements">
                  View All Achievements
                  <Trophy className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              My <span className="text-lime-300">Game Library</span>
            </h2>
            
            <GameLibraryGrid
              games={gameProfiles}
              filterBy="status"
              sortBy="achievement"
              showStats={true}
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              My <span className="text-lime-300">Gaming Philosophy</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Heart className="h-6 w-6 text-lime-300" />
                    Gaming Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">
                    My gaming journey spans over {gamingStats.gamingYears} years, from casual mobile games 
                    to competitive PC gaming. Each game has taught me something valuable about strategy, 
                    teamwork, and perseverance.
                  </p>
                  <p className="text-neutral-300">
                    I believe gaming is more than entertainment—it's a way to connect with people, 
                    develop skills, and explore new worlds and possibilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Target className="h-6 w-6 text-lime-300" />
                    Current Focus
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">
                    Currently, I'm deeply immersed in <span className="text-lime-300 font-semibold">Wuthering Waves</span>, 
                    <span className="text-lime-300 font-semibold"> Genshin Impact</span>, and 
                    <span className="text-lime-300 font-semibold"> Honkai: Star Rail</span>.
                  </p>
                  <p className="text-neutral-300">
                    These games represent the perfect blend of storytelling, character development, 
                    and strategic gameplay that I love most about gaming.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              Gaming <span className="text-lime-300">Setup</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Zap className="h-6 w-6 text-lime-300" />
                    Mobile Gaming
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">
                    <span className="text-lime-300 font-semibold">HUAWEI NOVA 7I</span> - Optimized for 
                    high-performance mobile gaming with smooth gameplay and excellent battery life.
                  </p>
                  <div className="flex items-center gap-2 text-lime-300">
                    <Globe className="h-5 w-5" />
                    <span>Cross-platform gaming enthusiast</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Award className="h-6 w-6 text-lime-300 " />
                    Laptop Gaming
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">
                    <span className="text-lime-300 font-semibold">ASUS TUF GAMING F15</span> - High-performance 
                    laptop optimized for competitive gaming and content creation.
                  </p>
                  <div className="flex items-center gap-2 text-lime-300">
                    <Users className="h-5 w-5" />
                    <span>Competitive gaming setup</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
              Let's <span className="text-lime-300">Game Together</span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-neutral-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              I'm always excited to connect with fellow gamers! Whether you want to discuss strategies, 
              share achievements, or just chat about the latest releases, I'd love to hear from you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-lime-400 text-black font-medium hover:bg-lime-300 hover:shadow-md hover:scale-105 transition-all"
                asChild
              >
                <Link href="/#contact">
                  <Users className="h-5 w-5 mr-2" />
                  Connect With Me
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-100"
                asChild
              >
                <Link href="/about">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Learn More About Me
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AppverseFooter />
    </div>
  )
}