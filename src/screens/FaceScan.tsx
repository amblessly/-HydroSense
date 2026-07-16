import { useEffect, useState } from 'react'
import { Screen } from '../components/Screen'
import { Button, StepIndicator } from '../components/ui'
import { COLORS, SHADOW } from '../design'
import { ProgressRing } from '../components/ProgressRing'
import { CloseIcon, ThermometerIcon, HeartIcon, WaveIcon, SparkleIcon } from '../components/Icons'

type Props = { onCancel: () => void; onComplete: () => void; screenName?: string }

export function FaceScan({ onCancel, onComplete, screenName }: Props) {
  const [progress, setProgress] = useState(0)
  const [bpm, setBpm] = useState(72)
  const [resp, setResp] = useState(15)
  const [skin, setSkin] = useState(36.4)

  useEffect(() => {
    const t1 = setInterval(() => setProgress((p) => Math.min(100, p + 1.1)), 100)
    const t2 = setInterval(() => setBpm(68 + Math.round(Math.random() * 10)), 900)
    const t3 = setInterval(() => setResp(13 + Math.round(Math.random() * 5)), 1100)
    const t4 = setInterval(() => setSkin(36.2 + Math.round(Math.random() * 8) / 10), 800)
    return () => {
      clearInterval(t1); clearInterval(t2); clearInterval(t3); clearInterval(t4)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onComplete, 500)
      return () => clearTimeout(t)
    }
  }, [progress, onComplete])

  return (
    <Screen screenName={screenName}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>Face Scan</div>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }}>Live heat stress analysis</div>
        </div>
        <button
          onClick={onCancel}
          style={{ width: 40, height: 40, borderRadius: 999, background: COLORS.card, boxShadow: SHADOW.soft, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <CloseIcon size={20} color={COLORS.text} />
        </button>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          borderRadius: 26,
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #1c1c1e 0%, #2c2c2e 55%, #3a3a3c 100%)',
          boxShadow: SHADOW.card,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 38%, rgba(0,122,255,0.22), transparent 60%)' }} />

        {/* faux camera subject glow */}
        <div style={{ position: 'absolute', left: '50%', top: '34%', width: 150, height: 190, transform: 'translate(-50%,-50%)', borderRadius: 90, background: 'radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%)' }} />

        {/* face detection frame */}
        <div style={{ position: 'absolute', left: '50%', top: '44%', transform: 'translate(-50%,-50%)', width: 190, height: 240 }}>
          <div style={{ position: 'absolute', inset: 0, border: `2px solid ${COLORS.blue}`, borderRadius: 110, opacity: 0.9 }} />
          {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((c) => {
            const map: Record<string, object> = {
              topLeft: { top: -2, left: -2, borderRight: 'none', borderBottom: 'none', borderTopLeftRadius: 110 },
              topRight: { top: -2, right: -2, borderLeft: 'none', borderBottom: 'none', borderTopRightRadius: 110 },
              bottomLeft: { bottom: -2, left: -2, borderRight: 'none', borderTop: 'none', borderBottomLeftRadius: 110 },
              bottomRight: { bottom: -2, right: -2, borderLeft: 'none', borderTop: 'none', borderBottomRightRadius: 110 },
            }
            return (
              <div
                key={c}
                style={{
                  position: 'absolute', width: 30, height: 30, border: `3px solid ${COLORS.blue}`,
                  ...(map[c] as object),
                }}
              />
            )
          })}
          {/* scanning sweep */}
          <div
            style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 3,
              background: `linear-gradient(90deg, transparent, ${COLORS.blue}, transparent)`,
              boxShadow: `0 0 12px ${COLORS.blue}`,
              animation: 'sweep 2s linear infinite',
            }}
          />
        </div>

        {/* live vitals */}
        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, display: 'flex', gap: 10 }}>
          {[
            { icon: <HeartIcon size={16} color="#fff" />, v: `${bpm}`, l: 'BPM' },
            { icon: <WaveIcon size={16} color="#fff" />, v: `${resp}`, l: 'Resp/min' },
            { icon: <ThermometerIcon size={16} color="#fff" />, v: `${skin.toFixed(1)}°`, l: 'Skin °C' },
          ].map((m) => (
            <div key={m.l} style={{ flex: 1, background: 'rgba(28,28,30,0.45)', backdropFilter: 'blur(8px)', borderRadius: 14, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{m.v}</div>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{m.l}</div>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,59,48,0.18)', padding: '6px 10px', borderRadius: 999 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: COLORS.red, animation: 'pulse 1.4s infinite' }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>REC</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 6px' }}>
        <ProgressRing size={84} stroke={8} progress={progress / 100} color={COLORS.blue} glow>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>{Math.round(progress)}</div>
            <div style={{ fontSize: 9, color: COLORS.textSecondary, fontWeight: 700 }}>%</div>
          </div>
        </ProgressRing>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: COLORS.blueSoft, borderRadius: 14, padding: '12px 14px', marginTop: 8 }}>
        <SparkleIcon size={20} color={COLORS.blue} />
        <div style={{ fontSize: 13, color: COLORS.blueDeep, fontWeight: 600, lineHeight: 1.4 }}>
          Analyzing facial heat map, skin perfusion & micro-circulation…
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <StepIndicator current={1} />
        <div style={{ height: 14 }} />
        <Button variant="ghost" full onClick={onCancel}>Cancel</Button>
      </div>
    </Screen>
  )
}
