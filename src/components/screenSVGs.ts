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

function sectionLabel(y: number, text: string, meta?: string): string {
  let s = ''
  s += svgText(24, y + 10, text, { size: 11.5, weight: 700, fill: C.textSecondary, anchor: 'start' })
  if (meta) s += svgText(ART_W - 24, y + 10, meta, { size: 11, weight: 600, fill: C.textTertiary, anchor: 'end' })
  return s
}

function statusPill(x: number, y: number, w: number, h: number, text: string, fill: string, soft: string): string {
  return (
    svgRoundRect(x, y, w, h, h / 2, soft) +
    svgCircle(x + h / 2, y + h / 2, 3, fill) +
    svgText(x + h / 2 + 9, y + h / 2 + 4, text, { size: 11, weight: 700, fill })
  )
}

function sysChip(x: number, y: number, w: number, h: number, label: string, value: string, soft: string): string {
  let s = svgRoundRect(x, y, w, h, 10, C.bg, C.line, 1)
  s += svgRoundRect(x + 8, y + (h - 22) / 2, 22, 22, 9, soft)
  s += svgText(x + 37, y + 16, label, { size: 9, weight: 700, fill: C.textSecondary })
  s += svgText(x + 37, y + 32, value, { size: 11.5, weight: 700, fill: C.text })
  return s
}

function logoMark(x: number, y: number): string {
  let s = svgRoundRect(x, y, 38, 38, 12, C.blue)
  const cx = x + 19, cy = y + 19
  s += `<path d="M12 3.5C12 3.5 5.5 10.5 5.5 14.7a6.5 6.5 0 0 0 13 0C18.5 10.5 12 3.5 12 3.5Z" transform="translate(${cx},${cy}) scale(0.8) translate(-12,-12.2)" fill="#fff"/>`
  return s
}

