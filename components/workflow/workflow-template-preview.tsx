'use client'

import { Clock, GitBranch, Lock, Bot, User, ArrowRight, Plus } from 'lucide-react'
import { WorkflowTemplate, WorkflowTemplateCategory } from '@/lib/types'
import { getAgent } from '@/lib/data'
import { cn } from '@/lib/utils'

interface WorkflowTemplatePreviewProps {
  template: WorkflowTemplate
  onUseTemplate: () => void
}

const categoryColors: Record<WorkflowTemplateCategory, { bg: string; text: string; border: string }> = {
  campaign: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  content: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  analysis: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  operations: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
}

export function WorkflowTemplatePreview({ template, onUseTemplate }: WorkflowTemplatePreviewProps) {
  const colors = categoryColors[template.category]

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-5 border-b border-stone-200">
        <span className={cn(
          'inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize mb-3',
          colors.bg, colors.text, colors.border
        )}>
          {template.category}
        </span>
        <h2 className="text-xl font-semibold text-stone-900">{template.name}</h2>
        <p className="text-sm text-stone-600 mt-2">{template.description}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-stone-50 rounded-lg text-center">
            <div className="text-lg font-semibold text-stone-900">{template.stepCount}</div>
            <div className="text-xs text-stone-500">Steps</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg text-center">
            <div className="text-lg font-semibold text-stone-900">{template.decisionPoints}</div>
            <div className="text-xs text-stone-500">Decisions</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg text-center">
            <div className="text-sm font-semibold text-stone-900">{template.estimatedDuration}</div>
            <div className="text-xs text-stone-500">Duration</div>
          </div>
        </div>

        {/* Steps */}
        <div>
          <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Workflow Steps</h3>
          <div className="space-y-2">
            {template.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                  step.type === 'human' ? 'bg-amber-100' : 'bg-stone-100'
                )}>
                  {step.type === 'human' ? (
                    <Lock className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-stone-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-stone-900">{step.name}</div>
                  <div className="text-xs text-stone-500">
                    {step.type === 'human'
                      ? step.assigneeRole || 'Human decision'
                      : step.agentIds?.length
                        ? `${step.agentIds.length} agent${step.agentIds.length > 1 ? 's' : ''}`
                        : 'Agent task'}
                  </div>
                </div>
                {index < template.steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-stone-300 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Agents */}
        <div>
          <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Recommended Agents</h3>
          <div className="flex flex-wrap gap-2">
            {template.recommendedAgents.map(agentId => {
              const agent = getAgent(agentId)
              if (!agent) return null
              return (
                <div
                  key={agentId}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-lg border border-stone-200"
                >
                  <Bot className="w-3.5 h-3.5 text-stone-500" />
                  <span className="text-sm text-stone-700">{agent.shortName}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-stone-200">
        <button
          onClick={onUseTemplate}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#86BC24] text-white font-medium rounded-lg hover:bg-[#6B9A1D] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Use This Template
        </button>
      </div>
    </div>
  )
}
