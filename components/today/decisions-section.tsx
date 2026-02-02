'use client'

import { Decision } from '@/lib/types'
import { DecisionCard } from './decision-card'

interface DecisionsSectionProps {
  decisions: Decision[]
}

export function DecisionsSection({ decisions }: DecisionsSectionProps) {
  if (decisions.length === 0) return null

  return (
    <div className="mb-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[11px] uppercase tracking-[0.1em] font-semibold text-black">
          Decisions Waiting on You
        </h2>
        <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#ef4444] text-white rounded-full">
          {decisions.length}
        </span>
      </div>

      {/* Decision cards grid */}
      <div className="grid grid-cols-2 gap-4">
        {decisions.map((decision) => (
          <DecisionCard key={decision.id} decision={decision} />
        ))}
      </div>
    </div>
  )
}
