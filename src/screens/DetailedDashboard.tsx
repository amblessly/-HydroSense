import { useEffect, useState } from 'react'
import { Card } from '../components/ui'
import { ProgressRing } from '../components/ProgressRing'
import { Screen, type ScreenName } from '../components/Screen'
import { COLORS } from '../design'
import { DropIcon, WaveIcon, HeartIcon, ThermometerIcon, SparkleIcon, LeafIcon, ActivityIcon, ShieldIcon } from '../components/Icons'
import { detailedDashboardSVG } from '../components/screenSVGs'

type Tone = 'good' | 'warn' | 'info'

type Vital = { key: string; label: string; value: string; unit: string; icon: React.ReactNode; tone: Tone; bar: number; updated: string }
type Rec = { icon: React.ReactNode; tone: Tone; title: string; text: string }

function StatusDot({ tone = 'good', size = 8 }: { tone?: Tone; size?: number }) {
  const c = tone === 'good' ? COLORS.green : tone === 'warn' ? COLORS.orange : COLORS.blue
  return <span style={{ width: size, height: size, borderRadius: 999, background: c, display: 'inline-block', boxShadow: `0 0 0 4px ${c}22` }} />
}

function Pill({ tone = 'good', children, live }: { tone?: Tone; children: React.ReactNode; live?: boolean }) {
  const map = {
    good: { bg: COLORS.greenSoft, fg: COLORS.green },
    warn: { bg: COLORS.orangeSoft, fg: COLORS.orange },
    info: { bg: COLORS.blueSoft, fg: COLORS.blue },
  } as const
  const s = map[tone]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: s.fg, background: s.bg, padding: '5px 11px', borderRadius: 999 }}>
      {live && <span style={{ width: 6, height: 6, borderRadius: 999, background: s.fg, display: 'inline-block', animation: 'pulse 1.4s infinite' }} />}
      {children}
    </span>
  )
}

function SectionLabel({ icon, children, meta }: { icon?: React.ReactNode; children: React.ReactNode; meta?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22, marginBottom: 10 }}>
      <span style={{ color: COLORS.blue, display: 'inline-flex' }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 800, color: COLORS.text, letterSpacing: 0.4, textTransform: 'uppercase' }}>{children}</span>
      {meta && <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: COLORS.textTertiary }}>{meta}</span>}
    </div>
  )
}

