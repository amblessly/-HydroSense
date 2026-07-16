import { ART_W, ART_H, C, svgText, svgRect, svgCard, svgRing, svgCircle, svgFrame, svgRoundRect } from './svgKit'

function bg(): string {
  return svgRect(0, 0, ART_W, ART_H, { fill: C.white })
}

function header(title: string, subtitle: string, time: string): string {
  const x = 22
  let y = 40
  let s = ''
  // logo
  s += svgRoundRect(x, y, 40, 40, 12, C.blue)
  s += svgText(x + 20, y + 26, title.slice(0, 1), { size: 20, weight: 800, fill: C.white, anchor: 'middle' })
  s += svgText(x + 56, y + 16, title, { size: 18, weight: 700, fill: C.text })
  s += svgText(x + 56, y + 34, subtitle, { size: 12.5, weight: 400, fill: C.textSecondary })
  // profile avatar
  s += svgCircle(ART_W - 42, y + 20, 20, C.white, C.line, 1)
  s += svgText(ART_W - 42, y + 25, 'JD', { size: 13, weight: 700, fill: C.blue, anchor: 'middle' })
  return s
}

function sampleCard(x: number, y: number, w: number, h: number, title: string, value: string, unit: string, ringProgress: number, ringColor: string, status: string, statusColor: string): string {
  let s = svgCard(x, y, w, h)
  const pad = 16
  // ring
  const cx = x + pad + 22
  const cy = y + h / 2
  const r = 22
  s += svgRing(cx, cy, r, ringProgress, ringColor, 7)
  s += svgText(cx, cy + 6, value, { size: 18, weight: 800, fill: C.text, anchor: 'middle' })
  // label + status
  const tx = x + pad + 56
  s += svgText(tx, y + 26, title, { size: 12.5, weight: 600, fill: C.textSecondary })
  s += svgText(tx, y + 46, `${value}${unit ? ' ' + unit : ''}`, { size: 20, weight: 700, fill: C.text })
  s += svgText(tx, y + h - 16, status, { size: 11.5, weight: 600, fill: statusColor })
  return s
}

function statTile(x: number, y: number, w: number, h: number, label: string, value: string, unit: string, accent: string, soft: string, progress?: number, status?: string, statusColor?: string): string {
  let s = svgCard(x, y, w, h, { rx: 18 })
  const pad = 14
  // icon chip
  s += svgRoundRect(x + pad, y + pad, 30, 30, 9, soft)
  s += svgText(x + pad + 15, y + pad + 20, label.slice(0, 1), { size: 14, weight: 700, fill: accent, anchor: 'middle' })
  s += svgText(x + pad + 44, y + pad + 20, label, { size: 12.5, weight: 600, fill: C.textSecondary })
  s += svgText(x + pad, y + pad + 52, value, { size: 22, weight: 700, fill: C.text })
  s += svgText(x + pad + (value.length * 13), y + pad + 51, unit, { size: 12, weight: 600, fill: C.textSecondary })
  if (progress !== undefined) {
    const bx = x + pad
    const by = y + h - 16
    const bw = w - pad * 2
    s += svgRoundRect(bx, by, bw, 6, 3, C.line)
    s += svgRoundRect(bx, by, (bw * Math.min(100, Math.max(0, progress))) / 100, 6, 3, accent)
  } else if (status) {
    s += svgText(x + pad, y + h - 14, status, { size: 12, weight: 600, fill: statusColor ?? C.textSecondary })
  }
  return s
}

