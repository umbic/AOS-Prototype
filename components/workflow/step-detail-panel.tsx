'use client'

import Image from 'next/image'
import { Bot, Check, Clock, FileText, MessageCircle, Plus, SkipForward, User, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getAgent } from '@/lib/data'
import type { WorkflowStep } from '@/lib/types'

interface StepDetailPanelProps {
  step: WorkflowStep
  onMarkComplete?: () => void
  onSkip?: () => void
  onReassign?: () => void
  onChatWithAgent?: (agentId: string) => void
}

export function StepDetailPanel({
  step,
  onMarkComplete,
  onSkip,
  onReassign,
  onChatWithAgent,
}: StepDetailPanelProps) {
  const statusColors: Record<string, string> = {
    complete: 'bg-green-50 text-green-700 border-green-200',
    current: 'bg-blue-50 text-blue-700 border-blue-200',
    upcoming: 'bg-stone-50 text-stone-600 border-stone-200',
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className={cn(
            'px-2.5 py-1 rounded-full text-xs font-medium border',
            statusColors[step.status]
          )}>
            {step.status === 'complete' ? 'Complete' : step.status === 'current' ? 'In progress' : 'Upcoming'}
          </span>
        </div>
        <h2 className="mt-3 text-lg font-medium text-stone-900">{step.name}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Timing */}
        <div>
          {step.startedAt && (
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Clock className="w-4 h-4 text-stone-400" />
              Started: {new Date(step.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </div>
          )}
          {step.completedAt && (
            <div className="flex items-center gap-2 text-sm text-stone-600 mt-1">
              <Check className="w-4 h-4 text-green-500" />
              Completed: {new Date(step.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </div>
          )}
          {step.timeEstimate && step.status !== 'complete' && (
            <div className="flex items-center gap-2 text-sm text-stone-500 mt-1">
              <Clock className="w-4 h-4 text-stone-400" />
              Time estimate: {step.timeEstimate}
            </div>
          )}
        </div>

        {/* Assignee */}
        {step.assignee && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Assigned to</h4>
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
              <Image
                src="/avatars/kenny.jpg"
                alt="Kenny"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium text-stone-900">Kenny</div>
                <div className="text-xs text-stone-500">Strategy Lead</div>
              </div>
            </div>
          </div>
        )}

        {/* Agents */}
        {step.agents.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Agents available</h4>
            <div className="space-y-2">
              {step.agents.map(agentId => {
                const agent = getAgent(agentId)
                if (!agent) return null
                return (
                  <div key={agentId} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-stone-900">{agent.shortName}</span>
                    </div>
                    <button
                      onClick={() => onChatWithAgent?.(agentId)}
                      className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
              <button className="w-full flex items-center justify-center gap-2 p-3 text-sm text-stone-500 border border-dashed border-stone-300 rounded-lg hover:border-stone-400 hover:text-stone-600 transition-colors">
                <Plus className="w-4 h-4" />
                Consult another agent
              </button>
            </div>
          </div>
        )}

        {/* Documents */}
        {step.documents && step.documents.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Documents/Assets</h4>
            <div className="space-y-2">
              {step.documents.map((doc, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors text-left">
                  <FileText className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-700">{doc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Notes</h4>
          {step.notes && step.notes.length > 0 ? (
            <div className="space-y-2">
              {step.notes.map((note, i) => (
                <div key={i} className="p-3 bg-stone-50 rounded-lg text-sm text-stone-700">{note}</div>
              ))}
            </div>
          ) : (
            <div className="p-4 border border-dashed border-stone-200 rounded-lg text-center">
              <p className="text-sm text-stone-400">No notes yet. Add one?</p>
              <button className="mt-2 text-sm text-stone-600 hover:text-stone-800 transition-colors">
                + Add a note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {step.status === 'current' && (
        <div className="px-5 py-4 border-t border-stone-200 space-y-2">
          <button
            onClick={onMarkComplete}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <Check className="w-4 h-4" />
            Mark as complete
          </button>
          <div className="flex gap-2">
            <button
              onClick={onSkip}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-stone-600 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              Skip this step
            </button>
            <button
              onClick={onReassign}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-stone-600 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <Users className="w-4 h-4" />
              Reassign
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
