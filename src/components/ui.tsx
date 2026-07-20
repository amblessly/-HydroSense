import type { CSSProperties, ReactNode } from 'react'
import { COLORS, RADIUS, SHADOW } from '../design'

type CardProps = {
  children: ReactNode
  style?: CSSProperties
  glass?: boolean
  padding?: number
}

export function Card({ children, style, glass, padding = 18 }: CardProps) {
  return (
    <div
      style={{
        background: glass ? 'rgba(255,255,255,0.55)' : COLORS.card,
        borderRadius: RADIUS.card,
        padding,
        boxShadow: glass ? SHADOW.glass : SHADOW.card,
        border: glass ? `1px solid ${COLORS.glassBorder}` : 'none',
        backdropFilter: glass ? 'saturate(180%) blur(20px)' : undefined,
        WebkitBackdropFilter: glass ? 'saturate(180%) blur(20px)' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  full?: boolean
  icon?: ReactNode
  style?: CSSProperties
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  full,
  icon,
  style,
}: ButtonProps) {
  const styles: Record<string, CSSProperties> = {
    primary: {
      background: COLORS.blue,
      color: '#fff',
      boxShadow: SHADOW.blue,
    },
    secondary: {
      background: COLORS.blueSoft,
      color: COLORS.blue,
      boxShadow: 'none',
    },
    ghost: {
      background: COLORS.card,
      color: COLORS.text,
      boxShadow: SHADOW.soft,
    },
  }
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: full ? '100%' : undefined,
        padding: '16px 22px',
        borderRadius: RADIUS.btn,
        fontSize: 17,
        fontWeight: 600,
        fontFamily: 'inherit',
        border: 'none',
        cursor: 'pointer',
        letterSpacing: 0.2,
        ...styles[variant],
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  )
}

type HeaderProps = {
  title?: string
  subtitle?: string
  onProfile?: () => void
  logo?: ReactNode
}

export function Header({ title = 'HydroSense', subtitle, onProfile, logo }: HeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: COLORS.blue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: SHADOW.blue,
          }}
        >
          {logo ?? <span style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>H</span>}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, letterSpacing: 0.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12.5, color: COLORS.textSecondary, marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      <button
        onClick={onProfile}
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          background: COLORS.card,
          boxShadow: SHADOW.soft,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.blue }}>JD</span>
      </button>
    </div>
  )
}

type StepProps = { current: number; total?: number }

export function StepIndicator({ current, total = 4 }: StepProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 18 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 6,
            width: i + 1 === current ? 28 : 6,
            borderRadius: 999,
            background: i + 1 <= current ? COLORS.blue : COLORS.textTertiary,
            transition: 'all 0.3s ease',
          }}
        />
      ))}
      <span style={{ marginLeft: 10, fontSize: 13, color: COLORS.textSecondary, fontWeight: 600 }}>
        {current} of {total}
      </span>
    </div>
  )
}

type StatProps = {
  icon: ReactNode
  label: string
  value: string
  unit?: string
  accent?: string
  soft?: string
  progress?: number
  status?: string
  statusColor?: string
}

export function StatTile({ icon, label, value, unit, accent = COLORS.blue, soft = COLORS.blueSoft, progress, status, statusColor }: StatProps) {
  return (
    <div
      style={{
        background: COLORS.card,
        borderRadius: 18,
        padding: 16,
        boxShadow: SHADOW.soft,
        flex: '1 1 0',
        minWidth: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: accent, display: 'flex' }}>{icon}</span>
        </div>
        <span style={{ fontSize: 12.5, color: COLORS.textSecondary, fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: COLORS.text, letterSpacing: 0.3 }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: 600 }}>{unit}</span>}
      </div>
      {progress !== undefined && (
        <div style={{ height: 6, borderRadius: 999, background: COLORS.line, marginTop: 10, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, Math.max(0, progress))}%`, height: '100%', borderRadius: 999, background: accent }} />
        </div>
      )}
      {status && (
        <div style={{ marginTop: 10, fontSize: 12, fontWeight: 600, color: statusColor ?? COLORS.textSecondary }}>{status}</div>
      )}
    </div>
  )
}

export function SectionTitle({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 2px 12px' }}>
      {icon && <span style={{ color: COLORS.blue, display: 'flex' }}>{icon}</span>}
      <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{children}</span>
    </div>
  )
}

export function RecommendationRow({ icon, title, text, accent = COLORS.blue, soft = COLORS.blueSoft }: { icon: ReactNode; title: string; text: string; accent?: string; soft?: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${COLORS.line}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: soft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: accent, display: 'flex' }}>{icon}</span>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: COLORS.text }}>{title}</div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2, lineHeight: 1.4 }}>{text}</div>
      </div>
    </div>
  )
}
