const GENSHIN_API_BASE = 'https://genshin.dev/api'
const GENSHIN_IMAGE_API_BASE = 'https://genshin.jmp.blue'

export interface GenshinCharacter {
  name: string
  title: string
  vision: string
  weapon: string
  nation: string
  affiliation: string
  rarity: number
  constellation: string
  birthday: string
  description: string
  skillTalents: Array<{
    name: string
    unlock: string
    description: string
    type: string
  }>
  passiveTalents: Array<{
    name: string
    unlock: string
    description: string
    level: number
  }>
  constellations: Array<{
    name: string
    unlock: string
    description: string
    level: number
  }>
  vision_key: string
  weapon_type: string
}

export interface GenshinWeapon {
  name: string
  type: string
  rarity: number
  baseAttack: number
  subStat: string
  passiveName: string
  passiveDesc: string
  location: string
  ascensionMaterial: string
}

export interface GenshinArtifact {
  name: string
  max_rarity: number
  min_rarity: number
  effect_1pc: string
  effect_2pc: string
  effect_4pc: string
  flower: {
    name: string
    relictype: string
    description: string
  }
  plume: {
    name: string
    relictype: string
    description: string
  }
  sands: {
    name: string
    relictype: string
    description: string
  }
  goblet: {
    name: string
    relictype: string
    description: string
  }
  circlet: {
    name: string
    relictype: string
    description: string
  }
}

export interface TeamComposition {
  id: string
  name: string
  description: string
  characters: string[]
  roles: string[]
  synergies: string[]
  recommended: boolean
}

export interface CharacterStats {
  level: number
  ascension: number
  hp: number
  attack: number
  defense: number
  crit_rate: number
  crit_damage: number
  elemental_mastery: number
  energy_recharge: number
  elemental_damage_bonus: number
  healing_bonus: number
  incoming_healing_bonus: number
  shield_strength: number
  cd_reduction: number
  stamina_cost: number
  stamina_recovery: number
}

export async function getAllCharacters(): Promise<GenshinCharacter[]> {
  try {
    const response = await fetch(`${GENSHIN_API_BASE}/characters`)
    if (!response.ok) throw new Error('Failed to fetch characters')
    return await response.json()
  } catch (error) {
    console.error('Error fetching characters:', error)
    return []
  }
}

