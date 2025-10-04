import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { AppverseFooter } from '@/components/appverse-footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GamingStatsCard } from '@/components/gaming/gaming-stats-card'
import { AchievementShowcase } from '@/components/gaming/achievement-showcase'
import { 
  Star, 
  Trophy, 
  Clock, 
  Sword, 
  Shield, 
  Zap, 
  ArrowLeft,
  ExternalLink,
  Gamepad2,
  Target,
  Award,
  Heart,
  Waves
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Wuthering Waves | AmiVerse Gaming',
  description: 'My Wuthering Waves journey - Union Level 90 achievement, character mastery, and post-apocalyptic adventures.',
  generator: siteConfig.generator,
}

const wuwaStats = [
  { label: "Union Level", value: "90", icon: Star, description: "Maximum level achieved" },
  { label: "World Level", value: "6", icon: Trophy, description: "Current difficulty" },
  { label: "Playtime", value: "300+ hours", icon: Clock, description: "Time invested" },
  { label: "Characters", value: "12+", icon: Sword, description: "Characters obtained" },
]

const wuwaAchievements = [
  {
    id: "union90",
    title: "Union Level 90",
    description: "Mastered all game mechanics in Wuthering Waves",
    icon: "🌊",
    rarity: "legendary" as const,
    game: "Wuthering Waves",
    date: "2024-06-20",
    category: "level" as const,
    points: 1000
  },
  {
    id: "boss-master",
    title: "Boss Master",
    description: "Defeated all challenging bosses in Wuthering Waves",
    icon: "👹",
    rarity: "rare" as const,
    game: "Wuthering Waves",
    date: "2024-05-30",
    category: "completion" as const,
    points: 600
  },
  {
    id: "exploration-master",
    title: "Exploration Master",
    description: "Completed all world exploration objectives",
    icon: "🗺️",
    rarity: "epic" as const,
    game: "Wuthering Waves",
    date: "2024-06-15",
    category: "completion" as const,
    points: 750
  }
]

const characters = [
  {
    id: "rover",
    name: "Rover",
    rarity: 5,
    level: 90,
    element: "Spectro",
    weapon: "Sword",
    image: "/images/wuwa.png"
  },
  {
    id: "calcharo",
    name: "Calcharo",
    rarity: 5,
    level: 80,
    element: "Electro",
    weapon: "Sword",
    image: "/images/wuwa.png"
  },
  {
    id: "yinlin",
    name: "Yinlin",
    rarity: 5,
    level: 80,
    element: "Electro",
    weapon: "Pistol",
    image: "/images/wuwa.png"
  }
]

const bossFights = [
  {
    name: "Crownless",
    difficulty: "Extreme",
    time: "3:45",
    strategy: "Focus on parrying attacks and using electro reactions",
    tips: "Watch for the red flash before attacks"
  },
  {
    name: "Inferno Rider",
    difficulty: "Hard",
    time: "2:30",
    strategy: "Use ice characters to counter fire attacks",
    tips: "Stay mobile during the fire phase"
  },
  {
    name: "Tempest Mephis",
    difficulty: "Extreme",
    time: "4:15",
    strategy: "Coordinate team attacks during vulnerability windows",
    tips: "Save ultimate abilities for the final phase"
  }
]

export default function WutheringWavesPage() {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700">
              <Link href="/games">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Link>
            </Button>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Image 
                  src="/images/wuwa.png" 
                  alt="Wuthering Waves" 
                  width={120} 
                  height={120}
                  className="rounded-2xl border-4 border-lime-300/20"
                />
                <div className="absolute -top-2 -right-2 bg-lime-300 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Union 90
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-lime-300">Wuthering Waves</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-300">
                Union Level 90 Mastery
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              A post-apocalyptic action RPG that combines dynamic combat with deep exploration. 
              I've mastered the game's mechanics and conquered its most challenging content.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {wuwaStats.map((stat, index) => (
              <GamingStatsCard
                key={index}
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                description={stat.description}
              />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Major <span className="text-lime-300">Achievements</span>
            </h2>
            
            <AchievementShowcase
              achievements={wuwaAchievements}
              showDetails={true}
              layout="grid"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Character <span className="text-lime-300">Showcase</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <Card key={character.id} className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <Image 
                        src={character.image} 
                        alt={character.name} 
                        width={80} 
                        height={80}
                        className="rounded-full mx-auto border-2 border-lime-300/20"
                      />
                      <div className="absolute -top-1 -right-1 bg-lime-300 text-black text-xs font-bold px-1 py-0.5 rounded-full">
                        {character.rarity}★
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-white mb-2">{character.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Badge variant="outline" className="text-lime-300 border-lime-300/50">
                        Level {character.level}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-neutral-300 space-y-1">
                      <div>Element: <span className="text-lime-300">{character.element}</span></div>
                      <div>Weapon: <span className="text-lime-300">{character.weapon}</span></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Boss Fight <span className="text-lime-300">Strategies</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bossFights.map((boss, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {boss.name}
                      <Badge 
                        variant="outline" 
                        className={
                          boss.difficulty === 'Extreme' 
                            ? 'text-red-400 border-red-400/50' 
                            : 'text-yellow-400 border-yellow-400/50'
                        }
                      >
                        {boss.difficulty}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-lime-300" />
                      <span className="text-sm text-neutral-300">Best Time: {boss.time}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Strategy:</h4>
                      <p className="text-sm text-neutral-300">{boss.strategy}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Pro Tip:</h4>
                      <p className="text-sm text-neutral-300">{boss.tips}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Game <span className="text-lime-300">Analysis</span>
            </h2>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Waves className="h-6 w-6 text-lime-300" />
                  My Thoughts on Wuthering Waves
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">What I Love:</h4>
                    <ul className="space-y-2 text-neutral-300">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Dynamic combat system with parrying mechanics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Beautiful post-apocalyptic world design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Challenging boss fights that require skill</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Character customization and builds</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-3">Areas for Improvement:</h4>
                    <ul className="space-y-2 text-neutral-300">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>More endgame content needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Character gacha rates could be better</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Some technical issues on mobile</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Story pacing could be improved</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold text-white">Overall Rating: 8.8/10</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-lime-300" />
                      <span className="text-sm text-neutral-300">Highly Recommended</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Performance <span className="text-lime-300">Tips</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-lime-300" />
                    Mobile Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-neutral-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>Use medium graphics settings for smooth 60fps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>Enable performance mode in device settings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>Close background apps to free up RAM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>Use a cooling pad for extended gaming sessions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-lime-300" />
                    Combat Mastery
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-neutral-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>Master the parry timing for maximum damage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>Learn enemy attack patterns and tells</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>Use character switching for combo chains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>Build teams with elemental synergy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Connect & <span className="text-lime-300">Resources</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-lime-400 text-black font-medium hover:bg-lime-300 hover:shadow-md hover:scale-105 transition-all"
                asChild
              >
                <Link href="https://wutheringwaves.kurogames.com" target="_blank">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Official Website
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700"
                asChild
              >
                <Link href="/games">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Back to Games
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

