'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, Star, Zap, Shield, Crown, Flame, Droplets, Wind, Leaf, Snowflake, Mountain, Zap as Electro } from 'lucide-react'
import { getCharacter, MAIN_TEAM, TeamComposition, GenshinCharacter } from '@/lib/genshin-api'
import { CharacterProfile } from './character-profile'
import { TeamCompositionCard } from './team-composition'

interface MainTeamShowcaseProps {
  className?: string
}

export function MainTeamShowcase({ className = "" }: MainTeamShowcaseProps) {
  const [characters, setCharacters] = useState<GenshinCharacter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characterPromises = MAIN_TEAM.characters.map(name => getCharacter(name))
        const characterData = await Promise.all(characterPromises)
        const validCharacters = characterData.filter(char => char !== null) as GenshinCharacter[]
        setCharacters(validCharacters)
      } catch (error) {
        console.error('Error fetching team characters:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [])

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
      case 'pyro': return <Flame className="h-4 w-4 text-red-400" />
      case 'hydro': return <Droplets className="h-4 w-4 text-blue-400" />
      case 'anemo': return <Wind className="h-4 w-4 text-green-400" />
      case 'electro': return <Electro className="h-4 w-4 text-purple-400" />
      case 'dendro': return <Leaf className="h-4 w-4 text-lime-400" />
      case 'cryo': return <Snowflake className="h-4 w-4 text-cyan-400" />
      case 'geo': return <Mountain className="h-4 w-4 text-yellow-400" />
      default: return <Star className="h-4 w-4 text-lime-300" />
    }
  }

  const getRoleIcon = (role: string) => {
    if (role.includes('DPS')) return <Zap className="h-4 w-4" />
    if (role.includes('Support')) return <Shield className="h-4 w-4" />
    if (role.includes('Healer')) return <Star className="h-4 w-4" />
    return <Users className="h-4 w-4" />
  }

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My <span className="text-lime-300">Main Team</span></h2>
          <p className="text-neutral-400">Loading team composition...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-neutral-700 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-neutral-700 rounded mb-2"></div>
                  <div className="h-3 bg-neutral-700 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">My <span className="text-lime-300">Main Team</span></h2>
        <p className="text-neutral-400">My primary team composition for most content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character, index) => (
          <Card key={character.name} className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage src={getCharacterImagePath(character.name)} alt={character.name} />
                  <AvatarFallback className="bg-neutral-700 text-white">
                    {character.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 bg-lime-300 text-black text-xs font-bold px-2 py-1 rounded-full">
                  {MAIN_TEAM.roles[index]}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{character.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                {getElementIcon(character.vision)}
                <span className="text-sm text-neutral-400">{character.vision}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  {getRoleIcon(MAIN_TEAM.roles[index])}
                  <span className="text-sm text-neutral-300">{MAIN_TEAM.roles[index]}</span>
                </div>
                <div className="text-xs text-neutral-400">
                  {character.weapon} • {character.rarity}★
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-lime-300" />
              Team Synergies
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Elemental reactions and team combinations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MAIN_TEAM.synergies.map((synergy, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-neutral-300">{synergy}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Crown className="h-5 w-5 text-lime-300" />
              Team Overview
            </CardTitle>
            <CardDescription className="text-neutral-400">
              {MAIN_TEAM.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Team Roles</h4>
                <div className="grid grid-cols-2 gap-2">
                  {MAIN_TEAM.roles.map((role, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-lime-300 rounded-full"></div>
                      <span className="text-neutral-300">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-lime-300 border-lime-300/50">
                    {MAIN_TEAM.recommended ? "Recommended" : "Experimental"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}