import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Target, Award } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  game: string
  date: string
  category: 'level' | 'rank' | 'completion' | 'competitive'
}

interface AchievementShowcaseProps {
  achievements: Achievement[]
  game?: string
  showDetails?: boolean
  layout?: 'grid' | 'list' | 'carousel'
  maxItems?: number
  className?: string
}

export function AchievementShowcase({ 
  achievements, 
  game, 
  showDetails = true,
  layout = 'grid',
  maxItems,
  className = ""
}: AchievementShowcaseProps) {
  const filteredAchievements = game 
    ? achievements.filter(a => a.game === game)
    : achievements

  const displayAchievements = maxItems 
    ? filteredAchievements.slice(0, maxItems)
    : filteredAchievements

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-400/50'
      case 'epic': return 'text-purple-400 border-purple-400/50'
      case 'rare': return 'text-blue-400 border-blue-400/50'
      case 'common': return 'text-green-400 border-green-400/50'
      default: return 'text-lime-300 border-lime-300/50'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'level': return Trophy
      case 'rank': return Star
      case 'completion': return Target
      case 'competitive': return Award
      default: return Trophy
    }
  }

  if (layout === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {displayAchievements.map((achievement) => {
          const IconComponent = getCategoryIcon(achievement.category)
          return (
            <Card key={achievement.id} className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{achievement.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getRarityColor(achievement.rarity)}`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-300">{achievement.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-neutral-400">
                      <span>{achievement.game}</span>
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                  <IconComponent className="h-5 w-5 text-lime-300" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {displayAchievements.map((achievement) => {
        const IconComponent = getCategoryIcon(achievement.category)
        return (
          <Card key={achievement.id} className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-3">{achievement.icon}</div>
              <h3 className="font-semibold text-white mb-2">{achievement.title}</h3>
              {showDetails && (
                <p className="text-sm text-neutral-300 mb-3">{achievement.description}</p>
              )}
              <div className="flex items-center justify-center gap-2 mb-3">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getRarityColor(achievement.rarity)}`}
                >
                  {achievement.rarity}
                </Badge>
                <IconComponent className="h-4 w-4 text-lime-300" />
              </div>
              <div className="text-xs text-neutral-400">
                <div>{achievement.game}</div>
                <div>{achievement.date}</div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

