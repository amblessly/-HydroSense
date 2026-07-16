import { useState } from 'react'
import { Dashboard } from './screens/Dashboard'
import { FaceScan } from './screens/FaceScan'
import { SampleCollection } from './screens/SampleCollection'
import { AIAnalysis } from './screens/AIAnalysis'
import { Results } from './screens/Results'

type ScreenName = 'dashboard' | 'face' | 'sample' | 'analysis' | 'results'

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('dashboard')

  const go = (s: ScreenName) => setScreen(s)

  switch (screen) {
    case 'face':
      return <FaceScan screenName="face" onCancel={() => go('dashboard')} onComplete={() => go('sample')} />
    case 'sample':
      return <SampleCollection screenName="sample" onContinue={() => go('analysis')} />
    case 'analysis':
      return <AIAnalysis screenName="analysis" onComplete={() => go('results')} />
    case 'results':
      return <Results screenName="results" onStartScan={() => go('face')} onBack={() => go('dashboard')} />
    case 'dashboard':
    default:
      return <Dashboard screenName="dashboard" onStartScan={() => go('face')} />
  }
}
