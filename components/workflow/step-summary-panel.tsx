'use client'

import { Check, Clock, FileText, Bot, ExternalLink } from 'lucide-react'
import { getAgent } from '@/lib/data'
import type { WorkflowStep } from '@/lib/types'

interface StepSummaryPanelProps {
  step: WorkflowStep
}

export function StepSummaryPanel({ step }: StepSummaryPanelProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-green-50 text-green-700 border-green-200">
            Complete
          </span>
        </div>
        <h2 className="mt-3 text-lg font-medium text-stone-900">{step.name}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Completion info */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 text-green-700">
            <Check className="w-5 h-5" />
            <span className="font-medium">Step Completed</span>
          </div>
          {step.completedAt && (
            <p className="mt-2 text-sm text-green-600">
              {new Date(step.completedAt).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </p>
          )}
        </div>

        {/* Summary */}
        <div>
          <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Summary</h4>
          <div className="p-4 bg-stone-50 rounded-lg">
            <p className="text-sm text-stone-700">
              This step has been completed. All outputs and deliverables have been passed to the next step in the workflow.
            </p>
          </div>
        </div>

        {/* Agents involved */}
        {step.agents.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Agents involved</h4>
            <div className="space-y-2">
              {step.agents.map(agentId => {
                const agent = getAgent(agentId)
                if (!agent) return null
                return (
                  <div key={agentId} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
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
          </div>
        )}

        {/* Outputs/Documents */}
        <div>
          <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Outputs</h4>
          {step.documents && step.documents.length > 0 ? (
            <div className="space-y-2">
              {step.documents.map((doc, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-stone-400" />
                    <span className="text-sm text-stone-700">{doc}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-stone-50 rounded-lg">
              <p className="text-sm text-stone-500">Outputs passed to next step</p>
            </div>
          )}
        </div>

        {/* Duration */}
        {step.startedAt && step.completedAt && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Duration</h4>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Clock className="w-4 h-4 text-stone-400" />
              {calculateDuration(step.startedAt, step.completedAt)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function calculateDuration(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffMs = endDate.getTime() - startDate.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`
  }
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''}`
  }
  const diffMins = Math.floor(diffMs / (1000 * 60))
  return `${diffMins} minute${diffMins !== 1 ? 's' : ''}`
}
