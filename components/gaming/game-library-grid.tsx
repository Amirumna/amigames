"use client"

import { useState } from "react"
import { GameProfileCard } from "./game-profile-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Grid, List } from "lucide-react"

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

interface GameLibraryGridProps {
  games: GameProfile[]
  filterBy?: 'genre' | 'status' | 'achievement'
  sortBy?: 'name' | 'playtime' | 'achievement'
  showStats?: boolean
  className?: string
}

export function GameLibraryGrid({ 
  games, 
  filterBy = 'status',
  sortBy = 'name',
  showStats = true,
  className = ""
}: GameLibraryGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedSort, setSelectedSort] = useState(sortBy)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Get unique values for filters
  const getFilterOptions = () => {
    switch (filterBy) {
      case 'genre':
        return Array.from(new Set(games.flatMap(game => game.genre)))
      case 'status':
        return ['active', 'completed', 'paused']
      case 'achievement':
        return ['high', 'medium', 'low']
      default:
        return []
    }
  }

  // Filter and sort games
  const filteredAndSortedGames = games
    .filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = selectedFilter === 'all' || 
        (filterBy === 'genre' && game.genre.includes(selectedFilter)) ||
        (filterBy === 'status' && game.status === selectedFilter) ||
        (filterBy === 'achievement' && 
          (selectedFilter === 'high' && game.achievements > 10) ||
          (selectedFilter === 'medium' && game.achievements > 5 && game.achievements <= 10) ||
          (selectedFilter === 'low' && game.achievements <= 5)
        )
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'playtime':
          return b.playtime.localeCompare(a.playtime)
        case 'achievement':
          return b.achievements - a.achievements
        default:
          return 0
      }
    })

  const filterOptions = getFilterOptions()

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-neutral-400" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 sm:pl-10 bg-white/5 border-white/10 text-white placeholder:text-neutral-400 text-sm sm:text-base"
              />
            </div>
            
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full sm:w-36 bg-white/5 border-white/10 text-lime-300 text-sm sm:text-base">
                <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                {filterOptions.map(option => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSort} onValueChange={(value) => setSelectedSort(value as typeof selectedSort)}>
              <SelectTrigger className="w-full sm:w-36 bg-white/5 border-white/10 text-lime-300 text-sm sm:text-base">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="playtime">Playtime</SelectItem>
                <SelectItem value="achievement">Achievements</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-1 sm:gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700 h-8 w-8 sm:h-9 sm:w-9 p-0"
            >
              <Grid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="bg-neutral-800 border-neutral-700 text-lime-300 hover:bg-neutral-700 h-8 w-8 sm:h-9 sm:w-9 p-0"
            >
              <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{games.length}</div>
            <div className="text-xs sm:text-sm text-neutral-400">Total Games</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {games.filter(g => g.status === 'active').length}
            </div>
            <div className="text-xs sm:text-sm text-neutral-400">Active</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {games.reduce((sum, game) => sum + game.achievements, 0)}
            </div>
            <div className="text-xs sm:text-sm text-neutral-400">Achievements</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {games.filter(g => g.rank).length}
            </div>
            <div className="text-xs sm:text-sm text-neutral-400">Ranked</div>
          </div>
        </div>
      )}

      {/* Games Grid/List */}
      {filteredAndSortedGames.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-neutral-400 mb-2">No games found</div>
          <div className="text-sm text-neutral-500">
            Try adjusting your search or filter criteria
          </div>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            : "space-y-3 sm:space-y-4"
        }>
          {filteredAndSortedGames.map((game) => (
            <GameProfileCard 
              key={game.id} 
              game={game}
              className={viewMode === 'list' ? "max-w-none" : ""}
            />
          ))}
        </div>
      )}
    </div>
  )
}

