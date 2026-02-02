'use client'

import Link from 'next/link'
import { ArrowRight, Check, Circle } from 'lucide-react'
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
      className="block bg-white border border-neutral-200 p-6 hover:border-neutral-300 hover:shadow-card-hover transition-all duration-200 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-black group-hover:text-deloitte-green transition-colors">
            {workflow.name}
          </h3>
          <div className="mt-2 flex items-center gap-3">
            <span className={cn(
              'inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider',
              workflow.status === 'in_progress'
                ? 'bg-deloitte-green text-white'
                : workflow.status === 'completed'
                ? 'bg-neutral-200 text-neutral-600'
                : 'bg-neutral-100 text-neutral-500'
            )}>
              {workflow.status === 'in_progress' ? 'In progress' : workflow.status === 'completed' ? 'Completed' : 'Not started'}
            </span>
            {showProject && projectName && (
              <span className="text-xs text-neutral-500">{projectName}</span>
            )}
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-deloitte-green group-hover:translate-x-1 transition-all duration-200" />
      </div>

      {/* Progress Indicator - Deloitte style */}
      <div className="mt-5">
        <div className="flex items-center gap-2">
          {workflow.steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                step.status === 'complete'
                  ? 'bg-deloitte-green text-white'
                  : step.status === 'current'
                  ? 'bg-black text-white'
                  : 'bg-neutral-200 text-neutral-500'
              )}>
                {step.status === 'complete' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  index + 1
                )}
              </div>
              {index < workflow.steps.length - 1 && (
                <div className={cn(
                  'w-8 h-0.5 ml-2',
                  step.status === 'complete' ? 'bg-deloitte-green' : 'bg-neutral-200'
                )} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-neutral-500">
          Step {workflow.currentStep} of {totalSteps}
          {currentStepData && (
            <span className="text-neutral-400"> — {currentStepData.name}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
