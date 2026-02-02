'use client'

import { useState } from 'react'
import { ChevronDown, Circle, CircleDot } from 'lucide-react'
import { TaskAgent } from '@/lib/types'
import { cn } from '@/lib/utils'

interface AgentCardProps {
  agent: TaskAgent
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Format the completed time
  const formatCompletedTime = (isoDate: string) => {
    const date = new Date(isoDate)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffMins < 60) {
      return `${diffMins} minutes ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const confidenceConfig = {
    high: {
      icon: <Circle className="w-3 h-3 fill-[#86BC24] text-[#86BC24]" />,
      label: 'High confidence',
      color: 'text-[#86BC24]',
    },
    medium: {
      icon: <CircleDot className="w-3 h-3 text-amber-500" />,
      label: 'Medium confidence',
      color: 'text-amber-500',
    },
    low: {
      icon: <Circle className="w-3 h-3 text-red-400" />,
      label: 'Low confidence',
      color: 'text-red-400',
    },
  }

  const confidence = confidenceConfig[agent.confidence]

  return (
    <div className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
      {/* Main content */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          {/* Left: Agent info */}
          <div className="flex items-center gap-3">
            {/* Status dot */}
            <div className="w-10 h-10 rounded-full bg-[#86BC24]/10 flex items-center justify-center flex-shrink-0">
              <span className="w-2.5 h-2.5 bg-[#86BC24] rounded-full" />
            </div>
            <div>
              <h3 className="font-semibold text-black">{agent.name}</h3>
              <p className="text-sm text-neutral-500">
                Completed {formatCompletedTime(agent.completedAt)} · Took {agent.duration}
              </p>
            </div>
          </div>

          {/* Right: Confidence */}
          <div className={cn('flex items-center gap-1.5 text-sm', confidence.color)}>
            {confidence.icon}
            <span>{confidence.label}</span>
          </div>
        </div>
      </div>

      {/* Expandable reasoning section */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-3 flex items-center justify-between text-sm text-neutral-500 hover:bg-neutral-50 border-t border-neutral-100 transition-colors"
      >
        <span>How I analyzed this</span>
        <ChevronDown
          className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')}
        />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 bg-neutral-50 border-t border-neutral-100">
          <ul className="space-y-2 pt-4">
            {agent.reasoning.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-600">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
