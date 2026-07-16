import { COLORS } from '../design'
import { ExportIcon, CheckIcon, CloseIcon } from './Icons'

type Props = {
  getSVG: () => string
}

export function FunctionPanel({ getSVG }: Props) {
  const [open, setOpen] = useState(false)
  const [svg, setSvg] = useState('')
  const [copied, setCopied] = useState(false)

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
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  const item = (icon: React.ReactNode, title: string, desc: string, onClick: () => void, primary = false) => (
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
          background: COLORS.text,
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: 'pointer',
          boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
        }}
      >
        <ExportIcon size={16} color="#fff" />
        Functions
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 80 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '90%', maxWidth: 360, maxHeight: '88%', background: COLORS.white, borderRadius: 22, padding: 16, display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.text }}>Export Functions</div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <CloseIcon size={22} color={COLORS.textSecondary} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {item(<ExportIcon size={18} />, 'Download .svg', 'Save file to drag into Figma', download, true)}
              {item(<CheckIcon size={18} />, copied ? 'Copied!' : 'Copy SVG code', 'Copy vector markup to clipboard', copyText)}
            </div>

            <div style={{ marginTop: 14, background: COLORS.bg, borderRadius: 14, padding: 12, fontSize: 12.5, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Drag the downloaded <b>hydrosense-screen.svg</b> onto your Figma canvas. Every card, ring and text becomes an editable, movable layer — with the same shadows as on screen.
            </div>

            <div style={{ flex: 1, overflow: 'auto', background: COLORS.bg, borderRadius: 14, padding: 10, marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        </div>
      )}
    </>
  )
}
