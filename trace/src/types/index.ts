export const CATEGORIES = [
  'Food',
  'Transport',
  'Data & Airtime',
  'Shopping',
  'Bills',
  'Health',
  'Entertainment',
  'Other',
] as const

export const CATEGORY_ICONS: Record<string, string> = {
  Food: '🍔',
  Transport: '🚕',
  'Data & Airtime': '📶',
  Shopping: '🛒',
  Bills: '💡',
  Health: '🏥',
  Entertainment: '🎉',
  Other: '📦',
}

export type Category = (typeof CATEGORIES)[number]

export interface Expense {
  id: string
  name: string
  amount: number
  category: Category
  date: string
  createdAt: string
  updatedAt: string
}

export type BudgetStore = Record<string, number>

export interface ExpenseInput {
  name: string
  amount: number
  category: Category
  date: string
}

export interface MonthlySummary {
  budget: number
  totalSpent: number
  remaining: number
  isOverBudget: boolean
}

export type BudgetHealth = 'under' | 'approaching' | 'exceeded'

export interface CategoryBreakdown {
  category: string
  emoji: string
  amount: number
  percentage: number
}
