import { useState } from 'react'
import AppHeader from './components/AppHeader'
import BudgetSection from './components/BudgetSection'
import BudgetForm from './components/BudgetForm'
import OverviewMetrics from './components/OverviewMetrics'
import InsightsPanel from './components/InsightsPanel'
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import ConfirmDialog from './components/ConfirmDialog'
import FilterPopup, { DEFAULT_FILTER } from './components/FilterPopup'
import type { FilterState, SortOption } from './components/FilterPopup'
import { useBudget } from './hooks/useBudget'
import { useExpenses } from './hooks/useExpenses'
import { generateCategoryBreakdown } from './utils/insights'
import type { Expense, ExpenseInput } from './types'

function App() {
  const { budget, setBudget } = useBudget()
  const { expenses, monthlyExpenses, totalSpent, addExpense, updateExpense, removeExpense } = useExpenses()
  const categoryBreakdown = generateCategoryBreakdown(monthlyExpenses)
  const [budgetFormOpen, setBudgetFormOpen] = useState(false)
  const [expenseFormOpen, setExpenseFormOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER)
  const [filterPopupOpen, setFilterPopupOpen] = useState(false)

  const remaining = budget - totalSpent

  const handleSaveBudget = (amount: number) => {
    setBudget(amount)
    setBudgetFormOpen(false)
  }

  const handleOpenAddExpense = () => {
    setEditingExpense(null)
    setExpenseFormOpen(true)
  }

  const handleSaveExpense = (input: ExpenseInput) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, input)
    } else {
      addExpense(input)
    }
    setExpenseFormOpen(false)
    setEditingExpense(null)
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setExpenseFormOpen(true)
  }

  const handleDeleteExpense = (expense: Expense) => {
    setDeletingExpense(expense)
  }

  const handleConfirmDelete = () => {
    if (deletingExpense) {
      removeExpense(deletingExpense.id)
      setDeletingExpense(null)
    }
  }

  const filtered = expenses
    .filter((e) => {
      if (filters.category === '') return true
      return e.category === filters.category
    })
    .sort((a, b) => {
      switch (filters.sortBy as SortOption) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'highest':
          return b.amount - a.amount
        case 'lowest':
          return a.amount - b.amount
      }
    })

  return (
    <div className="min-h-svh bg-bg flex flex-col pb-24">
      <AppHeader />

      <div className="mx-auto w-full max-w-[1200px]">
        <BudgetSection
          budget={budget}
          totalSpent={totalSpent}
          onSetBudget={() => setBudgetFormOpen(true)}
          onEditBudget={() => setBudgetFormOpen(true)}
        />

        <BudgetForm
          key={String(budgetFormOpen)}
          open={budgetFormOpen}
          currentBudget={budget}
          onSave={handleSaveBudget}
          onCancel={() => setBudgetFormOpen(false)}
        />

        <OverviewMetrics
          budget={budget}
          totalSpent={totalSpent}
          remaining={remaining}
        />

        <InsightsPanel categoryBreakdown={categoryBreakdown} />

        <ExpenseList
          expenses={filtered}
          totalCount={expenses.length}
          filters={filters}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
          onOpenFilter={() => setFilterPopupOpen(true)}
        />

        <FilterPopup
          open={filterPopupOpen}
          current={filters}
          onApply={(newFilters) => {
            setFilters(newFilters)
            setFilterPopupOpen(false)
          }}
          onCancel={() => setFilterPopupOpen(false)}
        />
      </div>

      {expenseFormOpen && (
        <ExpenseForm
          key={editingExpense ? editingExpense.id : 'new'}
          initial={editingExpense ?? undefined}
          onSave={handleSaveExpense}
          onCancel={() => { setExpenseFormOpen(false); setEditingExpense(null) }}
        />
      )}

      <ConfirmDialog
        open={deletingExpense !== null}
        title="Delete Expense?"
        message="This expense will be permanently removed."
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingExpense(null)}
      />

      <button
        type="button"
        onClick={handleOpenAddExpense}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-primary-dark active:scale-95 transition-all z-40"
        aria-label="Add expense"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  )
}

export default App
