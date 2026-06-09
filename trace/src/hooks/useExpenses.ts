import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { isCurrentMonth } from '../utils/date'
import type { Expense, ExpenseInput } from '../types'

export function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', [])

  const addExpense = useCallback(
    (input: ExpenseInput) => {
      const now = new Date().toISOString()
      const expense: Expense = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: now,
        updatedAt: now,
      }
      setExpenses([expense, ...expenses])
    },
    [expenses, setExpenses],
  )

  const updateExpense = useCallback(
    (id: string, input: ExpenseInput) => {
      setExpenses(
        expenses.map((e) =>
          e.id === id
            ? { ...e, ...input, updatedAt: new Date().toISOString() }
            : e,
        ),
      )
    },
    [expenses, setExpenses],
  )

  const removeExpense = useCallback(
    (id: string) => {
      setExpenses(expenses.filter((e) => e.id !== id))
    },
    [expenses, setExpenses],
  )

  const monthlyExpenses = expenses.filter((e) => isCurrentMonth(e.date))

  const totalSpent = monthlyExpenses.reduce((sum, e) => sum + e.amount, 0)

  return {
    expenses,
    monthlyExpenses,
    totalSpent,
    addExpense,
    updateExpense,
    removeExpense,
  }
}
