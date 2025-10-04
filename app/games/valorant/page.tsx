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
  Crosshair
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Valorant | AmiVerse Gaming',
  description: 'My Valorant journey - Diamond rank achievement, agent mastery, and competitive FPS excellence.',
  generator: siteConfig.generator,
}

const valorantStats = [
  { label: "Current Rank", value: "Diamond", icon: Trophy, description: "Competitive rank" },
  { label: "Peak Rank", value: "Diamond 2", icon: Star, description: "Highest achieved" },
  { label: "Playtime", value: "200+ hours", icon: Clock, description: "Time invested" },
  { label: "Agents", value: "15+", icon: Sword, description: "Agents mastered" },
]

const valorantAchievements = [
  {
    id: "diamond-rank",
    title: "Diamond Rank",
    description: "Achieved Diamond rank in Valorant competitive play",
    icon: "🎯",
    rarity: "epic" as const,
    game: "Valorant",
    date: "2024-02-28",
    category: "competitive" as const,
    points: 800
  },
  {
    id: "ace-master",
    title: "Ace Master",
    description: "Achieved multiple Ace rounds in competitive matches",
    icon: "🏆",
    rarity: "rare" as const,
    game: "Valorant",
    date: "2024-02-15",
    category: "competitive" as const,
    points: 600
  },
  {
    id: "agent-master",
    title: "Agent Master",
    description: "Mastered multiple agents across different roles",
    icon: "🎭",
    rarity: "epic" as const,
    game: "Valorant",
    date: "2024-01-20",
    category: "completion" as const,
    points: 750
  }
]

const agents = [
  {
    id: "jett",
    name: "Jett",
    role: "Duelist",
    mastery: "Expert",
    playtime: "50+ hours",
    image: "/images/valorant.png",
    description: "High mobility duelist with exceptional movement abilities"
  },
  {
    id: "sova",
    name: "Sova",
    role: "Initiator",
    mastery: "Expert",
    playtime: "40+ hours",
    image: "/images/valorant.png",
    description: "Reconnaissance specialist with information gathering abilities"
  },
  {
    id: "omen",
    name: "Omen",
    role: "Controller",
    mastery: "Advanced",
    playtime: "30+ hours",
    image: "/images/valorant.png",
    description: "Shadow controller with teleportation and smokes"
  }
]

const matchHistory = [
  {
    map: "Bind",
    result: "Victory",
    score: "13-8",
    kills: 24,
    deaths: 12,
    assists: 8,
    agent: "Jett",
    rankChange: "+18 RR"
  },
  {
    map: "Ascent",
    result: "Victory",
    score: "13-10",
    kills: 18,
    deaths: 15,
    assists: 12,
    agent: "Sova",
    rankChange: "+15 RR"
  },
  {
    map: "Haven",
    result: "Defeat",
    score: "11-13",
    kills: 20,
    deaths: 18,
    assists: 6,
    agent: "Omen",
    rankChange: "-12 RR"
  }
]

const competitiveInsights = [
  {
    title: "Aim Training",
    description: "Daily aim training routine for consistent performance",
    tips: [
      "Use Aim Lab for 30 minutes daily",
      "Practice flick shots and tracking",
      "Focus on crosshair placement",
      "Warm up before competitive matches"
    ]
  },
  {
    title: "Game Sense",
    description: "Developing tactical awareness and decision making",
    tips: [
      "Study professional matches",
      "Learn common angles and positions",
      "Understand economy management",
      "Practice communication with team"
    ]
  },
  {
    title: "Agent Mastery",
    description: "Becoming proficient with multiple agents",
    tips: [
      "Master 2-3 agents per role",
      "Learn agent-specific lineups",
      "Practice ability combinations",
      "Adapt to team composition"
    ]
  }
]

export default function ValorantPage() {
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
                  src="/images/valorant.png" 
                  alt="Valorant" 
                  width={120} 
                  height={120}
                  className="rounded-2xl border-4 border-lime-300/20"
                />
                <div className="absolute -top-2 -right-2 bg-lime-300 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Diamond
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-lime-300">Valorant</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-300">
                Diamond Rank Achievement
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              A tactical FPS that combines precise aim with strategic gameplay. I've achieved Diamond rank 
              through dedicated practice, agent mastery, and developing strong game sense.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {valorantStats.map((stat, index) => (
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
              achievements={valorantAchievements}
              showDetails={true}
              layout="grid"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Agent <span className="text-lime-300">Mastery</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <Image 
                        src={agent.image} 
                        alt={agent.name} 
                        width={80} 
                        height={80}
                        className="rounded-full mx-auto border-2 border-lime-300/20"
                      />
                      <div className="absolute -top-1 -right-1 bg-lime-300 text-black text-xs font-bold px-1 py-0.5 rounded-full">
                        {agent.mastery}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-white mb-2">{agent.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Badge variant="outline" className="text-lime-300 border-lime-300/50">
                        {agent.role}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-neutral-300 space-y-1 mb-3">
                      <div>Playtime: <span className="text-lime-300">{agent.playtime}</span></div>
                    </div>
                    
                    <p className="text-xs text-neutral-400">{agent.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Recent <span className="text-lime-300">Matches</span>
            </h2>
            
            <div className="space-y-4">
              {matchHistory.map((match, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{match.map}</div>
                          <div className="text-sm text-neutral-400">Map</div>
                        </div>
                        
                        <div className="text-center">
                          <div className={`text-xl font-bold ${match.result === 'Victory' ? 'text-green-400' : 'text-red-400'}`}>
                            {match.result}
                          </div>
                          <div className="text-sm text-neutral-400">{match.score}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white">{match.agent}</div>
                          <div className="text-sm text-neutral-400">Agent</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-white">
                          {match.kills}/{match.deaths}/{match.assists}
                        </div>
                        <div className="text-sm text-neutral-400">K/D/A</div>
                        <div className={`text-sm font-medium ${match.rankChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {match.rankChange}
                        </div>
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
              Competitive <span className="text-lime-300">Insights</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {competitiveInsights.map((insight, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Crosshair className="h-6 w-6 text-lime-300" />
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-neutral-300">{insight.description}</p>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Tips:</h4>
                      <ul className="space-y-1">
                        {insight.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-neutral-300 flex items-start gap-2">
                            <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
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
                    Rating: 9.0/10
                  </CardTitle>
                  <Badge variant="outline" className="text-lime-300 border-lime-300/50">
                    200+ hours
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Valorant is an exceptional tactical FPS that perfectly balances individual skill with team strategy. 
                  The agent system adds unique depth to gameplay, and the competitive ranking system provides 
                  clear progression goals.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">What I Love:</h4>
                    <ul className="space-y-2 text-neutral-300">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Precise gunplay and movement mechanics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Unique agent abilities and team synergy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Competitive ranking system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Regular updates and new content</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-3">Areas for Improvement:</h4>
                    <ul className="space-y-2 text-neutral-300">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Better anti-cheat system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>More map variety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Improved matchmaking system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Better communication tools</span>
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
                      Reviewed on 2024-02-28
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
                <Link href="https://playvalorant.com" target="_blank">
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

