import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { AppverseFooter } from '@/components/appverse-footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { GamingStatsCard } from '@/components/gaming/gaming-stats-card'
import { AchievementShowcase } from '@/components/gaming/achievement-showcase'
import { WorldExplorationCard } from '@/components/gaming/world-exploration'
import { Star, Trophy, Clock, Sword, ArrowLeft, ExternalLink, Gamepad2, Target, Award, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'
import { gameReviews } from '@/lib/gaming-data'
import { personalStats, personalCharacters, getMaxLevelCharacters, getConstellationCharacters, worldExploration } from '@/lib/personal-genshin-data'
import { getCharacterIcon } from '@/lib/genshin-api'

export const metadata: Metadata = {
  title: 'Genshin Impact | AmiVerse Gaming',
  description: 'My Genshin Impact journey - AR 60 achievement, character builds, and gaming insights.',
  generator: siteConfig.generator,
}

const ACHIEVEMENTS = [
  {
    id: "ar60",
    title: "Adventure Rank 60",
    description: "Reached the maximum Adventure Rank in Genshin Impact",
    icon: "⭐",
    rarity: "legendary" as const,
    game: "Genshin Impact",
    date: "2024-01-15",
    category: "level" as const,
    points: 1000
  },
  {
    id: "spiral-abyss",
    title: "Spiral Abyss Master",
    description: "Completed all floors of the Spiral Abyss",
    icon: "⚔️",
    rarity: "rare" as const,
    game: "Genshin Impact",
    date: "2023-12-05",
    category: "completion" as const,
    points: 500
  },
  {
    id: "all-archons",
    title: "Archon Collector",
    description: "Obtained all Archon characters",
    icon: "👑",
    rarity: "epic" as const,
    game: "Genshin Impact",
    date: "2023-11-20",
    category: "completion" as const,
    points: 750
  }
]

const TIPS = [
  {
    title: "Spiral Abyss Tips",
    icon: Target,
    items: [
      "Build two strong teams with different elements",
      "Focus on elemental reactions for maximum damage",
      "Level up your supports - they're crucial for success",
      "Study enemy patterns and attack windows"
    ]
  },
  {
    title: "Character Building",
    icon: Award,
    items: [
      "Prioritize main DPS characters first",
      "Balance crit rate and crit damage (1:2 ratio)",
      "Don't neglect talent levels - they're very important",
      "Use artifact sets that synergize with character abilities"
    ]
  }
]

function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="flex items-center gap-4 mb-6 sm:mb-8 md:hidden">
        <Button 
          variant="outline" 
          size="sm" 
          asChild 
          className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700 hover:scale-105 transition-all duration-200 touch-manipulation min-h-[44px] min-w-[44px] px-4 py-3 shadow-lg hover:shadow-lime-300/20"
        >
          <Link href="/games">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="font-medium">Back to Games</span>
          </Link>
        </Button>
      </div>
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <Image 
              src="/images/genshin.png" 
              alt="Genshin Impact" 
              width={120} 
              height={120} 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl border-2 sm:border-4 border-lime-300/20" 
            />
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-lime-300 text-black text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">AR 60</div>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
          <span className="text-lime-300">Genshin Impact</span>
          <br />
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-neutral-300">Adventure Rank 60 Achievement</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed px-4">
          My journey through Teyvat has been incredible. From exploring Mondstadt to conquering the Spiral Abyss, 
          I've reached the pinnacle of adventure in this beautiful open-world RPG.
        </p>
      </div>
    </section>
  )
}

function PersonalStatsSection() {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
        <GamingStatsCard title="Adventure Rank" value={personalStats.adventureRank} icon={Star} description="Current AR level" />
        <GamingStatsCard title="Active Days" value={personalStats.activeDays} icon={Clock} description="Days played" />
        <GamingStatsCard title="Achievements" value={personalStats.achievements} icon={Trophy} description="Completed achievements" />
        <GamingStatsCard title="Characters" value={personalStats.charactersObtained} icon={Sword} description="Characters obtained" />
      </div>
    </section>
  )
}

