import { useState } from 'react'
import { COLORS } from '../design'
import { ExportIcon, CheckIcon } from './Icons'

type Props = {
  getSVG: () => string
  label?: string
}

export function CopyToFigma({ getSVG, label = 'Copy to Figma' }: Props) {
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const handleCopy = async () => {
    setState('working')
    const svg = getSVG()
    let ok = false

    const supportsClipboard =
      navigator.clipboard && typeof ClipboardItem !== 'undefined' && 'write' in navigator.clipboard

    if (supportsClipboard) {
      try {
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const item: Record<string, Blob> = { 'image/svg+xml': blob }
        // Also provide a data-url HTML variant for broader paste support
        const html = `<html><body>${svg}</body></html>`
        item['text/html'] = new Blob([html], { type: 'text/html' })
        await navigator.clipboard.write([new ClipboardItem(item)])
        ok = true
      } catch {
        try {
          await navigator.clipboard.writeText(svg)
          ok = true
        } catch {
          ok = false
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(svg)
        ok = true
      } catch {
        ok = false
      }
    }

    // Last-resort: trigger a download so the user can drag the .svg into Figma
    if (!ok) {
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
      const a = document.createElement('a')
      a.href = url
      a.download = 'screen.svg'
      a.click()
      URL.revokeObjectURL(url)
    }

    setState(ok ? 'done' : 'error')
    setTimeout(() => setState('idle'), 2200)
  }

  const text =
    state === 'working' ? 'Capturing…' : state === 'done' ? 'Copied!' : state === 'error' ? 'Downloaded' : label

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px',
        borderRadius: 999,
        border: 'none',
        background: state === 'done' ? COLORS.green : COLORS.text,
        color: '#fff',
        fontSize: 13,
        fontWeight: 700,
        fontFamily: 'inherit',
        cursor: 'pointer',
        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
      }}
    >
      {state === 'done' ? <CheckIcon size={16} color="#fff" /> : <ExportIcon size={16} color="#fff" />}
      {text}
    </button>
  )
}
