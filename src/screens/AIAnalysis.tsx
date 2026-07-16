import { useEffect, useState } from 'react'
import { Screen } from '../components/Screen'
import { StepIndicator, Card } from '../components/ui'
import { COLORS, SHADOW } from '../design'
import { ProgressRing } from '../components/ProgressRing'
import { DropIcon, BoltIcon, SunIcon, HeartIcon, SparkleIcon, CheckIcon } from '../components/Icons'

type Props = { onComplete: () => void }

const STEPS = [
  { icon: <DropIcon size={18} />, label: 'Reading hydration markers' },
  { icon: <BoltIcon size={18} />, label: 'Analyzing electrolytes' },
  { icon: <SunIcon size={18} />, label: 'Calculating heat index' },
  { icon: <HeartIcon size={18} />, label: 'Estimating recovery score' },
  { icon: <SparkleIcon size={18} />, label: 'Generating AI recommendations' },
]

export function AIAnalysis({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(0)

  useEffect(() => {
    const total = 10000
    const t = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 0.9)
        return next
      })
    }, 90)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const stepTime = 2000
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setDone(i + 1), stepTime * (i + 1))
    )
    const finish = setTimeout(onComplete, 10000)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finish)
    }
  }, [onComplete])

  const remaining = Math.max(0, Math.ceil((100 - progress) * 0.1))

  return (
    <Screen>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>AI Analysis</div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }}>Processing biometric signals</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 8px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              position: 'absolute',
              width: 150, height: 150, borderRadius: 999,
              border: '1px solid rgba(0,122,255,0.2)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <ProgressRing size={132} stroke={10} progress={progress / 100} color={COLORS.blue} glow>
            <div
              style={{
                width: 78, height: 78, borderRadius: 999,
                background: 'linear-gradient(135deg, #007AFF, #4DA3FF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 10px 26px rgba(0,122,255,0.4)`,
                animation: 'spin 3s linear infinite',
              }}
            >
              <SparkleIcon size={34} color="#fff" />
            </div>
          </ProgressRing>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.text }}>{Math.round(progress)}%</div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: 600, marginTop: 2 }}>~{remaining}s remaining</div>
      </div>

      <Card padding="6px 16px">
        {STEPS.map((s, i) => {
          const active = done === i
          const complete = done > i
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: i < STEPS.length - 1 ? `1px solid ${COLORS.line}` : 'none', opacity: done > i + 1 ? 0.55 : 1 }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: 11,
                  background: complete ? COLORS.greenSoft : active ? COLORS.blueSoft : COLORS.line,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                {complete ? (
                  <CheckIcon size={20} color={COLORS.green} />
                ) : (
                  <span style={{ color: active ? COLORS.blue : COLORS.textSecondary, display: 'flex' }}>{s.icon}</span>
                )}
              </div>
              <div style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color: complete || active ? COLORS.text : COLORS.textSecondary }}>
                {s.label}
              </div>
              {active && !complete && (
                <div style={{ width: 16, height: 16, borderRadius: 999, border: `2px solid ${COLORS.blue}`, borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
              )}
            </div>
          )
        })}
      </Card>

      <div style={{ marginTop: 'auto' }}>
        <StepIndicator current={3} />
      </div>
    </Screen>
  )
}
