'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock, FileText, ExternalLink, CheckCircle2, RefreshCw, MessageCircle, Bot, Send } from 'lucide-react'
import { SidebarThin } from '@/components/layout/sidebar-thin'
import { ChatPanelSlide } from '@/components/chat/chat-panel-slide'
import { getWorkflow, getProject, getClient, getAgent, agents } from '@/lib/data'
import { cn } from '@/lib/utils'

type DecisionChoice = 'approve' | 'request_changes' | 'consult' | null

export default function DecisionStepPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedDecision, setSelectedDecision] = useState<DecisionChoice>(null)
  const [changesText, setChangesText] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [questionText, setQuestionText] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const workflow = getWorkflow(params.id as string)
  const step = workflow?.steps.find(s => s.id === params.stepId)

  if (!workflow || !step) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-stone-500">Step not found</p>
      </div>
    )
  }

  const project = getProject(workflow.projectId)
  const client = project ? getClient(project.clientId) : null

  // Get agents that worked on previous steps
  const previousAgentIds = workflow.steps
    .filter(s => s.status === 'complete')
    .flatMap(s => s.agents)
  const uniqueAgentIds = Array.from(new Set(previousAgentIds))
  const previousAgents = uniqueAgentIds
    .map(id => getAgent(id))
    .filter(Boolean)

  // Mock materials to review
  const materials = [
    { id: '1', name: 'Creative Concepts Overview', type: 'deck' },
    { id: '2', name: 'Visual Direction Examples', type: 'images' },
    { id: '3', name: 'Brand Alignment Notes', type: 'notes' },
  ]

  const handleSubmitDecision = () => {
    // In a real app, this would submit the decision
    // For now, navigate back to the workflow
    router.push(`/workflow/${workflow.id}`)
  }

  return (
    <div className="flex h-screen bg-[#FAF9F7]">
      {/* Thin sidebar */}
      <SidebarThin />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-8 py-5 border-b border-stone-200 bg-white">
          {/* Back link */}
          <Link
            href={`/workflow/${workflow.id}`}
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {workflow.name}
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-stone-900">{step.name}</h1>
              <p className="text-sm text-stone-500">{client?.name} · {project?.name}</p>
            </div>
            <span className="ml-4 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
              Decision Step
            </span>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="max-w-2xl">
            {/* What needs your decision */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">
                What needs your decision
              </h2>
              <div className="p-5 bg-white rounded-xl border border-stone-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-stone-700 leading-relaxed">
                      I&apos;ve prepared <strong>{materials.length} concepts</strong> for your review based on the approved brief.
                      Each concept has been validated against brand guidelines and optimized for the target audience.
                    </p>
                    <p className="text-stone-500 text-sm mt-2">
                      Once you make a selection, I&apos;ll move forward with asset production for the chosen direction.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Materials to Review */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">
                Materials to review
              </h2>
              <div className="space-y-2">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-stone-400" />
                      <span className="text-sm font-medium text-stone-900">{material.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-stone-400" />
                  </button>
                ))}
              </div>
            </section>

            {/* Your Decision */}
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">
                Your decision
              </h2>
              <div className="space-y-3">
                {/* Approve */}
                <button
                  onClick={() => setSelectedDecision('approve')}
                  className={cn(
                    'w-full flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all',
                    selectedDecision === 'approve'
                      ? 'border-green-500 bg-green-50'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                    selectedDecision === 'approve'
                      ? 'border-green-500 bg-green-500'
                      : 'border-stone-300'
                  )}>
                    {selectedDecision === 'approve' && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-stone-900">Approve and proceed</span>
                    <p className="text-sm text-stone-500 mt-1">
                      Move forward to the next step with the current materials
                    </p>
                  </div>
                </button>

                {/* Request changes */}
                <button
                  onClick={() => setSelectedDecision('request_changes')}
                  className={cn(
                    'w-full flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all',
                    selectedDecision === 'request_changes'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                    selectedDecision === 'request_changes'
                      ? 'border-amber-500 bg-amber-500'
                      : 'border-stone-300'
                  )}>
                    {selectedDecision === 'request_changes' && (
                      <RefreshCw className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-stone-900">Request changes</span>
                    <p className="text-sm text-stone-500 mt-1">
                      Send feedback for revision before proceeding
                    </p>
                  </div>
                </button>

                {/* Changes textarea */}
                {selectedDecision === 'request_changes' && (
                  <div className="ml-9 mt-2">
                    <textarea
                      value={changesText}
                      onChange={(e) => setChangesText(e.target.value)}
                      placeholder="Describe what changes you'd like..."
                      className="w-full p-3 border border-stone-200 rounded-lg text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
                      rows={3}
                    />
                  </div>
                )}

                {/* Consult */}
                <button
                  onClick={() => setSelectedDecision('consult')}
                  className={cn(
                    'w-full flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all',
                    selectedDecision === 'consult'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                    selectedDecision === 'consult'
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-stone-300'
                  )}>
                    {selectedDecision === 'consult' && (
                      <MessageCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-stone-900">Consult an agent</span>
                    <p className="text-sm text-stone-500 mt-1">
                      Get more context or analysis before deciding
                    </p>
                  </div>
                </button>

                {/* Agent selector */}
                {selectedDecision === 'consult' && (
                  <div className="ml-9 mt-2 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {previousAgents.slice(0, 4).map((agent) => agent && (
                        <button
                          key={agent.id}
                          onClick={() => setSelectedAgent(agent.id)}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all',
                            selectedAgent === agent.id
                              ? 'border-blue-500 bg-blue-100 text-blue-700'
                              : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                          )}
                        >
                          <Bot className="w-4 h-4" />
                          {agent.shortName}
                        </button>
                      ))}
                    </div>
                    {selectedAgent && (
                      <div className="relative">
                        <input
                          type="text"
                          value={questionText}
                          onChange={(e) => setQuestionText(e.target.value)}
                          placeholder="Ask a question..."
                          className="w-full p-3 pr-12 border border-stone-200 rounded-lg text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-blue-500 hover:text-blue-600 transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Submit button */}
            {selectedDecision && selectedDecision !== 'consult' && (
              <button
                onClick={handleSubmitDecision}
                disabled={selectedDecision === 'request_changes' && !changesText.trim()}
                className={cn(
                  'w-full py-3 px-6 rounded-lg font-medium transition-all',
                  selectedDecision === 'approve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-amber-500 text-white hover:bg-amber-600',
                  (selectedDecision === 'request_changes' && !changesText.trim()) && 'opacity-50 cursor-not-allowed'
                )}
              >
                {selectedDecision === 'approve' ? 'Approve and Continue' : 'Submit Feedback'}
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Context sidebar */}
      <aside className="w-72 border-l border-stone-200 bg-white flex-shrink-0 overflow-y-auto">
        <div className="p-5">
          <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-4">Workflow Context</h3>

          {/* Workflow progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-stone-900">{workflow.name}</span>
            </div>
            <div className="flex items-center gap-1">
              {workflow.steps.map((s, i) => (
                <div
                  key={s.id}
                  className={cn(
                    'flex-1 h-1.5 rounded-full',
                    s.status === 'complete' ? 'bg-green-400' :
                    s.id === step.id ? 'bg-amber-400' : 'bg-stone-200'
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-stone-500 mt-2">
              Step {workflow.steps.findIndex(s => s.id === step.id) + 1} of {workflow.steps.length}
            </p>
          </div>

          {/* Project info */}
          {project && (
            <div className="mb-6 p-4 bg-stone-50 rounded-lg">
              <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Project</h4>
              <p className="text-sm font-medium text-stone-900">{project.name}</p>
              {project.daysUntilLaunch && (
                <p className="text-xs text-stone-500 mt-1">{project.daysUntilLaunch} days until launch</p>
              )}
            </div>
          )}

          {/* Previous steps summary */}
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Completed Steps</h4>
            <div className="space-y-2">
              {workflow.steps.filter(s => s.status === 'complete').map((s) => (
                <div key={s.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-stone-700">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Dotti Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#86BC24] rounded-full shadow-[0_4px_20px_rgba(134,188,36,0.3)] flex items-center justify-center hover:scale-105 hover:shadow-[0_6px_24px_rgba(134,188,36,0.4)] transition-all duration-200 z-50"
        aria-label="Open chat with Dotti"
      >
        <span className="w-3 h-3 bg-white rounded-full"></span>
      </button>

      {/* Chat panel */}
      <ChatPanelSlide
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context={step.name}
      />
    </div>
  )
}
