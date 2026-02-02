'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock, FileText } from 'lucide-react'
import { MainLayoutCentered } from '@/components/layout/main-layout-centered'
import { ElegantCard } from '@/components/cards/elegant-card'
import { getProject, getClient, getWorkflowsByProject, docketItems } from '@/lib/data'

export default function ProjectPage() {
  const params = useParams()
  const project = getProject(params.id as string)

  if (!project) {
    return (
      <MainLayoutCentered>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-neutral-400">Project not found</p>
        </div>
      </MainLayoutCentered>
    )
  }

  const client = getClient(project.clientId)
  const workflows = getWorkflowsByProject(project.id)
  const projectDocketItems = docketItems.filter(d => d.projectId === project.id)

  // Derive status summary
  const activeWorkflows = workflows.filter(w => w.status === 'in_progress').length
  const completedSteps = workflows.reduce((acc, w) =>
    acc + w.steps.filter(s => s.status === 'complete').length, 0
  )
  const totalSteps = workflows.reduce((acc, w) => acc + w.steps.length, 0)

  return (
    <MainLayoutCentered pageContext={project.name}>
      <div className="flex-1 px-12 py-10">
        <div className="w-full max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            href="/today"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Today
          </Link>

          {/* Header */}
          <header className="mb-10">
            {client && (
              <p className="text-sm text-neutral-400 mb-2">{client.name}</p>
            )}
            <div className="flex items-baseline justify-between">
              <h1 className="text-2xl font-semibold text-black">
                {project.name}
                <span className="text-deloitte-green">.</span>
              </h1>
              <p className="text-neutral-500">
                {project.daysUntilLaunch
                  ? `${project.daysUntilLaunch} days until launch · `
                  : ''
                }
                {activeWorkflows > 0
                  ? `${activeWorkflows} workflow${activeWorkflows > 1 ? 's' : ''} in progress`
                  : 'No active workflows'
                }
              </p>
            </div>
          </header>

          {/* What needs attention */}
          {projectDocketItems.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">
                Needs your attention
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectDocketItems.map((item, i) => (
                  <div
                    key={item.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <ElegantCard
                      href={`/today/${item.id}`}
                      title={item.title}
                      subtitle={item.subtitle}
                      type={item.type as 'review' | 'creative' | 'discovery' | 'calendar' | 'operational'}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Progress and Documents - side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress summary */}
            <section className="lg:col-span-2">
              <div className="bg-white border border-neutral-100 rounded-xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-black">Progress</h3>
                  <span className="text-sm text-neutral-400">
                    {completedSteps} of {totalSteps} steps complete
                  </span>
                </div>

                {/* Simple progress bar */}
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-deloitte-green rounded-full transition-all duration-500"
                    style={{ width: `${totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0}%` }}
                  />
                </div>

                {/* Workflow status */}
                <div className="space-y-3">
                  {workflows.map(workflow => {
                    const currentStep = workflow.steps.find(s => s.status === 'current')
                    const isComplete = workflow.status === 'completed'

                    return (
                      <Link
                        key={workflow.id}
                        href={`/workflow/${workflow.id}`}
                        className="flex items-center gap-3 text-sm group"
                      >
                        {isComplete ? (
                          <CheckCircle2 className="w-4 h-4 text-deloitte-green flex-shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        )}
                        <span className="text-neutral-600 group-hover:text-black transition-colors">
                          {workflow.name}
                          {currentStep && (
                            <span className="text-neutral-400"> — {currentStep.name}</span>
                          )}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* Key documents */}
            {project.documents.length > 0 && (
              <section>
                <div className="bg-white border border-neutral-100 rounded-xl p-6 h-full">
                  <h3 className="text-sm font-medium text-black mb-4">Documents</h3>
                  <div className="space-y-2">
                    {project.documents.slice(0, 4).map(doc => (
                      <button
                        key={doc.id}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-neutral-50 rounded-lg transition-colors text-left"
                      >
                        <FileText className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                        <span className="text-sm text-neutral-600 truncate">{doc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </MainLayoutCentered>
  )
}
