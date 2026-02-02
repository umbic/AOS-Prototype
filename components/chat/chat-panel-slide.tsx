'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Paperclip } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatPanelSlideProps {
  isOpen: boolean
  onClose: () => void
  context?: string // e.g., "Today", "March Madness Campaign", etc.
}

const quickSuggestions = [
  "What's on my plate today?",
  "Summarize March Madness status",
  "Prep me for the Lin call",
]

export function ChatPanelSlide({ isOpen, onClose, context = 'Today' }: ChatPanelSlideProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Based on your ${context} view, I can see you have a few priorities. Would you like me to walk you through them?`,
        "I've pulled together the key information. Let me know if you'd like me to dive deeper into any area.",
        "Got it. I'll help you with that. Here's what I found...",
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/20 transition-opacity duration-300 z-40',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-[420px] bg-white shadow-elevated z-50 flex flex-col transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-deloitte-green flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-black">AgencyOS</h2>
              <p className="text-xs text-neutral-400">Viewing: {context}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-deloitte-green rounded-full"></div>
              </div>
              <h3 className="text-lg font-medium text-black mb-2">How can I help?</h3>
              <p className="text-sm text-neutral-400 mb-8 max-w-[280px]">
                I have context on where you are in AgencyOS. Ask me anything.
              </p>

              {/* Quick suggestions */}
              <div className="space-y-2 w-full">
                {quickSuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="w-full px-4 py-3 text-left text-sm text-neutral-600 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] px-4 py-3 rounded-2xl text-sm',
                      message.role === 'user'
                        ? 'bg-black text-white rounded-br-md'
                        : 'bg-neutral-100 text-black rounded-bl-md'
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-neutral-100">
          <div className="flex items-center gap-3 bg-neutral-50 rounded-xl px-4 py-3">
            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-sm text-black placeholder-neutral-400 outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={cn(
                'p-2 rounded-lg transition-all',
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
    </>
  )
}
