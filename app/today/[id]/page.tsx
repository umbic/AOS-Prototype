'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, ChevronDown, Eye, Send, Zap } from 'lucide-react'
import { TaskLayout } from '@/components/layout/task-layout'
import { getDocketItem, getWorkflow, getProject, getClient, docketItems, creativeConcepts } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function TaskDetailPage() {
  const params = useParams()
  const docketItem = getDocketItem(params.id as string)
  const [input, setInput] = useState('')
  const [expandedOption, setExpandedOption] = useState<string | null>('option-1')

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

  const handleSend = () => {
    if (!input.trim()) return
    // In a real app, this would send the message
    setInput('')
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
                <div
                  key={i}
                  className={cn(
                    'bg-white rounded-xl border p-5 cursor-pointer transition-colors',
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
                </div>
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
        <div className="bg-white rounded-xl border border-neutral-100 p-6">
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
              <div key={i} className="border border-neutral-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedOption(expandedOption === `option-${i}` ? null : `option-${i}`)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                      i === 0 ? 'border-[#86BC24]' : 'border-neutral-300'
                    )}>
                      {i === 0 && <span className="w-2 h-2 bg-[#86BC24] rounded-full" />}
                    </span>
                    <span className={cn(
                      'text-sm',
                      i === 0 ? 'font-medium text-black' : 'text-neutral-600'
                    )}>
                      {option.title}
                    </span>
                  </div>
                  <ChevronDown className={cn(
                    'w-4 h-4 text-neutral-400 transition-transform',
                    expandedOption === `option-${i}` && 'rotate-180'
                  )} />
                </button>
                {expandedOption === `option-${i}` && option.details && (
                  <div className="px-4 pb-4 border-t border-neutral-100 bg-neutral-50">
                    <p className="text-sm text-neutral-600 py-3">{option.details}</p>
                    {option.preview && (
                      <div className="bg-white rounded-lg p-3 text-sm text-neutral-700 border border-neutral-200">
                        {option.preview}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-100">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50">
              <Eye className="w-4 h-4" />
              {taskContent.secondaryAction}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-white bg-[#86BC24] rounded-lg hover:bg-[#6B9A1D]">
              <Check className="w-4 h-4" />
              {taskContent.primaryAction}
            </button>
          </div>
        </div>
      </div>

      {/* Chat input */}
      <div className="px-8 py-4 border-t border-neutral-100 bg-white">
        <div className="flex items-center gap-3 bg-neutral-50 rounded-xl px-4 py-3">
          <span className="w-6 h-6 rounded-full bg-[#86BC24] flex items-center justify-center flex-shrink-0">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask a question or give direction..."
            className="flex-1 bg-transparent text-sm text-black placeholder-neutral-400 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(
              'p-2 transition-colors',
              input.trim()
                ? 'text-[#86BC24] hover:text-[#6B9A1D]'
                : 'text-neutral-300'
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
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
      primaryAction: 'Confirm & Send to Lin',
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
      primaryAction: 'Add to Media Plan',
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
      primaryAction: 'Start Parallel Track',
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
      primaryAction: 'Mark as Ready',
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
    primaryAction: 'Complete Task',
    secondaryAction: 'View Details',
  }
}
