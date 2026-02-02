'use client'

import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
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
      className="block bg-white border border-neutral-200 p-6 hover:border-neutral-300 hover:shadow-card-hover transition-all duration-200 group"
    >
      <div className="flex items-start gap-5">
        {/* Priority Indicator - Deloitte style vertical bar */}
        <div className={cn('w-1 h-full min-h-[60px] rounded-full', getPriorityColor(item.priority))} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-black group-hover:text-deloitte-green transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
            {item.subtitle}
          </p>

          {/* Meta Row */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Project Tag - Deloitte minimal style */}
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-wider bg-neutral-100 text-neutral-700">
              {item.projectName}
            </span>

            {/* Agent Pills */}
            <div className="flex items-center gap-2">
              {item.agents.slice(0, 2).map(agent => (
                <span
                  key={agent.id}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-black text-white"
                >
                  {agent.shortName}
                </span>
              ))}
              {item.agents.length > 2 && (
                <span className="text-xs text-neutral-400 font-medium">
                  +{item.agents.length - 2}
                </span>
              )}
            </div>

            {/* Time Estimate */}
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <Clock className="w-3.5 h-3.5" />
              {item.timeEstimate}
            </span>
          </div>
        </div>

        {/* Arrow - Deloitte style */}
        {showExpand && (
          <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-deloitte-green group-hover:translate-x-1 transition-all duration-200 mt-1" />
        )}
      </div>
    </Link>
  )
}
