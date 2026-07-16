import { useState, type ReactNode } from 'react'
import { COLORS } from '../design'
import { ExportIcon, CheckIcon } from './Icons'

type Props = {
  getSVG: () => string
}

export function FunctionPanel({ getSVG }: Props) {
  const [svg, setSvg] = useState('')
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const ensureSVG = () => {
    if (!open) {
      setSvg(getSVG())
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const download = () => {
    const data = svg || getSVG()
    const url = URL.createObjectURL(new Blob([data], { type: 'image/svg+xml' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'hydrosense-screen.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyText = async () => {
    const data = svg || getSVG()
    try {
      await navigator.clipboard.writeText(data)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  const card = (icon: ReactNode, title: string, desc: string, onClick: () => void, primary = false) => (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderRadius: 16,
        border: 'none',
        background: primary ? COLORS.blue : COLORS.white,
        boxShadow: primary ? '0 10px 24px rgba(0,122,255,0.28)' : '0 4px 16px rgba(28,28,30,0.05)',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          background: primary ? 'rgba(255,255,255,0.18)' : COLORS.blueSoft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ color: primary ? '#fff' : COLORS.blue, display: 'flex' }}>{icon}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: primary ? '#fff' : COLORS.text }}>{title}</div>
        <div style={{ fontSize: 11.5, color: primary ? 'rgba(255,255,255,0.85)' : COLORS.textSecondary, marginTop: 1 }}>{desc}</div>
      </div>
    </button>
  )

  return (
    <div
      style={{
        width: 320,
        maxWidth: '32vw',
        alignSelf: 'stretch',
        maxHeight: 844,
        background: COLORS.white,
        borderRadius: 28,
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 6px 18px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>Export Functions</div>
      <div style={{ fontSize: 12.5, color: COLORS.textSecondary, marginBottom: 14 }}>Send this screen to Figma</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {card(<ExportIcon size={18} />, 'Download .svg', 'Save file to drag into Figma', download, true)}
        {card(<CheckIcon size={18} />, copied ? 'Copied!' : 'Copy SVG code', 'Copy vector markup to clipboard', copyText)}
      </div>

      <div style={{ marginTop: 14, background: COLORS.bg, borderRadius: 14, padding: 12, fontSize: 12.5, color: COLORS.textSecondary, lineHeight: 1.5 }}>
        Drag the downloaded <b>hydrosense-screen.svg</b> onto your Figma canvas. Every card, ring and text becomes an editable, movable layer — with the same shadows as on screen.
      </div>

      <div style={{ flex: 1, overflow: 'auto', background: COLORS.bg, borderRadius: 14, padding: 10, marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
        <div style={{ transform: 'scale(0.62)', transformOrigin: 'center', pointerEvents: 'none' }} dangerouslySetInnerHTML={{ __html: svg || getSVG() }} />
      </div>
    </div>
  )
}
