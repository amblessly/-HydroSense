import { useState } from 'react'
import { toPng } from 'html-to-image'
import { COLORS } from '../design'
import { ExportIcon, CheckIcon } from './Icons'

type Props = { targetId: string }

export function CopyToFigma({ targetId }: Props) {
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const handleCopy = async () => {
    const node = document.getElementById(targetId)
    if (!node) return
    setState('working')
    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#FFFFFF',
        skipFonts: false,
      })
      const blob = await (await fetch(dataUrl)).blob()
      if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      } else {
        // fallback: open image in new tab for manual copy
        const w = window.open('')
        if (w) w.document.write(`<img src="${dataUrl}" />`)
      }
      setState('done')
      setTimeout(() => setState('idle'), 2000)
    } catch (e) {
      console.error(e)
      setState('error')
      setTimeout(() => setState('idle'), 2000)
    }
  }

  const label =
    state === 'working' ? 'Capturing…' : state === 'done' ? 'Copied!' : state === 'error' ? 'Failed' : 'Copy to Figma'

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
      {label}
    </button>
  )
}