export function dashboardSVG(): string {
  let s = bg()
  s += header('HydroSense', 'Wed, July 16 · 9:41 AM', '9:41')
  let y = 96
  // big score card
  const cardH = 150
  s += svgCard(22, y, ART_W - 44, cardH)
  const cx = 22 + 28 + 59
  const cy = y + cardH / 2
  s += svgRing(cx, cy, 59, 0.87, C.blue, 11)
  s += svgText(cx, cy + 4, '87', { size: 34, weight: 800, fill: C.text, anchor: 'middle' })
  s += svgText(cx, cy + 22, 'SCORE', { size: 11, weight: 600, fill: C.textSecondary, anchor: 'middle' })
  const tx = 22 + 28 + 138
  s += svgText(tx, y + 46, 'Hydration Score', { size: 13, weight: 600, fill: C.textSecondary })
  s += svgText(tx, y + 70, 'Well Hydrated', { size: 22, weight: 700, fill: C.text })
  s += svgText(tx, y + 94, 'Optimal balance', { size: 13, weight: 600, fill: C.green })
  y += cardH + 14

  // two stat tiles
  const tw = (ART_W - 44 - 12) / 2
  s += statTile(22, y, tw, 96, 'Electrolyte', '92', '%', C.orange, C.orangeSoft, 92, 'Sodium / Potassium normal', C.orange)
  s += statTile(22 + tw + 12, y, tw, 96, 'Heat Index', '34', '°C', C.red, C.redSoft, 68, 'Caution', C.red)
  y += 96 + 12
  s += statTile(22, y, tw, 96, 'Body Temp', '36.8', '°C', C.blue, C.blueSoft, undefined, 'Normal range')
  s += statTile(22 + tw + 12, y, tw, 96, 'Recovery', '78', '%', C.green, C.greenSoft, 78, 'Good', C.green)
  y += 96 + 14

  // AI health score card
  s += svgCard(22, y, ART_W - 44, 64)
  s += svgRoundRect(22 + 16, y + 13, 38, 38, 11, C.blueSoft)
  s += svgText(22 + 35, y + 38, 'AI', { size: 13, weight: 700, fill: C.blue, anchor: 'middle' })
  s += svgText(22 + 66, y + 28, 'AI Health Score', { size: 14, weight: 700, fill: C.text })
  s += svgText(22 + 66, y + 46, 'Composite of all signals', { size: 12, weight: 400, fill: C.textSecondary })
  s += svgText(ART_W - 38, y + 40, '91', { size: 26, weight: 800, fill: C.blue, anchor: 'end' })
  y += 64 + 14

  // device card
  s += svgCard(22, y, ART_W - 44, 56)
  s += svgRoundRect(22 + 14, y + 11, 34, 34, 10, C.greenSoft)
  s += svgText(22 + 31, y + 33, 'D', { size: 14, weight: 700, fill: C.green, anchor: 'middle' })
  s += svgText(22 + 58, y + 24, 'Device Connected', { size: 14, weight: 600, fill: C.text })
  s += svgText(22 + 58, y + 42, 'HydroSense Pro · Battery 86%', { size: 12, weight: 400, fill: C.textSecondary })
  s += svgCircle(ART_W - 40, y + 28, 5, C.green)
  y += 56 + 16

  // start button
  s += svgRoundRect(22, y, ART_W - 44, 54, 16, C.blue)
  s += svgText(ART_W / 2, y + 34, 'Start New Scan', { size: 17, weight: 700, fill: C.white, anchor: 'middle' })
  return svgFrame(s)
}

export function faceScanSVG(): string {
  let s = bg()
  s += svgText(22, 44, 'Face Scan', { size: 20, weight: 700, fill: C.text })
  s += svgText(22, 64, 'Live heat stress analysis', { size: 13, weight: 400, fill: C.textSecondary })
  // camera area
  const camY = 84
  const camH = 360
  s += svgRoundRect(22, camY, ART_W - 44, camH, 26, '#1C1C1E')
  // face frame
  const fx = 22 + (ART_W - 44) / 2
  const fy = camY + camH / 2
  s += `<circle cx="${fx}" cy="${fy}" r="100" fill="none" stroke="${C.blue}" stroke-width="2" />`
  // vitals chips
  const chipW = (ART_W - 44 - 24) / 3
  const chipY = camY + camH - 64
  const vitals = [['72', 'BPM'], ['15', 'Resp/min'], ['36.4', 'Skin °C']]
  vitals.forEach((v, i) => {
    const cx = 22 + 12 + i * (chipW + 12)
    s += svgRoundRect(cx, chipY, chipW, 50, 14, '#1C1C1E')
    s += svgText(cx + chipW / 2, chipY + 22, v[0], { size: 16, weight: 700, fill: C.white, anchor: 'middle' })
    s += svgText(cx + chipW / 2, chipY + 40, v[1], { size: 10.5, weight: 600, fill: '#FFFFFF', anchor: 'middle' })
  })
  // progress ring
  const ringY = camY + camH + 50
  s += svgRing(ART_W / 2, ringY, 42, 0.7, C.blue, 8)
  s += svgText(ART_W / 2, ringY + 6, '70', { size: 20, weight: 800, fill: C.text, anchor: 'middle' })
  s += svgText(ART_W / 2, ringY + 22, '%', { size: 9, weight: 700, fill: C.textSecondary, anchor: 'middle' })
  // analyzing note
  const noteY = ringY + 70
  s += svgRoundRect(22, noteY, ART_W - 44, 46, 14, C.blueSoft)
  s += svgText(38, noteY + 28, 'Analyzing facial heat map & skin perfusion…', { size: 13, weight: 600, fill: C.blueDeep, max: 34 })
  // cancel button
  const btnY = noteY + 70
  s += svgRoundRect(22, btnY, ART_W - 44, 54, 16, C.white, C.line, 1)
  s += svgText(ART_W / 2, btnY + 34, 'Cancel', { size: 17, weight: 700, fill: C.text, anchor: 'middle' })
  // step indicator
  const stepY = btnY + 80
  s += svgRoundRect(ART_W / 2 - 24, stepY, 28, 6, 3, C.blue)
  s += svgRoundRect(ART_W / 2 + 8, stepY, 6, 6, 3, C.textTertiary)
  s += svgRoundRect(ART_W / 2 + 20, stepY, 6, 6, 3, C.textTertiary)
  s += svgRoundRect(ART_W / 2 + 32, stepY, 6, 6, 3, C.textTertiary)
  s += svgText(ART_W / 2 + 50, stepY + 7, '1 of 4', { size: 13, weight: 600, fill: C.textSecondary })
  return svgFrame(s)
}

