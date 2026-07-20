import type { CSSProperties } from 'react'

type IconProps = {
  size?: number
  color?: string
  strokeWidth?: number
  style?: CSSProperties
}

const base = (size: number): CSSProperties => ({
  width: size,
  height: size,
  display: 'block',
  flexShrink: 0,
})

export function DropIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 3.5C12 3.5 5.5 10.5 5.5 14.7a6.5 6.5 0 0 0 13 0C18.5 10.5 12 3.5 12 3.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

export function BoltIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M13 3 5 13.5h5.5L10 21l8-10.5h-5.5L13 3Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

export function ThermometerIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M14.5 13.5V5.5a2.5 2.5 0 1 0-5 0v8a4.5 4.5 0 1 0 5 0Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M12 8.5v6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function HeartIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 20s-7-4.6-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7 2.7C19 15.4 12 20 12 20Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

export function WaveIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M3 12c2 0 2-5 4-5s2 10 4 10 2-10 4-10 2 5 4 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SparkleIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 3.5c.4 3.3 1.7 4.6 5 5-3.3.4-4.6 1.7-5 5-.4-3.3-1.7-4.6-5-5 3.3-.4 4.6-1.7 5-5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M18.5 13.5c.2 1.6.8 2.2 2.5 2.5-1.7.3-2.3.9-2.5 2.5-.2-1.6-.8-2.2-2.5-2.5 1.7-.3 2.3-.9 2.5-2.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

export function SunIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth={strokeWidth} />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function DeviceIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <rect x="6" y="3.5" width="12" height="17" rx="3" stroke={color} strokeWidth={strokeWidth} />
      <path d="M10 18h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function ScanIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M4 12h16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function UserIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <circle cx="12" cy="8.5" r="3.5" stroke={color} strokeWidth={strokeWidth} />
      <path d="M5 19.5a7 7 0 0 1 14 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function ClockIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth={strokeWidth} />
      <path d="M12 7.5V12l3 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LeafIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M5 19c0-7 5-12 14-12 0 9-5 14-12 14-1.5 0-2-.5-2-3Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M9 15c2-3 4.5-5 8-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function PrinterIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M7 9V4h10v5" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <rect x="4" y="9" width="16" height="8" rx="2" stroke={color} strokeWidth={strokeWidth} />
      <path d="M7 14h10v6H7z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

export function ExportIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 15V4m0 0L8.5 7.5M12 4l3.5 3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function CheckIcon({ size = 24, color = 'currentColor', strokeWidth = 2, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M5 12.5 10 17l9-10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CloseIcon({ size = 24, color = 'currentColor', strokeWidth = 2, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function ChevronRightIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M9 5l7 7-7 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FlaskIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M9 3v6l-4 8.5A2 2 0 0 0 6.8 21h10.4a2 2 0 0 0 1.7-3.5L15 9V3" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M8.5 3h7M7.5 15h9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function BatteryIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <rect x="3" y="8" width="16" height="9" rx="2.5" stroke={color} strokeWidth={strokeWidth} />
      <path d="M21 11.5v2a1.5 1.5 0 0 0 0-2Z" fill={color} />
      <path d="M6 11.5h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function SignalIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M4 18v-2M9 18v-5M14 18v-8M19 18V7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function GpsIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function CameraIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2L10 4h4l1.5 2h2A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="12" cy="12.5" r="3.2" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  )
}

export function CpuIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <rect x="7" y="7" width="10" height="10" rx="2.5" stroke={color} strokeWidth={strokeWidth} />
      <rect x="10" y="10" width="4" height="4" rx="1" stroke={color} strokeWidth={strokeWidth} />
      <path d="M9.5 7V4M14.5 7V4M9.5 20v-3M14.5 20v-3M7 9.5H4M7 14.5H4M20 9.5h-3M20 14.5h-3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function ChipIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <rect x="8" y="8" width="8" height="8" rx="2" stroke={color} strokeWidth={strokeWidth} />
      <path d="M10 4v2M14 4v2M10 18v2M14 18v2M4 10h2M4 14h2M18 10h2M18 14h2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function LungIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 4v7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M12 11c-.7 2-2.4 2.6-3.6 3.6-1.5 1.2-2.4 3-2.4 5 0 1 .8 1.4 1.8 1.4 2 0 3.2-1.8 3.8-3.8.4-1.3.4-2.6.4-4.2Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M12 11c.7 2 2.4 2.6 3.6 3.6 1.5 1.2 2.4 3 2.4 5 0 1-.8 1.4-1.8 1.4-2 0-3.2-1.8-3.8-3.8-.4-1.3-.4-2.6-.4-4.2Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  )
}

export function SkinIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 3.5C8 5 5.5 8.5 5.5 12a6.5 6.5 0 0 0 13 0c0-1.4-.4-2.6-1-3.8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 12c0 3.6 2.9 6.5 6.5 6.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function AlertIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 4 3 19h18L12 4Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M12 10v4M12 17h.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function HistoryIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M5 3.5V8h4.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7.5V12l3 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SettingsIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
      <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function ActivityIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M3 12h4l2.5 7 5-14L17 12h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ShieldIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 3.5 5 6v5.5c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-2.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon({ size = 24, color = 'currentColor', strokeWidth = 2, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function WifiIcon({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <path d="M4 9.5a13 13 0 0 1 16 0M7 13a8.5 8.5 0 0 1 10 0M10 16.5a4 4 0 0 1 4 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="12" cy="19.5" r="1.2" fill={color} />
    </svg>
  )
}

export function PulseDot({ size = 24, color = 'currentColor', strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={{ ...base(size), ...style }} fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} opacity="0.35" />
      <circle cx="12" cy="12" r="3.5" fill={color} />
    </svg>
  )
}
