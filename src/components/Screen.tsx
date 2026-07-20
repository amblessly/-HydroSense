import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { toSvg } from 'html-to-image'
import { COLORS } from '../design'
import { FunctionPanel } from './FunctionPanel'

function useFitScale(hasPanel: boolean, topInset = 0, width = 420) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const calc = () => {
      const pad = 24
      const gap = hasPanel ? 24 : 0
      const panel = hasPanel ? Math.min(320, window.innerWidth * 0.32) : 0
      const availW = Math.max(280, window.innerWidth - panel - gap - pad * 2)
      const availH = Math.max(420, window.innerHeight - pad * 2 - topInset)
      const s = Math.min(availW / width, availH / 844, 1)
      setScale(Math.max(0.4, s))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [hasPanel, topInset, width])
  return scale
}

type ScreenProps = {
  children: ReactNode
  getSVG?: () => string
  scroll?: boolean
  topInset?: number
  phoneWidth?: number
}

export function Screen({ children, getSVG, scroll = true, topInset = 0, phoneWidth = 420 }: ScreenProps) {
  const scale = useFitScale(!!getSVG, topInset, phoneWidth)
  const contentRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  const capture = useCallback(async () => {
    if (frameRef.current) {
      try {
        const url = await toSvg(frameRef.current, { cacheBust: true, pixelRatio: 2 })
        const comma = url.indexOf(',')
        const meta = url.slice(0, comma)
        const data = url.slice(comma + 1)
        return meta.includes('base64') ? atob(data) : decodeURIComponent(data)
      } catch {
        /* fall back to generator */
      }
    }
    return getSVG ? getSVG() : ''
  }, [getSVG])

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        height: '100vh',
        background: COLORS.bg,
        display: 'flex',
        alignItems: 'safe center',
        justifyContent: 'center',
        gap: 24,
        padding: 24,
        overflow: 'auto',
        boxSizing: 'border-box',
      }}
    >
        <div
          style={{
            width: '100%',
            maxWidth: phoneWidth,
            height: '100%',
            maxHeight: 844,
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            flexShrink: 0,
            position: 'relative',
          }}
        >
        <div
          ref={frameRef}
          style={{
            width: '100%',
            height: '100%',
            background: COLORS.surface,
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
              padding: scroll ? '20px 18px 24px' : '22px 20px 30px',
              overflowY: scroll ? 'auto' : 'hidden',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: `${COLORS.lineStrong} transparent`,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: scroll ? '100%' : undefined }}>{children}</div>
          </div>
        </div>
      </div>

      {getSVG && <FunctionPanel capture={capture} />}
    </div>
  )
}
