import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, Trophy, Clock, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GameProfile {
  id: string
  name: string
  slug: string
  level: number
  rank?: string
  playtime: string
  status: 'active' | 'completed' | 'paused'
  achievements: number
  description: string
  image: string
  genre: string[]
  lastPlayed: string
  progress?: number
}

interface GameProfileCardProps {
  game: GameProfile
  showProgress?: boolean
  showAchievements?: boolean
  showScreenshots?: boolean
  className?: string
}

export function GameProfileCard({ 
  game, 
  showProgress = true, 
  showAchievements = true,
  className = ""
}: GameProfileCardProps) {
  const getStatusColor = () => {
    switch (game.status) {
      case 'active': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'paused': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className={`bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 ${className}`}>
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            <AvatarImage src={game.image} alt={game.name} />
            <AvatarFallback className="text-xs sm:text-sm font-bold">
              {game.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-sm sm:text-base md:text-lg text-white">{game.name}</CardTitle>
            <div className="flex items-center gap-1 sm:gap-2 mt-1">
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${getStatusColor()}`} />
              <span className="text-[10px] sm:text-xs text-neutral-400 capitalize">{game.status}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4">
        <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">{game.description}</p>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-lime-300" />
            <span className="text-xs sm:text-sm text-white">Level {game.level}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-lime-300" />
            <span className="text-xs sm:text-sm text-white">{game.playtime}</span>
          </div>
        </div>

        {game.rank && (
          <div className="flex items-center gap-1 sm:gap-2">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-lime-300" />
            <Badge variant="outline" className="text-lime-300 border-lime-300/50 text-[10px] sm:text-xs">
              {game.rank}
            </Badge>
          </div>
        )}

        {showProgress && game.progress && (
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between text-[10px] sm:text-xs text-neutral-400">
              <span>Progress</span>
              <span>{game.progress}%</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-lime-300 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                style={{ width: `${game.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-0.5 sm:gap-1">
          {game.genre.map((g, index) => (
            <Badge key={index} variant="secondary" className="text-[9px] sm:text-xs">
              {g}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 pt-1 sm:pt-2">
          <span className="text-[10px] sm:text-xs text-neutral-500">Last played: {game.lastPlayed}</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700 text-xs sm:text-sm h-7 sm:h-8"
            asChild
          >
            <Link href={`/games/${game.slug}`}>
              View Details
              <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