export function sampleSVG(): string {
  let s = bg()
  s += svgText(22, 44, 'Sample Collection', { size: 20, weight: 700, fill: C.text })
  s += svgText(22, 64, 'Insert sweat or saliva strip', { size: 13, weight: 400, fill: C.textSecondary })
  // sensor slot card
  const cardY = 92
  const cardH = 280
  s += svgRoundRect(22, cardY, ART_W - 44, cardH, 26, '#F7F9FC')
  s += svgRoundRect(22 + (ART_W - 44) / 2 - 100, cardY + cardH / 2 - 60, 200, 120, 22, C.white, C.line, 2)
  s += svgRoundRect(22 + (ART_W - 44) / 2 - 75, cardY + cardH / 2 - 7, 150, 14, 7, C.line)
  s += svgText(22 + (ART_W - 44) / 2, cardY + 30, 'SENSOR SLOT', { size: 11, weight: 700, fill: C.textSecondary, anchor: 'middle' })
  // sample strip
  s += svgRoundRect(22 + (ART_W - 44) / 2 - 45, cardY + cardH / 2 - 80, 90, 50, 12, C.blue)
  // status card
  const stY = cardY + cardH + 16
  s += svgCard(22, stY, ART_W - 44, 64)
  s += svgRoundRect(22 + 14, stY + 12, 40, 40, 12, C.greenSoft)
  s += svgText(22 + 34, stY + 38, '✓', { size: 18, weight: 700, fill: C.green, anchor: 'middle' })
  s += svgText(22 + 66, stY + 26, 'Sample detected', { size: 14.5, weight: 700, fill: C.text })
  s += svgText(22 + 66, stY + 46, 'Sweat strip registered · ready to analyze', { size: 12.5, weight: 400, fill: C.textSecondary })
  // continue button
  const btnY = stY + 64 + 16
  s += svgRoundRect(22, btnY, ART_W - 44, 54, 16, C.blue)
  s += svgText(ART_W / 2, btnY + 34, 'Continue', { size: 17, weight: 700, fill: C.white, anchor: 'middle' })
  const stepY = btnY + 70
  s += svgRoundRect(ART_W / 2 - 30, stepY, 6, 6, 3, C.textTertiary)
  s += svgRoundRect(ART_W / 2 - 18, stepY, 28, 6, 3, C.blue)
  s += svgRoundRect(ART_W / 2 + 14, stepY, 6, 6, 3, C.textTertiary)
  s += svgRoundRect(ART_W / 2 + 26, stepY, 6, 6, 3, C.textTertiary)
  s += svgText(ART_W / 2 + 44, stepY + 7, '2 of 4', { size: 13, weight: 600, fill: C.textSecondary })
  return svgFrame(s)
}

export function analysisSVG(): string {
  let s = bg()
  s += svgText(22, 44, 'AI Analysis', { size: 20, weight: 700, fill: C.text })
  s += svgText(22, 64, 'Processing biometric signals', { size: 13, weight: 400, fill: C.textSecondary })
  // big ring
  const cy = 230
  s += svgRing(ART_W / 2, cy, 66, 0.6, C.blue, 10)
  s += svgText(ART_W / 2, cy + 6, '60', { size: 28, weight: 800, fill: C.text, anchor: 'middle' })
  s += svgText(ART_W / 2, cy + 26, '%', { size: 13, weight: 600, fill: C.textSecondary, anchor: 'middle' })
  s += svgText(ART_W / 2, cy + 52, '~4s remaining', { size: 13, weight: 600, fill: C.textSecondary, anchor: 'middle' })
  // steps
  const steps = [
    'Reading hydration markers',
    'Analyzing electrolytes',
    'Calculating heat index',
    'Estimating recovery score',
    'Generating AI recommendations',
  ]
  let y = cy + 110
  steps.forEach((t, i) => {
    const done = i < 3
    s += svgCard(22, y, ART_W - 44, 54, { rx: 14 })
    s += svgRoundRect(22 + 14, y + 9, 36, 36, 11, done ? C.greenSoft : C.line)
    s += svgText(22 + 32, y + 33, done ? '✓' : (i + 1).toString(), { size: 15, weight: 700, fill: done ? C.green : C.textSecondary, anchor: 'middle' })
    s += svgText(22 + 62, y + 33, t, { size: 14.5, weight: 600, fill: done ? C.text : C.textSecondary })
    y += 54 + 12
  })
  const stepY = y + 6
  s += svgRoundRect(ART_W / 2 - 36, stepY, 6, 6, 3, C.textTertiary)
  s += svgRoundRect(ART_W / 2 - 24, stepY, 6, 6, 3, C.textTertiary)
  s += svgRoundRect(ART_W / 2 - 12, stepY, 28, 6, 3, C.blue)
  s += svgRoundRect(ART_W / 2 + 20, stepY, 6, 6, 3, C.textTertiary)
  s += svgText(ART_W / 2 + 38, stepY + 7, '3 of 4', { size: 13, weight: 600, fill: C.textSecondary })
  return svgFrame(s)
}