function ProgressStatsSection() {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Game <span className="text-lime-300">Progress</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{personalStats.spiralAbyss}</div>
              <div className="text-xs sm:text-sm text-neutral-400">Spiral Abyss</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{personalStats.waypointsActivated}</div>
              <div className="text-xs sm:text-sm text-neutral-400">Waypoints</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{personalStats.domainsUnlocked}</div>
              <div className="text-xs sm:text-sm text-neutral-400">Domains</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-3 sm:p-4 md:p-6 text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{personalStats.maxFriendship}</div>
              <div className="text-xs sm:text-sm text-neutral-400">Max Friendship</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function CharacterCollectionSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">My Character <span className="text-lime-300">Collection</span></h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{personalCharacters.filter(c => c.isOwned).length}/{personalCharacters.length}</div>
              <div className="text-sm text-neutral-400">Total Characters</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{getMaxLevelCharacters().length}</div>
              <div className="text-sm text-neutral-400">Level 90</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{getConstellationCharacters().length}</div>
              <div className="text-sm text-neutral-400">With Constellations</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{personalCharacters.filter(c => c.rarity === 5).length}</div>
              <div className="text-sm text-neutral-400">5★ Characters</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{personalCharacters.filter(c => c.friendship === 10).length}</div>
              <div className="text-sm text-neutral-400">Max Friendship</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          {personalCharacters.slice(0, 24).map((character) => {
            const isMainTeam = ['Hu Tao', 'Kaedehara Kazuha', 'Kamisato Ayaka', 'Tighnari'].includes(character.name)
            const isOwned = character.isOwned
            return (
              <Card key={character.name} className={`${isOwned ? 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 cursor-pointer' : 'bg-gray-800/30 border-gray-600/30 opacity-60 cursor-not-allowed'} relative ${isMainTeam ? 'ring-2 ring-lime-300/50 shadow-lime-300/20' : ''}`}>
                {isMainTeam && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <Badge className="bg-gradient-to-r from-lime-300 to-lime-400 text-black text-xs font-bold px-2 py-1 shadow-lg">
                      Main Team
                    </Badge>
                  </div>
                )}
                <CardContent className="p-4 text-center">
                  <div className="relative mb-3 group">
                    <div className={`w-16 h-16 mx-auto rounded-full border-2 ${character.rarity === 5 ? 'border-yellow-400 shadow-yellow-400/20' : 'border-purple-400 shadow-purple-400/20'} shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`}>
                      <Image src={character.image} alt={character.name} width={64} height={64} className={`rounded-full w-full h-full object-cover ${!isOwned ? 'grayscale' : ''}`} />
                    </div>
                    
                    {/* Enhanced Level Badge */}
                    <div className={`absolute -top-1 -right-1 ${isOwned ? 'bg-gradient-to-br from-lime-300 to-lime-400 text-black' : 'bg-gray-600 text-gray-300'} text-xs font-bold px-2 py-1 rounded-full min-w-[22px] text-center shadow-lg border ${isOwned ? 'border-lime-200' : 'border-gray-500'} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lime-300/50`}>
                      <span className="relative z-10">{character.level}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    </div>
                    
                    {/* Enhanced Constellation Badge */}
                    {character.constellation > 0 && (
                      <div className={`absolute -bottom-1 -left-1 ${isOwned ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-gray-600 text-gray-300'} text-xs font-bold px-2 py-1 rounded-full min-w-[22px] text-center shadow-lg border ${isOwned ? 'border-blue-400' : 'border-gray-500'} transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50`}>
                        <span className="relative z-10">C{character.constellation}</span>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 leading-tight min-h-[40px] flex items-center justify-center ${isOwned ? 'text-white' : 'text-gray-400'}`}>{character.name}</h3>
                  <div className={`text-xs space-y-1 ${isOwned ? 'text-neutral-400' : 'text-gray-500'}`}>
                    <div className="truncate">{character.vision}</div>
                    <div className="truncate">{character.weapon}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-100">
                View All {personalCharacters.length} Characters
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-8xl w-[98vw] h-[90vh] bg-neutral-900 border-neutral-700 p-0 [&>button]:text-white">
              <DialogHeader className="p-6 pb-4 border-b border-white/10">
                <DialogTitle className="text-2xl font-bold text-white text-center">
                  All {personalCharacters.length} Characters
                </DialogTitle>
                <p className="text-sm text-neutral-400 text-center mt-2">Your complete character collection</p>
              </DialogHeader>
              <div className="p-6 h-full overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 h-full overflow-y-auto scrollbar-hide">
                  {personalCharacters.map((character) => {
                    const isMainTeam = ['Hu Tao', 'Kaedehara Kazuha', 'Kamisato Ayaka', 'Tighnari'].includes(character.name)
                    const isOwned = character.isOwned
                    return (
                      <Card key={character.name} className={`${isOwned ? 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 cursor-pointer' : 'bg-gray-800/30 border-gray-600/30 opacity-60 cursor-not-allowed'} relative ${isMainTeam ? 'ring-2 ring-lime-300/50 shadow-lime-300/20' : ''}`}>
                        {isMainTeam && (
                          <div className="absolute -top-2 -right-2 z-20">
                            <Badge className="bg-gradient-to-r from-lime-300 to-lime-400 text-black text-xs font-bold px-2 py-1 shadow-lg">
                              Main Team
                            </Badge>
                          </div>
                        )}
                        <CardContent className="p-3 text-center">
                          <div className="relative mb-3 group">
                            <div className={`w-14 h-14 mx-auto rounded-full border-2 ${character.rarity === 5 ? 'border-yellow-400 shadow-yellow-400/20' : 'border-purple-400 shadow-purple-400/20'} shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105`}>
                              <Image src={character.image} alt={character.name} width={56} height={56} className={`rounded-full w-full h-full object-cover ${!isOwned ? 'grayscale' : ''}`} />
                            </div>
                            
                            {/* Enhanced Level Badge */}
                            <div className={`absolute -top-1 -right-1 ${isOwned ? 'bg-gradient-to-br from-lime-300 to-lime-400 text-black' : 'bg-gray-600 text-gray-300'} text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center shadow-lg border ${isOwned ? 'border-lime-200' : 'border-gray-500'} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lime-300/50`}>
                              <span className="relative z-10">{character.level}</span>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                            </div>
                            
                            {/* Enhanced Constellation Badge */}
                            {character.constellation > 0 && (
                              <div className={`absolute -bottom-1 -left-1 ${isOwned ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-gray-600 text-gray-300'} text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center shadow-lg border ${isOwned ? 'border-blue-400' : 'border-gray-500'} transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50`}>
                                <span className="relative z-10">C{character.constellation}</span>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <h3 className={`font-semibold text-sm mb-1 leading-tight min-h-[32px] flex items-center justify-center ${isOwned ? 'text-white' : 'text-gray-400'}`}>{character.name}</h3>
                          <div className={`text-xs space-y-1 ${isOwned ? 'text-neutral-400' : 'text-gray-500'}`}>
                            <div className="truncate">{character.vision}</div>
                            <div className="truncate">{character.weapon}</div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

function GameReviewSection() {
  const review = gameReviews.find(r => r.game === "Genshin Impact")
  if (!review) return null
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">My <span className="text-lime-300">Review</span></h2>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-yellow-400" />
                <span className="text-xl font-bold text-white">Rating: {review.rating}/10</span>
              </div>
              <div className="text-sm text-neutral-400">{review.playtime}</div>
            </div>
            <p className="text-lg text-neutral-300 leading-relaxed">{review.summary}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-400 mb-2">Pros:</h4>
                <ul className="space-y-1">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-neutral-300 flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">Cons:</h4>
                <ul className="space-y-1">
                  {review.cons.map((con, index) => (
                    <li key={index} className="text-sm text-neutral-300 flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-400 rounded-full" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-lime-300" />
                <span className="text-sm text-neutral-300">{review.recommendation ? "Highly Recommended" : "Not Recommended"}</span>
              </div>
              <div className="text-sm text-neutral-400">Reviewed on {review.date}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function TipsSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Tips & <span className="text-lime-300">Strategies</span></h2>
        <div className="grid md:grid-cols-2 gap-8">
          {TIPS.map((tip, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <tip.icon className="h-6 w-6 text-lime-300" />
                  <h3 className="text-xl font-bold text-white">{tip.title}</h3>
                </div>
                <ul className="space-y-2 text-neutral-300">
                  {tip.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExternalLinksSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Connect & <span className="text-lime-300">Resources</span></h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-lime-400 text-black font-medium hover:bg-lime-300 hover:shadow-md hover:scale-105 transition-all" asChild>
            <Link href="https://genshin.hoyoverse.com" target="_blank">
              <ExternalLink className="h-5 w-5 mr-2" />
              Official Website
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-100" asChild>
            <Link href="/games">
              <Gamepad2 className="h-5 w-5 mr-2" />
              Back to Games
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function GenshinImpactPage() {
  return (
    <div className="min-h-screen text-white">
      <SiteHeader />
      <main className="relative z-10">
        <HeroSection />
        <PersonalStatsSection />
        <ProgressStatsSection />
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Major <span className="text-lime-300">Achievements</span></h2>
            <AchievementShowcase achievements={ACHIEVEMENTS} showDetails={true} layout="grid" />
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">My <span className="text-lime-300">Main Team</span> Showcase</h2>
            </div>
            
            <div className="bg-gradient-to-br bg-white/5 border-white/10 border rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/10 border-lime-300/30 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 ring-2 ring-lime-300/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4 group">
                      <div className="w-20 h-20 mx-auto rounded-full border-2 border-yellow-400 shadow-yellow-400/30 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                        <Image src={getCharacterIcon('Hu Tao')} alt="Hu Tao" width={80} height={80} className="rounded-full w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-gradient-to-br from-lime-300 to-lime-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-lime-200">
                        90
                      </div>
                      <div className="absolute -bottom-1 -left-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-blue-400">
                        C3
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Hu Tao</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                      <span className="text-sm text-neutral-300">Pyro • Polearm</span>
                    </div>
                    <div className="text-lime-300 font-semibold text-sm">Main DPS</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-lime-300/30 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 ring-2 ring-lime-300/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4 group">
                      <div className="w-20 h-20 mx-auto rounded-full border-2 border-yellow-400 shadow-yellow-400/30 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                        <Image src={getCharacterIcon('Kaedehara Kazuha')} alt="Kazuha" width={80} height={80} className="rounded-full w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-gradient-to-br from-lime-300 to-lime-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-lime-200">
                        90
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Kazuha</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                      <span className="text-sm text-neutral-300">Anemo • Sword</span>
                    </div>
                    <div className="text-lime-300 font-semibold text-sm">Support</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-lime-300/30 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 ring-2 ring-lime-300/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4 group">
                      <div className="w-20 h-20 mx-auto rounded-full border-2 border-yellow-400 shadow-yellow-400/30 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                        <Image src={getCharacterIcon('Kamisato Ayaka')} alt="Ayaka" width={80} height={80} className="rounded-full w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-gradient-to-br from-lime-300 to-lime-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-lime-200">
                        90
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Ayaka</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-cyan-500 rounded-full shadow-lg"></div>
                      <span className="text-sm text-neutral-300">Cryo • Sword</span>
                    </div>
                    <div className="text-lime-300 font-semibold text-sm">Sub-DPS</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-lime-300/30 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 hover:scale-105 ring-2 ring-lime-300/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4 group">
                      <div className="w-20 h-20 mx-auto rounded-full border-2 border-yellow-400 shadow-yellow-400/30 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                        <Image src={getCharacterIcon('Tighnari')} alt="Tighnari" width={80} height={80} className="rounded-full w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-gradient-to-br from-lime-300 to-lime-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-lime-200">
                        90
                      </div>
                      <div className="absolute -bottom-1 -left-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-blue-400">
                        C2
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Tighnari</h3>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-lime-500 rounded-full shadow-lg"></div>
                      <span className="text-sm text-neutral-300">Dendro • Bow</span>
                    </div>
                    <div className="text-lime-300 font-semibold text-sm">Sub-DPS</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-lime-300" />
                    Team Synergies
                  </h3>
                  <p className="text-sm text-neutral-400 mb-4">Elemental reactions and team combinations</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-300">Hu Tao + Kazuha: Vaporize reactions with Anemo support</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-300">Ayaka + Kazuha: Freeze team with crowd control</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-300">Tighnari + Dendro reactions for elemental mastery</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-300">Overall: Versatile elemental coverage and reactions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-lime-300" />
                    Team Overview
                  </h3>
                  <p className="text-sm text-neutral-400 mb-4">My primary team composition for most content</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Team Roles</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 bg-lime-300 rounded-full"></div>
                          <span className="text-neutral-300">Main DPS</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 bg-lime-300 rounded-full"></div>
                          <span className="text-neutral-300">Support</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 bg-lime-300 rounded-full"></div>
                          <span className="text-neutral-300">Sub-DPS</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 bg-lime-300 rounded-full"></div>
                          <span className="text-neutral-300">Sub-DPS</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-lime-300 border-lime-300/50">
                          Recommended
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <WorldExplorationCard exploration={worldExploration} />
          </div>
        </section>
        <CharacterCollectionSection />
        <GameReviewSection />
        <TipsSection />
        <ExternalLinksSection />
      </main>
      <AppverseFooter />
    </div>
  )
}