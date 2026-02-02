'use client'

import { Clock, Bot, User, Info, Lock } from 'lucide-react'
import { getAgent } from '@/lib/data'
import type { WorkflowStep } from '@/lib/types'

interface StepPreviewPanelProps {
  step: WorkflowStep
}

export function StepPreviewPanel({ step }: StepPreviewPanelProps) {
  const isHumanStep = !!step.assignee && step.agents.length === 0

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-stone-50 text-stone-600 border-stone-200">
            Upcoming
          </span>
          {isHumanStep && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200">
              Decision Point
            </span>
          )}
        </div>
        <h2 className="mt-3 text-lg font-medium text-stone-900">{step.name}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Info banner */}
        <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-stone-700 font-medium">This step hasn&apos;t started yet</p>
              <p className="text-sm text-stone-500 mt-1">
                {isHumanStep
                  ? 'This is a decision point that will require your input when reached.'
                  : 'Agents will begin work on this step once the previous step is complete.'}
              </p>
            </div>
          </div>
        </div>

        {/* Time estimate */}
        {step.timeEstimate && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Estimated Duration</h4>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Clock className="w-4 h-4 text-stone-400" />
              {step.timeEstimate}
            </div>
          </div>
        )}

        {/* Who will be involved */}
        <div>
          <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">
            {isHumanStep ? 'Assigned to' : 'Agents assigned'}
          </h4>

          {isHumanStep && step.assignee && (
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {step.assignee.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-900 capitalize">{step.assignee}</div>
                <div className="text-xs text-stone-500">Decision required</div>
              </div>
              <Lock className="w-4 h-4 text-amber-500" />
            </div>
          )}

          {step.agents.length > 0 && (
            <div className="space-y-2">
              {step.agents.map(agentId => {
                const agent = getAgent(agentId)
                if (!agent) return null
                return (
                  <div key={agentId} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stone-600 to-stone-800 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-stone-900">{agent.shortName}</span>
                      <p className="text-xs text-stone-500">{agent.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* What happens in this step */}
        <div>
          <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">What happens</h4>
          <div className="p-4 bg-stone-50 rounded-lg">
            <p className="text-sm text-stone-600">
              {isHumanStep
                ? 'You will review the outputs from the previous step and make a decision to proceed, request changes, or consult with an agent.'
                : step.agents.length > 0
                ? `The ${step.agents.length > 1 ? 'agents' : 'agent'} assigned to this step will process the inputs and generate deliverables for the next step.`
                : 'This step will process inputs and prepare outputs for the next phase of the workflow.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
