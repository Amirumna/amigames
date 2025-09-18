'use client'

import { useCursorTrail } from '@/hooks/cursor-trail'

interface CursorTrailProps {
  color?: string
  trails?: number
  size?: number
  friction?: number
  dampening?: number
  tension?: number
  lineWidth?: number
}

export default function CursorTrail({
  color = 'rgba(106, 13, 173, 0.35)',
  trails = 20,
  size = 50,
  friction = 0.5,
  dampening = 0.25,
  tension = 0.98,
  lineWidth = 1,
}: CursorTrailProps) {
  const canvasRef = useCursorTrail({
    color,
    trails,
    size,
    friction,
    dampening,
    tension,
    lineWidth,
  })

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  )
}
