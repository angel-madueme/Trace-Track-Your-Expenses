interface ProgressBarProps {
  percentage: number
  text?: string
  colorScheme?: 'primary' | 'warning' | 'danger'
}

const COLOR_CLASSES: Record<string, { track: string; fill: string; badge: string }> = {
  primary: { track: 'bg-primary/15', fill: 'bg-primary', badge: 'bg-primary text-white' },
  warning: { track: 'bg-[#F9930E]/15', fill: 'bg-[#F9930E]', badge: 'bg-[#F9930E] text-white' },
  danger: { track: 'bg-danger/15', fill: 'bg-danger', badge: 'bg-danger text-white' },
}

export default function ProgressBar({ percentage, text, colorScheme = 'primary' }: ProgressBarProps) {
  const pct = Math.min(Math.max(percentage, 0), 100)
  const displayText = text ?? `${Math.round(pct)}%`
  const colors = COLOR_CLASSES[colorScheme] ?? COLOR_CLASSES.primary

  return (
    <div className="relative w-full">
      <div className={`h-2 ${colors.track} rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full ${colors.fill} transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div
        className={`absolute top-1/2 ${colors.badge} text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap transition-all duration-300 pointer-events-none z-10`}
        style={{
          left: `${pct}%`,
          transform: `translate(${pct > 85 ? '-100%' : pct < 15 ? '0' : '-50%'}, -50%)`,
        }}
      >
        {displayText}
      </div>
    </div>
  )
}
