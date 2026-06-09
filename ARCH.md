# Trace — Architecture & Build Plan

**Tagline:** Know where your money goes.
**Tech Stack:** React / TypeScript / Tailwind CSS / localStorage

---

## Section 1: User Flow

### 1.1 First-Time User

```
Open app
  │
  ▼
┌──────────────────────────────────────┐
│  Empty State 1: "Welcome to Trace"   │
│  "Set a monthly budget to get        │
│   started and know where your        │
│   money goes."                       │
│                                      │
│  [ Set Your First Budget ]           │
└──────────────────────────────────────┘
  │
  ▼  Tap CTA
  │
┌──────────────────────────────────────┐
│  Budget input appears (inline)      │
│  │  Enter amount                     │
│  │  Tap "Save"                       │
│  ▼                                   │
│  Budget saved to localStorage        │
└──────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────┐
│  Dashboard (now has budget)          │
│  ┌─────────────────────┐             │
│  │ Budget:  ₦100,000   │             │
│  │ Spent:  ₦0          │             │
│  │ Left:   ₦100,000    │             │
│  └─────────────────────┘             │
│                                      │
│  Empty State 2: "No expenses yet"    │
│  "Tap + to add your first expense."  │
│                                      │
│  [ + Add Expense ]                   │
└──────────────────────────────────────┘
```

### 1.2 Setting Budget

```
From dashboard:
  │
  ▼  Tap budget amount
  │
┌──────────────────────────────────────┐
│  Budget becomes editable (inline)    │
│  │  Modify amount                    │
│  │  Tap "Save" or press Enter        │
│  ▼                                   │
│  Updated in localStorage             │
│  Dashboard recalculates              │
└──────────────────────────────────────┘
```

### 1.3 Adding an Expense

```
From dashboard:
  │
  ▼  Tap "Add Expense" / FAB
  │
┌──────────────────────────────────────┐
│  Expense form (modal / slide-up)     │
│                                      │
│  Name:     [___________]  required   │
│  Amount:   [___________]  required   │
│  Category: [ Food  ▼   ]            │
│  Date:     [2026-06-08 ]  defaults   │
│                         to today     │
│  ┌──────────┐ ┌──────────┐          │
│  │  Cancel  │ │   Save   │          │
│  └──────────┘ └──────────┘          │
└──────────────────────────────────────┘
  │
  ▼  Tap "Save"
  │
  Expense saved to localStorage
  Dashboard updates:
  │  Spent:  ₦3,500
  │  Left:   ₦96,500
  │
  Expense appears at top of list
  Insights appear (if ≥2 categories used)
```

### 1.4 Viewing Dashboard

```
Always the single screen — no navigation.

┌──────────────────────────────────────┐
│  Trace                               │
│  Know where your money goes          │
├──────────────────────────────────────┤
│  Budget:  ₦100,000  [edit icon]      │
│  Spent:   ₦23,450                    │
│  Left:    ₦76,550                    │
│  (green if >0, red if negative)      │
├──────────────────────────────────────┤
│  [if expenses exist:]                │
│  ── Insights ─────────────────────── │
│  "Most spent on Food (₦8,000 — 34%)" │
├──────────────────────────────────────┤
│  [ Search expenses...       🔍 ]    │
├──────────────────────────────────────┤
│  Recent Expenses                     │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Food  -₦3,500     08 Jun 2026 │  │
│  │ 🍔 Jollof Rice    [✏️][🗑️]    │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Transport  -₦700  07 Jun 2026 │  │
│  │ 🚕 Bolt ride        [✏️][🗑️]  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

### 1.5 Viewing Insights

```
Triggered automatically once 2+ expenses 
exist. No separate screen.

Insights panel shows above the search bar:

  "You spent the most on Food this month 
   — ₦8,000 (34% of total)."

  "You have 3 days of expenses recorded."

If only 1 category used:

  "All your spending this month is in Food."

No click-through or drill-down needed.
```

### 1.6 Editing an Expense

```
From expense list:
  │
  ▼  Tap edit icon (✏️) on an expense
  │
