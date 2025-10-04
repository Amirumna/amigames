import { getCharacterIcon } from './genshin-api'

export interface PersonalCharacter {
  name: string
  level: number
  constellation: number
  rarity: 4 | 5
  vision: string
  weapon: string
  friendship: number
  isOwned: boolean
  image: string
}

export interface PersonalStats {
  adventureRank: number
  server: string
  uid: string
  activeDays: number
  achievements: number
  charactersObtained: number
  maxFriendship: number
  spiralAbyss: string
  waypointsActivated: number
  domainsUnlocked: number
  lunoculus: number
  oculi: {
    anemoculus: number
    geoculus: number
    electroculus: number
    dendroculus: number
    hydroculus: number
    pyroculus: number
  }
  chests: {
    luxurious: number
    precious: number
    exquisite: number
    common: number
    remarkable: number
  }
}

export const personalStats: PersonalStats = {
  adventureRank: 57,
  server: "Asia",
  uid: "877278839",
  activeDays: 339,
  achievements: 775,
  charactersObtained: 52,
  maxFriendship: 5,
  spiralAbyss: "8-3",
  waypointsActivated: 490,
  domainsUnlocked: 58,
  lunoculus: 0,
  oculi: {
    anemoculus: 66,
    geoculus: 130,
    electroculus: 163,
    dendroculus: 139,
    hydroculus: 236,
    pyroculus: 28
  },
  chests: {
    luxurious: 155,
    precious: 396,
    exquisite: 1235,
    common: 1604,
    remarkable: 127
  }
}

