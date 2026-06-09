# Trace — Product Requirements Document

**Tagline:** Know where your money goes.
**Status:** MVP
**Last updated:** June 2026

---

## 1. Product Overview

Trace is a modern, mobile-first, single-page expense tracking web application. It lives entirely in the browser with no backend, no database, and no network calls. All data persists in `localStorage`. The app helps users set a monthly budget, log expenses, and instantly see where their money is going.

## 2. Problem Statement

Most people know they spend money, but few have a clear, real-time picture of **where** it goes or whether they are on track with their budget. Existing tools are either too complex (full-featured finance apps), require sign-up, or bury the user in charts and categories before they've entered a single expense. The friction of getting started is too high.

## 3. Goals

- Make it trivial for a user to **record an expense in under 10 seconds**.
- Show the user their **total spent** and **remaining budget** at a glance.
- Provide **spending insights** that feel personal, not generic.
- Eliminate all barriers to first use — no account, no onboarding wizard, no sample data.
- Keep the entire experience on a single screen so the user never feels lost.

## 4. Target Users

| Persona | Description |
|---|---|
| Young professional | Early-career salaried worker managing rent, transport, food, and leisure |
| Freelancer | Variable income, needs to track project-related spending and personal budget |
| Side hustler | Juggling multiple income streams, wants to keep expenses organised |
| NYSC member | Fixed allowance, strict budget, needs to stretch every naira |
| Budget-curious user | Anyone who has never tracked expenses before and wants a simple starting point |

## 5. User Needs

| ID | Need | Priority |
|---|---|---|
| N1 | Set a monthly spending target | P0 |
| N2 | Quickly add an expense (name, amount, category) | P0 |
| N3 | See total money spent this month | P0 |
| N4 | See how much budget is left | P0 |
| N5 | View a list of recent expenses sorted newest-first | P0 |
| N6 | Correct a mistake by editing or deleting an expense | P0 |
| N7 | Search expenses by name or category | P1 |
| N8 | Understand spending patterns without studying raw numbers | P1 |
| N9 | Feel guided and reassured when the app has no data yet | P1 |
| N10 | Have the app recover gracefully from a cleared browser cache | P2 |

## 6. MVP Features

| Feature | Description | User Need |
|---|---|---|
| Set monthly budget | Single input field; stored per calendar month | N1 |
| Add expense | Form with name (required), amount (required, positive number), category (enum dropdown), date (defaults to today) | N2 |
| View total spent | Sum of all expenses whose date falls in the current calendar month | N3 |
| View remaining budget | Budget minus total spent; shows negative if over budget | N4 |
| Recent expenses list | Scrollable list, newest first, capped at 100 items | N5 |
| Edit expense | Tapping an expense opens editable fields; save updates `localStorage` | N6 |
| Delete expense | Tap delete → confirmation dialog → remove from storage | N6 |
| Search expenses | Free-text filter on name and category across all stored expenses | N7 |
| Spending insights | One or two auto-generated sentences based on expense data (e.g. "You spent the most on Food this month — 40% of your total"). **Only shown when expenses exist.** | N8 |
| Empty states | Friendly messages when there is no budget set, no expenses, or no search results | N9 |

### Category Enum

```
Food, Transport, Shopping, Bills, Entertainment, Health, Education, Other
```

## 7. Out of Scope (MVP)

- Authentication / user accounts
- Backend server, API, or external database
- Push or in-app notifications
- Charts, graphs, or visualisations
- Routing / multiple pages
- Recurring / scheduled expenses
- Multi-currency
- Export / import
- Preloaded sample or seed data
- Dark mode (deferred)

## 8. Success Criteria

| Criterion | Target |
|---|---|
| Time to first expense | ≤ 30 seconds from fresh load |
| Expenses recorded per session | Average ≥ 3 after first use |
| Budget utilisation | ≥ 60% of users who set a budget view remaining at least once per session |
| Error rate | Zero unhandled runtime exceptions |
| localStorage read/write | < 5 ms per operation |

## 9. Technical Constraints

| Constraint | Detail |
|---|---|
| Platform | Browser only (modern Chrome, Firefox, Safari, Edge) |
| Frontend framework | React 18+ with TypeScript |
| Styling | Tailwind CSS 3+ |
| State persistence | `localStorage` only; no IndexedDB, no service workers |
| Storage keys | `trace_budget` (JSON object keyed by `YYYY-MM`), `trace_expenses` (JSON array) |
| Storage limit | ≤ 5 MB; expenses capped at the most recent 1 000 entries |
| Build tool | Vite |
| No routing | Single-page, no React Router or similar |
| No external dependencies | Beyond React, TypeScript, Tailwind, and Vite toolchain |

## 10. Assumptions

- Users have a modern browser with `localStorage` enabled.
- Users understand basic concepts: budget, expense, category.
- Users will set a budget for the **current month** only; past budgets are stored but not displayed.
- Users may clear their browser data; they accept that this deletes their expenses.
- Dates are local to the user's system timezone.
- Amounts are in a single currency (₦ — displayed as "₦" symbol, but no currency conversion or formatting logic beyond `toLocaleString`).
- The app is accessed primarily on mobile viewports; desktop is a secondary concern.
- No accessibility requirements beyond semantic HTML and keyboard navigation.