export function dashboardSVG(): string {
  const W = 420, H = 844, MX = 18, CW = W - MX * 2
  const defs = `<defs>
    <linearGradient id="grad-blue" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.blueSoft}"/><stop offset="1" stop-color="${C.blue}"/></linearGradient>
    <clipPath id="scr"><rect x="0" y="0" width="${W}" height="${H}" rx="38"/></clipPath>
    <filter id="sh-card" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#10131A" flood-opacity="0.08"/><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#10131A" flood-opacity="0.06"/></filter>
    <filter id="sh-blue" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0A84FF" flood-opacity="0.30"/></filter>
  </defs>`
  let s = ''
  s += svgRect(0, 0, W, H, { fill: C.white })
  s += '<g clip-path="url(#scr)">'

  // header (no avatar — matches the app)
  s += logoMark(MX, 20)
  s += svgText(MX + 50, 35, 'HydroSense', { size: 17, weight: 700, fill: C.text })
  s += svgText(MX + 50, 53, 'AI Health Monitor', { size: 11, weight: 400, fill: C.textSecondary })
  s += svgText(W - MX, 35, '9:41', { size: 14, weight: 700, fill: C.text, anchor: 'end' })
  s += svgText(W - MX, 53, 'Mon, Jul 20', { size: 10.5, weight: 400, fill: C.textSecondary, anchor: 'end' })

  // system chips
  const chipY = 20 + 38 + 12
  const chipW = (CW - 24) / 4
  const sys = [['Pi', 'Online'], ['GPS', '7'], ['LoRa', '-67'], ['Batt', '86%']]
  sys.forEach((it, i) => {
    s += sysChip(MX + i * (chipW + 8), chipY, chipW, 42, it[0], it[1], C.greenSoft)
  })

  // health summary
  const heroLabelY = chipY + 42 + 14
  s += sectionLabel(heroLabelY, 'HEALTH SUMMARY')
  const heroY = heroLabelY + 22
  const cardH = 140
  s += svgCard(MX, heroY, CW, cardH)
  const cx = MX + 16 + 54
  const cy = heroY + cardH / 2
  s += svgRing(cx, cy, 54, 0.87, C.blue, 11)
  s += svgText(cx, cy + 5, '87', { size: 34, weight: 800, fill: C.text, anchor: 'middle' })
  s += svgText(cx, cy + 23, 'SCORE', { size: 9, weight: 700, fill: C.textSecondary, anchor: 'middle' })
  const tx = MX + 16 + 108 + 16
  s += svgText(tx, heroY + 36, 'HYDRATION', { size: 9.5, weight: 700, fill: C.textTertiary })
  s += svgText(tx, heroY + 56, 'Well Hydrated', { size: 18, weight: 700, fill: C.text })
  s += statusPill(tx, heroY + 68, 74, 20, 'Low Risk', C.green, C.greenSoft)
  s += svgText(tx, heroY + 102, 'Recovery  ≈ 42 min', { size: 12, weight: 700, fill: C.text })

  // AI health score
  const aiY = heroY + cardH + 10
  s += svgCard(MX, aiY, CW, 64)
  s += svgRoundRect(MX + 14, aiY + 13, 38, 38, 12, C.blueSoft)
  s += svgText(MX + 33, aiY + 37, 'AI', { size: 13, weight: 700, fill: C.blue, anchor: 'middle' })
  s += svgText(MX + 62, aiY + 28, 'AI Health Score', { size: 13, weight: 700, fill: C.text })
  s += svgText(MX + 62, aiY + 45, 'Composite of live signals', { size: 11, weight: 400, fill: C.textSecondary })
  s += svgText(W - MX, aiY + 40, '91', { size: 26, weight: 800, fill: C.blue, anchor: 'end' })
  s += statusPill(W - MX - 48, aiY + 48, 48, 16, 'LIVE', C.blue, C.blueSoft)
  const bx = MX + 14
  const bw = CW - 28
  const by = aiY + 64 - 12
  s += svgRoundRect(bx, by, bw, 5, 2.5, C.line)
  s += svgRoundRect(bx, by, (bw * 91) / 100, 5, 2.5, 'url(#grad-blue)')

  // key vitals
  const vitLabelY = aiY + 64 + 14
  s += sectionLabel(vitLabelY, 'VITALS', '4 key')
  const vitY = vitLabelY + 22
  const tw = (CW - 12) / 2
  const th = 100
  s += statTile(MX, vitY, tw, th, 'Body Temp', '36.8', '°C', C.blue, C.blueSoft, 62, 'Normal', C.blue)
  s += statTile(MX + tw + 12, vitY, tw, th, 'Heart Rate', '72', 'bpm', C.green, C.greenSoft, 48, 'Stable', C.green)
  s += statTile(MX, vitY + th + 10, tw, th, 'Heat Index', '34', '°C', C.red, C.redSoft, 68, 'Caution', C.red)
  s += statTile(MX + tw + 12, vitY + th + 10, tw, th, 'Respiration', '16', '/min', C.green, C.greenSoft, 53, 'Eupnea', C.green)

  // actions pinned to bottom
  const actionsTop = H - 24 - (50 + 10 + 38)
  s += svgRoundRect(MX, actionsTop, CW, 50, 14, C.blue, '', 1, 'sh-blue')
  s += svgText(W / 2, actionsTop + 32, 'Start New Scan', { size: 16, weight: 700, fill: C.white, anchor: 'middle' })
  const smallY = actionsTop + 50 + 10
  const aw = (CW - 16) / 3
  const actions = ['Export', 'History', 'Settings']
  actions.forEach((a, i) => {
    s += svgRoundRect(MX + i * (aw + 8), smallY, aw, 38, 12, C.blueSoft)
    s += svgText(MX + i * (aw + 8) + aw / 2, smallY + 25, a, { size: 12, weight: 700, fill: C.blue, anchor: 'middle' })
  })

  s += '</g>'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}${s}</svg>`
}

export function detailedDashboardSVG(width = 420): string {
  const W = width, MX = 18, CW = W - MX * 2
  const wide = W >= 520
  const defs = `<defs>
    <linearGradient id="grad-blue" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.blueSoft}"/><stop offset="1" stop-color="${C.blue}"/></linearGradient>
    <clipPath id="scr2"><rect x="0" y="0" width="${W}" height="1400" rx="38"/></clipPath>
    <filter id="sh-card" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#10131A" flood-opacity="0.08"/><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#10131A" flood-opacity="0.06"/></filter>
    <filter id="sh-blue" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0A84FF" flood-opacity="0.30"/></filter>
  </defs>`
  let s = ''
  s += svgRect(0, 0, W, 1400, { fill: C.bg })
  s += '<g clip-path="url(#scr2)">'
  let y = 20

  // header
  s += svgText(MX, y + 14, 'Project DELTA', { size: 17, weight: 800, fill: C.text })
  s += svgText(MX, y + 30, 'AI Health Monitoring', { size: 11, weight: 400, fill: C.textSecondary })
  s += svgCircle(MX + 110, y + 12, 4, C.green)
  s += svgText(MX + 120, y + 16, 'Connected', { size: 11, weight: 700, fill: C.green })
  s += svgText(W - MX, y + 14, '9:41', { size: 12, weight: 700, fill: C.text, anchor: 'end' })
  s += svgText(W - MX, y + 28, 'Mon, Jul 20', { size: 10, weight: 400, fill: C.textSecondary, anchor: 'end' })
  y += 42

  // patient summary
  s += svgCard(MX, y, CW, 92)
  s += svgCircle(MX + 48, y + 46, 30, `url(#grad-blue)`)
  s += svgText(MX + 48, y + 52, 'JD', { size: 18, weight: 800, fill: '#fff', anchor: 'middle' })
  s += svgText(MX + 84, y + 34, 'Juan Dela Cruz', { size: 17, weight: 750, fill: C.text })
  s += svgText(MX + 84, y + 52, 'Student ID · 2023-0142', { size: 12, weight: 400, fill: C.textSecondary })
  s += statusPill(MX + CW - 86, y + 18, 70, 20, 'LOW', C.green, C.greenSoft)
  s += svgRing(MX + CW - 38, y + 46, 26, 0.91, C.blue, 6)
  s += svgText(MX + CW - 38, y + 42, '91', { size: 16, weight: 800, fill: C.text, anchor: 'middle' })
  y += 92 + 14

  // vitals
  s += sectionLabel(y, 'VITAL SIGNS', 'key signals')
  y += 22
  const vits = [
    ['Hydration', '87', '%', C.green, C.greenSoft, 87],
    ['Blood Oxygen', '98', '%', C.green, C.greenSoft, 92],
    ['Heart Rate', '72', 'bpm', C.green, C.greenSoft, 48],
    ['Body Temp', '36.8', '°C', C.blue, C.blueSoft, 62],
  ]
  const vCols = wide ? 4 : 2
  const vw = (CW - (vCols - 1) * 12) / vCols
  const vh = 86
  vits.forEach((v, i) => {
    const x = MX + (i % vCols) * (vw + 12)
    const vy = y + Math.floor(i / vCols) * (vh + 10)
    s += statTile(x, vy, vw, vh, v[0] as string, v[1] as string, v[2] as string, v[3] as string, v[4] as string, v[5] as number, `Updated`, v[3] as string)
  })
  y += Math.ceil(vits.length / vCols) * (vh + 10) + 16

  // AI analysis
  s += sectionLabel(y, 'AI ANALYSIS', 'live')
  y += 22
  const aiRows = [['Human Detection', '96%', 96], ['Hydration Analysis', 'Optimal', 87], ['Stress Analysis', 'Low', 34]]
  const aCols = wide ? 3 : 2
  const aRows = Math.ceil(aiRows.length / aCols)
  const cardH = 44 + aRows * 46
  s += svgCard(MX, y, CW, cardH)
  s += svgCircle(MX + 22, y + 22, 5, C.green)
  s += svgText(MX + 34, y + 26, 'Signs of Life · Detected', { size: 13, weight: 700, fill: C.text })
  const colW = (CW - 32 - (aCols - 1) * 18) / aCols
  aiRows.forEach((r, i) => {
    const ax = MX + 16 + (i % aCols) * (colW + 18)
    const ay = y + 50 + Math.floor(i / aCols) * 46
    s += svgText(ax, ay, r[0] as string, { size: 12, weight: 600, fill: C.textSecondary })
    s += svgText(ax + colW, ay, r[1] as string, { size: 12, weight: 700, fill: C.text, anchor: 'end' })
    s += svgRoundRect(ax, ay + 8, colW, 5, 2.5, C.line)
    s += svgRoundRect(ax, ay + 8, (colW * (r[2] as number)) / 100, 5, 2.5, 'url(#grad-blue)')
  })
  y += cardH + 16

  // recommendations
  s += sectionLabel(y, 'RECOMMENDED ACTIONS')
  y += 22
  const recs = [['Drink Water', 'Hydration 87% · 250 ml'], ['Normal Recovery', 'ETA 42 min'], ['Rest', 'Short break'], ['Monitor', 'Vitals stable']]
  const rw = (CW - 12) / 2
  const rh = 64
  recs.forEach((r, i) => {
    const x = MX + (i % 2) * (rw + 12)
    const vy = y + Math.floor(i / 2) * (rh + 10)
    s += svgCard(x, vy, rw, rh)
    s += svgRoundRect(x + 12, vy + 16, 30, 30, 9, C.blueSoft)
    s += svgText(x + 27, vy + 36, r[0].slice(0, 1), { size: 13, weight: 700, fill: C.blue, anchor: 'middle' })
    s += svgText(x + 52, vy + 24, r[0] as string, { size: 13, weight: 700, fill: C.text })
    s += svgText(x + 52, vy + 42, r[1] as string, { size: 11, weight: 400, fill: C.textSecondary })
  })
  y += Math.ceil(recs.length / 2) * (rh + 10) + 16

  s += '</g>'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${defs}${s}</svg>`
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
  s += svgRoundRect(22, btnY, ART_W - 44, 54, 16, C.blue, '', 1, 'sh-blue')
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
  s += svgRoundRect(22, y, ART_W - 44, 54, 16, C.blue, '', 1, 'sh-blue')
  s += svgText(ART_W / 2, y + 34, 'Start New Scan', { size: 17, weight: 700, fill: C.white, anchor: 'middle' })
  y += 54 + 10
  const bw = (ART_W - 44 - 12) / 2
  s += svgRoundRect(22, y, bw, 48, 16, C.blueSoft)
  s += svgText(22 + bw / 2, y + 30, 'Print Report', { size: 14, weight: 700, fill: C.blue, anchor: 'middle' })
  s += svgRoundRect(22 + bw + 12, y, bw, 48, 16, C.blueSoft)
  s += svgText(22 + bw + 12 + bw / 2, y + 30, 'Export', { size: 14, weight: 700, fill: C.blue, anchor: 'middle' })
  return svgFrame(s)
}
