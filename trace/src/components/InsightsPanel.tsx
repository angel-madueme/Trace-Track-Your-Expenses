import { useState } from 'react'
import { formatCurrency } from '../utils/format'
import type { CategoryBreakdown } from '../types'
import ProgressBar from './ProgressBar'

interface InsightsPanelProps {
  categoryBreakdown: CategoryBreakdown[]
}

export default function InsightsPanel({ categoryBreakdown }: InsightsPanelProps) {
  const [popupOpen, setPopupOpen] = useState(false)
  const hasData = categoryBreakdown.length > 0
  const largest = hasData ? categoryBreakdown[0] : null

  return (
    <>
      <section className="px-4 mb-3">
        <div className="bg-primary-light rounded-2xl p-4 border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-500">
              Spending Insights
            </h2>
            {hasData && (
              <button
                type="button"
                onClick={() => setPopupOpen(true)}
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="View all insights"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 4 10 8 6 12" />
                </svg>
              </button>
            )}
          </div>
          {hasData && largest ? (
            <div>
              <span className="inline-block bg-white/30 rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-600 mb-2">Largest Category</span>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{largest.emoji}</span>
                <span className="text-sm font-semibold text-gray-800">{largest.category}</span>
              </div>
              <p className="text-sm text-gray-700">
                {largest.percentage.toFixed(1)}% of total spending
              </p>
              <p className="text-base font-bold text-gray-900 mt-0.5">
                {formatCurrency(largest.amount)}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-gray-700">No spending insights yet.</p>
              <p className="text-sm text-gray-500 mt-0.5">
                Add a few expenses to discover your spending patterns.
              </p>
            </div>
          )}
        </div>
      </section>

      {popupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-sm p-6 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Spending Insights</h2>
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {largest && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Largest Category</p>
                <div className="bg-primary-light rounded-xl p-4 border border-primary/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{largest.emoji}</span>
                    <span className="text-base font-semibold text-gray-800">{largest.category}</span>
                  </div>
                  <p className="text-sm text-gray-600">{largest.percentage.toFixed(1)}% of total spending</p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">{formatCurrency(largest.amount)}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Top Categories</p>
              <div className="space-y-4">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{cat.emoji}</span>
                        <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{formatCurrency(cat.amount)}</span>
                    </div>
                    <ProgressBar
                      percentage={cat.percentage}
                      text={`${cat.percentage.toFixed(1)}%`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
