export const ART_W = 402
export const ART_H = 874

export const C = {
  blue: '#0A84FF',
  blueSoft: '#EAF2FF',
  blueDeep: '#0062CC',
  text: '#10131A',
  textSecondary: '#6B7280',
  textTertiary: '#9AA3AF',
  green: '#30B94B',
  greenSoft: '#E8F8EC',
  orange: '#F59100',
  orangeSoft: '#FFF2E0',
  red: '#F0492B',
  redSoft: '#FDEAE6',
  line: '#ECEEF2',
  white: '#FFFFFF',
  bg: '#F4F6F9',
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function wrap(text: string, max: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur.trim())
      cur = w
    } else {
      cur = (cur + ' ' + w).trim()
    }
  }
  if (cur) lines.push(cur)
  return lines
}

export function svgText(
  x: number,
  y: number,
  text: string,
  opts: { size?: number; weight?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; max?: number; leading?: number } = {}
) {
  const { size = 14, weight = 400, fill = C.text, anchor = 'start', max = 0, leading = size * 1.3 } = opts
  if (max > 0) {
    return wrap(text, max)
      .map((line, i) => svgText(x, y + i * leading, line, { size, weight, fill, anchor }))
      .join('')
  }
  return `<text x="${x}" y="${y}" font-family="SF Mono, ui-monospace, monospace" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(text)}</text>`
}

export function svgRect(
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { rx?: number; fill?: string; stroke?: string; strokeWidth?: number } = {}
) {
  const { rx = 0, fill = 'none', stroke, strokeWidth = 1 } = opts
  const strokeAttr = stroke ? ` stroke="${stroke}" stroke-width="${strokeWidth}"` : ''
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${strokeAttr} />`
}

export function svgCircle(cx: number, cy: number, r: number, fill = 'none', stroke = '', strokeWidth = 1) {
  const s = stroke ? ` stroke="${stroke}" stroke-width="${strokeWidth}"` : ''
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${s} />`
}

export function svgRing(cx: number, cy: number, r: number, progress: number, color: string, stroke = 10) {
  const circ = 2 * Math.PI * r
  const off = circ * (1 - Math.min(1, Math.max(0, progress)))
  return (
    svgCircle(cx, cy, r, 'none', C.line, stroke) +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${off}" transform="rotate(-90 ${cx} ${cy})" />`
  )
}

export function svgCard(x: number, y: number, w: number, h: number, opts: { rx?: number; fill?: string; shadow?: string } = {}) {
  const { rx = 22, fill = C.white, shadow } = opts
  return svgRoundRect(x, y, w, h, rx, fill, '', 1, shadow ?? 'sh-card')
}

export function svgRoundRect(x: number, y: number, w: number, h: number, rx: number, fill: string, stroke = '', sw = 1, shadow?: string) {
  const filter = shadow ? ` filter="url(#${shadow})"` : ''
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ''}${filter} />`
}

export function svgFrame(inner: string): string {
  const defs = `
  <defs>
    <filter id="sh-card" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#1C1C1E" flood-opacity="0.08" />
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#1C1C1E" flood-opacity="0.06" />
    </filter>
    <filter id="sh-blue" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#007AFF" flood-opacity="0.28" />
    </filter>
    <filter id="sh-soft" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#1C1C1E" flood-opacity="0.05" />
    </filter>
    <filter id="sh-btn" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#1C1C1E" flood-opacity="0.10" />
    </filter>
  </defs>`
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ART_W}" height="${ART_H}" viewBox="0 0 ${ART_W} ${ART_H}">${defs}${inner}</svg>`
}