// Add this helper above your existing exports
function resolveSlug(name: string) {
  const mapped = CHARACTER_NAME_MAP[name] ?? name
  return mapped
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export async function getCharacter(name: string): Promise<GenshinCharacter | null> {
  try {
    const slug = resolveSlug(name)
    const response = await fetch(`${GENSHIN_API_BASE}/characters/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch character')
    return await response.json()
  } catch (error) {
    console.error(`Error fetching character ${name}:`, error)
    return null
  }
}

export async function getWeapon(name: string): Promise<GenshinWeapon | null> {
  try {
    const slug = resolveSlug(name)
    const response = await fetch(`${GENSHIN_API_BASE}/weapons/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch weapon')
    return await response.json()
  } catch (error) {
    console.error(`Error fetching weapon ${name}:`, error)
    return null
  }
}

export async function getArtifact(name: string): Promise<GenshinArtifact | null> {
  try {
    const slug = resolveSlug(name)
    const response = await fetch(`${GENSHIN_API_BASE}/artifacts/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch artifact')
    return await response.json()
  } catch (error) {
    console.error(`Error fetching artifact ${name}:`, error)
    return null
  }
}
}

export const CHARACTER_NAME_MAP: Record<string, string> = {
  'Tighnari': 'tighnari',
  'Kazuha': 'kazuha',
  'Kaedehara Kazuha': 'kazuha',
  'Hu Tao': 'hu-tao',
  'Pengembara': 'traveler',
  'Ayaka': 'ayaka',
  'Kamisato Ayaka': 'ayaka',
  'Navia': 'navia',
  'Eula': 'eula',
  'Bennett': 'bennett',
  'Furina': 'furina',
  'Qiqi': 'qiqi',
  'Neuvillette': 'neuvillette',
  'Kamisato Ayato': 'ayato',
  'Kujou Sara': 'sara',
  'Gorou': 'gorou',
  'Kaeya': 'kaeya',
  'Barbara': 'barbara',
  'Dehya': 'dehya',
  'Keqing': 'keqing',
  'Kirara': 'kirara',
  'Gaming': 'gaming',
  'Chevreuse': 'chevreuse',
  'Charlotte': 'charlotte',
  'Freminet': 'freminet',
  'Lynette': 'lynette',
  'Kaveh': 'kaveh',
  'Mika': 'mika',
  'Yaoyao': 'yaoyao',
  'Faruzan': 'faruzan',
  'Dori': 'dori',
  'Collei': 'collei',
  'Kuki Shinobu': 'kuki',
  'Shikanoin Heizou': 'heizou',
  'Sayu': 'sayu',
  'Thoma': 'thoma',
  'Rosaria': 'rosaria',
  'Sucrose': 'sucrose',
  'Diona': 'diona',
  'Chongyun': 'chongyun',
  'Noelle': 'noelle',
  'Ningguang': 'ningguang',
  'Xingqiu': 'xingqiu',
  'Beidou': 'beidou',
  'Xiangling': 'xiangling',
  'Amber': 'amber',
  'Razor': 'razor',
  'Lisa': 'lisa',
  'Layla': 'layla',
  'Candace': 'candace',
  'Aloy': 'aloy',
  'Mona': 'mona',
  'Klee': 'klee',
  'Xinyan': 'xinyan',
  'Fischl': 'fischl',
  'Yumemizuki Mizuki': 'mizuki',
  'Dahlia': 'dahlia'
}

export function getCharacterImageUrl(characterName: string, type: 'portrait' | 'icon' | 'card' = 'portrait'): string {
  const mappedName = CHARACTER_NAME_MAP[characterName] || characterName.toLowerCase().replace(/ /g, '-')
  return `${GENSHIN_IMAGE_API_BASE}/characters/${mappedName}/${type}`
}

export function getCharacterPortrait(characterName: string): string {
  return getCharacterImageUrl(characterName, 'portrait')
}

export function getCharacterIcon(characterName: string): string {
  return getCharacterImageUrl(characterName, 'icon')
}

export function getCharacterCard(characterName: string): string {
  return getCharacterImageUrl(characterName, 'card')
}

export function getCharacterImageWithFallback(characterName: string, type: 'portrait' | 'icon' | 'card' = 'portrait'): string {
  const apiImage = getCharacterImageUrl(characterName, type)
  const fallbackImage = `/images/genshin-characters/${characterName.toLowerCase().replace(/ /g, '-')}.svg`
  
  return apiImage
}

export async function getSmartCharacterImage(characterName: string, type: 'portrait' | 'icon' | 'card' = 'portrait'): Promise<string> {
  const apiImage = getCharacterImageUrl(characterName, type)
  const fallbackImage = `/images/genshin-characters/${characterName.toLowerCase().replace(/ /g, '-')}.svg`
  
  try {
    const response = await fetch(apiImage, { method: 'HEAD' })
    if (response.ok) {
      return apiImage
    }
  } catch (error) {
    console.log(`API image not available for ${characterName}, using fallback`)
  }
  
  return fallbackImage
}

export const MAIN_TEAM: TeamComposition = {
  id: 'main-team',
  name: 'Main Team',
  description: 'My primary team composition for most content',
  characters: ['Hu Tao', 'Kazuha', 'Ayaka', 'Tighnari'],
  roles: ['Main DPS', 'Support/Sub-DPS', 'Sub-DPS', 'Sub-DPS'],
  synergies: [
    'Hu Tao + Xingqiu: Vaporize reactions',
    'Kazuha + Ayaka: Freeze team support',
    'Tighnari + Dendro reactions',
    'Overall: Versatile elemental coverage'
  ],
  recommended: true
}