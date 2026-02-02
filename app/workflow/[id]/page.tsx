'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, X } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { WorkflowMap } from '@/components/workflow/workflow-map'
import { StepDetailPanel } from '@/components/workflow/step-detail-panel'
import { StepSummaryPanel } from '@/components/workflow/step-summary-panel'
import { StepPreviewPanel } from '@/components/workflow/step-preview-panel'
import { getWorkflow, getProject, getClient } from '@/lib/data'
import type { WorkflowStep } from '@/lib/types'

export default function WorkflowPage() {
  const params = useParams()
  const workflow = getWorkflow(params.id as string)
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null)

  if (!workflow) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-stone-500">Workflow not found</p>
        </div>
      </MainLayout>
    )
  }

  const project = getProject(workflow.projectId)
  const client = project ? getClient(project.clientId) : null
  const currentStep = workflow.steps.find(s => s.status === 'current') || workflow.steps[0]

  // Auto-select current step on initial load
  const activeStep = selectedStep || currentStep

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="px-8 py-5 border-b border-stone-200 bg-white">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-3">
            {client && (
              <>
                <Link href={`/client/${client.id}`} className="hover:text-stone-700 transition-colors">
                  {client.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            {project && (
              <>
                <Link href={`/project/${project.id}`} className="hover:text-stone-700 transition-colors">
                  {project.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-stone-900">{workflow.name}</span>
          </nav>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
                {workflow.name}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  workflow.status === 'in_progress'
                    ? 'bg-blue-50 text-blue-700'
                    : workflow.status === 'completed'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-stone-100 text-stone-600'
                }`}>
                  {workflow.status === 'in_progress' ? 'In progress' : workflow.status === 'completed' ? 'Completed' : 'Not started'}
                </span>
                <span className="text-sm text-stone-500">
                  Step {workflow.currentStep} of {workflow.steps.length}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area with workflow map and panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Workflow Map */}
          <div className="flex-1 overflow-auto bg-stone-50">
            <WorkflowMap
              workflow={workflow}
              onSelectStep={setSelectedStep}
              selectedStepId={selectedStep?.id}
            />
          </div>

          {/* Right panel - shows based on selected step status */}
          {selectedStep && (
            <div className="w-80 border-l border-stone-200 flex-shrink-0 overflow-hidden flex flex-col">
              {/* Panel header with close button */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-stone-100 bg-stone-50">
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Step Details
                </span>
                <button
                  onClick={() => setSelectedStep(null)}
                  className="p-1 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Panel content based on status */}
              <div className="flex-1 overflow-auto">
                {selectedStep.status === 'complete' ? (
                  <StepSummaryPanel step={selectedStep} />
                ) : selectedStep.status === 'upcoming' ? (
                  <StepPreviewPanel step={selectedStep} />
                ) : (
                  <StepDetailPanel step={selectedStep} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
