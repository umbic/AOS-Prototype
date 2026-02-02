'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DocketItem, Workflow, Project, Client } from '@/lib/types'

interface TaskContextSidebarProps {
  docketItem: DocketItem
  workflow?: Workflow | null
  project?: Project | null
  client?: Client | null
  relatedTasks?: DocketItem[]
}

export function TaskContextSidebar({
  docketItem,
  workflow,
  project,
  client,
  relatedTasks = [],
}: TaskContextSidebarProps) {
  // Calculate days left if project has deadline
  const daysLeft = project?.daysUntilLaunch || 5

  // Get workflow steps for display
  const workflowSteps = workflow?.steps || [
    { id: 'brief', name: 'Brief', status: 'complete' },
    { id: 'audience', name: 'Audience', status: 'complete' },
    { id: 'creative', name: 'Creative', status: 'current' },
    { id: 'review', name: 'Review', status: 'upcoming' },
    { id: 'launch', name: 'Launch', status: 'upcoming' },
  ]

  // Get client contact
  const clientContact = client?.primaryContact

  return (
    <aside className="w-72 border-l border-neutral-100 bg-white flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <h3 className="text-sm font-medium text-neutral-400">Context</h3>
      </div>

      {/* Project info */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-xs text-neutral-400 mb-1">Project</p>
        <p className="font-medium text-black">{docketItem.projectName}</p>
        {client && <p className="text-sm text-neutral-500">{client.name}</p>}
      </div>

      {/* Workflow progress - horizontal */}
      {workflow && (
        <div className="px-5 py-4 border-b border-neutral-100">
          <p className="text-xs text-neutral-400 mb-3">Workflow</p>
          <div className="flex flex-wrap gap-1">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  {step.status === 'complete' ? (
                    <div className="w-6 h-6 rounded-full bg-[#86BC24] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  ) : step.status === 'current' ? (
                    <div className="w-6 h-6 rounded-full border-2 border-[#86BC24] bg-[#86BC24]/10 flex items-center justify-center">
                      <span className="w-2 h-2 bg-[#86BC24] rounded-full" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-neutral-200 bg-white" />
                  )}
                  <span
                    className={cn(
                      'text-[10px] mt-1 text-center max-w-[50px] leading-tight',
                      step.status === 'complete' && 'text-neutral-400',
                      step.status === 'current' && 'text-black font-medium',
                      step.status === 'upcoming' && 'text-neutral-400'
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {/* Connector line */}
                {index < workflowSteps.length - 1 && (
                  <div
                    className={cn(
                      'w-4 h-0.5 mx-1 mt-[-12px]',
                      step.status === 'complete' ? 'bg-[#86BC24]' : 'bg-neutral-200'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key info */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-400">Deadline</p>
            <p className="text-sm font-medium text-black">Feb 7</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400">Days Left</p>
            <p className={cn(
              'text-sm font-medium',
              daysLeft <= 5 ? 'text-amber-600' : 'text-neutral-600'
            )}>
              {daysLeft} days
            </p>
          </div>
        </div>
      </div>

      {/* Related tasks */}
      {relatedTasks.length > 0 && (
        <div className="flex-1 px-5 py-4 overflow-y-auto">
          <p className="text-xs text-neutral-400 mb-3">Related Tasks</p>
          <div className="space-y-2">
            {relatedTasks.map((task) => (
              <Link
                key={task.id}
                href={`/today/${task.id}`}
                className="block p-3 text-left bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <p className="text-sm font-medium text-black">{task.title}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{task.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Client contact */}
      {clientContact && (
        <div className="px-5 py-4 border-t border-neutral-100 mt-auto">
          <p className="text-xs text-neutral-400 mb-2">Client Contact</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
              {clientContact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-medium text-black">{clientContact.name}</p>
              <p className="text-xs text-neutral-400">{clientContact.role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
