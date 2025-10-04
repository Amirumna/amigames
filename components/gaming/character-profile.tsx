'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Sword, Shield, Zap, Heart, Star, Crown, Flame, Droplets, Wind, Zap as Electro, Leaf, Snowflake, Mountain } from 'lucide-react'
import { GenshinCharacter, CharacterStats } from '@/lib/genshin-api'

interface CharacterProfileProps {
  character: GenshinCharacter
  personalStats?: CharacterStats
  level?: number
  constellation?: number
  friendship?: number
  className?: string
}

export function CharacterProfile({ 
  character, 
  personalStats,
  level = 90,
  constellation = 0,
  friendship = 10,
  className = "" 
}: CharacterProfileProps) {
  const getCharacterImagePath = (characterName: string) => {
    const nameMap: Record<string, string> = {
      'Hu Tao': 'hu-tao',
      'Kazuha': 'kazuha',
      'Ayaka': 'ayaka',
      'Tighnari': 'tighnari',
      'Kaedehara Kazuha': 'kaedehara-kazuha',
      'Kamisato Ayaka': 'kamisato-ayaka'
    }
    const imageName = nameMap[characterName] || characterName.toLowerCase().replace(/\s+/g, '-')
    return `/images/genshin-characters/${imageName}.svg`
  }

  const getElementIcon = (vision: string) => {
    switch (vision.toLowerCase()) {
      case 'pyro': return <Flame className="h-5 w-5 text-red-400" />
      case 'hydro': return <Droplets className="h-5 w-5 text-blue-400" />
      case 'anemo': return <Wind className="h-5 w-5 text-green-400" />
      case 'electro': return <Electro className="h-5 w-5 text-purple-400" />
      case 'dendro': return <Leaf className="h-5 w-5 text-lime-400" />
      case 'cryo': return <Snowflake className="h-5 w-5 text-cyan-400" />
      case 'geo': return <Mountain className="h-5 w-5 text-yellow-400" />
      default: return <Star className="h-5 w-5 text-lime-300" />
    }
  }

  const getRarityColor = (rarity: number) => {
    return rarity === 5 ? 'border-yellow-400 bg-yellow-400/10' : 'border-purple-400 bg-purple-400/10'
  }

  const getConstellationLevel = (constellation: number) => {
    if (constellation === 0) return 'C0'
    if (constellation <= 2) return 'C1-C2'
    if (constellation <= 4) return 'C3-C4'
    return 'C5-C6'
  }

  return (
    <Card className={`bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={getCharacterImagePath(character.name)} alt={character.name} />
              <AvatarFallback className="bg-neutral-700 text-white">
                {character.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 bg-lime-300 text-black text-xs font-bold px-2 py-1 rounded-full">
              Lv.{level}
            </div>
            {constellation > 0 && (
              <div className="absolute -bottom-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                C{constellation}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              {character.name}
              <Badge variant="outline" className={`text-xs ${getRarityColor(character.rarity)}`}>
                {character.rarity}★
              </Badge>
            </CardTitle>
            <CardDescription className="text-neutral-400 flex items-center gap-2 mt-1">
              {getElementIcon(character.vision)}
              {character.vision} • {character.weapon}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400">Level</span>
              <span className="text-white font-medium">{level}/90</span>
            </div>
            <Progress value={(level / 90) * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400">Friendship</span>
              <span className="text-white font-medium">{friendship}/10</span>
            </div>
            <Progress value={(friendship / 10) * 100} className="h-2" />
          </div>
        </div>

        {personalStats && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Character Stats</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">HP</span>
                <span className="text-white font-medium">{personalStats.hp.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">ATK</span>
                <span className="text-white font-medium">{personalStats.attack.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">DEF</span>
                <span className="text-white font-medium">{personalStats.defense.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">EM</span>
                <span className="text-white font-medium">{personalStats.elemental_mastery}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-lime-300" />
            <span className="text-sm text-neutral-300">{getConstellationLevel(constellation)}</span>
          </div>
          <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}