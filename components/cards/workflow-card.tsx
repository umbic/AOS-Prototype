'use client'

import Link from 'next/link'
import { ChevronRight, Circle, CheckCircle2, CircleDot } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Workflow } from '@/lib/types'

interface WorkflowCardProps {
  workflow: Workflow
  showProject?: boolean
  projectName?: string
}

export function WorkflowCard({ workflow, showProject, projectName }: WorkflowCardProps) {
  const currentStepData = workflow.steps[workflow.currentStep - 1] || workflow.steps[0]
  const totalSteps = workflow.steps.length

  return (
    <Link
      href={`/workflow/${workflow.id}`}
      className="block bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium text-stone-900 group-hover:text-stone-700">
            {workflow.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className={cn(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
              workflow.status === 'in_progress'
                ? 'bg-blue-50 text-blue-700'
                : workflow.status === 'completed'
                ? 'bg-green-50 text-green-700'
                : 'bg-stone-100 text-stone-600'
            )}>
              {workflow.status === 'in_progress' ? 'In progress' : workflow.status === 'completed' ? 'Completed' : 'Not started'}
            </span>
            {showProject && projectName && (
              <span className="text-xs text-stone-500">{projectName}</span>
            )}
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-stone-400" />
      </div>

      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5">
          {workflow.steps.map((step, index) => {
            const Icon = step.status === 'complete'
              ? CheckCircle2
              : step.status === 'current'
              ? CircleDot
              : Circle

            return (
              <div key={step.id} className="flex items-center">
                <Icon className={cn(
                  'w-4 h-4',
                  step.status === 'complete'
                    ? 'text-green-500'
                    : step.status === 'current'
                    ? 'text-blue-500'
                    : 'text-stone-300'
                )} />
                {index < workflow.steps.length - 1 && (
                  <div className={cn(
                    'w-6 h-0.5 ml-1.5',
                    step.status === 'complete' ? 'bg-green-200' : 'bg-stone-200'
                  )} />
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-2 text-xs text-stone-500">
          Step {workflow.currentStep} of {totalSteps}
          {currentStepData && (
            <span className="text-stone-400"> — {currentStepData.name}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
