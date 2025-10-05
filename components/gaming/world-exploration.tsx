'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Star, Droplets, Leaf, Zap, Snowflake, Gem, Sparkles } from 'lucide-react'
import { WorldExploration } from '@/lib/personal-genshin-data'

interface WorldExplorationProps {
  exploration: WorldExploration[]
  className?: string
}

export function WorldExplorationCard({ exploration, className = "" }: WorldExplorationProps) {
  const getRegionColor = (region: string) => {
    switch (region.toLowerCase()) {
      case 'natlan': return 'text-red-400 border-red-400/50 bg-red-400/10'
      case 'sea of bygone eras': return 'text-blue-400 border-blue-400/50 bg-blue-400/10'
      case 'chenyu vale': return 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10'
      case 'fontaine': return 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10'
      case 'sumeru': return 'text-green-400 border-green-400/50 bg-green-400/10'
      case 'chasm': return 'text-amber-400 border-amber-400/50 bg-amber-400/10'
      case 'enkanomiya': return 'text-purple-400 border-purple-400/50 bg-purple-400/10'
      case 'inazuma': return 'text-violet-400 border-violet-400/50 bg-violet-400/10'
      case 'dragonspine': return 'text-sky-400 border-sky-400/50 bg-sky-400/10'
      case 'liyue': return 'text-orange-400 border-orange-400/50 bg-orange-400/10'
      case 'mondstadt': return 'text-teal-400 border-teal-400/50 bg-teal-400/10'
      case 'nod-krai': return 'text-indigo-400 border-indigo-400/50 bg-indigo-400/10'
      default: return 'text-lime-300 border-lime-300/50 bg-lime-300/10'
    }
  }

  const getStatIcon = (specialName: string) => {
    switch (specialName.toLowerCase()) {
      case 'rainjade oblation': return <Gem className="h-4 w-4" />
      case 'fountain of lucine': return <Droplets className="h-4 w-4" />
      case 'tree of dreams': return <Leaf className="h-4 w-4" />
      case 'lumenstone adjuvant': return <Sparkles className="h-4 w-4" />
      case 'sacred sakura\'s favor': return <Zap className="h-4 w-4" />
      case 'frostbearing tree': return <Snowflake className="h-4 w-4" />
      default: return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">World Exploration</h2>
        <p className="text-neutral-400">Your progress across Teyvat's regions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exploration.map((region, index) => (
          <Card key={region.region} className={`bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors ${getRegionColor(region.region)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <span className="text-2xl">{region.icon}</span>
                  {region.region}
                </CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-400">Exploration Progress</span>
                  <span className="text-lime-300 font-bold text-lg">{region.explorationProgress}%</span>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div className="bg-lime-300 h-2 rounded-full transition-all duration-300" style={{ width: `${region.explorationProgress}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                {region.statueLevel && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-neutral-400" />
                      <span className="text-neutral-400">Statue Level</span>
                    </div>
                    <span className="text-white font-medium">{region.statueLevel}</span>
                  </div>
                )}

                {region.reputationLevel && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-neutral-400" />
                      <span className="text-neutral-400">Reputation</span>
                    </div>
                    <span className="text-white font-medium">{region.reputationLevel}</span>
                  </div>
                )}

                {region.specialLevel && region.specialName && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="text-neutral-400">{getStatIcon(region.specialName)}</div>
                      <span className="text-neutral-400">{region.specialName}</span>
                    </div>
                    <span className="text-white font-medium">{region.specialLevel}</span>
                  </div>
                )}
              </div>

              {region.subAreas && region.subAreas.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs text-neutral-400 mb-2">Sub Areas</div>
                  <div className="space-y-1">
                    {region.subAreas.map((subArea, subIndex) => (
                      <div key={subIndex} className="flex items-center justify-between text-xs">
                        <span className="text-neutral-300">{subArea.name}</span>
                        <span className="text-lime-300 font-bold">{subArea.progress}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-lime-300">{exploration.length}</div>
            <div className="text-sm text-neutral-400">Regions</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-lime-300">{exploration.filter(r => r.explorationProgress === 100).length}</div>
            <div className="text-sm text-neutral-400">100% Complete</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-lime-300">{Math.round(exploration.reduce((acc, r) => acc + r.explorationProgress, 0) / exploration.length)}%</div>
            <div className="text-sm text-neutral-400">Average Progress</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-lime-300">{exploration.filter(r => r.explorationProgress > 0).length}</div>
            <div className="text-sm text-neutral-400">Explored</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}