import { useEffect, useState, type ReactNode } from 'react'

type RingProps = {
  size?: number
  stroke?: number
  progress: number
  color?: string
  track?: string
  children?: ReactNode
  glow?: boolean
}

export function ProgressRing({
  size = 120,
  stroke = 10,
  progress,
  color = '#007AFF',
  track = '#ECEEF1',
  children,
  glow,
}: RingProps) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c * (1 - Math.min(1, Math.max(0, progress)))
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)', filter: glow ? `drop-shadow(0 0 6px ${color}99)` : undefined }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  )
}

export function useCountUp(target: number, duration = 900, active = true) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, active])
  return val
}
