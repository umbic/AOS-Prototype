'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { WorkflowTemplateCard } from '@/components/cards/workflow-template-card'
import { WorkflowTemplatePreview } from '@/components/workflow/workflow-template-preview'
import { workflowTemplates, getWorkflowTemplatesByCategory } from '@/lib/data'
import { WorkflowTemplate, WorkflowTemplateCategory } from '@/lib/types'
import { cn } from '@/lib/utils'

const categories: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'campaign', label: 'Campaign' },
  { id: 'content', label: 'Content' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'operations', label: 'Operations' },
]

export default function WorkflowLibraryPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null)

  // Filter templates
  const filteredTemplates = getWorkflowTemplatesByCategory(selectedCategory).filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUseTemplate = () => {
    // Navigate to project creation with template pre-selected
    if (selectedTemplate) {
      router.push(`/projects/new?template=${selectedTemplate.id}`)
    }
  }

  return (
    <MainLayout pageContext="Workflow Library">
      <div className="flex h-full">
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="px-8 py-6 border-b border-stone-200 bg-white">
            <h1 className="text-2xl font-semibold text-stone-900 tracking-tight mb-4">
              Workflow Library
            </h1>

            {/* Search and filters */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#86BC24]/20 focus:border-[#86BC24]"
                />
              </div>

              {/* Category tabs */}
              <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                      selectedCategory === category.id
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Templates grid */}
          <div className="flex-1 overflow-auto p-8 bg-stone-50">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-500">No templates found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredTemplates.map(template => (
                  <WorkflowTemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplate?.id === template.id}
                    onClick={() => setSelectedTemplate(template)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview panel */}
        {selectedTemplate && (
          <div className="w-96 border-l border-stone-200 flex-shrink-0 flex flex-col">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 bg-stone-50">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                Template Preview
              </span>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="p-1 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview content */}
            <div className="flex-1 overflow-hidden">
              <WorkflowTemplatePreview
                template={selectedTemplate}
                onUseTemplate={handleUseTemplate}
              />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
