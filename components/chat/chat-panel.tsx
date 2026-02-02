'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, AtSign, Users, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Agent, ChatMessage } from '@/lib/types'

interface ChatPanelProps {
  agent: Agent
  initialMessages?: ChatMessage[]
  onSendMessage?: (message: string) => void
  availableAgents?: Agent[]
  onSwitchAgent?: (agent: Agent) => void
  onConsult?: () => void
}

export function ChatPanel({
  agent,
  initialMessages = [],
  onSendMessage,
  availableAgents = [],
  onSwitchAgent,
  onConsult,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [showAgentPicker, setShowAgentPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'kenny',
      content: input,
      timestamp: new Date().toISOString(),
      type: 'user',
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    onSendMessage?.(input)

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        agentId: agent.id,
        content: getAgentResponse(agent.id, input),
        timestamp: new Date().toISOString(),
        type: 'agent',
      }
      setMessages(prev => [...prev, agentResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header - Deloitte style */}
      <div className="px-5 py-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAgentPicker(!showAgentPicker)}
            className="flex items-center gap-2 text-sm font-semibold text-black hover:text-deloitte-green transition-colors"
          >
            Chat with {agent.shortName}
            {availableAgents.length > 0 && (
              <ChevronDown className={cn('w-4 h-4 transition-transform', showAgentPicker && 'rotate-180')} />
            )}
          </button>
        </div>

        {/* Agent Picker Dropdown */}
        {showAgentPicker && availableAgents.length > 0 && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">Switch agent</div>
            <div className="space-y-1">
              {availableAgents.map(a => (
                <button
                  key={a.id}
                  onClick={() => {
                    onSwitchAgent?.(a)
                    setShowAgentPicker(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors',
                    a.id === agent.id
                      ? 'bg-neutral-100 text-black font-medium'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  )}
                >
                  <Bot className="w-4 h-4" />
                  {a.shortName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
        {messages.map(message => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.type === 'user' && 'flex-row-reverse'
            )}
          >
            {/* Avatar */}
            <div className={cn(
              'w-8 h-8 flex items-center justify-center flex-shrink-0',
              message.type === 'agent'
                ? 'bg-black'
                : 'bg-deloitte-green'
            )}>
              {message.type === 'agent' ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <span className="text-white text-xs font-semibold">K</span>
              )}
            </div>

            {/* Message Bubble */}
            <div className={cn(
              'max-w-[80%] px-4 py-3',
              message.type === 'agent'
                ? 'bg-neutral-100 text-neutral-800'
                : 'bg-black text-white'
            )}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Deloitte style */}
      <div className="px-5 py-4 border-t border-neutral-200">
        <div className="flex items-center gap-3 bg-neutral-100 px-4 py-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask a question or give feedback..."
            className="flex-1 bg-transparent text-sm text-black placeholder-neutral-400 focus:outline-none"
          />
          <div className="flex items-center gap-1">
            <button
              className="p-2 text-neutral-400 hover:text-black transition-colors"
              title="@mention team member"
            >
              <AtSign className="w-4 h-4" />
            </button>
            {onConsult && (
              <button
                onClick={onConsult}
                className="p-2 text-neutral-400 hover:text-black transition-colors"
                title="Consult another agent"
              >
                <Users className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={cn(
                'p-2 transition-colors',
                input.trim()
                  ? 'text-deloitte-green hover:text-deloitte-green-dark'
                  : 'text-neutral-300'
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to generate contextual responses
function getAgentResponse(agentId: string, userMessage: string): string {
  const responses: Record<string, string[]> = {
    analytics: [
      "Looking at the data, there are a few interesting patterns worth noting. The overall performance exceeded expectations, with ROAS coming in at 3.2x against a 2.8x target.",
      "Day 3 saw a 23% drop in CTR across Meta and Google. Cross-referencing with the creative rotation log, this coincided with the second creative set going live. The first set had stronger hook performance. Recommendation: for March Madness, consider A/B testing hooks before full rotation.",
      "TikTok was the standout performer this campaign, outperforming benchmarks by 40%. Given the March Madness audience skews younger, this could be a channel to lean into more heavily.",
    ],
    'concept-generator': [
      "I developed these four concepts based on the brief's emphasis on energy and community. Each takes a different approach to connecting with the audience during March Madness.",
      "The 'Bold Move' concept tested well in our sentiment analysis against similar sports campaigns. It captures the intensity while maintaining brand alignment.",
      "If you'd like, I can generate variations on any of these concepts or explore a completely different direction.",
    ],
    'audience-insights': [
      "I found a segment we haven't specifically targeted before: 'Casual Sports Fans' who engage primarily through social media highlights rather than full game viewing. They index high on mobile usage and short-form content.",
      "This segment represents approximately 12M potential reach, with a 35% overlap with our current target audiences.",
      "Shall I pull more detailed behavioral data on this segment, or compare them against our existing audience profiles?",
    ],
    'meeting-prepper': [
      "I've prepared three documents for your call with Lin: a 1-page Holiday Campaign summary with key metrics, the March Madness status update highlighting the timeline concern, and talking points organized by likely discussion topics.",
      "Based on Lin's previous meeting patterns, she typically asks about ROI first, then timeline, then creative. I've ordered the talking points accordingly.",
      "Want me to add any specific points or adjust the emphasis on anything?",
    ],
    'timeline-manager': [
      "The March Madness timeline has two potential bottlenecks: asset delivery (due in 5 days) and client sign-off (currently scheduled for Day 3). If either slips, we risk missing the launch window.",
      "I recommend escalating the asset production priority and building in a buffer day for client revisions.",
      "Would you like me to draft a revised timeline with these adjustments?",
    ],
  }

  const agentResponses = responses[agentId] || [
    "I understand. Let me look into that and provide some insights.",
    "That's a great question. Based on my analysis, here's what I'm seeing...",
    "I've processed the relevant data. Here are my recommendations.",
  ]

  return agentResponses[Math.floor(Math.random() * agentResponses.length)]
}
