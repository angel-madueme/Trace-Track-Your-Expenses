import { formatCurrency } from '../utils/format'

interface OverviewMetricsProps {
  budget: number
  totalSpent: number
  remaining: number
}

export default function OverviewMetrics({ budget, totalSpent, remaining }: OverviewMetricsProps) {
  if (budget === 0 && totalSpent === 0) {
    return (
      <section className="px-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-500 mb-2 px-1">
          Overview
        </h2>
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <span className="text-4xl mb-4">📊</span>
            <h2 className="text-lg font-semibold text-gray-800">Set a budget to see your spending overview.</h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-500 mb-2 px-1">
        Overview
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs font-medium text-gray-500">Total Spent</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs font-medium text-gray-500">Remaining Budget</p>
          <p className={`text-xl font-bold mt-1 ${remaining >= 0 ? 'text-primary' : 'text-danger'}`}>
            {budget > 0 ? formatCurrency(Math.max(remaining, 0)) : '—'}
          </p>
        </div>
      </div>
    </section>
  )
}
