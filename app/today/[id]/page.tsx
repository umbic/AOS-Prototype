'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Bot, MessageCircle, Eye, Users } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { ChatPanel } from '@/components/chat/chat-panel'
import { DataCanvas } from '@/components/canvas/data-canvas'
import { CreativeCanvas } from '@/components/canvas/creative-canvas'
import { getDocketItem, getAgent, getWorkflow, agents as allAgents } from '@/lib/data'
import type { Agent, ChatMessage } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function ExpandedCardPage() {
  const params = useParams()
  const router = useRouter()
  const docketItem = getDocketItem(params.id as string)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showAgentAttribution, setShowAgentAttribution] = useState(true)

  useEffect(() => {
    if (docketItem?.agents?.[0]) {
      setSelectedAgent(docketItem.agents[0])
    }
  }, [docketItem])

  if (!docketItem) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-stone-500">Item not found</p>
        </div>
      </MainLayout>
    )
  }

  const workflow = docketItem.workflowId ? getWorkflow(docketItem.workflowId) : null

  const initialMessages: ChatMessage[] = selectedAgent ? [
    {
      id: '1',
      agentId: selectedAgent.id,
      content: getInitialMessage(selectedAgent.id, docketItem.id),
      timestamp: new Date().toISOString(),
      type: 'agent',
    },
  ] : []

  const renderCanvas = () => {
    switch (docketItem.type) {
      case 'review':
        return <DataCanvas />
      case 'creative':
        return <CreativeCanvas />
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-stone-50">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                <Eye className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">Content area</h3>
              <p className="text-sm text-stone-500">
                This is where the relevant content for "{docketItem.title}" would be displayed.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <MainLayout
      rightRail={
        selectedAgent && (
          <ChatPanel
            agent={selectedAgent}
            initialMessages={initialMessages}
            availableAgents={docketItem.agents}
            onSwitchAgent={setSelectedAgent}
            onConsult={() => {}}
          />
        )
      }
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="px-8 py-5 border-b border-stone-200 bg-white">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-3">
            <Link href="/today" className="hover:text-stone-700 transition-colors">Today</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/project/${docketItem.projectId}`} className="hover:text-stone-700 transition-colors">
              {docketItem.projectName}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-stone-900">Review</span>
          </nav>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
                {docketItem.title}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <Link
                  href={`/project/${docketItem.projectId}`}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
                >
                  {docketItem.projectName}
                </Link>
                <span className="text-sm text-stone-500">Ready for review</span>
              </div>
            </div>
          </div>
        </header>

        {/* Agent Attribution Panel */}
        <div className="px-8 py-4 bg-stone-50 border-b border-stone-200">
          <button
            onClick={() => setShowAgentAttribution(!showAgentAttribution)}
            className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-3"
          >
            Here's who worked on this
            <ChevronRight className={cn('w-4 h-4 transition-transform', showAgentAttribution && 'rotate-90')} />
          </button>

          {showAgentAttribution && (
            <div className="grid grid-cols-3 gap-4 animate-fade-in">
              {docketItem.agents.map(agent => (
                <div
                  key={agent.id}
                  className={cn(
                    'p-4 bg-white rounded-xl border transition-all cursor-pointer',
                    selectedAgent?.id === agent.id
                      ? 'border-blue-500 ring-2 ring-blue-100'
                      : 'border-stone-200 hover:border-stone-300'
                  )}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-stone-900">{agent.shortName}</span>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {getAgentContribution(agent.id)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedAgent(agent)
                    }}
                    className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat with this agent
                  </button>
                </div>
              ))}
              <button className="p-4 bg-white rounded-xl border border-dashed border-stone-300 hover:border-stone-400 transition-colors flex flex-col items-center justify-center text-stone-500 hover:text-stone-700">
                <Users className="w-5 h-5 mb-2" />
                <span className="text-sm">Bring in another agent</span>
              </button>
            </div>
          )}
        </div>

        {/* Workflow Progress */}
        {workflow && (
          <div className="px-8 py-4 bg-white border-b border-stone-200">
            <div className="flex items-center gap-3">
              {workflow.steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium',
                    step.status === 'complete'
                      ? 'bg-green-100 text-green-700'
                      : step.status === 'current'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-stone-100 text-stone-500'
                  )}>
                    {step.status === 'complete' && '✓ '}
                    {step.status === 'current' && '● '}
                    {step.name}
                  </div>
                  {i < workflow.steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-stone-300 mx-1" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-stone-500">
              You're here. After your review, this goes to {workflow.steps[workflow.currentStep]?.name || 'the next step'}.
              <Link href={`/workflow/${workflow.id}`} className="ml-2 text-blue-600 hover:text-blue-700">
                View full workflow
              </Link>
            </p>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden">
          {renderCanvas()}
        </div>
      </div>
    </MainLayout>
  )
}

function getInitialMessage(agentId: string, itemId: string): string {
  const messages: Record<string, Record<string, string>> = {
    analytics: {
      'holiday-metrics-review': "I pulled the final performance data for the Holiday Campaign. Overall ROAS was 3.2x, above the 2.8x target. A few things stood out that I flagged on the canvas. Want me to walk you through them?",
      default: "I've prepared the data analysis for your review. Let me know what you'd like to explore further.",
    },
    dashboard: {
      default: "I created the visualization you see below, organized by channel and metric. The interactive elements let you dive deeper into any area.",
    },
    insights: {
      default: "I identified 3 key findings and 2 anomalies worth discussing. I've flagged them directly on the canvas for context.",
    },
    'concept-generator': {
      'march-madness-concepts': "I developed 4 concepts based on the March Madness brief. Each takes a different approach to energy and community. Click any concept to see the full rationale.",
      default: "Here are the creative concepts I've generated. Let me know your thoughts on any of them.",
    },
    'visual-director': {
      default: "I've established the visual direction for each concept. The mood boards show the intended aesthetic and key visual elements.",
    },
    'audience-insights': {
      'audience-discovery': "I found a segment we haven't specifically targeted before: 'Casual Sports Fans' who engage primarily through social media highlights. They represent about 12M potential reach.",
      default: "I've analyzed the audience data and have some interesting findings to share.",
    },
    'meeting-prepper': {
      'lin-call-prep': "I've prepared materials for your call with Lin. Based on previous meetings, she typically asks about ROI first, then timeline, then creative. I've organized the talking points accordingly.",
      default: "I've assembled the prep materials for your upcoming meeting.",
    },
    'timeline-manager': {
      'timeline-risk': "The March Madness timeline has two potential bottlenecks: asset delivery (due in 5 days) and client sign-off. I recommend we discuss mitigation strategies.",
      default: "I've been monitoring the project timeline and have some updates to share.",
    },
  }

  return messages[agentId]?.[itemId] || messages[agentId]?.default || "I'm ready to help with your questions about this task."
}

function getAgentContribution(agentId: string): string {
  const contributions: Record<string, string> = {
    analytics: 'Pulled all performance data from Meta, Google, and TikTok. Compared against benchmarks.',
    dashboard: 'Created the visualization you see below. Organized by channel and metric.',
    insights: 'Identified 3 key findings and 2 anomalies worth discussing.',
    'concept-generator': 'Created 4 distinct concepts based on the brief, each with unique positioning.',
    'visual-director': 'Established visual direction and mood for each concept.',
    'audience-insights': 'Analyzed first and third-party data to identify new segment opportunities.',
    'meeting-prepper': 'Assembled talking points and prep docs based on meeting context.',
    'timeline-manager': 'Monitoring project milestones and flagging potential risks.',
  }
  return contributions[agentId] || 'Contributed to this task.'
}
