'use client'

import { CheckCircle2, Circle, CircleDot, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getAgent } from '@/lib/data'
import type { Workflow, WorkflowStep } from '@/lib/types'

interface WorkflowMapProps {
  workflow: Workflow
  onSelectStep?: (step: WorkflowStep) => void
  selectedStepId?: string
}

export function WorkflowMap({ workflow, onSelectStep, selectedStepId }: WorkflowMapProps) {
  return (
    <div className="p-8">
      <div className="flex flex-col items-center">
        {workflow.steps.map((step, index) => {
          const isSelected = step.id === selectedStepId
          const isLast = index === workflow.steps.length - 1

          return (
            <div key={step.id} className="flex flex-col items-center">
              {/* Node */}
              <button
                onClick={() => onSelectStep?.(step)}
                className={cn(
                  'relative w-80 p-5 rounded-xl border-2 transition-all text-left',
                  step.status === 'complete'
                    ? 'bg-green-50 border-green-200 hover:border-green-300'
                    : step.status === 'current'
                    ? 'bg-blue-50 border-blue-300 ring-4 ring-blue-100'
                    : 'bg-white border-stone-200 hover:border-stone-300',
                  isSelected && 'ring-4 ring-stone-200'
                )}
              >
                {/* Status Icon */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2">
                  {step.status === 'complete' ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : step.status === 'current' ? (
                    <CircleDot className="w-8 h-8 text-blue-500" />
                  ) : (
                    <Circle className="w-8 h-8 text-stone-300" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className={cn(
                      'text-xs font-medium uppercase tracking-wider',
                      step.status === 'complete'
                        ? 'text-green-600'
                        : step.status === 'current'
                        ? 'text-blue-600'
                        : 'text-stone-400'
                    )}>
                      {step.status === 'complete' ? 'Complete' : step.status === 'current' ? 'Current' : 'Upcoming'}
                    </span>
                    <h3 className={cn(
                      'mt-1 text-base font-medium',
                      step.status === 'upcoming' ? 'text-stone-500' : 'text-stone-900'
                    )}>
                      {step.name}
                    </h3>
                  </div>
                </div>

                {/* Assignee or Agents */}
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {step.assignee && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <User className="w-3 h-3" />
                      {step.assignee === 'kenny' ? 'Kenny' : step.assignee}
                    </span>
                  )}
                  {step.agents.slice(0, 3).map(agentId => {
                    const agent = getAgent(agentId)
                    return agent ? (
                      <span
                        key={agentId}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700"
                      >
                        <Bot className="w-3 h-3" />
                        {agent.shortName}
                      </span>
                    ) : null
                  })}
                  {step.agents.length > 3 && (
                    <span className="text-xs text-stone-400">+{step.agents.length - 3} more</span>
                  )}
                </div>

                {/* Timestamp */}
                {step.completedAt && (
                  <div className="mt-2 text-xs text-stone-500">
                    Completed: {new Date(step.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </div>
                )}
                {step.startedAt && step.status === 'current' && (
                  <div className="mt-2 text-xs text-stone-500">
                    Started: {new Date(step.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    {step.timeEstimate && <span className="ml-2 text-stone-400">Est. {step.timeEstimate}</span>}
                  </div>
                )}
              </button>

              {/* Connector */}
              {!isLast && (
                <div className={cn(
                  'w-0.5 h-8 my-1',
                  step.status === 'complete' ? 'bg-green-200' : 'bg-stone-200'
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
