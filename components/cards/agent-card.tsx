'use client'

import { Bot, MessageCircle, Plus, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Agent } from '@/lib/types'

interface AgentCardProps {
  agent: Agent
  variant?: 'grid' | 'inline' | 'detail'
  onSelect?: () => void
  onConfigure?: () => void
  onChat?: () => void
  onAddToProject?: () => void
  isSelected?: boolean
}

export function AgentCard({
  agent,
  variant = 'grid',
  onSelect,
  onConfigure,
  onChat,
  onAddToProject,
  isSelected,
}: AgentCardProps) {
  const categoryStyles: Record<string, string> = {
    strategy: 'bg-neutral-900 text-white',
    creative: 'bg-deloitte-green text-white',
    media: 'bg-neutral-700 text-white',
    operations: 'bg-neutral-500 text-white',
    custom: 'border-2 border-deloitte-green text-deloitte-green bg-transparent',
  }

  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 p-4 border transition-all duration-200 cursor-pointer',
          isSelected
            ? 'border-deloitte-green bg-white shadow-card'
            : 'border-neutral-200 bg-white hover:border-neutral-300'
        )}
        onClick={onSelect}
      >
        <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-black truncate">{agent.name}</div>
          <div className="text-xs text-neutral-500 truncate">{agent.description}</div>
        </div>
        {onChat && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onChat()
            }}
            className="p-2 text-neutral-400 hover:text-deloitte-green hover:bg-neutral-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  if (variant === 'detail') {
    return (
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-black flex items-center justify-center flex-shrink-0">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-black">{agent.name}</h3>
            <span className={cn(
              'inline-flex mt-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider',
              categoryStyles[agent.category]
            )}>
              {agent.category}
            </span>
            {agent.isCustom && (
              <span className="ml-2 text-xs text-neutral-500">
                Created by {agent.createdBy}, {agent.createdAt}
              </span>
            )}
          </div>
        </div>

        <p className="mt-5 text-sm text-neutral-600 leading-relaxed">
          {agent.longDescription || agent.description}
        </p>

        {agent.capabilities && agent.capabilities.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Capabilities</h4>
            <ul className="mt-3 space-y-2">
              {agent.capabilities.map((cap, i) => (
                <li key={i} className="text-sm text-neutral-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-deloitte-green rounded-full flex-shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        )}

        {agent.dataSources && agent.dataSources.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Data sources</h4>
            <ul className="mt-3 space-y-2">
              {agent.dataSources.map((source, i) => (
                <li key={i} className="text-sm text-neutral-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full flex-shrink-0" />
                  {source}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 text-xs text-neutral-500">
          Used in {agent.usedInWorkflows} workflows
        </div>

        <div className="mt-8 flex gap-3">
          {onConfigure && (
            <button
              onClick={onConfigure}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-black border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              Configure
            </button>
          )}
          {onAddToProject && (
            <button
              onClick={onAddToProject}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-deloitte-green hover:bg-deloitte-green-dark transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add to project
            </button>
          )}
        </div>
        {onChat && (
          <button
            onClick={onChat}
            className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with agent
          </button>
        )}
      </div>
    )
  }

  // Default grid variant
  return (
    <div
      className={cn(
        'bg-white border p-5 transition-all duration-200 cursor-pointer',
        isSelected
          ? 'border-deloitte-green shadow-card'
          : 'border-neutral-200 hover:border-neutral-300 hover:shadow-card'
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-black">{agent.name}</h3>
          <span className={cn(
            'inline-flex mt-1.5 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider',
            categoryStyles[agent.category]
          )}>
            {agent.category}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm text-neutral-500 line-clamp-2">
        {agent.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-neutral-400">
          {agent.usedInWorkflows} workflows
        </span>
        {agent.isCustom && (
          <span className="text-xs font-semibold text-deloitte-green uppercase tracking-wider">Custom</span>
        )}
      </div>
    </div>
  )
}
