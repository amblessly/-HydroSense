import { useEffect, useState } from 'react'
import { Screen } from '../components/Screen'
import { Button, StepIndicator, Card } from '../components/ui'
import { COLORS, SHADOW } from '../design'
import { FlaskIcon, CheckIcon, ScanIcon } from '../components/Icons'

type Props = { onContinue: () => void }

type Phase = 'idle' | 'detecting' | 'detected'

export function SampleCollection({ onContinue }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    if (phase === 'idle') {
      const t = setTimeout(() => setPhase('detecting'), 700)
      return () => clearTimeout(t)
    }
    if (phase === 'detecting') {
      const t = setTimeout(() => setPhase('detected'), 2600)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <Screen>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>Sample Collection</div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }}>Insert sweat or saliva strip</div>
      </div>

      <Card glass padding={0} style={{ marginTop: 8, overflow: 'hidden', borderRadius: 26 }}>
        <div
          style={{
            position: 'relative',
            height: 300,
            background: 'linear-gradient(180deg, #F7F9FC 0%, #EEF3FB 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* sensor slot illustration */}
          <div
            style={{
              width: 200,
              height: 120,
              borderRadius: 22,
              background: COLORS.card,
              boxShadow: SHADOW.card,
              border: `2px solid ${phase === 'detected' ? COLORS.green : COLORS.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              animation: phase === 'detecting' ? 'float 1.6s ease-in-out infinite' : undefined,
            }}
          >
            <div style={{ width: 150, height: 14, borderRadius: 999, background: phase === 'detected' ? COLORS.greenSoft : COLORS.line }} />
            <div style={{ position: 'absolute', top: -10, fontSize: 11, fontWeight: 700, color: COLORS.textSecondary, background: COLORS.card, padding: '2px 8px', borderRadius: 999 }}>SENSOR SLOT</div>
          </div>

          {/* strip / sample */}
          {(phase === 'detecting' || phase === 'detected') && (
            <div
              style={{
                position: 'absolute',
                width: 90,
                height: 50,
                borderRadius: 12,
                background: phase === 'detected'
                  ? 'linear-gradient(135deg, #34C759, #30D158)'
                  : 'linear-gradient(135deg, #007AFF, #4DA3FF)',
                boxShadow: `0 8px 20px ${phase === 'detected' ? 'rgba(52,199,89,0.35)' : 'rgba(0,122,255,0.35)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: phase === 'detected' ? 'translateY(0) scale(1)' : 'translateY(-60px)',
                transition: 'transform 0.6s cubic-bezier(.34,1.56,.64,1)',
              }}
            >
              <FlaskIcon size={24} color="#fff" />
            </div>
          )}

          {phase === 'detected' && (
            <div
              style={{
                position: 'absolute',
                right: 28,
                bottom: 28,
                width: 44,
                height: 44,
                borderRadius: 999,
                background: COLORS.green,
                boxShadow: SHADOW.blue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckIcon size={24} color="#fff" />
            </div>
          )}
        </div>
      </Card>

      <Card padding={16} style={{ marginTop: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: 12,
              background: phase === 'detected' ? COLORS.greenSoft : COLORS.blueSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ScanIcon size={20} color={phase === 'detected' ? COLORS.green : COLORS.blue} />
          </div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.text }}>
              {phase === 'idle' && 'Preparing sensor…'}
              {phase === 'detecting' && 'Detecting sample…'}
              {phase === 'detected' && 'Sample detected'}
            </div>
            <div style={{ fontSize: 12.5, color: COLORS.textSecondary, marginTop: 2 }}>
              {phase === 'detected' ? 'Sweat strip registered · ready to analyze' : 'Please hold the strip near the slot'}
            </div>
          </div>
        </div>
        {phase === 'detecting' && (
          <div style={{ height: 6, borderRadius: 999, background: COLORS.line, marginTop: 14, overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', borderRadius: 999, background: COLORS.blue, animation: 'shimmer 1.2s linear infinite', backgroundImage: `linear-gradient(90deg, ${COLORS.blue} 0%, #99ccff 50%, ${COLORS.blue} 100%)`, backgroundSize: '200% 100%' }} />
          </div>
        )}
      </Card>

      <div style={{ marginTop: 'auto' }}>
        <StepIndicator current={2} />
        <div style={{ height: 14 }} />
        <Button full onClick={onContinue} disabled={phase !== 'detected'} style={{ opacity: phase === 'detected' ? 1 : 0.5, cursor: phase === 'detected' ? 'pointer' : 'not-allowed' }}>
          Continue
        </Button>
      </div>
    </Screen>
  )
}
