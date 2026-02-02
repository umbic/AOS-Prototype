'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Paperclip, Clock, FileText, MessageSquare, ListTodo, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DocketItem, Workflow, Project, Client, RelatedWorkItem, HistoryItem } from '@/lib/types'

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
}: TaskContextSidebarProps) {
  const [showAllHistory, setShowAllHistory] = useState(false)

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

  // Get related work and history from docket item
  const relatedWork = docketItem.relatedWork || []
  const history = docketItem.history || []

  // Format history timestamp
  const formatHistoryTime = (isoDate: string) => {
    const date = new Date(isoDate)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  // Get icon for related work type
  const getRelatedWorkIcon = (type: RelatedWorkItem['type']) => {
    switch (type) {
      case 'task':
        return <ListTodo className="w-3.5 h-3.5" />
      case 'document':
        return <FileText className="w-3.5 h-3.5" />
      case 'brief':
        return <FileText className="w-3.5 h-3.5" />
      case 'feedback':
        return <MessageSquare className="w-3.5 h-3.5" />
      default:
        return <FileText className="w-3.5 h-3.5" />
    }
  }

  // Limit history to 4 items unless expanded
  const visibleHistory = showAllHistory ? history : history.slice(0, 4)

  return (
    <aside className="w-72 border-l border-neutral-100 bg-white flex flex-col flex-shrink-0 overflow-y-auto">
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

      {/* Related Work */}
      {relatedWork.length > 0 && (
        <div className="px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2 mb-3">
            <Paperclip className="w-3.5 h-3.5 text-neutral-400" />
            <p className="text-xs text-neutral-400">Related</p>
          </div>
          <div className="space-y-2">
            {relatedWork.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-start gap-2.5 p-2 -mx-2 rounded-lg hover:bg-neutral-50 transition-colors text-left group"
              >
                <div className="w-6 h-6 rounded bg-neutral-100 flex items-center justify-center flex-shrink-0 text-neutral-400 group-hover:bg-neutral-200 transition-colors">
                  {getRelatedWorkIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-black truncate">{item.title}</p>
                  {item.date && (
                    <p className="text-xs text-neutral-400">{item.date}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <p className="text-xs text-neutral-400">History</p>
          </div>
          <div className="space-y-3">
            {visibleHistory.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <p className="text-xs text-neutral-400 w-16 flex-shrink-0">
                  {formatHistoryTime(item.timestamp)}
                </p>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-neutral-600">{item.event}</p>
                  {item.actor && (
                    <p className="text-xs text-neutral-400">{item.actor}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {history.length > 4 && (
            <button
              onClick={() => setShowAllHistory(!showAllHistory)}
              className="flex items-center gap-1 mt-3 text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <span>{showAllHistory ? 'Show less' : `Show ${history.length - 4} more`}</span>
              <ChevronDown className={cn('w-3 h-3 transition-transform', showAllHistory && 'rotate-180')} />
            </button>
          )}
        </div>
      )}

      {/* Client contact */}
      {clientContact && (
        <div className="px-5 py-4 mt-auto">
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
