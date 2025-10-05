import { GameProfile, Achievement, GamingStats, GamingStatus, Character, TeamComposition, GameReview, GamingSetup } from './gaming-types'

export const gamingStats: GamingStats = {
  totalGames: 15,
  totalPlaytime: "2000+ hours",
  currentLevel: 99,
  favoriteGenre: "RPG",
  gamingYears: 10,
  totalAchievements: 150,
  currentRank: "Diamond",
  favoriteGame: "Genshin Impact"
}

export const gamingStatus: GamingStatus = {
  currentGame: "Wuthering Waves",
  status: "online",
  lastActivity: "2 hours ago",
  sessionTime: "3h 45m",
  server: "NA"
}

export const gameProfiles: GameProfile[] = [
  {
    id: "genshin-impact",
    name: "Genshin Impact",
    slug: "genshin-impact",
    level: 60,
    rank: "AR 60",
    playtime: "800+ hours",
    status: "active",
    achievements: 45,
    description: "Open-world action RPG with elemental combat system. Reached maximum Adventure Rank 60.",
    image: "/images/genshin.png",
    genre: ["RPG", "Action", "Adventure"],
    lastPlayed: "Today",
    progress: 100,
    releaseDate: "2020-09-28",
    developer: "miHoYo",
    publisher: "miHoYo",
    platforms: ["PC", "Mobile", "PlayStation"]
  },
  {
    id: "wuthering-waves",
    name: "Wuthering Waves",
    slug: "wuthering-waves",
    level: 90,
    rank: "Union Level 90",
    playtime: "300+ hours",
    status: "active",
    achievements: 25,
    description: "Post-apocalyptic action RPG with dynamic combat and exploration. Mastered all game mechanics.",
    image: "/images/wuwa.png",
    genre: ["RPG", "Action", "Post-apocalyptic"],
    lastPlayed: "Currently playing",
    progress: 85,
    releaseDate: "2024-05-22",
    developer: "Kuro Games",
    publisher: "Kuro Games",
    platforms: ["PC", "Mobile"]
  },
  {
    id: "honkai-star-rail",
    name: "Honkai: Star Rail",
    slug: "honkai-star-rail",
    level: 70,
    rank: "Trailblaze Level 70",
    playtime: "400+ hours",
    status: "active",
    achievements: 30,
    description: "Turn-based RPG set in the Honkai universe. Completed all story content and events.",
    image: "/images/hsr.png",
    genre: ["RPG", "Turn-based", "Sci-fi"],
    lastPlayed: "Yesterday",
    progress: 90,
    releaseDate: "2023-04-26",
    developer: "miHoYo",
    publisher: "miHoYo",
    platforms: ["PC", "Mobile", "PlayStation"]
  },
  {
    id: "valorant",
    name: "Valorant",
    slug: "valorant",
    level: 50,
    rank: "Diamond",
    playtime: "200+ hours",
    status: "active",
    achievements: 15,
    description: "Tactical FPS with unique agent abilities. Achieved Diamond rank in competitive play.",
    image: "/images/valorant.png",
    genre: ["FPS", "Tactical", "Competitive"],
    lastPlayed: "3 days ago",
    progress: 75,
    releaseDate: "2020-06-02",
    developer: "Riot Games",
    publisher: "Riot Games",
    platforms: ["PC"]
  },
  {
    id: "honkai-impact-3rd",
    name: "Honkai Impact 3rd",
    slug: "honkai-impact-3rd",
    level: 88,
    playtime: "150+ hours",
    status: "paused",
    achievements: 20,
    description: "Action RPG with fast-paced combat and compelling story. Taking a break from active play.",
    image: "/images/hi3.png",
    genre: ["RPG", "Action", "Sci-fi"],
    lastPlayed: "1 week ago",
    progress: 60,
    releaseDate: "2016-10-14",
    developer: "miHoYo",
    publisher: "miHoYo",
    platforms: ["PC", "Mobile"]
  },
  {
    id: "mobile-legends",
    name: "Mobile Legends",
    slug: "mobile-legends",
    level: 30,
    rank: "Mythic",
    playtime: "100+ hours",
    status: "paused",
    achievements: 10,
    description: "Mobile MOBA with strategic team battles. Achieved Mythic rank in ranked matches.",
    image: "/images/mlbb.png",
    genre: ["MOBA", "Mobile", "Strategy"],
    lastPlayed: "2 weeks ago",
    progress: 40,
    releaseDate: "2016-07-11",
    developer: "Moonton",
    publisher: "Moonton",
    platforms: ["Mobile"]
  }
]

