import { useState } from 'react'
import { COLORS } from '../design'
import { ExportIcon, CheckIcon } from './Icons'

type Props = {
  getSVG: () => string
  label?: string
}

async function copySVG(svg: string) {
  // Prefer clipboard with image/svg+xml (Figma reads this as editable vectors)
  try {
    if (navigator.clipboard && typeof ClipboardItem !== 'undefined' && 'write' in navigator.clipboard) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/svg+xml': new Blob([svg], { type: 'image/svg+xml' }) }),
      ])
      return true
    }
  } catch {
    /* fall through */
  }
  // Fallback: plain text svg
  try {
    await navigator.clipboard.writeText(svg)
    return true
  } catch {
    return false
  }
}

export function CopyToFigma({ getSVG, label = 'Copy to Figma' }: Props) {
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const handleCopy = async () => {
    setState('working')
    const ok = await copySVG(getSVG())
    setState(ok ? 'done' : 'error')
    setTimeout(() => setState('idle'), 2000)
  }

  const text =
    state === 'working' ? 'Capturing…' : state === 'done' ? 'Copied!' : state === 'error' ? 'Failed' : label

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