export const personalCharacters: PersonalCharacter[] = [
  { name: "Tighnari", level: 90, constellation: 2, rarity: 5, vision: "Dendro", weapon: "Bow", friendship: 10, isOwned: true, image: getCharacterIcon('Tighnari') },
  { name: "Kaedehara Kazuha", level: 90, constellation: 0, rarity: 5, vision: "Anemo", weapon: "Sword", friendship: 10, isOwned: true, image: getCharacterIcon('Kaedehara Kazuha') },
  { name: "Hu Tao", level: 90, constellation: 0, rarity: 5, vision: "Pyro", weapon: "Polearm", friendship: 10, isOwned: true, image: getCharacterIcon('Hu Tao') },
  { name: "Kamisato Ayaka", level: 90, constellation: 0, rarity: 5, vision: "Cryo", weapon: "Sword", friendship: 10, isOwned: true, image: getCharacterIcon('Kamisato Ayaka') },
  { name: "Navia", level: 80, constellation: 0, rarity: 5, vision: "Geo", weapon: "Claymore", friendship: 8, isOwned: true, image: getCharacterIcon('Navia') },
  { name: "Eula", level: 80, constellation: 0, rarity: 5, vision: "Cryo", weapon: "Claymore", friendship: 8, isOwned: true, image: getCharacterIcon('Eula') },
  { name: "Bennett", level: 80, constellation: 3, rarity: 4, vision: "Pyro", weapon: "Sword", friendship: 8, isOwned: true, image: getCharacterIcon('Bennett') },
  { name: "Furina", level: 70, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Sword", friendship: 7, isOwned: true, image: getCharacterIcon('Furina') },
  { name: "Qiqi", level: 70, constellation: 0, rarity: 5, vision: "Cryo", weapon: "Sword", friendship: 7, isOwned: true, image: getCharacterIcon('Qiqi') },
  { name: "Neuvillette", level: 60, constellation: 2, rarity: 5, vision: "Hydro", weapon: "Catalyst", friendship: 6, isOwned: true, image: getCharacterIcon('Neuvillette') },
  { name: "Kamisato Ayato", level: 60, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Sword", friendship: 6, isOwned: true, image: getCharacterIcon('Kamisato Ayato') },
  { name: "Kujou Sara", level: 60, constellation: 1, rarity: 4, vision: "Electro", weapon: "Bow", friendship: 6, isOwned: true, image: getCharacterIcon('Kujou Sara') },
  { name: "Gorou", level: 60, constellation: 0, rarity: 4, vision: "Geo", weapon: "Bow", friendship: 6, isOwned: true, image: getCharacterIcon('Gorou') },
  { name: "Kaeya", level: 60, constellation: 1, rarity: 4, vision: "Cryo", weapon: "Sword", friendship: 6, isOwned: true, image: getCharacterIcon('Kaeya') },
  { name: "Barbara", level: 60, constellation: 2, rarity: 4, vision: "Hydro", weapon: "Catalyst", friendship: 6, isOwned: true, image: getCharacterIcon('Barbara') },
  { name: "Dehya", level: 50, constellation: 0, rarity: 5, vision: "Pyro", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Dehya') },
  { name: "Keqing", level: 50, constellation: 0, rarity: 5, vision: "Electro", weapon: "Sword", friendship: 5, isOwned: true, image: getCharacterIcon('Keqing') },
  { name: "Kirara", level: 50, constellation: 2, rarity: 4, vision: "Dendro", weapon: "Sword", friendship: 5, isOwned: true, image: getCharacterIcon('Kirara') },
  { name: "Gaming", level: 50, constellation: 2, rarity: 4, vision: "Pyro", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Gaming') },
  { name: "Chevreuse", level: 50, constellation: 4, rarity: 4, vision: "Pyro", weapon: "Polearm", friendship: 5, isOwned: true, image: getCharacterIcon('Chevreuse') },
  { name: "Charlotte", level: 50, constellation: 2, rarity: 4, vision: "Cryo", weapon: "Catalyst", friendship: 5, isOwned: true, image: getCharacterIcon('Charlotte') },
  { name: "Freminet", level: 50, constellation: 5, rarity: 4, vision: "Cryo", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Freminet') },
  { name: "Lynette", level: 50, constellation: 2, rarity: 4, vision: "Anemo", weapon: "Sword", friendship: 5, isOwned: true, image: getCharacterIcon('Lynette') },
  { name: "Kaveh", level: 50, constellation: 2, rarity: 4, vision: "Dendro", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Kaveh') },
  { name: "Mika", level: 50, constellation: 1, rarity: 4, vision: "Cryo", weapon: "Polearm", friendship: 5, isOwned: true, image: getCharacterIcon('Mika') },
  { name: "Yaoyao", level: 50, constellation: 3, rarity: 4, vision: "Dendro", weapon: "Polearm", friendship: 5, isOwned: true, image: getCharacterIcon('Yaoyao') },
  { name: "Faruzan", level: 50, constellation: 2, rarity: 4, vision: "Anemo", weapon: "Bow", friendship: 5, isOwned: true, image: getCharacterIcon('Faruzan') },
  { name: "Dori", level: 50, constellation: 0, rarity: 4, vision: "Electro", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Dori') },
  { name: "Collei", level: 50, constellation: 3, rarity: 4, vision: "Dendro", weapon: "Bow", friendship: 5, isOwned: true, image: getCharacterIcon('Collei') },
  { name: "Kuki Shinobu", level: 50, constellation: 2, rarity: 4, vision: "Electro", weapon: "Sword", friendship: 5, isOwned: true, image: getCharacterIcon('Kuki-Shinobu') },
  { name: "Shikanoin Heizou", level: 50, constellation: 0, rarity: 4, vision: "Anemo", weapon: "Catalyst", friendship: 5, isOwned: true, image: getCharacterIcon('Shikanoin-Heizou') },
  { name: "Sayu", level: 50, constellation: 0, rarity: 4, vision: "Anemo", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Sayu') },
  { name: "Thoma", level: 50, constellation: 2, rarity: 4, vision: "Pyro", weapon: "Polearm", friendship: 5, isOwned: true, image: getCharacterIcon('Thoma') },
  { name: "Rosaria", level: 50, constellation: 5, rarity: 4, vision: "Cryo", weapon: "Polearm", friendship: 5, isOwned: true, image: getCharacterIcon('Rosaria') },
  { name: "Sucrose", level: 50, constellation: 2, rarity: 4, vision: "Anemo", weapon: "Catalyst", friendship: 5, isOwned: true, image: getCharacterIcon('Sucrose') },
  { name: "Diona", level: 50, constellation: 3, rarity: 4, vision: "Cryo", weapon: "Bow", friendship: 5, isOwned: true, image: getCharacterIcon('Diona') },
  { name: "Chongyun", level: 50, constellation: 0, rarity: 4, vision: "Cryo", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Chongyun') },
  { name: "Noelle", level: 50, constellation: 2, rarity: 4, vision: "Geo", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Noelle') },
  { name: "Ningguang", level: 50, constellation: 6, rarity: 4, vision: "Geo", weapon: "Catalyst", friendship: 5, isOwned: true, image: getCharacterIcon('Ningguang') },
  { name: "Xingqiu", level: 50, constellation: 6, rarity: 4, vision: "Hydro", weapon: "Sword", friendship: 5, isOwned: true, image: getCharacterIcon('Xingqiu') },
  { name: "Beidou", level: 50, constellation: 1, rarity: 4, vision: "Electro", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Beidou') },
  { name: "Xiangling", level: 50, constellation: 4, rarity: 4, vision: "Pyro", weapon: "Polearm", friendship: 5, isOwned: true, image: getCharacterIcon('Xiangling') },
  { name: "Amber", level: 50, constellation: 2, rarity: 4, vision: "Pyro", weapon: "Bow", friendship: 5, isOwned: true, image: getCharacterIcon('Amber') },
  { name: "Razor", level: 50, constellation: 6, rarity: 4, vision: "Electro", weapon: "Claymore", friendship: 5, isOwned: true, image: getCharacterIcon('Razor') },
  { name: "Lisa", level: 50, constellation: 0, rarity: 4, vision: "Electro", weapon: "Catalyst", friendship: 5, isOwned: true, image: getCharacterIcon('Lisa') },
  { name: "Layla", level: 20, constellation: 3, rarity: 4, vision: "Cryo", weapon: "Sword", friendship: 2, isOwned: true, image: getCharacterIcon('Layla') },
  { name: "Candace", level: 20, constellation: 2, rarity: 4, vision: "Hydro", weapon: "Polearm", friendship: 2, isOwned: true, image: getCharacterIcon('Candace') },
  { name: "Xinyan", level: 1, constellation: 0, rarity: 4, vision: "Pyro", weapon: "Claymore", friendship: 1, isOwned: true, image: getCharacterIcon('Xinyan') },
  { name: "Fischl", level: 1, constellation: 0, rarity: 4, vision: "Electro", weapon: "Bow", friendship: 1, isOwned: true, image: getCharacterIcon('Fischl') },
  { name: "Mona", level: 1, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Catalyst", friendship: 1, isOwned: true, image: getCharacterIcon('Mona') },
  { name: "Yumemizuki Mizuki", level: 1, constellation: 0, rarity: 4, vision: "Dendro", weapon: "Sword", friendship: 1, isOwned: true, image: getCharacterIcon('Yumemizuki-Mizuki') },
  { name: "Dahlia", level: 1, constellation: 0, rarity: 4, vision: "Hydro", weapon: "Sword", friendship: 1, isOwned: true, image: getCharacterIcon('Dahlia') },
  { name: "Zhongli", level: 0, constellation: 0, rarity: 5, vision: "Geo", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Zhongli') },
  { name: "Venti", level: 0, constellation: 0, rarity: 5, vision: "Anemo", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Venti') },
  { name: "Diluc", level: 0, constellation: 0, rarity: 5, vision: "Pyro", weapon: "Claymore", friendship: 0, isOwned: false, image: getCharacterIcon('Diluc') },
  { name: "Jean", level: 0, constellation: 0, rarity: 5, vision: "Anemo", weapon: "Sword", friendship: 0, isOwned: false, image: getCharacterIcon('Jean') },
  { name: "Albedo", level: 0, constellation: 0, rarity: 5, vision: "Geo", weapon: "Sword", friendship: 0, isOwned: false, image: getCharacterIcon('Albedo') },
  { name: "Ganyu", level: 0, constellation: 0, rarity: 5, vision: "Cryo", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Ganyu') },
  { name: "Xiao", level: 0, constellation: 0, rarity: 5, vision: "Anemo", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Xiao') },
  { name: "Tartaglia", level: 0, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Tartaglia') },
  { name: "Aloy", level: 0, constellation: 0, rarity: 5, vision: "Cryo", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Aloy') },
  { name: "Shenhe", level: 0, constellation: 0, rarity: 5, vision: "Cryo", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Shenhe') },
  { name: "Yae Miko", level: 0, constellation: 0, rarity: 5, vision: "Electro", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Yae Miko') },
  { name: "Raiden Shogun", level: 0, constellation: 0, rarity: 5, vision: "Electro", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Raiden') },
  { name: "Kokomi", level: 0, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Kokomi') },
  { name: "Arataki Itto", level: 0, constellation: 0, rarity: 5, vision: "Geo", weapon: "Claymore", friendship: 0, isOwned: false, image: getCharacterIcon('Arataki Itto') },
  { name: "Yelan", level: 0, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Yelan') },
  { name: "Cyno", level: 0, constellation: 0, rarity: 5, vision: "Electro", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Cyno') },
  { name: "Nilou", level: 0, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Sword", friendship: 0, isOwned: false, image: getCharacterIcon('Nilou') },
  { name: "Nahida", level: 0, constellation: 0, rarity: 5, vision: "Dendro", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Nahida') },
  { name: "Wanderer", level: 0, constellation: 0, rarity: 5, vision: "Anemo", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Wanderer') },
  { name: "Alhaitham", level: 0, constellation: 0, rarity: 5, vision: "Dendro", weapon: "Sword", friendship: 0, isOwned: false, image: getCharacterIcon('Alhaitham') },
  { name: "Baizhu", level: 0, constellation: 0, rarity: 5, vision: "Dendro", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Baizhu') },
  { name: "Lyney", level: 0, constellation: 0, rarity: 5, vision: "Pyro", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Lyney') },
  { name: "Wriothesley", level: 0, constellation: 0, rarity: 5, vision: "Cryo", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Wriothesley') },
  { name: "Arlecchino", level: 0, constellation: 0, rarity: 5, vision: "Pyro", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Arlecchino') },
  { name: "Clorinde", level: 0, constellation: 0, rarity: 5, vision: "Electro", weapon: "Sword", friendship: 0, isOwned: false, image: getCharacterIcon('Clorinde') },
  { name: "Sigewinne", level: 0, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Sigewinne') },
  { name: "Emilie", level: 0, constellation: 0, rarity: 5, vision: "Dendro", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Emilie') },
  { name: "Chiori", level: 0, constellation: 0, rarity: 5, vision: "Geo", weapon: "Sword", friendship: 0, isOwned: false, image: getCharacterIcon('Chiori') },
  { name: "Xianyun", level: 0, constellation: 0, rarity: 5, vision: "Anemo", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Xianyun') },
  { name: "Klee", level: 0, constellation: 0, rarity: 5, vision: "Pyro", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Klee') },
  { name: "Mualani", level: 0, constellation: 0, rarity: 5, vision: "Hydro", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Mualani') },
  { name: "Kinich", level: 0, constellation: 0, rarity: 5, vision: "Dendro", weapon: "Claymore", friendship: 0, isOwned: false, image: getCharacterIcon('Kinich') },
  { name: "Yoimiya", level: 0, constellation: 0, rarity: 5, vision: "Pyro", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Yoimiya') },
  { name: "Sethos", level: 0, constellation: 0, rarity: 4, vision: "Electro", weapon: "Bow", friendship: 0, isOwned: false, image: getCharacterIcon('Sethos') },
  { name: "Yanfei", level: 0, constellation: 0, rarity: 4, vision: "Pyro", weapon: "Catalyst", friendship: 0, isOwned: false, image: getCharacterIcon('Yanfei') },
  { name: "Yun Jin", level: 0, constellation: 0, rarity: 4, vision: "Geo", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Yun Jin') },
  { name: "Kachina", level: 0, constellation: 0, rarity: 4, vision: "Pyro", weapon: "Polearm", friendship: 0, isOwned: false, image: getCharacterIcon('Kachina') },
]

export function getCharactersByLevel(level: number): PersonalCharacter[] {
  return personalCharacters.filter(char => char.level === level)
}

export function getCharactersByRarity(rarity: 4 | 5): PersonalCharacter[] {
  return personalCharacters.filter(char => char.rarity === rarity)
}

export function getCharactersByVision(vision: string): PersonalCharacter[] {
  return personalCharacters.filter(char => char.vision === vision)
}

export function getMaxLevelCharacters(): PersonalCharacter[] {
  return personalCharacters.filter(char => char.level === 90)
}

export function getConstellationCharacters(): PersonalCharacter[] {
  return personalCharacters.filter(char => char.constellation > 0)
}

export interface WorldExploration {
  region: string
  explorationProgress: number
  statueLevel?: number
  reputationLevel?: number
  specialLevel?: number
  specialName?: string
  subAreas?: {
    name: string
    progress: number
  }[]
  backgroundImage?: string
  icon?: string
}

export const worldExploration: WorldExploration[] = [
  {
    region: "Natlan",
    explorationProgress: 9,
    statueLevel: 2,
    icon: "🔥"
  },
  {
    region: "Sea of Bygone Eras",
    explorationProgress: 100,
    icon: "🌊"
  },
  {
    region: "Chenyu Vale",
    explorationProgress: 74,
    specialLevel: 10,
    specialName: "Rainjade Oblation",
    subAreas: [
      { name: "Upper Vale", progress: 74 },
      { name: "Southern Mountain", progress: 58.7 },
      { name: "Mt. Laixin", progress: 69.7 }
    ],
    icon: "🏔️"
  },
  {
    region: "Fontaine",
    explorationProgress: 80,
    statueLevel: 9,
    specialLevel: 38,
    specialName: "Fountain of Lucine",
    reputationLevel: 10,
    icon: "💧"
  },
  {
    region: "Sumeru",
    explorationProgress: 49,
    statueLevel: 6,
    specialLevel: 21,
    specialName: "Tree of Dreams",
    reputationLevel: 10,
    subAreas: [
      { name: "Kolam Amrita", progress: 6 }
    ],
    icon: "🌳"
  },
  {
    region: "Chasm",
    explorationProgress: 53,
    specialLevel: 10,
    specialName: "Lumenstone Adjuvant",
    subAreas: [
      { name: "Underground Mines", progress: 100 }
    ],
    icon: "⛏️"
  },
  {
    region: "Enkanomiya",
    explorationProgress: 100,
    icon: "🌙"
  },
  {
    region: "Inazuma",
    explorationProgress: 85,
    statueLevel: 9,
    specialLevel: 43,
    specialName: "Sacred Sakura's Favor",
    reputationLevel: 10,
    icon: "⚡"
  },
  {
    region: "Dragonspine",
    explorationProgress: 100,
    specialLevel: 12,
    specialName: "Frostbearing Tree",
    icon: "❄️"
  },
  {
    region: "Liyue",
    explorationProgress: 72.6,
    statueLevel: 10,
    reputationLevel: 8,
    icon: "🏮"
  },
  {
    region: "Mondstadt",
    explorationProgress: 100,
    statueLevel: 10,
    reputationLevel: 8,
    icon: "🍃"
  },
  {
    region: "Nod-Krai",
    explorationProgress: 0,
    icon: "🌌"
  }
]
