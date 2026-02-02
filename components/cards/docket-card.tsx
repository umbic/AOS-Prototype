'use client'

import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'
import { cn, getPriorityColor } from '@/lib/utils'
import type { DocketItem } from '@/lib/types'

interface DocketCardProps {
  item: DocketItem
  showExpand?: boolean
}

export function DocketCard({ item, showExpand = true }: DocketCardProps) {
  return (
    <Link
      href={`/today/${item.id}`}
      className="block bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-4">
        {/* Priority Indicator */}
        <div className="pt-1.5">
          <div className={cn('w-2.5 h-2.5 rounded-full', getPriorityColor(item.priority))} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-stone-900 group-hover:text-stone-700">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500 line-clamp-2">
            {item.subtitle}
          </p>

          {/* Meta Row */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {/* Project Tag */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
              {item.projectName}
            </span>

            {/* Agent Pills */}
            <div className="flex items-center gap-1.5">
              {item.agents.slice(0, 2).map(agent => (
                <span
                  key={agent.id}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700"
                >
                  {agent.shortName}
                </span>
              ))}
              {item.agents.length > 2 && (
                <span className="text-xs text-stone-400">
                  +{item.agents.length - 2} more
                </span>
              )}
            </div>

            {/* Time Estimate */}
            <span className="flex items-center gap-1 text-xs text-stone-400">
              <Clock className="w-3.5 h-3.5" />
              {item.timeEstimate}
            </span>
          </div>
        </div>

        {/* Expand Arrow */}
        {showExpand && (
          <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-stone-400 transition-colors mt-1" />
        )}
      </div>
    </Link>
  )
}
