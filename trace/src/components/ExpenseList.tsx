import type { Expense } from '../types'
import ExpenseItem from './ExpenseItem'
import EmptyState from './EmptyState'
import type { FilterState } from './FilterPopup'

interface ExpenseListProps {
  expenses: Expense[]
  totalCount: number
  filters: FilterState
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
  onOpenFilter: () => void
}

export default function ExpenseList({ expenses, totalCount, filters, onEdit, onDelete, onOpenFilter }: ExpenseListProps) {
  if (totalCount === 0) {
    return (
      <section className="px-4">
        <EmptyState
          icon="📋"
          title="No expenses yet"
          description="Add your first expense and begin tracking where your money goes."
        />
      </section>
    )
  }

  if (expenses.length === 0) {
    return (
      <section className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-sm font-bold text-gray-500">
            Recent Expenses
          </h2>
          <button
            type="button"
            onClick={onOpenFilter}
            className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg"
            aria-label="Filter expenses"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
          </button>
        </div>
        <EmptyState
          icon="🔍"
          title="No matching expenses"
          description="Try adjusting your filters to see more results."
        />
      </section>
    )
  }

  const hasActiveFilters = filters.category !== '' || filters.sortBy !== 'newest'

  return (
    <section className="px-4 mb-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <h2 className="text-sm font-bold text-gray-500">
          Recent Expenses
        </h2>
        <button
          type="button"
          onClick={onOpenFilter}
          className={`p-1.5 transition-colors rounded-lg ${hasActiveFilters ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          aria-label="Filter expenses"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
        </button>
      </div>
      <div className="bg-card rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  )
}
