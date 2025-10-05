export interface GameProfile {
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
  releaseDate?: string
  developer?: string
  publisher?: string
  platforms?: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  game: string
  date: string
  category: 'level' | 'rank' | 'completion' | 'competitive'
  points?: number
  screenshot?: string
}

export interface GamingStats {
  totalGames: number
  totalPlaytime: string
  currentLevel: number
  favoriteGenre: string
  gamingYears: number
  totalAchievements: number
  currentRank?: string
  favoriteGame: string
}

export interface GamingStatus {
  currentGame: string
  status: 'online' | 'offline' | 'away'
  lastActivity: string
  sessionTime?: string
  server?: string
}

export interface Character {
  id: string
  name: string
  rarity: number
  level: number
  element?: string
  weapon?: string
  image: string
  build?: CharacterBuild
}

export interface CharacterBuild {
  weapon: string
  artifacts: string[]
  talents: {
    normal: number
    skill: number
    burst: number
  }
  stats: {
    attack: number
    defense: number
    hp: number
    critRate: number
    critDamage: number
  }
}

export interface TeamComposition {
  id: string
  name: string
  characters: Character[]
  description: string
  useCase: string
  effectiveness: number
}

export interface GameReview {
  game: string
  rating: number
  pros: string[]
  cons: string[]
  summary: string
  playtime: string
  completionStatus: 'completed' | 'in-progress' | 'dropped'
  recommendation: boolean
  date: string
}

export interface GamingSetup {
  hardware: {
    smartphone: string
    laptop: string
    desktop?: string
    peripherals: string[]
  }
  software: {
    games: string[]
    tools: string[]
    streaming?: string[]
  }
  optimization: {
    performance: string[]
    settings: string[]
    tips: string[]
  }
}

