import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { COLORS } from '../design'
import { FunctionPanel } from './FunctionPanel'

function useFitScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const calc = () => {
      const pad = 24
      const s = Math.min((window.innerWidth - pad) / 420, (window.innerHeight - pad) / 844)
      setScale(Math.max(0.3, Math.min(1, s)))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return scale
}

type ScreenProps = {
  children: ReactNode
  getSVG?: () => string
}

export function Screen({ children, getSVG }: ScreenProps) {
  const scale = useFitScale()
  const contentRef = useRef<HTMLDivElement>(null)
  const [innerScale, setInnerScale] = useState(1)

  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => {
      const avail = el.clientHeight
      const need = el.scrollHeight
      setInnerScale(need > avail && avail > 0 ? Math.min(1, avail / need) : 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [children])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: COLORS.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          height: '100%',
          maxHeight: 844,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#FFFFFF',
            borderRadius: 38,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 6px 18px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            ref={contentRef}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '22px 20px 30px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transform: innerScale < 1 ? `scale(${innerScale})` : undefined,
                transformOrigin: 'top center',
              }}
            >
              {children}
            </div>
          </div>
        </div>

        {getSVG && (
          <div style={{ position: 'absolute', right: 14, bottom: 14, zIndex: 60 }}>
            <FunctionPanel getSVG={getSVG} />
          </div>
        )}
      </div>
    </div>
  )
}
