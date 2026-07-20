import { useState } from 'react'
import { Dashboard } from './screens/Dashboard'
import { DetailedDashboard } from './screens/DetailedDashboard'
import { FaceScan } from './screens/FaceScan'
import { SampleCollection } from './screens/SampleCollection'
import { AIAnalysis } from './screens/AIAnalysis'
import { Results } from './screens/Results'
import { dashboardSVG, detailedDashboardSVG, faceScanSVG, sampleSVG, analysisSVG, resultsSVG } from './components/screenSVGs'
import { COLORS } from './design'

type ScreenName = 'dashboard' | 'detailed' | 'face' | 'sample' | 'analysis' | 'results'

const SVG_MAP: Record<ScreenName, () => string> = {
  dashboard: dashboardSVG,
  detailed: detailedDashboardSVG,
  face: faceScanSVG,
  sample: sampleSVG,
  analysis: analysisSVG,
  results: resultsSVG,
}

function NavBar({ view, onSelect }: { view: ScreenName; onSelect: (s: ScreenName) => void }) {
  const tabs: { key: ScreenName; label: string }[] = [
    { key: 'dashboard', label: 'Overview' },
    { key: 'detailed', label: 'Detailed' },
  ]
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 16px', background: COLORS.bg }}>
      <div style={{ display: 'inline-flex', background: COLORS.surfaceAlt, border: `1px solid ${COLORS.line}`, borderRadius: 999, padding: 4 }}>
        {tabs.map((t) => {
          const active = view === t.key
          return (
            <button
              key={t.key}
              onClick={() => onSelect(t.key)}
              style={{
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 18px',
                borderRadius: 999,
                background: active ? COLORS.blue : 'transparent',
                color: active ? '#fff' : COLORS.textSecondary,
                boxShadow: active ? '0 4px 12px rgba(10,132,255,0.28)' : 'none',
              }}
            >
              {t.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('dashboard')

  const go = (s: ScreenName) => setScreen(s)
  const getSVG = SVG_MAP[screen]

  if (screen === 'face' || screen === 'sample' || screen === 'analysis' || screen === 'results') {
    switch (screen) {
      case 'face':
        return <FaceScan screenName="face" getSVG={getSVG} onCancel={() => go('dashboard')} onComplete={() => go('sample')} />
      case 'sample':
        return <SampleCollection screenName="sample" getSVG={getSVG} onContinue={() => go('analysis')} />
      case 'analysis':
        return <AIAnalysis screenName="analysis" getSVG={getSVG} onComplete={() => go('results')} />
      case 'results':
        return <Results screenName="results" getSVG={getSVG} onStartScan={() => go('face')} onBack={() => go('dashboard')} />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: COLORS.bg }}>
      <NavBar view={screen} onSelect={go} />
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        {screen === 'detailed' ? (
          <DetailedDashboard
            screenName="detailed"
            getSVG={() => detailedDashboardSVG(540)}
            phoneWidth={540}
            onStartScan={() => go('face')}
            onExport={undefined}
            onHistory={undefined}
            onLogs={undefined}
          />
        ) : (
          <Dashboard screenName="dashboard" getSVG={getSVG} onStartScan={() => go('face')} />
        )}
      </div>
    </div>
  )
}
