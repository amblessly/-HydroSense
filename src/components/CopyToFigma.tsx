import { useState } from 'react'
import { COLORS } from '../design'
import { ExportIcon, CheckIcon, CloseIcon } from './Icons'

type Props = {
  getSVG: () => string
  label?: string
}

export function CopyToFigma({ getSVG, label = 'Export SVG' }: Props) {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<'idle' | 'copied'>('idle')
  const [svg, setSvg] = useState('')

  const openPanel = () => {
    setSvg(getSVG())
    setOpen(true)
  }

  const download = () => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'hydrosense-screen.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(svg)
      setState('copied')
      setTimeout(() => setState('idle'), 1800)
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <button
        onClick={openPanel}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          borderRadius: 999,
          border: 'none',
          background: COLORS.blue,
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
        }}
      >
        <ExportIcon size={16} color="#fff" />
        {label}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 80,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: 360,
              maxHeight: '88%',
              background: COLORS.white,
              borderRadius: 22,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Export to Figma</div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <CloseIcon size={22} color={COLORS.textSecondary} />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflow: 'auto',
                background: COLORS.bg,
                borderRadius: 14,
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />

            <div style={{ fontSize: 12.5, color: COLORS.textSecondary, marginTop: 10, lineHeight: 1.45 }}>
              Drag this preview into Figma, or Download the .svg and drop it on the canvas. Every card becomes editable.
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button
                onClick={download}
                style={{ flex: 1, padding: '13px', borderRadius: 14, border: 'none', background: COLORS.blue, color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}
              >
                Download .svg
              </button>
              <button
                onClick={copyText}
                style={{ flex: 1, padding: '13px', borderRadius: 14, border: 'none', background: COLORS.blueSoft, color: COLORS.blue, fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                {state === 'copied' ? <CheckIcon size={16} color={COLORS.blue} /> : null}
                {state === 'copied' ? 'Copied!' : 'Copy code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