┌──────────────────────────────────────┐
│  Expense form (modal, pre-filled)    │
│                                      │
│  Name:     [Jollof Rice      ]      │
│  Amount:   [3500              ]      │
│  Category: [ Food  ▼         ]      │
│  Date:     [2026-06-08       ]      │
│                                      │
│  ┌──────────┐ ┌──────────┐          │
│  │  Cancel  │ │  Update  │          │
│  └──────────┘ └──────────┘          │
└──────────────────────────────────────┘
  │
  ▼  Tap "Update"
  │
  Expense updated in localStorage
  Dashboard recalculates
  List re-renders
```

### 1.7 Deleting an Expense

```
From expense list:
  │
  ▼  Tap delete icon (🗑️) on an expense
  │
┌──────────────────────────────────────┐
│  Confirm Delete                      │
│                                      │
│  "Delete 'Jollof Rice' (₦3,500)?"   │
│                                      │
│  ┌──────────┐ ┌──────────┐          │
│  │  Cancel  │ │  Delete  │          │
│  └──────────┘ └──────────┘          │
└──────────────────────────────────────┘
  │
  ▼  Tap "Delete"
  │
  Expense removed from localStorage
  Dashboard recalculates
  List re-renders
  Insights re-evaluated
```

### 1.8 Updating Budget

```
From dashboard:
  │
  ▼  Tap edit icon on budget amount
  │
┌──────────────────────────────────────┐
│  Budget amount becomes editable      │
│  │  Modify                           │
│  │  Tap "Save"                       │
│  ▼                                   │
│  Budget updated in localStorage      │
│  Remaining recalculated              │
└──────────────────────────────────────┘
```

---

## Section 2: Data Schema

### 2.1 Categories

```typescript
export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Other',
] as const

export type Category = (typeof CATEGORIES)[number]
```

### 2.2 Expense

```typescript
export interface Expense {
  id: string
  name: string
  amount: number
  category: Category
  date: string       // ISO date: YYYY-MM-DD
  createdAt: string  // ISO datetime
  updatedAt: string  // ISO datetime
}
```

### 2.3 Budget

```typescript
// Stored as a record keyed by "YYYY-MM"
export type BudgetStore = Record<string, number>

// In localStorage:
// "trace_budget": { "2026-06": 100000, "2026-05": 80000 }
```

### 2.4 Storage Shape

```typescript
// Full localStorage schema
interface TraceStorage {
  trace_budget: BudgetStore   // { "YYYY-MM": amount }
  trace_expenses: Expense[]   // capped at 1 000 entries
}

// Current month helper
type MonthKey = string // "YYYY-MM"

