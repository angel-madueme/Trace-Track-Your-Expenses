interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      {icon && <span className="text-4xl mb-4">{icon}</span>}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500 mt-1 max-w-xs">{description}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-5 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium transition-colors hover:bg-primary-dark active:scale-[0.98]"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
