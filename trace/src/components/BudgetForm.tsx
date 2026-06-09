import { useState, useEffect, useRef } from 'react'
import { formatCurrency } from '../utils/format'

interface BudgetFormProps {
  open: boolean
  currentBudget: number
  onSave: (amount: number) => void
  onCancel: () => void
}

export default function BudgetForm({ open, currentBudget, onSave, onCancel }: BudgetFormProps) {
  const [input, setInput] = useState(currentBudget > 0 ? String(currentBudget) : '')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onCancel()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onCancel])

  if (!open) return null

  const isEditing = currentBudget > 0
  const parsed = parseFloat(input)
  const isValid = !isNaN(parsed) && parsed > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSave(parsed)
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center z-50">
      <div className="bg-card rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 pb-8 sm:pb-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Monthly Budget' : 'Set Monthly Budget'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="budget-amount" className="block text-sm font-medium text-gray-600 mb-1.5">
              Monthly Budget Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                ₦
              </span>
              <input
                ref={inputRef}
                id="budget-amount"
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="0"
                min="0"
                step="100"
                required
                className="w-full pl-8 pr-3 py-3 border border-gray-200 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            {isValid && (
              <p className="text-xs text-gray-400 mt-1.5">
                {formatCurrency(parsed)} per month
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? 'Update Budget' : 'Set Budget'}
          </button>
        </form>
      </div>
    </div>
  )
}