export const achievements: Achievement[] = [
  {
    id: "genshin-ar60",
    title: "Adventure Rank 60",
    description: "Reached the maximum Adventure Rank in Genshin Impact",
    icon: "⭐",
    rarity: "legendary",
    game: "Genshin Impact",
    date: "2024-01-15",
    category: "level",
    points: 1000
  },
  {
    id: "wuwa-union90",
    title: "Union Level 90",
    description: "Mastered all game mechanics in Wuthering Waves",
    icon: "🌊",
    rarity: "legendary",
    game: "Wuthering Waves",
    date: "2024-06-20",
    category: "level",
    points: 1000
  },
  {
    id: "hsr-trailblaze70",
    title: "Trailblaze Level 70",
    description: "Completed all story content in Honkai: Star Rail",
    icon: "🚀",
    rarity: "epic",
    game: "Honkai: Star Rail",
    date: "2024-03-10",
    category: "completion",
    points: 750
  },
  {
    id: "valorant-diamond",
    title: "Diamond Rank",
    description: "Achieved Diamond rank in Valorant competitive play",
    icon: "🎯",
    rarity: "epic",
    game: "Valorant",
    date: "2024-02-28",
    category: "competitive",
    points: 800
  },
  {
    id: "genshin-spiral-abyss",
    title: "Spiral Abyss Master",
    description: "Completed all floors of the Spiral Abyss",
    icon: "⚔️",
    rarity: "rare",
    game: "Genshin Impact",
    date: "2023-12-05",
    category: "completion",
    points: 500
  },
  {
    id: "wuwa-boss-master",
    title: "Boss Master",
    description: "Defeated all challenging bosses in Wuthering Waves",
    icon: "👹",
    rarity: "rare",
    game: "Wuthering Waves",
    date: "2024-05-30",
    category: "completion",
    points: 600
  }
]

export const genshinCharacters: Character[] = [
  {
    id: "raiden-shogun",
    name: "Raiden Shogun",
    rarity: 5,
    level: 90,
    element: "Electro",
    weapon: "Polearm",
    image: "/images/genshin.png",
    build: {
      weapon: "Engulfing Lightning",
      artifacts: ["Emblem of Severed Fate"],
      talents: {
        normal: 10,
        skill: 10,
        burst: 10
      },
      stats: {
        attack: 2500,
        defense: 800,
        hp: 18000,
        critRate: 75,
        critDamage: 150
      }
    }
  },
  {
    id: "zhongli",
    name: "Zhongli",
    rarity: 5,
    level: 90,
    element: "Geo",
    weapon: "Polearm",
    image: "/images/genshin.png"
  },
  {
    id: "venti",
    name: "Venti",
    rarity: 5,
    level: 90,
    element: "Anemo",
    weapon: "Bow",
    image: "/images/genshin.png"
  }
]

export const teamCompositions: TeamComposition[] = [
  {
    id: "raiden-national",
    name: "Raiden National",
    characters: genshinCharacters.slice(0, 3),
    description: "High damage team with Raiden Shogun as main DPS",
    useCase: "Spiral Abyss, Boss Fights",
    effectiveness: 95
  }
]

export const gameReviews: GameReview[] = [
  {
    game: "Genshin Impact",
    rating: 9.5,
    pros: [
      "Beautiful open world",
      "Engaging combat system",
      "Regular content updates",
      "Free-to-play friendly"
    ],
    cons: [
      "Gacha system can be expensive",
      "Repetitive endgame content"
    ],
    summary: "An exceptional open-world RPG that sets the standard for mobile gaming. The elemental combat system is innovative and the world is absolutely stunning.",
    playtime: "800+ hours",
    completionStatus: "completed",
    recommendation: true,
    date: "2024-01-15"
  },
  {
    game: "Wuthering Waves",
    rating: 8.8,
    pros: [
      "Dynamic combat system",
      "Post-apocalyptic setting",
      "Character customization",
      "Smooth gameplay"
    ],
    cons: [
      "Limited content at launch",
      "Some technical issues"
    ],
    summary: "A promising action RPG with excellent combat mechanics and a unique post-apocalyptic world. Great potential for future updates.",
    playtime: "300+ hours",
    completionStatus: "in-progress",
    recommendation: true,
    date: "2024-06-20"
  }
]

export const gamingSetup: GamingSetup = {
  hardware: {
    smartphone: "HUAWEI NOVA 7I",
    laptop: "ASUS TUF GAMING F15",
    peripherals: ["Gaming Mouse", "Mechanical Keyboard", "Gaming Headset"]
  },
  software: {
    games: ["Genshin Impact", "Wuthering Waves", "Honkai: Star Rail", "Valorant"],
    tools: ["Discord", "OBS Studio", "MSI Afterburner"],
    streaming: ["OBS Studio", "Streamlabs"]
  },
  optimization: {
    performance: [
      "High FPS settings for competitive games",
      "Balanced settings for RPGs",
      "Mobile optimization for battery life"
    ],
    settings: [
      "144Hz monitor for smooth gameplay",
      "Low latency mouse and keyboard",
      "High-quality audio setup"
    ],
    tips: [
      "Regular driver updates",
      "System optimization for gaming",
      "Network optimization for online play"
    ]
  }
}

