import { formatCurrency } from '../utils/format'
import type { BudgetHealth } from '../types'
import ProgressBar from './ProgressBar'

interface BudgetSectionProps {
  budget: number
  totalSpent: number
  onSetBudget: () => void
  onEditBudget: () => void
}

function getHealth(pct: number): BudgetHealth {
  if (pct >= 100) return 'exceeded'
  if (pct >= 70) return 'approaching'
  return 'under'
}

function getHealthMessage(health: BudgetHealth): { icon: string; text: string } {
  switch (health) {
    case 'under':
      return {
        icon: '👍',
        text: "You're within budget. Keep tracking your spending.",
      }
    case 'approaching':
      return {
        icon: '⚠️',
        text: "You're getting close to your budget limit. Spend carefully.",
      }
    case 'exceeded':
      return {
        icon: '🚨',
        text: "You've exceeded your monthly budget.",
      }
  }
}

const HEALTH_BAR_COLORS: Record<BudgetHealth, 'primary' | 'warning' | 'danger'> = {
  under: 'primary',
  approaching: 'warning',
  exceeded: 'danger',
}

const HEALTH_MESSAGE_COLORS: Record<BudgetHealth, string> = {
  under: 'text-primary-dark',
  approaching: 'text-amber',
  exceeded: 'text-danger',
}

export default function BudgetSection({ budget, totalSpent, onSetBudget, onEditBudget }: BudgetSectionProps) {
  if (budget === 0) {
    return (
    <section className="px-4 mb-6">
        <div className="bg-card rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <span className="text-4xl mb-4">💰</span>
          <h2 className="text-lg font-semibold text-gray-800">
            You haven't set a monthly budget yet.
          </h2>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Set a budget to know exactly how much you can spend each month and stay on track.
          </p>
          <button
            type="button"
            onClick={onSetBudget}
            className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark active:scale-[0.98] transition-all"
          >
            Set Your First Budget
          </button>
        </div>
      </section>
    )
  }

  const pct = totalSpent / budget
  const clampedPct = Math.min(pct, 1)
  const health = getHealth(pct * 100)
  const message = getHealthMessage(health)
  const barColor = HEALTH_BAR_COLORS[health]
  const messageColor = HEALTH_MESSAGE_COLORS[health]

  return (
    <section className="px-4 mb-8">
      <div className="bg-card rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-gray-500">Monthly Budget</span>
          <button
            type="button"
            onClick={onEditBudget}
            className="text-sm text-primary font-medium hover:underline transition-colors"
          >
            Edit
          </button>
        </div>

        <div className="text-2xl font-bold text-gray-900 mb-5">
          {formatCurrency(budget)}
        </div>

        <div className="mb-3">
          <ProgressBar percentage={clampedPct * 100} colorScheme={barColor} />
        </div>

        <div className={`flex items-start gap-2 text-sm font-medium ${messageColor}`}>
          <span className="text-base leading-none mt-0.5">{message.icon}</span>
          <span>{message.text}</span>
        </div>
      </div>
    </section>
  )
}
