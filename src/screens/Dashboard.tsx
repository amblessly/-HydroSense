import { useEffect, useState, type ReactNode } from 'react'
import { Screen } from '../components/Screen'
import { Card, Button } from '../components/ui'
import { COLORS, RADIUS } from '../design'
import { ProgressRing, useCountUp } from '../components/ProgressRing'
import {
  DropIcon, ThermometerIcon, HeartIcon, SparkleIcon,
  SunIcon, ScanIcon, LungIcon, BatteryIcon, SignalIcon,
  GpsIcon, CpuIcon, ExportIcon, HistoryIcon,
  SettingsIcon, ClockIcon, ActivityIcon,
} from '../components/Icons'

type Props = { onStartScan: () => void; screenName?: string; getSVG?: () => string }

type Tone = 'good' | 'warn' | 'crit' | 'info'
const TONE: Record<Tone, { color: string; soft: string }> = {
  good: { color: COLORS.green, soft: COLORS.greenSoft },
  warn: { color: COLORS.orange, soft: COLORS.orangeSoft },
  crit: { color: COLORS.red, soft: COLORS.redSoft },
  info: { color: COLORS.blue, soft: COLORS.blueSoft },
}

function StatusDot({ tone, size = 7 }: { tone: Tone; size?: number }) {
  const c = TONE[tone].color
  return <span style={{ width: size, height: size, borderRadius: 999, flexShrink: 0, background: c, boxShadow: `0 0 0 3px ${TONE[tone].soft}` }} />
}

function Pill({ tone, children, live }: { tone: Tone; children: ReactNode; live?: boolean }) {
  const t = TONE[tone]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: RADIUS.pill, background: t.soft, color: t.color, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.3 }}>
      {live && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.color, animation: 'pulse 1.5s ease-in-out infinite' }} />}
      {children}
    </span>
  )
}

function SectionLabel({ children, meta, icon }: { children: ReactNode; meta?: ReactNode; icon?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '14px 2px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        {icon && <span style={{ color: COLORS.blue, display: 'flex' }}>{icon}</span>}
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1, color: COLORS.textSecondary, textTransform: 'uppercase' }}>{children}</span>
      </div>
      {meta && <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.textTertiary }}>{meta}</span>}
    </div>
  )
}

function IconChip({ icon, tone, size = 28 }: { icon: ReactNode; tone: Tone; size?: number }) {
  const t = TONE[tone]
  return (
    <div style={{ width: size, height: size, borderRadius: 9, background: t.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ color: t.color, display: 'flex' }}>{icon}</span>
    </div>
  )
}

