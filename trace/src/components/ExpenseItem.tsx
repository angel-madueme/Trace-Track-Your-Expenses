import { useState, useRef, useEffect } from 'react'
import type { Expense } from '../types'
import { CATEGORY_ICONS } from '../types'
import { formatCurrency } from '../utils/format'

interface ExpenseItemProps {
  expense: Expense
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
}

export default function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const handleToggle = () => {
    if (!menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const menuHeight = 104
      const upwards = spaceBelow < menuHeight && rect.top > menuHeight
      setMenuPos({
        top: upwards ? rect.top - 8 : rect.bottom + 8,
        right: window.innerWidth - rect.right + 4,
      })
    }
    setMenuOpen((prev) => !prev)
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-50 last:border-b-0">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <span className="text-lg leading-none">{CATEGORY_ICONS[expense.category] ?? '📦'}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{expense.name}</p>
        <p className="text-xs text-gray-400">{expense.category}</p>
      </div>

      <div className="text-sm font-semibold text-gray-800 whitespace-nowrap">
        {formatCurrency(expense.amount)}
      </div>

      <div className="relative flex-shrink-0">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg"
          aria-label="Expense actions"
          aria-expanded={menuOpen}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            className="fixed bg-white rounded-lg shadow-lg border border-gray-100 py-1 w-36 z-50"
            style={{ top: menuPos.top, right: menuPos.right }}
          >
            <button
              type="button"
              onClick={() => { setMenuOpen(false); onEdit(expense) }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              Edit
            </button>
            <button
              type="button"
              onClick={() => { setMenuOpen(false); onDelete(expense) }}
              className="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-red-50 transition-colors flex items-center gap-2.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
