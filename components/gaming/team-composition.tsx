'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, Star, Zap, Shield } from 'lucide-react'
import { TeamComposition } from '@/lib/genshin-api'

interface TeamCompositionProps {
  team: TeamComposition
  className?: string
}

export function TeamCompositionCard({ team, className = "" }: TeamCompositionProps) {
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

  const getElementColor = (vision: string) => {
    switch (vision.toLowerCase()) {
      case 'pyro': return 'text-red-400 border-red-400/50'
      case 'hydro': return 'text-blue-400 border-blue-400/50'
      case 'anemo': return 'text-green-400 border-green-400/50'
      case 'electro': return 'text-purple-400 border-purple-400/50'
      case 'dendro': return 'text-lime-400 border-lime-400/50'
      case 'cryo': return 'text-cyan-400 border-cyan-400/50'
      case 'geo': return 'text-yellow-400 border-yellow-400/50'
      default: return 'text-lime-300 border-lime-300/50'
    }
  }

  const getRoleIcon = (role: string) => {
    if (role.includes('DPS')) return <Zap className="h-4 w-4" />
    if (role.includes('Support')) return <Shield className="h-4 w-4" />
    if (role.includes('Healer')) return <Star className="h-4 w-4" />
    return <Users className="h-4 w-4" />
  }

  return (
    <Card className={`bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-lime-300" />
            {team.name}
          </CardTitle>
          {team.recommended && (
            <Badge variant="outline" className="text-lime-300 border-lime-300/50">
              Recommended
            </Badge>
          )}
        </div>
        <CardDescription className="text-neutral-400">
          {team.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {team.characters.map((character, index) => (
            <div key={character} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarImage src={getCharacterImagePath(character)} alt={character} />
                <AvatarFallback className="bg-neutral-700 text-white text-xs">
                  {character.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{character}</div>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  {getRoleIcon(team.roles[index])}
                  <span>{team.roles[index]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Team Synergies</h4>
          <div className="space-y-2">
            {team.synergies.map((synergy, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 bg-lime-300 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-neutral-300">{synergy}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-lime-300" />
            <span className="text-sm text-neutral-300">{team.characters.length} Characters</span>
          </div>
          <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700">
            View Team
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}