export function resultsSVG(): string {
  let s = bg()
  s += svgText(22, 44, 'Results', { size: 20, weight: 700, fill: C.text })
  s += svgText(22, 64, 'Scan complete · Today 9:14 AM', { size: 13, weight: 400, fill: C.textSecondary })
  s += svgRoundRect(ART_W - 110, 32, 88, 28, 999, C.greenSoft)
  s += svgCircle(ART_W - 96, 46, 4, C.green)
  s += svgText(ART_W - 84, 51, 'Low Risk', { size: 12.5, weight: 700, fill: C.green })
  // score card
  let y = 84
  const cardH = 150
  s += svgCard(22, y, ART_W - 44, cardH)
  const cx = 22 + 28 + 59
  const cy = y + cardH / 2
  s += svgRing(cx, cy, 59, 0.84, C.blue, 11)
  s += svgText(cx, cy + 4, '84', { size: 34, weight: 800, fill: C.text, anchor: 'middle' })
  s += svgText(cx, cy + 22, 'SCORE', { size: 11, weight: 600, fill: C.textSecondary, anchor: 'middle' })
  const tx = 22 + 28 + 138
  s += svgText(tx, y + 46, 'Hydration Status', { size: 13, weight: 600, fill: C.textSecondary })
  s += svgText(tx, y + 70, 'Well Hydrated', { size: 22, weight: 700, fill: C.text })
  s += svgText(tx, y + 94, 'Recovery time · ~45 min', { size: 13, weight: 600, fill: C.blue })
  y += cardH + 14
  // tiles
  const tw = (ART_W - 44 - 12) / 2
  s += statTile(22, y, tw, 96, 'Electrolyte', '90', '%', C.orange, C.orangeSoft, 90, 'Slight deficit', C.orange)
  s += statTile(22 + tw + 12, y, tw, 96, 'Heat Index', '33', '°C', C.red, C.redSoft, 64, 'Caution', C.red)
  y += 96 + 12
  s += statTile(22, y, tw, 96, 'Body Temp', '36.9', '°C', C.blue, C.blueSoft, undefined, 'Normal range')
  s += statTile(22 + tw + 12, y, tw, 96, 'Recovery', '76', '%', C.green, C.greenSoft, 76, 'Good', C.green)
  y += 96 + 14
  // AI health
  s += svgCard(22, y, ART_W - 44, 64)
  s += svgRoundRect(22 + 16, y + 13, 38, 38, 11, C.blueSoft)
  s += svgText(22 + 35, y + 38, 'AI', { size: 13, weight: 700, fill: C.blue, anchor: 'middle' })
  s += svgText(22 + 66, y + 28, 'AI Health Score', { size: 14, weight: 700, fill: C.text })
  s += svgText(22 + 66, y + 46, 'Risk: Low · Recovery 45 min', { size: 12, weight: 400, fill: C.textSecondary })
  s += svgText(ART_W - 38, y + 40, '89', { size: 26, weight: 800, fill: C.blue, anchor: 'end' })
  y += 64 + 16
  // buttons
  s += svgRoundRect(22, y, ART_W - 44, 54, 16, C.blue)
  s += svgText(ART_W / 2, y + 34, 'Start New Scan', { size: 17, weight: 700, fill: C.white, anchor: 'middle' })
  y += 54 + 10
  const bw = (ART_W - 44 - 12) / 2
  s += svgRoundRect(22, y, bw, 48, 16, C.blueSoft)
  s += svgText(22 + bw / 2, y + 30, 'Print Report', { size: 14, weight: 700, fill: C.blue, anchor: 'middle' })
  s += svgRoundRect(22 + bw + 12, y, bw, 48, 16, C.blueSoft)
  s += svgText(22 + bw + 12 + bw / 2, y + 30, 'Export', { size: 14, weight: 700, fill: C.blue, anchor: 'middle' })
  return svgFrame(s)
}
