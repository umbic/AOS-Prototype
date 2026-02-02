'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, ChevronDown, Eye, Zap, X, FileText, Pencil, MessageSquare, Bot, Share2, Clock } from 'lucide-react'
import { TaskLayout } from '@/components/layout/task-layout'
import { AgentCard } from '@/components/task/agent-card'
import { CallAgentModal } from '@/components/task/call-agent-modal'
import { getDocketItem, getWorkflow, getProject, getClient, docketItems, creativeConcepts } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const docketItem = getDocketItem(params.id as string)
  const [expandedOption, setExpandedOption] = useState<string | null>('option-0')
  const [selectedOption, setSelectedOption] = useState<number>(0)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showCallAgentModal, setShowCallAgentModal] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  if (!docketItem) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF9F7]">
        <p className="text-neutral-400">Task not found</p>
      </div>
    )
  }

  const workflow = docketItem.workflowId ? getWorkflow(docketItem.workflowId) : null
  const project = docketItem.projectId ? getProject(docketItem.projectId) : null
  const client = project?.clientId ? getClient(project.clientId) : getClient(docketItem.projectId)

  // Get related tasks (same project, different id)
  const relatedTasks = docketItems.filter(
    item => item.projectId === docketItem.projectId && item.id !== docketItem.id
  ).slice(0, 3)

  // Get task-specific content
  const taskContent = getTaskContent(docketItem.id)

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
    setExpandedOption(`option-${index}`)
  }

  const handleApprove = () => {
    setIsApproving(true)
    // Simulate approval action
    setTimeout(() => {
      setIsApproved(true)
      setIsApproving(false)
      // Navigate back to today after a brief moment
      setTimeout(() => {
        router.push('/today')
      }, 1500)
    }, 800)
  }

  const handleSecondaryAction = () => {
    setShowReportModal(true)
  }

  const handleCallAgent = (agentId: string, request: string) => {
    // In a real app, this would trigger the agent
    console.log('Calling agent:', agentId, 'with request:', request)
  }

  return (
    <TaskLayout
      docketItem={docketItem}
      workflow={workflow}
      project={project}
      client={client}
      relatedTasks={relatedTasks}
    >
      {/* Header */}
      <header className="px-8 py-4 border-b border-neutral-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/today"
            className="p-2 -ml-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-xs text-neutral-400">{client?.name} · {docketItem.projectName}</p>
            <h1 className="text-lg font-semibold text-black">{docketItem.title}</h1>
          </div>
        </div>
        {project && (
          <Link
            href={`/project/${project.id}`}
            className="px-4 py-2 text-sm text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            View Project
          </Link>
        )}
      </header>

      {/* Briefing Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Agent Card */}
        {docketItem.taskAgent && (
          <div className="mb-6">
            <AgentCard agent={docketItem.taskAgent} />
          </div>
        )}

        {/* Summary Card */}
        <div className="bg-white rounded-xl border border-neutral-100 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#86BC24]/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-[#86BC24]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">Summary</h3>
              <p className="text-neutral-600 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: taskContent.summary }} />
            </div>
          </div>
        </div>

        {/* Task-specific content */}
        {taskContent.concepts && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">The Concepts</h3>
            <div className="grid grid-cols-2 gap-4">
              {taskContent.concepts.map((concept, i) => (
                <Link
                  key={i}
                  href={`/project/march-madness/creative/concept-${i + 1}`}
                  className={cn(
                    'bg-white rounded-xl border p-5 cursor-pointer transition-colors block',
                    concept.recommended
                      ? 'border-[#86BC24]/30 hover:border-[#86BC24]'
                      : 'border-neutral-100 hover:border-neutral-200 opacity-60'
                  )}
                >
                  {concept.recommended && (
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-[#86BC24] bg-[#86BC24]/10 px-2 py-1 rounded">
                        Recommended
                      </span>
                    </div>
                  )}
                  <h4 className="text-base font-semibold text-black">{concept.name}</h4>
                  <p className="text-sm text-neutral-500 mt-2">{concept.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Metrics section for review tasks */}
        {taskContent.metrics && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">Key Metrics</h3>
            <div className="grid grid-cols-4 gap-4">
              {taskContent.metrics.map((metric, i) => (
                <div key={i} className="bg-white rounded-xl border border-neutral-100 p-4">
                  <p className="text-sm text-neutral-500">{metric.label}</p>
                  <p className="text-2xl font-semibold text-black mt-1">{metric.value}</p>
                  {metric.change && (
                    <p className={cn(
                      'text-xs mt-1',
                      metric.change > 0 ? 'text-[#86BC24]' : 'text-red-500'
                    )}>
                      {metric.change > 0 ? '+' : ''}{metric.change}% {metric.changeLabel}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Recommendation Panel */}
        <div className="bg-white rounded-xl border border-neutral-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#86BC24] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            </span>
            <h3 className="text-base font-semibold text-black">My Recommendation</h3>
          </div>
          <p className="text-neutral-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: taskContent.recommendation }} />

          {/* Expandable options */}
          <div className="space-y-3">
            {taskContent.options.map((option, i) => (
              <div key={i} className={cn(
                'border rounded-lg overflow-hidden transition-colors',
                selectedOption === i ? 'border-[#86BC24]/30 bg-[#86BC24]/5' : 'border-neutral-100'
              )}>
                <div className="flex items-center">
                  {/* Radio button - clickable to select */}
                  <button
                    onClick={() => handleOptionSelect(i)}
                    className="pl-4 py-3 pr-2 hover:bg-neutral-50/50"
                  >
                    <span className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                      selectedOption === i ? 'border-[#86BC24]' : 'border-neutral-300 hover:border-neutral-400'
                    )}>
                      {selectedOption === i && <span className="w-2.5 h-2.5 bg-[#86BC24] rounded-full" />}
                    </span>
                  </button>
                  {/* Expand/collapse button */}
                  <button
                    onClick={() => setExpandedOption(expandedOption === `option-${i}` ? null : `option-${i}`)}
                    className="flex-1 flex items-center justify-between pr-4 py-3 hover:bg-neutral-50/50"
                  >
                    <span className={cn(
                      'text-sm',
                      selectedOption === i ? 'font-medium text-black' : 'text-neutral-600'
                    )}>
                      {option.title}
                    </span>
                    <ChevronDown className={cn(
                      'w-4 h-4 text-neutral-400 transition-transform',
                      expandedOption === `option-${i}` && 'rotate-180'
                    )} />
                  </button>
                </div>
                {expandedOption === `option-${i}` && option.details && (
                  <div className="px-4 pb-4 border-t border-neutral-100 bg-neutral-50/50">
                    <p className="text-sm text-neutral-600 py-3">{option.details}</p>
                    {option.preview && (
                      <div className="bg-white rounded-lg p-3 text-sm text-neutral-700 border border-neutral-200 whitespace-pre-line">
                        {option.preview}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
          {/* Primary action row */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleSecondaryAction}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {taskContent.secondaryAction}
            </button>
            <button
              onClick={handleApprove}
              disabled={isApproving || isApproved}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-all',
                isApproved
                  ? 'bg-[#6B9A1D] text-white'
                  : isApproving
                    ? 'bg-[#86BC24]/70 text-white cursor-wait'
                    : 'bg-[#86BC24] text-white hover:bg-[#6B9A1D]'
              )}
            >
              {isApproved ? (
                <>
                  <Check className="w-4 h-4" />
                  Done!
                </>
              ) : isApproving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {taskContent.primaryAction}
                </>
              )}
            </button>
          </div>

          {/* Secondary action row */}
          <div className="flex items-center gap-2 pt-4 border-t border-neutral-100">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Pencil className="w-3.5 h-3.5" />
              Edit recommendation
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              Ask to dig deeper
            </button>
            <button
              onClick={() => setShowCallAgentModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <Bot className="w-3.5 h-3.5" />
              Call in agent
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              Share with team
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors">
              <Clock className="w-3.5 h-3.5" />
              Snooze
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowReportModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#86BC24]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#86BC24]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-black">{docketItem.title}</h2>
                  <p className="text-sm text-neutral-500">{docketItem.projectName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 overflow-y-auto max-h-[60vh]">
              {/* Summary Section */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Executive Summary</h3>
                <p className="text-neutral-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: taskContent.summary }} />
              </div>

              {/* Metrics if available */}
              {taskContent.metrics && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {taskContent.metrics.map((metric, i) => (
                      <div key={i} className="bg-neutral-50 rounded-lg p-3">
                        <p className="text-xs text-neutral-500">{metric.label}</p>
                        <p className="text-xl font-semibold text-black">{metric.value}</p>
                        {metric.change && (
                          <p className={cn('text-xs', metric.change > 0 ? 'text-[#86BC24]' : 'text-red-500')}>
                            {metric.change > 0 ? '+' : ''}{metric.change}% {metric.changeLabel}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">AI Recommendation</h3>
                <div className="bg-[#86BC24]/5 border border-[#86BC24]/20 rounded-lg p-4">
                  <p className="text-neutral-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: taskContent.recommendation }} />
                </div>
              </div>

              {/* Selected Action */}
              <div>
                <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">Selected Action</h3>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                  <span className="w-5 h-5 rounded-full border-2 border-[#86BC24] flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-[#86BC24] rounded-full" />
                  </span>
                  <span className="text-sm font-medium text-black">{taskContent.options[selectedOption]?.title}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 px-6 py-4 border-t border-neutral-100 bg-neutral-50">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 px-4 py-2.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false)
                  handleApprove()
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-white bg-[#86BC24] rounded-lg hover:bg-[#6B9A1D] transition-colors"
              >
                <Check className="w-4 h-4" />
                {taskContent.primaryAction}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Agent Modal */}
      <CallAgentModal
        isOpen={showCallAgentModal}
        onClose={() => setShowCallAgentModal(false)}
        onCallAgent={handleCallAgent}
      />
    </TaskLayout>
  )
}

// Task-specific content generator
function getTaskContent(taskId: string) {
  const content: Record<string, {
    summary: string
    recommendation: string
    concepts?: Array<{ name: string; description: string; recommended?: boolean }>
    metrics?: Array<{ label: string; value: string; change?: number; changeLabel?: string }>
    options: Array<{ title: string; details?: string; preview?: string }>
    primaryAction: string
    secondaryAction: string
  }> = {
    'march-madness-concepts': {
      summary: `I've developed <strong>4 creative concepts</strong> for March Madness based on the brief. Each takes a different strategic angle. Based on Google's brand direction and Lin's Q4 feedback, I'd recommend <strong>Community</strong> or <strong>Bold Move</strong>.`,
      recommendation: `I'd lean toward <strong>Community</strong> or <strong>Bold Move</strong>. The other two might feel too far from Google's current positioning. Here's my reasoning:`,
      concepts: [
        { name: 'Bold Move', description: 'High energy, athlete-focused, captures tournament intensity', recommended: true },
        { name: 'Community', description: 'Fan experience, shared moments, inclusive imagery', recommended: true },
        { name: 'Quiet Confidence', description: 'Understated, premium feel, focuses on the mental game' },
        { name: 'Performance', description: 'Data-driven, tech-forward, precision aesthetic' },
      ],
      options: [
        {
          title: 'Present Bold Move + Community to Lin',
          details: 'Present both as top choices and let Lin weigh in. This gives her agency while keeping us away from the weaker concepts.',
          preview: '"Hi Lin, I\'ve narrowed down to two strong directions that align with your Q4 feedback. Both concepts capture different aspects of what makes March Madness resonate..."'
        },
        { title: 'Schedule creative review meeting' },
        { title: 'Request visual mockups for all 4' },
      ],
      primaryAction: 'Approve & Archive',
      secondaryAction: 'View Concepts',
    },
    'holiday-metrics-review': {
      summary: `I pulled the final numbers for the Holiday Campaign. The headline: <strong>3.2x ROAS</strong> against a 2.8x target — a 14% beat. TikTok was the standout performer, overdelivering by <strong>40%</strong>.`,
      recommendation: `Lead with the TikTok win in your client presentation — it validates the channel expansion strategy Lin was skeptical about. The story: "We tested a new channel, it worked, and the core performers remained stable."`,
      metrics: [
        { label: 'Total Reach', value: '45.2M', change: 12, changeLabel: 'vs target' },
        { label: 'ROAS', value: '3.2x', change: 14, changeLabel: 'vs 2.8x target' },
        { label: 'Conversions', value: '128K', change: 15, changeLabel: 'vs last year' },
        { label: 'TikTok CTR', value: '3.4%', change: 40, changeLabel: 'vs benchmark' },
      ],
      options: [
        {
          title: 'Build narrative for client deck',
          details: 'Structure the story as: Headline win → Channel story → Learnings → Recommendation for March Madness.',
          preview: 'Slide 1: "Holiday 2024: Exceeding Targets"\nSlide 2: "TikTok Validates Channel Expansion"\nSlide 3: "What We Learned"...'
        },
        { title: 'Walk through channel breakdown' },
        { title: 'Schedule internal review' },
      ],
      primaryAction: 'Approve & Archive',
      secondaryAction: 'View Full Report',
    },
    'audience-discovery': {
      summary: `I found something interesting in the Q2 data: a segment we haven't specifically targeted — <strong>Casual Sports Fans</strong>. They represent about <strong>12M potential reach</strong> with 3x higher engagement on short-form content and 30% lower CPM.`,
      recommendation: `This could be a good test segment for March Madness. They're high-engagement, low-cost, and overlap with the 25-34 demo Google wants to grow. I'd recommend a small test budget to validate before scaling.`,
      options: [
        {
          title: 'Build targeting recommendation',
          details: 'Create a targeting strategy focused on short-form video and social-first creative, allocating 10% of media budget as a test.',
        },
        { title: 'See detailed segment analysis' },
        { title: 'Discuss fit with campaign goals' },
      ],
      primaryAction: 'Approve & Archive',
      secondaryAction: 'View Segment Data',
    },
    'timeline-risk': {
      summary: `Heads up: Asset delivery deadline is in <strong>5 days</strong>, but 2 production steps are still in progress. Final creative approval needs 2 more days, and asset localization is blocked until approval.`,
      recommendation: `I'd recommend <strong>Option 3: Parallel track</strong> — start localization on approved concepts while others finalize. This keeps us on schedule with minimal risk.`,
      options: [
        {
          title: 'Parallel track (recommended)',
          details: 'Get at least 2 concepts approved today, start localization tomorrow while the other 2 finalize. Risk of rework is low based on feedback so far.',
        },
        { title: 'Push deadline by 3 days' },
        { title: 'Reduce asset variants' },
      ],
      primaryAction: 'Approve & Archive',
      secondaryAction: 'View Timeline',
    },
    'lin-call-prep': {
      summary: `Your call with Lin is at <strong>2pm</strong>. I've prepped talking points, documents, and anticipated questions. She'll likely ask about Holiday results, March Madness timeline, and Q2 planning status.`,
      recommendation: `Lead with the ROAS win to build confidence. Lin was skeptical about TikTok — the 40% overperformance is your chance to validate future channel tests. Documents are ready and attached.`,
      options: [
        {
          title: 'Rehearse the ROAS story',
          details: '"The Holiday Campaign delivered 3.2x ROAS against a 2.8x target — a 14% beat. The standout was TikTok, which overperformed by 40%..."',
        },
        { title: 'Review prepared documents' },
        { title: 'Prepare for pushback scenarios' },
      ],
      primaryAction: 'Approve & Archive',
      secondaryAction: 'View Documents',
    },
  }

  return content[taskId] || {
    summary: `I've prepared everything for this task. Let me know how you'd like to proceed.`,
    recommendation: `Based on the context, here are my suggested next steps:`,
    options: [
      { title: 'Review the details' },
      { title: 'Take action' },
    ],
    primaryAction: 'Approve & Archive',
    secondaryAction: 'View Details',
  }
}
