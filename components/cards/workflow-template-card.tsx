'use client'

import { Clock, GitBranch, Lock, Bot } from 'lucide-react'
import { WorkflowTemplate, WorkflowTemplateCategory } from '@/lib/types'
import { cn } from '@/lib/utils'

interface WorkflowTemplateCardProps {
  template: WorkflowTemplate
  isSelected: boolean
  onClick: () => void
}

const categoryColors: Record<WorkflowTemplateCategory, { bg: string; text: string; border: string }> = {
  campaign: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  content: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  analysis: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  operations: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
}

export function WorkflowTemplateCard({ template, isSelected, onClick }: WorkflowTemplateCardProps) {
  const colors = categoryColors[template.category]

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-5 bg-white rounded-xl border-2 text-left transition-all hover:shadow-md',
        isSelected
          ? 'border-[#86BC24] shadow-md'
          : 'border-stone-200 hover:border-stone-300'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-stone-900">{template.name}</h3>
        <span className={cn(
          'px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize',
          colors.bg, colors.text, colors.border
        )}>
          {template.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-stone-600 mb-4 line-clamp-2">
        {template.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-stone-500">
        <span className="flex items-center gap-1">
          <GitBranch className="w-3.5 h-3.5" />
          {template.stepCount} steps
        </span>
        <span className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5" />
          {template.decisionPoints} decision{template.decisionPoints !== 1 ? 's' : ''}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {template.estimatedDuration}
        </span>
      </div>
    </button>
  )
}