function getCurrentMonthKey(): MonthKey {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
```

### 2.5 Form Input

```typescript
export interface ExpenseInput {
  name: string
  amount: number
  category: Category
  date: string
}

export interface BudgetInput {
  amount: number
}
```

### 2.6 Derived Types

```typescript
export interface MonthlySummary {
  budget: number
  totalSpent: number
  remaining: number
  isOverBudget: boolean
}

export interface Insight {
  label: string
  type: 'category_top' | 'single_category' | 'no_data'
}
```

---

## Section 3: Technical Architecture

### 3.1 Folder Structure

```
trace/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css               # Tailwind directives + base styles
    ├── types/
    │   └── index.ts            # All interfaces and types
    ├── utils/
    │   ├── storage.ts          # Raw localStorage read/write/parse
    │   ├── format.ts           # Currency and date formatting
    │   ├── insights.ts         # Pure function → Insight[]
    │   └── date.ts             # Month key helpers
    ├── hooks/
    │   ├── useLocalStorage.ts  # Generic localStorage React hook
    │   ├── useBudget.ts        # Budget read/write for current month
    │   └── useExpenses.ts      # Expenses CRUD hook
    └── components/
        ├── AppHeader.tsx
        ├── BudgetSection.tsx
        ├── ExpenseForm.tsx
        ├── ExpenseList.tsx
        ├── ExpenseItem.tsx
        ├── InsightsPanel.tsx
        ├── SearchBar.tsx
        ├── EmptyState.tsx
        └── ConfirmDialog.tsx
```

### 3.2 Component Responsibility

| Component | Role | State from |
|---|---|---|
| `App` | Root layout; orchestrates hooks passes data down | All hooks |
| `AppHeader` | Renders "Trace" title + tagline | None |
| `BudgetSection` | Shows budget/spent/remaining; inline edit | `useBudget` |
| `ExpenseForm` | Add/edit expense form fields; validates | Props (expense?) |
| `ExpenseList` | Maps over expenses, renders items | Props |
| `ExpenseItem` | Single row: name, amount, date, category, actions | Props |
| `InsightsPanel` | Conditionally rendered insight sentences | Props |
| `SearchBar` | Text input, calls onChange | Local state |
| `EmptyState` | Contextual empty message with CTA | Props |
| `ConfirmDialog` | Overlay confirm/cancel for delete | Props |

### 3.3 Data Flow

```
useLocalStorage(key, fallback)
  │
  ├──useBudget──────── BudgetSection
  │    reads trace_budget
  │    writes trace_budget
  │
  └──useExpenses────── ExpenseForm
       reads trace_expenses    ExpenseList (← filtered by search)
       writes (CRUD)              │
                            ExpenseItem (edit/delete)
       also provides:        SearchBar
         monthlyExpenses     InsightsPanel
         totalSpent
         summary
```

### 3.4 State Management Decision

No global state library. Each hook manages its slice of state via `useState` + `useEffect`. `App.tsx` wires hooks together and passes data down as props. This avoids Redux/Zustand overhead while keeping the data flow explicit.

- `useExpenses` holds the full expense array in state, provides `add`, `update`, `remove` functions
- `useBudget` holds the budget record, provides `setBudget` and `getBudget(monthKey)`
- Search state lives in `App.tsx` (or `ExpenseList`) as a simple `useState<string>`
- Filtering happens at render time: `expenses.filter(e => matches search)`

### 3.5 Storage Strategy

```
Read on mount:
  trace_budget    → JSON.parse → BudgetStore  → fallback: {}
  trace_expenses  → JSON.parse → Expense[]     → fallback: []

Write on every state change:
  JSON.stringify → localStorage.setItem

Error handling:
  try/catch on every read/write
  corrupted JSON → discard → use fallback
  QuotaExceeded → show toast "Storage full"
```

### 3.6 Hook Signatures

```typescript
// useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]

// useBudget.ts
function useBudget(): {
  budget: number
  setBudget: (amount: number) => void
}

// useExpenses.ts
function useExpenses(): {
  expenses: Expense[]
  addExpense: (input: ExpenseInput) => void
  updateExpense: (id: string, input: ExpenseInput) => void
  removeExpense: (id: string) => void
  monthlyExpenses: Expense[]
  totalSpent: number
}
```

### 3.7 Utility Functions

```typescript
// storage.ts
function getStorageItem<T>(key: string, fallback: T): T
function setStorageItem<T>(key: string, value: T): void

// format.ts
function formatCurrency(amount: number): string   // "₦3,500"
function formatDate(iso: string): string           // "08 Jun 2026"

// insights.ts
function generateInsights(expenses: Expense[]): string[]

// date.ts
function getCurrentMonthKey(): string              // "2026-06"
function getMonthKey(date: Date): string
function isCurrentMonth(isoDate: string): boolean
```

---

## Section 4: Build Plan

### Milestone 1: Project Scaffold

**Goal:** Blank canvas with tooling ready.

```
Files:  scaffold + types + storage utils
Test:   npm run dev shows blank page
```

| Step | Detail |
|---|---|
| 1.1 `npm create vite@latest trace -- --template react-ts` | Scaffold Vite + React + TS |
| 1.2 Install & configure Tailwind CSS | `npm install -D tailwindcss @tailwindcss/vite` |
| 1.3 Clean boilerplate | Remove default Vite content, logos |
| 1.4 Create folder structure | `types/`, `utils/`, `hooks/`, `components/` |
| 1.5 Define all types | `types/index.ts` — Expense, Category, BudgetStore, etc. |
| 1.6 Implement storage utils | `utils/storage.ts` — get/set with error handling |
| 1.7 Implement date utils | `utils/date.ts` — getCurrentMonthKey, isCurrentMonth |
| 1.8 Implement format utils | `utils/format.ts` — formatCurrency, formatDate |

### Milestone 2: Budget

**Goal:** User can set and see a monthly budget.

```
Files: useLocalStorage, useBudget, BudgetSection, EmptyState
Test:  Set budget → see it displayed → refresh → persists
```

| Step | Detail |
|---|---|
| 2.1 Generic `useLocalStorage` hook | Read on mount, write on set, handle parse errors |
| 2.2 `useBudget` hook | Reads `trace_budget`, exposes `budget` + `setBudget` |
| 2.3 `BudgetSection` component | Display budget/total/remaining; inline edit mode |
| 2.4 `EmptyState` component | First-time message with CTA to set budget |
| 2.5 Wire in `App.tsx` | Show EmptyState or BudgetSection based on state |

### Milestone 3: Expense CRUD

**Goal:** Full create, read, update, delete for expenses.

```
Files: useExpenses, ExpenseForm, ExpenseList, ExpenseItem, ConfirmDialog
Test:  Add → edit → delete → totals update → persist on reload
```

| Step | Detail |
|---|---|
| 3.1 `useExpenses` hook | Add, update, remove; compute monthly list + total |
| 3.2 `ExpenseForm` component | Form with name, amount, category, date; validates |
| 3.3 `ExpenseList` + `ExpenseItem` | Render list, newest first; edit/delete actions |
| 3.4 `ConfirmDialog` component | Delete confirmation overlay |
| 3.5 Wire budget + expenses in `App` | BudgetSection shows live totalSpent from useExpenses |
| 3.6 Empty state for no expenses | "No expenses yet" message + Add CTA |

### Milestone 4: Insights

**Goal:** Auto-generated text insights when data exists.

```
Files: insights.ts, InsightsPanel
Test:  Add 2+ expenses in different categories → insights appear
```

| Step | Detail |
|---|---|
| 4.1 `insights.ts` utility | Pure function: find top category, compute percentages |
| 4.2 `InsightsPanel` component | Render insight strings, conditionally visible |
| 4.3 Wire into `App.tsx` | Show panel between budget summary and search |

### Milestone 5: Search

**Goal:** Filter expenses by name or category.

```
Files: SearchBar
Test:  Type query → list filters → clear → full list
```

| Step | Detail |
|---|---|
| 5.1 `SearchBar` component | Controlled input with search icon |
| 5.2 Filter logic in `App` | Filter expenses before passing to ExpenseList |
| 5.3 Empty state for no results | "No expenses match your search" message |

### Milestone 6: Polish & Deploy

**Goal:** Production-ready, deployed.

```
Files: responsive tweaks, error boundaries
Test:  Mobile viewport, localStorage cleared, quota exceeded
```

| Step | Detail |
|---|---|
| 6.1 Mobile responsive pass | Tap targets ≥ 44px, no horizontal scroll, font sizes |
| 6.2 Error boundary component | Catch render errors, show fallback UI |
| 6.3 localStorage error handling | Quota exceeded → user-facing message |
| 6.4 Final pass on empty states | Every "no data" scenario has a friendly message |
| 6.5 Build & deploy | `npm run build` → deploy to Vercel/Netlify |

---

## Appendix: localStorage Schema Reference

```
Key: "trace_budget"
Value: { "2026-06": 100000 }
Parse fallback: {}

Key: "trace_expenses"
Value: [
  {
    "id": "uuid-abc-123",
    "name": "Jollof Rice",
    "amount": 3500,
    "category": "Food",
    "date": "2026-06-08",
    "createdAt": "2026-06-08T12:30:00.000Z",
    "updatedAt": "2026-06-08T12:30:00.000Z"
  }
]
Parse fallback: []
```
