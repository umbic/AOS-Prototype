'use client'

import { Clock, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200/60 p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-stone-700">
              You have <span className="font-semibold text-stone-900">{timeAvailable} free</span> before your 2pm.
            </p>
            <p className="text-sm text-stone-600 mt-0.5">Here's what we can get done:</p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <ul className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-3 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-stone-700">{item.title}</span>
            <span className="text-stone-400 text-xs">({item.timeEstimate})</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-3">
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800 transition-colors"
          >
            Dismiss
          </button>
        )}
        {onAccept && (
          <button
            onClick={onAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Let's do it
          </button>
        )}
      </div>
    </div>
  )
}
