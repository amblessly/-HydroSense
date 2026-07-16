export const ART_W = 402
export const ART_H = 874

export const C = {
  blue: '#007AFF',
  blueSoft: '#E8F1FF',
  blueDeep: '#0062CC',
  text: '#1C1C1E',
  textSecondary: '#8A8A8E',
  textTertiary: '#C7C7CC',
  green: '#34C759',
  greenSoft: '#E7F8EC',
  orange: '#FF9500',
  orangeSoft: '#FFF3E0',
  red: '#FF3B30',
  redSoft: '#FFE9E8',
  line: '#ECEEF1',
  white: '#FFFFFF',
  bg: '#F2F4F7',
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

export function svgCard(x: number, y: number, w: number, h: number, opts: { rx?: number; fill?: string } = {}) {
  const { rx = 22, fill = C.white } = opts
  return svgRect(x, y, w, h, { rx, fill })
}

export function svgRoundRect(x: number, y: number, w: number, h: number, rx: number, fill: string, stroke = '', sw = 1) {
  return svgRect(x, y, w, h, { rx, fill, stroke, strokeWidth: sw })
}

export function svgFrame(inner: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ART_W}" height="${ART_H}" viewBox="0 0 ${ART_W} ${ART_H}">${inner}</svg>`
}
