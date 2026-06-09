import { useLocalStorage } from './useLocalStorage'
import { getCurrentMonthKey } from '../utils/date'
import type { BudgetStore } from '../types'

export function useBudget() {
  const [budgets, setBudgets] = useLocalStorage<BudgetStore>('budget', {})

  const monthKey = getCurrentMonthKey()
  const budget = budgets[monthKey] ?? 0

  const setBudget = (amount: number) => {
    setBudgets({ ...budgets, [monthKey]: amount })
  }

  return { budget, setBudget }
}
