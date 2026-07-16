import { Screen } from '../components/Screen'
import { Card, Button, StatTile } from '../components/ui'
import { COLORS, SHADOW } from '../design'
import { ProgressRing, useCountUp } from '../components/ProgressRing'
import {
  BoltIcon, ThermometerIcon, HeartIcon, SparkleIcon,
  SunIcon, ScanIcon, PrinterIcon, ExportIcon, ChevronRightIcon,
} from '../components/Icons'

type Props = { onStartScan: () => void; onBack: () => void; screenName?: string }

export function Results({ onStartScan, onBack, screenName }: Props) {
  const score = useCountUp(84, 1000)
  return (
    <Screen screenName={screenName}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>Results</div>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }}>Scan complete · Today 9:14 AM</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: COLORS.greenSoft, padding: '6px 12px', borderRadius: 999 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.green }} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.green }}>Low Risk</span>
        </div>
      </div>

      <Card padding={22} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <ProgressRing size={118} stroke={11} progress={score / 100} color={COLORS.blue} glow>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.text, lineHeight: 1 }}>{Math.round(score)}</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, fontWeight: 600, marginTop: 3 }}>SCORE</div>
            </div>
          </ProgressRing>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: 600 }}>Hydration Status</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, marginTop: 2 }}>Well Hydrated</div>
            <div style={{ fontSize: 13, color: COLORS.blue, fontWeight: 600, marginTop: 6 }}>
              Recovery time · ~45 min
            </div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <StatTile icon={<BoltIcon size={17} />} label="Electrolyte" value="90" unit="%" accent={COLORS.orange} soft={COLORS.orangeSoft} progress={90} status="Slight deficit" statusColor={COLORS.orange} />
        <StatTile icon={<SunIcon size={17} />} label="Heat Index" value="33" unit="°C" accent={COLORS.red} soft={COLORS.redSoft} progress={64} status="Caution" statusColor={COLORS.red} />
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <StatTile icon={<ThermometerIcon size={17} />} label="Body Temp" value="36.9" unit="°C" accent={COLORS.blue} soft={COLORS.blueSoft} status="Normal" />
        <StatTile icon={<HeartIcon size={17} />} label="Recovery" value="76" unit="%" accent={COLORS.green} soft={COLORS.greenSoft} progress={76} status="Good" statusColor={COLORS.green} />
      </div>

      <Card padding={18} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: COLORS.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SparkleIcon size={20} color={COLORS.blue} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>AI Health Score</div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary }}>Risk: Low · Recovery 45 min</div>
            </div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.blue }}>89</div>
        </div>
      </Card>

      <Button full onClick={onBack} variant="ghost" icon={<ChevronRightIcon size={18} color={COLORS.text} style={{ transform: 'rotate(180deg)' }} />}>
        Back to Dashboard
      </Button>

      <Button full onClick={onStartScan} icon={<ScanIcon size={20} color="#fff" />} style={{ marginBottom: 10, marginTop: 10 }}>
        Start New Scan
      </Button>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button full variant="secondary" icon={<PrinterIcon size={18} color={COLORS.blue} />}>Print Report</Button>
        <Button full variant="secondary" icon={<ExportIcon size={18} color={COLORS.blue} />}>Export</Button>
      </div>
    </Screen>
  )
}
