import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Clock, Wifi, WifiOff } from "lucide-react"

interface GamingStatusIndicatorProps {
  currentGame: string
  status: 'online' | 'offline' | 'away'
  lastActivity: string
  showDetails?: boolean
  className?: string
}

export function GamingStatusIndicator({ 
  currentGame, 
  status, 
  lastActivity, 
  showDetails = true,
  className = ""
}: GamingStatusIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return Wifi
      case 'away': return Clock
      case 'offline': return WifiOff
      default: return WifiOff
    }
  }

  const StatusIcon = getStatusIcon()

  return (
    <Card className={`bg-white/5 border-white/10 backdrop-blur-xl ${className}`}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 text-lime-300" />
            <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${getStatusColor()}`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <h3 className="text-sm sm:text-base font-semibold text-white">Gaming Status</h3>
              <Badge 
                variant="outline" 
                className={`text-[10px] sm:text-xs ${
                  status === 'online' 
                    ? 'text-green-400 border-green-400/50' 
                    : status === 'away'
                    ? 'text-yellow-400 border-yellow-400/50'
                    : 'text-gray-400 border-gray-400/50'
                }`}
              >
                {status}
              </Badge>
            </div>
            
            {showDetails && (
              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-1 sm:gap-2">
                  <StatusIcon className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-400" />
                  <span className="text-xs sm:text-sm text-neutral-300">
                    {status === 'online' ? `Playing ${currentGame}` : 'Currently offline'}
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-400">
                  Last activity: {lastActivity}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

