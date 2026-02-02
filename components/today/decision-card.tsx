'use client'

import Link from 'next/link'
import { Clock, AlertCircle } from 'lucide-react'
import { Decision, DecisionPriority } from '@/lib/types'

interface DecisionCardProps {
  decision: Decision
}

const priorityStyles: Record<DecisionPriority, { dot: string; bg: string }> = {
  urgent: { dot: 'bg-[#ef4444]', bg: 'bg-[#fef2f2]' },
  waiting: { dot: 'bg-[#f59e0b]', bg: 'bg-[#fffbeb]' },
  low: { dot: 'bg-[#22c55e]', bg: 'bg-[#f0fdf4]' },
}

export function DecisionCard({ decision }: DecisionCardProps) {
  const styles = priorityStyles[decision.priority]

  return (
    <Link
      href={`/workflow/${decision.workflowId}/step/${decision.stepId}`}
      className="block p-4 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-sm transition-all duration-150 group"
    >
      <div className="flex items-start gap-3">
        {/* Priority dot */}
        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${styles.dot}`} />

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-sm font-medium text-black mb-1 group-hover:text-[#86BC24] transition-colors duration-150">
            {decision.title}
          </h3>

          {/* Context */}
          <p className="text-xs text-neutral-500 mb-3 line-clamp-2">
            {decision.context}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            {/* Time estimate */}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {decision.timeEstimate}
            </span>

            {/* Deadline if present */}
            {decision.deadline && (
              <span className={`flex items-center gap-1 ${decision.priority === 'urgent' ? 'text-[#ef4444]' : ''}`}>
                <AlertCircle className="w-3 h-3" />
                {decision.deadline}
              </span>
            )}

            {/* Client / Workflow */}
            <span className="text-neutral-300">
              {decision.clientName} · {decision.workflowName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
