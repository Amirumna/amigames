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
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Honkai: Star Rail | AmiVerse Gaming',
  description: 'My Honkai: Star Rail journey - Trailblaze Level 70, story completion, and turn-based RPG mastery.',
  generator: siteConfig.generator,
}

const hsrStats = [
  { label: "Trailblaze Level", value: "70", icon: Star, description: "Maximum level achieved" },
  { label: "Equilibrium Level", value: "6", icon: Trophy, description: "Current difficulty" },
  { label: "Playtime", value: "400+ hours", icon: Clock, description: "Time invested" },
  { label: "Characters", value: "25+", icon: Sword, description: "Characters obtained" },
]

const hsrAchievements = [
  {
    id: "trailblaze70",
    title: "Trailblaze Level 70",
    description: "Completed all story content in Honkai: Star Rail",
    icon: "🚀",
    rarity: "epic" as const,
    game: "Honkai: Star Rail",
    date: "2024-03-10",
    category: "completion" as const,
    points: 750
  },
  {
    id: "simulated-universe",
    title: "Simulated Universe Master",
    description: "Completed all Simulated Universe challenges",
    icon: "🌌",
    rarity: "rare" as const,
    game: "Honkai: Star Rail",
    date: "2024-02-28",
    category: "completion" as const,
    points: 600
  },
  {
    id: "memory-chaos",
    title: "Memory of Chaos",
    description: "Cleared all Memory of Chaos stages",
    icon: "💫",
    rarity: "epic" as const,
    game: "Honkai: Star Rail",
    date: "2024-03-05",
    category: "completion" as const,
    points: 800
  }
]

const characters = [
  {
    id: "trailblazer",
    name: "Trailblazer",
    rarity: 5,
    level: 80,
    element: "Physical/Fire",
    weapon: "Sword",
    image: "/images/hsr.png"
  },
  {
    id: "kafka",
    name: "Kafka",
    rarity: 5,
    level: 80,
    element: "Lightning",
    weapon: "Sword",
    image: "/images/hsr.png"
  },
  {
    id: "silver-wolf",
    name: "Silver Wolf",
    rarity: 5,
    level: 80,
    element: "Quantum",
    weapon: "Sword",
    image: "/images/hsr.png"
  }
]

const teamCompositions = [
  {
    name: "Kafka DoT Team",
    characters: ["Kafka", "Sampo", "Asta", "Natasha"],
    description: "Damage over Time focused team with Kafka as the main DPS",
    useCase: "Simulated Universe, Memory of Chaos",
    effectiveness: 95
  },
  {
    name: "Quantum Team",
    characters: ["Silver Wolf", "Seele", "Tingyun", "Bailu"],
    description: "Quantum element focused team with high single-target damage",
    useCase: "Boss fights, Elite enemies",
    effectiveness: 90
  }
]

const simulatedUniverse = [
  {
    world: "World 1",
    difficulty: "Completed",
    path: "Destruction",
    time: "15:30",
    tips: "Focus on destruction blessings for maximum damage"
  },
  {
    world: "World 2",
    difficulty: "Completed",
    path: "Preservation",
    time: "18:45",
    tips: "Build tanky characters with shield generation"
  },
  {
    world: "World 3",
    difficulty: "Completed",
    path: "Abundance",
    time: "22:15",
    tips: "Healing and sustain focused strategy"
  }
]

export default function HonkaiStarRailPage() {
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
                  src="/images/hsr.png" 
                  alt="Honkai: Star Rail" 
                  width={120} 
                  height={120}
                  className="rounded-2xl border-4 border-lime-300/20"
                />
                <div className="absolute -top-2 -right-2 bg-lime-300 text-black text-xs font-bold px-2 py-1 rounded-full">
                  TL 70
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-lime-300">Honkai: Star Rail</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-300">
                Trailblaze Level 70 Journey
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              A turn-based RPG set in the Honkai universe. I've completed the story, mastered the Simulated Universe, 
              and built powerful teams to conquer the most challenging content.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {hsrStats.map((stat, index) => (
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
              achievements={hsrAchievements}
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
              Team <span className="text-lime-300">Compositions</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {teamCompositions.map((team, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {team.name}
                      <Badge variant="outline" className="text-lime-300 border-lime-300/50">
                        {team.effectiveness}% Effective
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-neutral-300">{team.description}</p>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Use Case:</h4>
                      <p className="text-sm text-neutral-400">{team.useCase}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Characters:</h4>
                      <div className="flex gap-2">
                        {team.characters.map((char) => (
                          <Badge key={char} variant="secondary">
                            {char}
                          </Badge>
                        ))}
                      </div>
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
              Simulated Universe <span className="text-lime-300">Progress</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simulatedUniverse.map((world, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {world.world}
                      <Badge 
                        variant="outline" 
                        className="text-green-400 border-green-400/50"
                      >
                        {world.difficulty}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-lime-300" />
                      <span className="text-sm text-neutral-300">Path: {world.path}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-lime-300" />
                      <span className="text-sm text-neutral-300">Best Time: {world.time}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Strategy:</h4>
                      <p className="text-sm text-neutral-300">{world.tips}</p>
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
              My <span className="text-lime-300">Review</span>
            </h2>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <Star className="h-6 w-6 text-yellow-400" />
                    Rating: 9.2/10
                  </CardTitle>
                  <Badge variant="outline" className="text-lime-300 border-lime-300/50">
                    400+ hours
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Honkai: Star Rail is an exceptional turn-based RPG that combines strategic combat with 
                  engaging storytelling. The game's progression system is well-balanced, and the Simulated 
                  Universe provides endless replayability.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">What I Love:</h4>
                    <ul className="space-y-2 text-neutral-300">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Strategic turn-based combat system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Engaging story and character development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Simulated Universe roguelike mode</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Beautiful character designs and animations</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-3">Areas for Improvement:</h4>
                    <ul className="space-y-2 text-neutral-300">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>More endgame content variety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Faster story content updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>More interactive character events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Better resource management system</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-lime-300" />
                      <span className="text-sm text-neutral-300">Highly Recommended</span>
                    </div>
                    <div className="text-sm text-neutral-400">
                      Reviewed on 2024-03-10
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                <Link href="https://hsr.hoyoverse.com" target="_blank">
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

