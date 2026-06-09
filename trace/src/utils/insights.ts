import type { Expense, CategoryBreakdown } from '../types'
import { CATEGORY_ICONS } from '../types'

export function generateCategoryBreakdown(expenses: Expense[]): CategoryBreakdown[] {
  if (expenses.length === 0) return []

  const categoryTotals: Record<string, number> = {}
  for (const expense of expenses) {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount
  }

  const total = Object.values(categoryTotals).reduce((sum, v) => sum + v, 0)

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      emoji: CATEGORY_ICONS[category] ?? '📦',
      amount,
      percentage: Math.round((amount / total) * 1000) / 10,
    }))
    .sort((a, b) => b.amount - a.amount)
}
