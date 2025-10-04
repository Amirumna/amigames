'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getCharacterPortrait } from '@/lib/genshin-api'

interface GenshinCharacterImageProps {
  characterName: string
  alt: string
  width: number
  height: number
  className?: string
}

export function GenshinCharacterImage({ 
  characterName, 
  alt, 
  width, 
  height, 
  className 
}: GenshinCharacterImageProps) {
  const [imageError, setImageError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(getCharacterPortrait(characterName))
  
  const fallbackSrc = `/images/genshin-characters/${characterName.toLowerCase().replace(/ /g, '-')}.svg`
  
  const handleError = () => {
    if (!imageError) {
      setImageError(true)
      setCurrentSrc(fallbackSrc)
    }
  }
  
  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  )
}