function Bar({ tone = 'good', value }: { tone?: Tone; value: number }) {
  const c = tone === 'good' ? COLORS.green : tone === 'warn' ? COLORS.orange : COLORS.blue
  return (
    <div style={{ height: 5, background: COLORS.line, borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, value)}%`, height: '100%', background: c, borderRadius: 999 }} />
    </div>
  )
}

function VitalCard({ v }: { v: Vital }) {
  const c = v.tone === 'good' ? COLORS.green : v.tone === 'warn' ? COLORS.orange : COLORS.blue
  return (
    <Card padding={13}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: c, display: 'inline-flex' }}>{v.icon}</span>
        <span style={{ fontSize: 10.5, fontWeight: 600, color: COLORS.textTertiary }}>{v.updated}</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: COLORS.textSecondary }}>{v.label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 2 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: COLORS.text, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{v.value}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.textSecondary }}>{v.unit}</span>
      </div>
      <div style={{ marginTop: 9 }}><Bar tone={v.tone} value={v.bar} /></div>
    </Card>
  )
}

function RecommendationCard({ icon, tone, title, text }: Rec) {
  const c = tone === 'good' ? COLORS.green : tone === 'warn' ? COLORS.orange : COLORS.blue
  return (
    <Card padding={13}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 30, height: 30, borderRadius: 9, background: c + '22', color: c, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{title}</span>
      </div>
      <div style={{ fontSize: 11.5, color: COLORS.textSecondary, marginTop: 9, lineHeight: 1.4 }}>{text}</div>
    </Card>
  )
}

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

type Props = {
  onStartScan?: () => void
  onExport?: () => void
  onHistory?: () => void
  onLogs?: () => void
  screenName?: ScreenName
  getSVG?: () => string
  phoneWidth?: number
}

export function DetailedDashboard({ onStartScan, onExport, onHistory, onLogs, screenName, getSVG, phoneWidth = 420 }: Props) {
  const wide = phoneWidth >= 520
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const aiScore = useCountUp(91, 1200)

  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  const vitals: Vital[] = [
    { key: 'hyd', label: 'Hydration', value: '87', unit: '%', icon: <DropIcon size={15} />, tone: 'good', bar: 87, updated: '15s ago' },
    { key: 'spo2', label: 'Blood Oxygen', value: '98', unit: '%', icon: <WaveIcon size={15} />, tone: 'good', bar: 92, updated: '8s ago' },
    { key: 'hr', label: 'Heart Rate', value: '72', unit: 'bpm', icon: <HeartIcon size={15} />, tone: 'good', bar: 48, updated: '12s ago' },
    { key: 'bt', label: 'Body Temp', value: '36.8', unit: '°C', icon: <ThermometerIcon size={15} />, tone: 'good', bar: 62, updated: '12s ago' },
  ]

  const downloadSVG = () => {
    const data = detailedDashboardSVG()
    const url = URL.createObjectURL(new Blob([data], { type: 'image/svg+xml' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'hydrosense-detailed.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Screen screenName={screenName} getSVG={getSVG} phoneWidth={phoneWidth}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.text, letterSpacing: 0.2, lineHeight: 1.1 }}>Project DELTA</div>
          <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 2, fontWeight: 500 }}>AI Health Monitoring</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
            <StatusDot tone="good" />
            <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.green }}>Connected</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>{time}</div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary }}>{date}</div>
        </div>
      </header>

      {/* Patient summary */}
      <Card padding={16} style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: 999, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.blueDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 6px 16px rgba(10,132,255,0.30)' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 21 }}>JD</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 750, color: COLORS.text }}>Juan Dela Cruz</div>
            <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 1 }}>Student ID · 2023-0142</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <ProgressRing size={54} stroke={6} progress={aiScore / 100} color={COLORS.blue}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(aiScore)}</div>
              </div>
            </ProgressRing>
            <Pill tone="good">Risk · LOW</Pill>
          </div>
        </div>
      </Card>

      {/* Real-time vitals */}
      <SectionLabel icon={<ActivityIcon size={14} />} meta="key signals">Vital Signs</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr 1fr 1fr 1fr' : '1fr 1fr', gap: 10 }}>
        {vitals.map((v) => <VitalCard key={v.key} v={v} />)}
      </div>

      {/* AI analysis */}
      <SectionLabel icon={<SparkleIcon size={14} />} meta="live">AI Analysis</SectionLabel>
      <Card padding={16}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <StatusDot tone="good" size={9} />
            <span style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.text }}>Signs of Life</span>
          </div>
          <Pill tone="good" live>Detected</Pill>
        </div>
        <div style={{ height: 1, background: COLORS.line, margin: '14px 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr 1fr 1fr' : '1fr 1fr', gap: '14px 18px' }}>
          {[
            { label: 'Human Detection', v: 96, tone: 'good' as Tone, val: '96%' },
            { label: 'Hydration', v: 87, tone: 'good' as Tone, val: 'Optimal' },
            { label: 'Stress', v: 34, tone: 'good' as Tone, val: 'Low' },
          ].map((r) => (
            <div key={r.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary }}>{r.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, fontVariantNumeric: 'tabular-nums' }}>{r.val}</span>
              </div>
              <Bar tone={r.tone} value={r.v} />
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <SectionLabel icon={<ShieldIcon size={14} />}>Recommended Actions</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr 1fr 1fr 1fr' : '1fr 1fr', gap: 10 }}>
        <RecommendationCard icon={<DropIcon size={15} />} tone="info" title="Drink Water" text="Hydration at 87%. Consume 250 ml." />
        <RecommendationCard icon={<LeafIcon size={15} />} tone="good" title="Normal Recovery" text="On track · ETA 42 min." />
        <RecommendationCard icon={<ActivityIcon size={15} />} tone="warn" title="Rest" text="Short break advised." />
        <RecommendationCard icon={<ShieldIcon size={15} />} tone="good" title="Monitor" text="Vitals stable." />
      </div>

    </Screen>
  )
}
