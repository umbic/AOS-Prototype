'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Bot, GitBranch, Calendar, ChevronDown } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { clients, workflowTemplates, agents, getWorkflowTemplate } from '@/lib/data'
import { Agent } from '@/lib/types'
import { cn } from '@/lib/utils'

type Step = 1 | 2 | 3

const projectTypes = [
  { id: 'campaign', label: 'Campaign', description: 'Advertising or marketing campaign' },
  { id: 'content', label: 'Content', description: 'Content production or publishing' },
  { id: 'analysis', label: 'Analysis', description: 'Research or performance analysis' },
  { id: 'operations', label: 'Operations', description: 'Operational or process workflow' },
]

function NewProjectContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedTemplateId = searchParams.get('template')

  const [currentStep, setCurrentStep] = useState<Step>(1)

  // Step 1: Project Basics
  const [selectedClient, setSelectedClient] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Step 2: Workflows
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])

  // Step 3: Agents
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])

  // Initialize with preselected template
  useEffect(() => {
    if (preselectedTemplateId) {
      const template = getWorkflowTemplate(preselectedTemplateId)
      if (template) {
        setSelectedTemplates([preselectedTemplateId])
        setProjectType(template.category)
      }
    }
  }, [preselectedTemplateId])

  // Get recommended templates based on project type
  const recommendedTemplates = projectType
    ? workflowTemplates.filter(t => t.category === projectType)
    : workflowTemplates.slice(0, 4)

  // Get recommended agents based on selected workflows
  const recommendedAgents: Agent[] = []
  const seenAgentIds = new Set<string>()
  selectedTemplates.forEach(templateId => {
    const template = workflowTemplates.find(t => t.id === templateId)
    if (template) {
      template.recommendedAgents.forEach(agentId => {
        if (!seenAgentIds.has(agentId)) {
          seenAgentIds.add(agentId)
          const agent = agents.find(a => a.id === agentId)
          if (agent) recommendedAgents.push(agent)
        }
      })
    }
  })

  // Auto-select recommended agents when moving to step 3
  useEffect(() => {
    if (currentStep === 3 && selectedAgents.length === 0) {
      setSelectedAgents(recommendedAgents.map(a => a.id))
    }
  }, [currentStep])

  const toggleTemplate = (templateId: string) => {
    setSelectedTemplates(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev =>
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    )
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return selectedClient && projectName && projectType
    }
    if (currentStep === 2) {
      return selectedTemplates.length > 0
    }
    return true
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step)
    } else {
      // Submit and redirect to project page
      router.push('/today')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  return (
    <MainLayout pageContext="New Project">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="px-8 py-5 border-b border-stone-200 bg-white">
          <Link
            href="/today"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </Link>

          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
            Create New Project
          </h1>

          {/* Progress steps */}
          <div className="flex items-center gap-3 mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  currentStep === step
                    ? 'bg-[#86BC24] text-white'
                    : currentStep > step
                    ? 'bg-green-100 text-green-700'
                    : 'bg-stone-100 text-stone-500'
                )}>
                  {currentStep > step ? <Check className="w-4 h-4" /> : step}
                </div>
                <span className={cn(
                  'text-sm font-medium',
                  currentStep === step ? 'text-stone-900' : 'text-stone-500'
                )}>
                  {step === 1 ? 'Project Basics' : step === 2 ? 'Select Workflows' : 'Add Agents'}
                </span>
                {step < 3 && <ArrowRight className="w-4 h-4 text-stone-300 mx-2" />}
              </div>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 bg-stone-50">
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Project Basics */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Client */}
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">Client</label>
                  <div className="relative">
                    <select
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#86BC24]/20 focus:border-[#86BC24]"
                    >
                      <option value="">Select a client...</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                  </div>
                </div>

                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Q2 Brand Campaign"
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#86BC24]/20 focus:border-[#86BC24]"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-stone-900 mb-2">Project Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {projectTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setProjectType(type.id)}
                        className={cn(
                          'p-4 rounded-lg border-2 text-left transition-all',
                          projectType === type.id
                            ? 'border-[#86BC24] bg-[#86BC24]/5'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        )}
                      >
                        <div className="font-medium text-stone-900">{type.label}</div>
                        <div className="text-xs text-stone-500 mt-1">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#86BC24]/20 focus:border-[#86BC24]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#86BC24]/20 focus:border-[#86BC24]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Select Workflows */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-stone-900 mb-2">Recommended Workflows</h2>
                  <p className="text-sm text-stone-500 mb-4">
                    Based on your project type, we recommend these workflow templates.
                  </p>
                  <div className="space-y-3">
                    {recommendedTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => toggleTemplate(template.id)}
                        className={cn(
                          'w-full p-4 rounded-lg border-2 text-left transition-all',
                          selectedTemplates.includes(template.id)
                            ? 'border-[#86BC24] bg-[#86BC24]/5'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                            selectedTemplates.includes(template.id)
                              ? 'border-[#86BC24] bg-[#86BC24]'
                              : 'border-stone-300'
                          )}>
                            {selectedTemplates.includes(template.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <GitBranch className="w-4 h-4 text-stone-400" />
                              <span className="font-medium text-stone-900">{template.name}</span>
                            </div>
                            <p className="text-sm text-stone-500 mt-1">{template.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-stone-400">
                              <span>{template.stepCount} steps</span>
                              <span>{template.estimatedDuration}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  href="/workflow-library"
                  className="inline-flex items-center gap-2 text-sm text-[#86BC24] hover:underline"
                >
                  Browse all templates
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Step 3: Add Agents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-stone-900 mb-2">Recommended Agents</h2>
                  <p className="text-sm text-stone-500 mb-4">
                    These agents are commonly used with your selected workflows.
                  </p>
                  <div className="space-y-3">
                    {recommendedAgents.map(agent => (
                      <button
                        key={agent.id}
                        onClick={() => toggleAgent(agent.id)}
                        className={cn(
                          'w-full p-4 rounded-lg border-2 text-left transition-all',
                          selectedAgents.includes(agent.id)
                            ? 'border-[#86BC24] bg-[#86BC24]/5'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                            selectedAgents.includes(agent.id)
                              ? 'border-[#86BC24] bg-[#86BC24]'
                              : 'border-stone-300'
                          )}>
                            {selectedAgents.includes(agent.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4 text-stone-400" />
                              <span className="font-medium text-stone-900">{agent.name}</span>
                            </div>
                            <p className="text-sm text-stone-500 mt-1">{agent.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedAgents.length > 0 && (
                  <div className="p-4 bg-stone-100 rounded-lg">
                    <div className="text-sm text-stone-600">
                      <strong>{selectedAgents.length}</strong> agents selected for this project
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-4 border-t border-stone-200 bg-white flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              currentStep === 1
                ? 'text-stone-300 cursor-not-allowed'
                : 'text-stone-600 hover:bg-stone-100'
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              'flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors',
              canProceed()
                ? 'bg-[#86BC24] text-white hover:bg-[#6B9A1D]'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            )}
          >
            {currentStep === 3 ? 'Create Project' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </MainLayout>
  )
}

export default function NewProjectPage() {
  return (
    <Suspense fallback={
      <MainLayout pageContext="New Project">
        <div className="flex items-center justify-center h-full">
          <div className="text-stone-500">Loading...</div>
        </div>
      </MainLayout>
    }>
      <NewProjectContent />
    </Suspense>
  )
}
