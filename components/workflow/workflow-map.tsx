'use client'

import { CheckCircle2, Circle, CircleDot, Bot, User, ArrowRight } from 'lucide-react'
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
    <div className="p-8 min-h-full">
      {/* Horizontal flowing layout */}
      <div className="flex flex-wrap items-start gap-4">
        {workflow.steps.map((step, index) => {
          const isSelected = step.id === selectedStepId
          const isLast = index === workflow.steps.length - 1

          return (
            <div key={step.id} className="flex items-center">
              {/* Node */}
              <button
                onClick={() => onSelectStep?.(step)}
                className={cn(
                  'relative w-64 p-4 rounded-xl border-2 transition-all text-left',
                  step.status === 'complete'
                    ? 'bg-green-50 border-green-200 hover:border-green-300'
                    : step.status === 'current'
                    ? 'bg-blue-50 border-blue-300 ring-4 ring-blue-100'
                    : 'bg-white border-stone-200 hover:border-stone-300',
                  isSelected && 'ring-4 ring-stone-200'
                )}
              >
                {/* Status Icon - top left */}
                <div className="flex items-center gap-2 mb-2">
                  {step.status === 'complete' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : step.status === 'current' ? (
                    <CircleDot className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-stone-300" />
                  )}
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
                </div>

                {/* Step name */}
                <h3 className={cn(
                  'text-sm font-medium leading-tight',
                  step.status === 'upcoming' ? 'text-stone-500' : 'text-stone-900'
                )}>
                  {step.name}
                </h3>

                {/* Assignee or Agents */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  {step.assignee && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800">
                      <User className="w-2.5 h-2.5" />
                      {step.assignee === 'kenny' ? 'Kenny' : step.assignee}
                    </span>
                  )}
                  {step.agents.slice(0, 2).map(agentId => {
                    const agent = getAgent(agentId)
                    return agent ? (
                      <span
                        key={agentId}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-600"
                      >
                        <Bot className="w-2.5 h-2.5" />
                        {agent.shortName}
                      </span>
                    ) : null
                  })}
                  {step.agents.length > 2 && (
                    <span className="text-[10px] text-stone-400">+{step.agents.length - 2}</span>
                  )}
                </div>

                {/* Timestamp */}
                {step.completedAt && (
                  <div className="mt-2 text-[10px] text-stone-500">
                    {new Date(step.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </div>
                )}
                {step.startedAt && step.status === 'current' && (
                  <div className="mt-2 text-[10px] text-stone-500">
                    Started {new Date(step.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {step.timeEstimate && <span className="ml-1 text-stone-400">· {step.timeEstimate}</span>}
                  </div>
                )}
              </button>

              {/* Connector arrow */}
              {!isLast && (
                <div className="flex items-center mx-2">
                  <div className={cn(
                    'w-8 h-0.5',
                    step.status === 'complete' ? 'bg-green-300' : 'bg-stone-200'
                  )} />
                  <ArrowRight className={cn(
                    'w-4 h-4 -ml-1',
                    step.status === 'complete' ? 'text-green-300' : 'text-stone-200'
                  )} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
