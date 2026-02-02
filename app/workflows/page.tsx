'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { workflows, getProject } from '@/lib/data'

export default function WorkflowsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
            Workflows
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            All active and recent workflows across your projects.
          </p>
        </header>

        {/* Active Workflows */}
        <section className="mb-12">
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
            In Progress
          </h2>
          <div className="space-y-3">
            {workflows
              .filter(w => w.status === 'in_progress')
              .map(workflow => {
                const project = getProject(workflow.projectId)
                return (
                  <WorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    showProject
                    projectName={project?.name}
                  />
                )
              })}
          </div>
        </section>

        {/* Not Started */}
        <section>
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
            Not Started
          </h2>
          <div className="space-y-3">
            {workflows
              .filter(w => w.status === 'not_started')
              .map(workflow => {
                const project = getProject(workflow.projectId)
                return (
                  <WorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    showProject
                    projectName={project?.name}
                  />
                )
              })}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
