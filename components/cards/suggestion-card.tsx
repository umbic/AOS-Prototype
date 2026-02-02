'use client'

import { X, Zap } from 'lucide-react'

interface SuggestionItem {
  title: string
  timeEstimate: string
}

interface SuggestionCardProps {
  timeAvailable: string
  items: SuggestionItem[]
  onDismiss?: () => void
  onAccept?: () => void
}

export function SuggestionCard({
  timeAvailable,
  items,
  onDismiss,
  onAccept,
}: SuggestionCardProps) {
  return (
    <div className="bg-black text-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-deloitte-green flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-base">
              You have <span className="font-semibold">{timeAvailable} free</span> before your 2pm.
            </p>
            <p className="text-neutral-400 mt-1">Here's what we can get done:</p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <ul className="mt-5 ml-14 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-3 text-sm">
            <span className="w-1.5 h-1.5 bg-deloitte-green rounded-full flex-shrink-0" />
            <span className="text-white">{item.title}</span>
            <span className="text-neutral-500">({item.timeEstimate})</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 ml-14 flex items-center gap-4">
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            Dismiss
          </button>
        )}
        {onAccept && (
          <button
            onClick={onAccept}
            className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wider bg-deloitte-green text-white hover:bg-deloitte-green-dark transition-colors"
          >
            Let's do it
          </button>
        )}
      </div>
    </div>
  )
}
