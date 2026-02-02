'use client'

import { useState } from 'react'
import { X, Target, BarChart3, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SuggestedAgent {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

interface CallAgentModalProps {
  isOpen: boolean
  onClose: () => void
  onCallAgent: (agentId: string, request: string) => void
  suggestedAgents?: SuggestedAgent[]
}

const defaultSuggestedAgents: SuggestedAgent[] = [
  {
    id: 'messaging-strategist',
    name: 'Strategy Agent',
    icon: <Target className="w-4 h-4" />,
    description: 'Strategic analysis and recommendations',
  },
  {
    id: 'media-planner',
    name: 'Media Mix Agent',
    icon: <BarChart3 className="w-4 h-4" />,
    description: 'Channel allocation and media planning',
  },
  {
    id: 'copywriter',
    name: 'Content Agent',
    icon: <FileText className="w-4 h-4" />,
    description: 'Copy and content creation',
  },
]

export function CallAgentModal({
  isOpen,
  onClose,
  onCallAgent,
  suggestedAgents = defaultSuggestedAgents,
}: CallAgentModalProps) {
  const [request, setRequest] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (selectedAgent && request.trim()) {
      onCallAgent(selectedAgent, request)
      setRequest('')
      setSelectedAgent(null)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-black">Call in another agent</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Request input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              What do you need?
            </label>
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Describe what you need help with..."
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-black placeholder-neutral-400 outline-none focus:border-[#86BC24] focus:ring-1 focus:ring-[#86BC24] resize-none"
              rows={3}
            />
          </div>

          {/* Suggested agents */}
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-3">Suggested agents</p>
            <div className="space-y-2">
              {suggestedAgents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left',
                    selectedAgent === agent.id
                      ? 'border-[#86BC24] bg-[#86BC24]/5'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    selectedAgent === agent.id ? 'bg-[#86BC24]/10 text-[#86BC24]' : 'bg-neutral-100 text-neutral-500'
                  )}>
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'text-sm font-medium',
                      selectedAgent === agent.id ? 'text-[#86BC24]' : 'text-black'
                    )}>
                      {agent.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">{agent.description}</p>
                  </div>
                  {selectedAgent === agent.id && (
                    <div className="w-5 h-5 rounded-full bg-[#86BC24] flex items-center justify-center flex-shrink-0">
                      <span className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Browse all link */}
          <Link
            href="/agents"
            className="block mt-4 text-sm text-[#86BC24] hover:text-[#6B9A1D] transition-colors"
          >
            Browse all agents
          </Link>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedAgent || !request.trim()}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-colors',
              selectedAgent && request.trim()
                ? 'bg-[#86BC24] text-white hover:bg-[#6B9A1D]'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            )}
          >
            Call Agent
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
