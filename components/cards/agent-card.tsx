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
  const categoryColors: Record<string, string> = {
    strategy: 'bg-purple-100 text-purple-700',
    creative: 'bg-pink-100 text-pink-700',
    media: 'bg-blue-100 text-blue-700',
    operations: 'bg-green-100 text-green-700',
    custom: 'bg-amber-100 text-amber-700',
  }

  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer',
          isSelected
            ? 'border-blue-500 bg-blue-50'
            : 'border-stone-200 bg-white hover:border-stone-300'
        )}
        onClick={onSelect}
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-stone-900 truncate">{agent.name}</div>
          <div className="text-xs text-stone-500 truncate">{agent.description}</div>
        </div>
        {onChat && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onChat()
            }}
            className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  if (variant === 'detail') {
    return (
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center flex-shrink-0">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-stone-900">{agent.name}</h3>
            <span className={cn('inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium', categoryColors[agent.category])}>
              {agent.category.charAt(0).toUpperCase() + agent.category.slice(1)}
            </span>
            {agent.isCustom && (
              <span className="ml-2 text-xs text-stone-500">
                Created by {agent.createdBy}, {agent.createdAt}
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm text-stone-600 leading-relaxed">
          {agent.longDescription || agent.description}
        </p>

        {agent.capabilities && agent.capabilities.length > 0 && (
          <div className="mt-5">
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider">Capabilities</h4>
            <ul className="mt-2 space-y-1">
              {agent.capabilities.map((cap, i) => (
                <li key={i} className="text-sm text-stone-700 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-stone-400" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        )}

        {agent.dataSources && agent.dataSources.length > 0 && (
          <div className="mt-5">
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider">Data sources I can access</h4>
            <ul className="mt-2 space-y-1">
              {agent.dataSources.map((source, i) => (
                <li key={i} className="text-sm text-stone-700 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-stone-400" />
                  {source}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 text-xs text-stone-500">
          Used in {agent.usedInWorkflows} workflows
        </div>

        <div className="mt-6 flex gap-2">
          {onConfigure && (
            <button
              onClick={onConfigure}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Configure
            </button>
          )}
          {onAddToProject && (
            <button
              onClick={onAddToProject}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add to project
            </button>
          )}
          {onChat && (
            <button
              onClick={onChat}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </button>
          )}
        </div>
      </div>
    )
  }

  // Default grid variant
  return (
    <div
      className={cn(
        'bg-white rounded-xl border p-5 transition-all cursor-pointer',
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-100'
          : 'border-stone-200 hover:border-stone-300 hover:shadow-sm'
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-stone-900">{agent.name}</h3>
          <span className={cn('inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium', categoryColors[agent.category])}>
            {agent.category.charAt(0).toUpperCase() + agent.category.slice(1)}
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm text-stone-500 line-clamp-2">
        {agent.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-stone-400">
          Used in {agent.usedInWorkflows} workflows
        </span>
        {agent.isCustom && (
          <span className="text-xs text-amber-600 font-medium">Custom</span>
        )}
      </div>
    </div>
  )
}
