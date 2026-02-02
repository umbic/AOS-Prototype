'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { AgentCard } from '@/components/cards/agent-card'
import { agents, getAgentsByCategory } from '@/lib/data'
import type { Agent } from '@/lib/types'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'creative', label: 'Creative' },
  { id: 'media', label: 'Media' },
  { id: 'operations', label: 'Operations' },
  { id: 'custom', label: 'Custom' },
]

export default function AgentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAgents = getAgentsByCategory(selectedCategory).filter(
    agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="px-8 py-6 border-b border-stone-200 bg-white">
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
            Agent Store
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Browse, configure, and create agents for your workflows.
          </p>

          {/* Search */}
          <div className="mt-4 flex items-center gap-3 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search agents..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-4 flex items-center gap-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  selectedCategory === category.id
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </header>

        {/* Agent Grid */}
        <div className="flex-1 overflow-y-auto p-8 bg-stone-50">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                variant="grid"
                onSelect={() => setSelectedAgent(agent)}
                isSelected={selectedAgent?.id === agent.id}
              />
            ))}

            {/* Create Custom Agent Card */}
            {selectedCategory === 'custom' && (
              <button className="bg-white rounded-xl border-2 border-dashed border-stone-300 p-5 hover:border-stone-400 transition-colors flex flex-col items-center justify-center min-h-[180px]">
                <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center mb-3">
                  <Plus className="w-5 h-5 text-stone-500" />
                </div>
                <span className="text-sm font-medium text-stone-700">Create custom agent</span>
                <span className="text-xs text-stone-500 mt-1">Build an agent for your specific needs</span>
              </button>
            )}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500">No agents found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