function Bar({ tone, value }: { tone: Tone; value: number }) {
  const t = TONE[tone]
  const w = Math.min(100, Math.max(0, value))
  return (
    <div style={{ height: 5, borderRadius: 999, background: COLORS.line, overflow: 'hidden', marginTop: 9 }}>
      <div style={{ width: `${w}%`, height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${t.soft}, ${t.color})` }} />
    </div>
  )
}

type Metric = { key: string; label: string; value: string; unit: string; icon: ReactNode; tone: Tone; bar: number; sub: string }

function MetricCard({ m }: { m: Metric }) {
  return (
    <Card padding={12} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
          <IconChip icon={m.icon} tone={m.tone} size={26} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: COLORS.textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.label}</span>
        </div>
        <StatusDot tone={m.tone} />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 8 }}>
        <span style={{ fontSize: 23, fontWeight: 750, color: COLORS.text, letterSpacing: 0.2, lineHeight: 1 }}>{m.value}</span>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: COLORS.textTertiary }}>{m.unit}</span>
      </div>
      <Bar tone={m.tone} value={m.bar} />
      <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: TONE[m.tone].color }}>{m.sub}</div>
    </Card>
  )
}

export function Dashboard({ onStartScan, screenName, getSVG }: Props) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const hydration = useCountUp(87, 1100)
  const aiScore = useCountUp(91, 1200)

  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  const vitals: Metric[] = [
    { key: 'body', label: 'Body Temp', value: '36.8', unit: '°C', icon: <ThermometerIcon size={15} />, tone: 'good', bar: 62, sub: 'Normal' },
    { key: 'hr', label: 'Heart Rate', value: '72', unit: 'bpm', icon: <HeartIcon size={15} />, tone: 'good', bar: 48, sub: 'Stable' },
    { key: 'heat', label: 'Heat Index', value: '34', unit: '°C', icon: <SunIcon size={15} />, tone: 'crit', bar: 68, sub: 'Caution' },
    { key: 'resp', label: 'Respiration', value: '16', unit: '/min', icon: <LungIcon size={15} />, tone: 'good', bar: 53, sub: 'Eupnea' },
  ]

  const sys = [
    { label: 'Pi', value: 'Online', icon: <CpuIcon size={14} />, tone: 'good' as Tone },
    { label: 'GPS', value: '7', icon: <GpsIcon size={14} />, tone: 'good' as Tone },
    { label: 'LoRa', value: '-67', icon: <SignalIcon size={14} />, tone: 'good' as Tone },
    { label: 'Batt', value: '86%', icon: <BatteryIcon size={14} />, tone: 'good' as Tone },
  ]

  return (
    <Screen screenName={screenName} getSVG={getSVG}>
      {/* Header */}
      <header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 14px rgba(10,132,255,0.30)' }}>
              <DropIcon size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 750, color: COLORS.text, letterSpacing: 0.2, lineHeight: 1.1 }}>HydroSense</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 1 }}>AI Health Monitor</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{time}</div>
            <div style={{ fontSize: 10.5, color: COLORS.textSecondary, marginTop: 2 }}>{date}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          {sys.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, padding: '7px 9px', borderRadius: 10, background: COLORS.surfaceAlt, border: `1px solid ${COLORS.line}` }}>
              <IconChip icon={s.icon} tone={s.tone} size={22} />
              <div style={{ minWidth: 0, lineHeight: 1.15 }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.4 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.text, whiteSpace: 'nowrap' }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Hydration hero */}
      <SectionLabel icon={<DropIcon size={14} />}>Health Summary</SectionLabel>
      <Card padding={16} style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <ProgressRing size={108} stroke={11} progress={hydration / 100} color={COLORS.blue} glow>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(hydration)}</div>
              <div style={{ fontSize: 9.5, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1, marginTop: 3 }}>SCORE</div>
            </div>
          </ProgressRing>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1, color: COLORS.textTertiary, textTransform: 'uppercase' }}>Hydration</div>
            <div style={{ fontSize: 19, fontWeight: 750, color: COLORS.text, marginTop: 2 }}>Well Hydrated</div>
            <div style={{ marginTop: 8 }}><Pill tone="good">Low Risk</Pill></div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ClockIcon size={13} color={COLORS.textSecondary} />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.textSecondary }}>Recovery </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>≈ 42 min</span>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Health Score */}
      <Card padding={13} style={{ marginTop: 10, border: `1px solid ${COLORS.blueSoft}`, boxShadow: '0 5px 16px rgba(10,132,255,0.10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: COLORS.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SparkleIcon size={20} color={COLORS.blue} />
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 750, color: COLORS.text }}>AI Health Score</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 1 }}>Composite of live signals</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.blue, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{Math.round(aiScore)}</div>
            <div style={{ marginTop: 5 }}><Pill tone="info" live>LIVE</Pill></div>
          </div>
        </div>
        <Bar tone="info" value={aiScore} />
      </Card>

      {/* Key vitals */}
      <SectionLabel icon={<ActivityIcon size={14} />} meta="4 key">Vitals</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {vitals.map((m) => <MetricCard key={m.key} m={m} />)}
      </div>

      {/* Bottom actions */}
      <div style={{ position: 'sticky', bottom: 0, marginTop: 'auto', padding: '10px 2px 2px', background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 30%)' }}>
        <div style={{ height: 1, background: COLORS.line, marginBottom: 10 }} />
        <Button full onClick={onStartScan} icon={<ScanIcon size={20} color="#fff" />}>Start New Scan</Button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
          <Button variant="secondary" style={{ padding: '11px 6px', fontSize: 12, gap: 5 }} icon={<ExportIcon size={15} />}>Export</Button>
          <Button variant="secondary" style={{ padding: '11px 6px', fontSize: 12, gap: 5 }} icon={<HistoryIcon size={15} />}>History</Button>
          <Button variant="secondary" style={{ padding: '11px 6px', fontSize: 12, gap: 5 }} icon={<SettingsIcon size={15} />}>Settings</Button>
        </div>
      </div>
    </Screen>
  )
}
