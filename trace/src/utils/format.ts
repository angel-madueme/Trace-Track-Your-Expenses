export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString('en-US')}`
}

export function formatPercent(ratio: number): string {
  return `${Math.min(Math.round(ratio * 100), 999)}%`
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
