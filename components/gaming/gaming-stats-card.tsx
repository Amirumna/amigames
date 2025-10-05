import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface GamingStatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: 'up' | 'down' | 'stable'
  description?: string
  className?: string
}

export function GamingStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  className = ""
}: GamingStatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      case 'stable': return 'text-blue-400'
      default: return 'text-lime-300'
    }
  }

  return (
    <Card className={`bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors ${className}`}>
      <CardContent className="p-3 sm:p-4 md:p-6 text-center">
        <Icon className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 mx-auto mb-2 sm:mb-3 ${getTrendColor()}`} />
        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs sm:text-sm text-neutral-400 mb-1">{title}</div>
        {description && (
          <div className="text-[10px] sm:text-xs text-neutral-500">{description}</div>
        )}
      </CardContent>
    </Card>
  )
}

