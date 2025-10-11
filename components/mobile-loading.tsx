"use client"

import React, { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface MobileLoadingProps {
  message?: string
  spinnerSize?: number
  textSize?: string
  className?: string
}

export function MobileLoading({
  message = "Loading...",
  spinnerSize = 24,
  textSize = "text-sm",
  className = "",
}: MobileLoadingProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <Loader2 
        size={spinnerSize} 
        className={`animate-spin text-lime-400 ${isMobile ? 'mb-3' : 'mb-4'}`} 
      />
      <p className={`text-neutral-300 ${textSize} ${isMobile ? 'text-center px-4' : ''}`}>
        {message}
      </p>
    </div>
  )
}

interface MobileSkeletonProps {
  children: React.ReactNode
  isLoading: boolean
  fallback?: React.ReactNode
  className?: string
}

export function MobileSkeleton({
  children,
  isLoading,
  fallback = <MobileLoading />,
  className = "",
}: MobileSkeletonProps) {
  if (isLoading) {
    return <div className={className}>{fallback}</div>
  }
  return <>{children}</>
}

interface MobileTouchFeedbackProps {
  children: React.ReactNode
  onPress?: () => void
  className?: string
  activeClass?: string
  vibrateDuration?: number
}

export function MobileTouchFeedback({
  children,
  onPress,
  className = "",
  activeClass = "active:scale-95",
  vibrateDuration = 5,
}: MobileTouchFeedbackProps) {
  const handlePress = () => {
    if (onPress) {
      onPress()
    }
    if ('vibrate' in navigator && vibrateDuration > 0) {
      navigator.vibrate(vibrateDuration)
    }
  }

  return (
    <div
      className={`cursor-pointer transition-all duration-150 touch-manipulation ${activeClass} ${className}`}
      onClick={handlePress}
    >
      {children}
    </div>
  )
}
