'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, ArrowRight, Clock, AlertCircle } from 'lucide-react'
import { MainLayoutCentered } from '@/components/layout/main-layout-centered'
import { docketItems, currentUser } from '@/lib/data'
import { getGreeting, cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

// Get the most urgent/important item to recommend
function getTopRecommendation() {
  // Prioritize: operational > review > others
  const priorityOrder = ['operational', 'review', 'discovery', 'creative', 'calendar']
  const sorted = [...docketItems].sort((a, b) => {
    return priorityOrder.indexOf(a.type) - priorityOrder.indexOf(b.type)
  })
  return sorted[0]
}

function getInitialBrief() {
  const topItem = getTopRecommendation()
  const urgentCount = docketItems.filter(d => d.type === 'operational').length

  let brief = `You have ${docketItems.length} things on your plate today.`

  if (urgentCount > 0) {
    brief += ` ${urgentCount} ${urgentCount === 1 ? 'needs' : 'need'} attention soon.`
  }

  brief += `\n\nI'd start with **${topItem.title}** — `

  // Add context based on type
  if (topItem.type === 'operational') {
    brief += `there's a timeline risk we should address before it escalates.`
  } else if (topItem.type === 'review') {
    brief += `I've already pulled the numbers and have some insights ready.`
  } else if (topItem.type === 'discovery') {
    brief += `I found something interesting in the data you'll want to see.`
  } else if (topItem.type === 'creative') {
    brief += `I've developed some concepts based on the brief.`
  } else {
    brief += `it's time-sensitive.`
  }

  brief += `\n\nWhat would you like to focus on?`

  return brief
}

export default function TodayPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showAllTasks, setShowAllTasks] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const topRecommendation = getTopRecommendation()

  // Initialize with AI brief
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: getInitialBrief()
      }])
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (text: string = input) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate contextual response
    setTimeout(() => {
      let response = ''
      const lowerText = text.toLowerCase()

      if (lowerText.includes('timeline') || lowerText.includes('risk') || lowerText.includes('march madness')) {
        response = `Good call. The March Madness timeline is tight — asset delivery is in 5 days but 2 production steps are still in progress.\n\nI've outlined 3 options to get us back on track. Want me to walk you through them, or jump straight to my recommendation?`
      } else if (lowerText.includes('holiday') || lowerText.includes('metrics') || lowerText.includes('numbers')) {
        response = `The Holiday Campaign delivered 3.2x ROAS against a 2.8x target — a solid 14% beat.\n\nThe standout was TikTok, which overperformed by 40%. That validates the channel expansion strategy Lin was skeptical about.\n\nWant me to prep a narrative for the client deck, or dig deeper into the channel breakdown?`
      } else if (lowerText.includes('lin') || lowerText.includes('call') || lowerText.includes('prep')) {
        response = `Your call with Lin is at 2pm. I've prepped talking points around:\n\n1. **Holiday results** — Lead with the ROAS win\n2. **March Madness** — On track but tight on assets\n3. **Q2 planning** — Waiting on budget confirmation\n\nWant to rehearse any part, or review the docs I've prepared?`
      } else if (lowerText.includes('show') || lowerText.includes('all') || lowerText.includes('everything') || lowerText.includes('list')) {
        setShowAllTasks(true)
        response = `Here's everything on your plate today. I've highlighted the ones I'd prioritize — the timeline risk and metrics review are the most time-sensitive.\n\nWhich one should we dig into?`
      } else {
        response = `Got it. Let me pull together what I have on that.\n\nBased on your current priorities, I'd suggest we keep the timeline risk in view — it could become urgent if we don't address it today.\n\nWhat aspect would you like to explore first?`
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      }])
      setIsTyping(false)
    }, 1000)
  }

  // Quick actions based on current tasks
  const quickActions = [
    { label: `Start with ${topRecommendation.title.split(' ').slice(0, 3).join(' ')}...`, href: `/today/${topRecommendation.id}` },
    { label: 'Show me everything', action: () => setShowAllTasks(true) },
    { label: 'Prep me for Lin call', action: () => handleSend('Prep me for the Lin call') },
  ]

  return (
    <MainLayoutCentered pageContext="Today" hideChatButton>
      <div className="flex-1 flex flex-col h-screen">
        {/* Main conversation area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-12">
            {/* Greeting */}
            <div className="text-center mb-12">
              <h1 className="text-2xl font-medium text-black">
                {getGreeting()}, {currentUser.firstName}
                <span className="text-deloitte-green">.</span>
              </h1>
            </div>

            {/* Messages */}
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'animate-fade-in',
                    message.role === 'user' ? 'flex justify-end' : ''
                  )}
                >
                  {message.role === 'assistant' ? (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-deloitte-green flex items-center justify-center flex-shrink-0">
                        <span className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-[15px] text-neutral-700 leading-relaxed whitespace-pre-line">
                          {message.content.split('**').map((part, i) =>
                            i % 2 === 1 ? <strong key={i} className="font-semibold text-black">{part}</strong> : part
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[80%]">
                      <div className="bg-black text-white px-4 py-3 rounded-2xl rounded-br-md">
                        <p className="text-[15px]">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-deloitte-green flex items-center justify-center flex-shrink-0">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div className="flex items-center gap-1 pt-3">
                    <span className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions - show after initial brief */}
            {messages.length === 1 && !isTyping && (
              <div className="mt-8 flex flex-wrap gap-2 justify-center animate-fade-in">
                {quickActions.map((action, i) => (
                  action.href ? (
                    <a
                      key={i}
                      href={action.href}
                      className="px-4 py-2.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-full hover:border-deloitte-green hover:text-deloitte-green transition-all flex items-center gap-2"
                    >
                      {action.label}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      key={i}
                      onClick={action.action}
                      className="px-4 py-2.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-full hover:border-deloitte-green hover:text-deloitte-green transition-all"
                    >
                      {action.label}
                    </button>
                  )
                ))}
              </div>
            )}

            {/* Task list - shown when expanded */}
            {showAllTasks && (
              <div className="mt-8 space-y-2 animate-fade-in">
                {docketItems.map((item) => (
                  <a
                    key={item.id}
                    href={`/today/${item.id}`}
                    className="flex items-center gap-3 px-4 py-3 bg-white border border-neutral-100 rounded-xl hover:border-neutral-200 hover:shadow-sm transition-all group"
                  >
                    {item.type === 'operational' ? (
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    ) : item.type === 'calendar' ? (
                      <Clock className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black group-hover:text-deloitte-green transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">{item.projectName}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-deloitte-green transition-colors" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input area - prominent, centered */}
        <div className="border-t border-neutral-100 bg-white/80 backdrop-blur-sm px-6 py-5">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-neutral-100 rounded-2xl px-5 py-4">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="What would you like to work on?"
                className="flex-1 bg-transparent text-[15px] text-black placeholder-neutral-400 outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={cn(
                  'p-2.5 rounded-xl transition-all',
                  input.trim()
                    ? 'bg-deloitte-green text-white hover:bg-deloitte-green-dark'
                    : 'bg-neutral-200 text-neutral-400'
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayoutCentered>
  )
}
