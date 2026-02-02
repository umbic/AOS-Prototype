'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Calendar, FileText, Plus, MessageCircle } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { WorkflowCard } from '@/components/cards/workflow-card'
import { getProject, getClient, getWorkflowsByProject, activityItems } from '@/lib/data'

export default function ProjectPage() {
  const params = useParams()
  const project = getProject(params.id as string)

  if (!project) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-stone-500">Project not found</p>
        </div>
      </MainLayout>
    )
  }

  const client = getClient(project.clientId)
  const workflows = getWorkflowsByProject(project.id)
  const projectActivities = activityItems.filter(a => a.projectId === project.id)

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* Header */}
        <header className="mb-8">
          {/* Client Link */}
          {client && (
            <Link
              href={`/client/${client.id}`}
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-3"
            >
              <div className="w-5 h-5 rounded bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
                G
              </div>
              {client.name}
            </Link>
          )}

          <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
            {project.name}
          </h1>

          <div className="mt-3 flex items-center gap-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              project.status === 'active'
                ? 'bg-green-50 text-green-700'
                : project.status === 'completed'
                ? 'bg-stone-100 text-stone-600'
                : 'bg-amber-50 text-amber-700'
            }`}>
              Active
              {project.daysUntilLaunch && ` — ${project.daysUntilLaunch} days until launch`}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-stone-500">
              <Calendar className="w-4 h-4" />
              {new Date(project.timeline.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(project.timeline.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Workflows Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                  Workflows in this project
                </h2>
              </div>

              <div className="space-y-3">
                {workflows.map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
                {workflows.length === 0 && (
                  <p className="text-sm text-stone-500">No workflows yet.</p>
                )}
                <button className="w-full flex items-center justify-center gap-2 p-4 text-sm text-stone-500 border border-dashed border-stone-300 rounded-xl hover:border-stone-400 hover:text-stone-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Create new workflow
                </button>
              </div>
            </section>

            {/* Documents Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                  Key documents
                </h2>
              </div>

              <div className="space-y-2">
                {project.documents.map(doc => (
                  <button
                    key={doc.id}
                    className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-colors text-left"
                  >
                    <FileText className="w-5 h-5 text-stone-400" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-stone-900">{doc.name}</div>
                      <div className="text-xs text-stone-500">
                        Created by {doc.createdBy}, {new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-300" />
                  </button>
                ))}
                <button className="w-full flex items-center justify-center gap-2 p-4 text-sm text-stone-500 border border-dashed border-stone-300 rounded-xl hover:border-stone-400 hover:text-stone-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Upload document
                </button>
              </div>
            </section>

            {/* Activity Feed */}
            <section>
              <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
                Recent activity
              </h2>

              <div className="space-y-4">
                {projectActivities.length > 0 ? (
                  projectActivities.map((activity, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-stone-400 w-32 flex-shrink-0">{activity.timestamp}</span>
                      <span className="text-stone-600">{activity.description}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-stone-500">No recent activity.</p>
                )}
                <button className="text-sm text-stone-500 hover:text-stone-700">
                  Show more
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Section */}
            <section className="bg-white rounded-xl border border-stone-200 p-5">
              <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
                Team on this project
              </h3>

              <div className="space-y-3">
                {project.team.map(member => (
                  <div key={member.userId} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      member.isClient
                        ? 'bg-stone-400'
                        : 'bg-gradient-to-br from-amber-400 to-orange-500'
                    }`}>
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-900">
                        {member.name}
                        {member.isClient && <span className="ml-1 text-stone-400">(Client)</span>}
                      </div>
                      <div className="text-xs text-stone-500">{member.role}</div>
                    </div>
                  </div>
                ))}
                <button className="w-full flex items-center justify-center gap-2 p-2 text-sm text-stone-500 border border-dashed border-stone-200 rounded-lg hover:border-stone-300 hover:text-stone-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add team member
                </button>
              </div>
            </section>

            {/* Project Chat */}
            <button className="w-full flex items-center gap-3 p-4 bg-stone-900 rounded-xl text-white hover:bg-stone-800 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm font-medium">Chat with Project Agent</div>
                <div className="text-xs text-stone-400">Ask about status, timelines, or anything</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
