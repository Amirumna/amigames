'use client'

import { useEffect, useRef } from 'react'

interface CursorTrailOptions {
  trails?: number
  size?: number
  friction?: number
  dampening?: number
  tension?: number
  spring?: number
  color?: string
  lineWidth?: number
}

class Node {
  x: number = 0
  y: number = 0
  vx: number = 0
  vy: number = 0
}

class Trail {
  spring: number
  friction: number
  nodes: Node[]

  constructor(
    spring: number,
    friction: number,
    size: number,
    initialPosition: { x: number; y: number }
  ) {
    this.spring = spring
    this.friction = friction
    this.nodes = Array.from({ length: size }, () => {
      const node = new Node()
      node.x = initialPosition.x
      node.y = initialPosition.y
      return node
    })
  }

  update(
    cursorPosition: { x: number; y: number },
    dampening: number,
    tension: number
  ): void {
    let spring = this.spring
    let node = this.nodes[0]

    // Update first node based on cursor position
    node.vx += (cursorPosition.x - node.x) * spring
    node.vy += (cursorPosition.y - node.y) * spring

    // Update subsequent nodes
    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i]

      if (i > 0) {
        const prev = this.nodes[i - 1]
        node.vx += (prev.x - node.x) * spring
        node.vy += (prev.y - node.y) * spring
        node.vx += prev.vx * dampening
        node.vy += prev.vy * dampening
      }

      node.vx *= this.friction
      node.vy *= this.friction
      node.x += node.vx
      node.y += node.vy
      spring *= tension
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const [first, ...rest] = this.nodes
    ctx.beginPath()
    ctx.moveTo(first.x, first.y)

    for (let i = 1; i < rest.length - 1; i++) {
      const current = rest[i]
      const next = rest[i + 1]
      const xc = (current.x + next.x) * 0.5
      const yc = (current.y + next.y) * 0.5
      ctx.quadraticCurveTo(current.x, current.y, xc, yc)
    }

    const last = rest[rest.length - 1]
    const secondLast = rest[rest.length - 2]
    if (secondLast && last) {
      ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y)
    }

    ctx.stroke()
    ctx.closePath()
  }
}

export function useCursorTrail(options: CursorTrailOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trails = useRef<Trail[]>([])
  const cursorPosition = useRef({ x: 0, y: 0 })
  const animationFrame = useRef<number | null>(null)
  const isRunning = useRef(true)

  const {
    trails: trailCount = 20,
    size = 50,
    friction = 0.5,
    dampening = 0.25,
    tension = 0.98,
    color = 'rgba(106, 13, 173, 0.35)',
    lineWidth = 1,
  } = options

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initTrails = () => {
      trails.current = Array.from({ length: trailCount }, (_, i) => {
        const spring = 0.45 + (i / trailCount) * 0.025
        return new Trail(spring, friction, size, cursorPosition.current)
      })
    }

    const render = () => {
      if (!ctx || !isRunning.current) return

      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth

      trails.current.forEach(trail => {
        trail.update(cursorPosition.current, dampening, tension)
        trail.draw(ctx)
      })

      animationFrame.current = requestAnimationFrame(render)
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorPosition.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        cursorPosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        }
      }
    }

    resizeCanvas()
    initTrails()
    render()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('focus', () => {
      isRunning.current = true
      render()
    })
    window.addEventListener('blur', () => {
      isRunning.current = false
    })

    return () => {
      isRunning.current = false
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [color, dampening, friction, lineWidth, size, tension, trailCount])

  return canvasRef
}
