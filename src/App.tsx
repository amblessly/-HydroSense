import { useState } from 'react'
import { Dashboard } from './screens/Dashboard'
import { FaceScan } from './screens/FaceScan'
import { SampleCollection } from './screens/SampleCollection'
import { AIAnalysis } from './screens/AIAnalysis'
import { Results } from './screens/Results'
import { dashboardSVG, faceScanSVG, sampleSVG, analysisSVG, resultsSVG } from './components/screenSVGs'

type ScreenName = 'dashboard' | 'face' | 'sample' | 'analysis' | 'results'

const SVG_MAP: Record<ScreenName, () => string> = {
  dashboard: dashboardSVG,
  face: faceScanSVG,
  sample: sampleSVG,
  analysis: analysisSVG,
  results: resultsSVG,
}

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('dashboard')

  const go = (s: ScreenName) => setScreen(s)
  const getSVG = SVG_MAP[screen]

  switch (screen) {
    case 'face':
      return <FaceScan screenName="face" getSVG={getSVG} onCancel={() => go('dashboard')} onComplete={() => go('sample')} />
    case 'sample':
      return <SampleCollection screenName="sample" getSVG={getSVG} onContinue={() => go('analysis')} />
    case 'analysis':
      return <AIAnalysis screenName="analysis" getSVG={getSVG} onComplete={() => go('results')} />
    case 'results':
      return <Results screenName="results" getSVG={getSVG} onStartScan={() => go('face')} onBack={() => go('dashboard')} />
    case 'dashboard':
    default:
      return <Dashboard screenName="dashboard" getSVG={getSVG} onStartScan={() => go('face')} />
  }
}
