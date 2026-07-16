import { useEffect, useState } from 'react'
import { Screen } from '../components/Screen'
import { Card, Header, Button, StatTile } from '../components/ui'
import { COLORS } from '../design'
import { ProgressRing, useCountUp } from '../components/ProgressRing'
import {
  BoltIcon, ThermometerIcon, HeartIcon, SparkleIcon,
  SunIcon, DeviceIcon, ScanIcon, LeafIcon,
} from '../components/Icons'

type Props = { onStartScan: () => void; screenName?: string }

export function Dashboard({ onStartScan, screenName }: Props) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const score = useCountUp(87, 1000)
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <Screen screenName={screenName}>
      <Header subtitle={`${date} · ${time}`} />

      <Card padding={22} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <ProgressRing size={118} stroke={11} progress={score / 100} color={COLORS.blue} glow>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>{Math.round(score)}</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, fontWeight: 600, marginTop: 3 }}>SCORE</div>
            </div>
          </ProgressRing>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: 600 }}>Hydration Score</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, marginTop: 2 }}>Well Hydrated</div>
            <div style={{ fontSize: 13, color: COLORS.green, fontWeight: 600, marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
              <LeafIcon size={15} color={COLORS.green} /> Optimal balance
            </div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <StatTile icon={<BoltIcon size={17} />} label="Electrolyte" value="92" unit="%" accent={COLORS.orange} soft={COLORS.orangeSoft} progress={92} status="Sodium / Potassium normal" statusColor={COLORS.orange} />
        <StatTile icon={<SunIcon size={17} />} label="Heat Index" value="34" unit="°C" accent={COLORS.red} soft={COLORS.redSoft} progress={68} status="Caution" statusColor={COLORS.red} />
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <StatTile icon={<ThermometerIcon size={17} />} label="Body Temp" value="36.8" unit="°C" accent={COLORS.blue} soft={COLORS.blueSoft} status="Normal range" />
        <StatTile icon={<HeartIcon size={17} />} label="Recovery" value="78" unit="%" accent={COLORS.green} soft={COLORS.greenSoft} progress={78} status="Good" statusColor={COLORS.green} />
      </div>

      <Card padding={18} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: COLORS.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SparkleIcon size={20} color={COLORS.blue} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>AI Health Score</div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary }}>Composite of all signals</div>
            </div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.blue }}>91</div>
        </div>
      </Card>

      <Card padding={14} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DeviceIcon size={18} color={COLORS.green} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>Device Connected</div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 1 }}>HydroSense Pro · Battery 86%</div>
            </div>
          </div>
          <span style={{ width: 9, height: 9, borderRadius: 999, background: COLORS.green, boxShadow: `0 0 0 3px ${COLORS.greenSoft}` }} />
        </div>
      </Card>

      <Button full onClick={onStartScan} icon={<ScanIcon size={20} color="#fff" />}>
        Start New Scan
      </Button>
    </Screen>
  )
}
