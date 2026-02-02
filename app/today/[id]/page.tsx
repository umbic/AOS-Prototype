'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Paperclip, ChevronRight } from 'lucide-react'
import { MainLayoutCentered } from '@/components/layout/main-layout-centered'
import { getDocketItem, getWorkflow } from '@/lib/data'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

export default function TaskDetailPage() {
  const params = useParams()
  const docketItem = getDocketItem(params.id as string)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const workflow = docketItem?.workflowId ? getWorkflow(docketItem.workflowId) : null

  // Initial briefing message from the AI
  useEffect(() => {
    if (docketItem && messages.length === 0) {
      const briefing = getBriefingMessage(docketItem.id)
      setMessages([{
        id: '1',
        role: 'assistant',
        content: briefing
      }])
    }
  }, [docketItem])

  if (!docketItem) {
    return (
      <MainLayoutCentered>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-neutral-400">Task not found</p>
        </div>
      </MainLayoutCentered>
    )
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate response
    setTimeout(() => {
      const responses = getContextualResponses(docketItem.id)
      const response = responses[Math.floor(Math.random() * responses.length)]

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      }])
      setIsTyping(false)
    }, 1200)
  }

  const quickActions = getQuickActions(docketItem.id)

  return (
    <MainLayoutCentered pageContext={docketItem.title}>
      <div className="flex-1 flex flex-col h-screen">
        {/* Minimal header */}
        <header className="px-12 py-4 border-b border-neutral-100 bg-white">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link
              href="/today"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Today
            </Link>

            {/* Workflow context - subtle */}
            {workflow && (
              <Link
                href={`/workflow/${workflow.id}`}
                className="flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <span className="px-2 py-1 bg-neutral-100 rounded">
                  Step {workflow.currentStep + 1} of {workflow.steps.length}
                </span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </header>

        {/* Conversation area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-12 py-8">
            {/* Task title */}
            <div className="text-center mb-8">
              <p className="text-sm text-neutral-400 mb-2">{docketItem.projectName}</p>
              <h1 className="text-xl font-semibold text-black">
                {docketItem.title}
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
                        <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[80%]">
                      <div className="bg-black text-white px-4 py-3 rounded-2xl rounded-br-md">
                        <p className="text-sm">{message.content}</p>
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
            </div>

            {/* Quick actions */}
            {messages.length === 1 && quickActions.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 justify-center">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(action)
                      setTimeout(() => handleSend(), 100)
                    }}
                    className="px-4 py-2 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-full hover:border-neutral-300 hover:text-black transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-neutral-100 bg-white px-12 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-neutral-50 rounded-xl px-4 py-3">
              <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
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
      </div>
    </MainLayoutCentered>
  )
}

function getBriefingMessage(itemId: string): string {
  const briefings: Record<string, string> = {
    'holiday-metrics-review': `I pulled the final numbers for the Holiday Campaign. Here's what I found:

**The good:** ROAS hit 3.2x against a 2.8x target. TikTok outperformed expectations by 40%.

**Worth discussing:** Meta CPM was higher than projected, but conversion rates offset it. Google performance was solid but not exceptional.

**My recommendation:** Lead with the TikTok win in your client presentation — it validates the channel expansion strategy Lin was skeptical about.

Want me to walk you through the channel breakdown, or should we focus on building the narrative for the client deck?`,

    'march-madness-concepts': `I've developed 4 concepts for March Madness based on the brief. Each takes a different angle:

1. **Bold Move** — High energy, athlete-focused, captures tournament intensity
2. **Quiet Confidence** — Understated, premium feel, focuses on the mental game
3. **Community** — Fan experience, shared moments, inclusive imagery
4. **Performance** — Data-driven, tech-forward, precision aesthetic

Based on Google's brand direction and Lin's feedback from Q4, I'd lean toward **Community** or **Bold Move**. The others might feel too far from their current positioning.

Should I show you the visual directions, or talk through the strategic rationale first?`,

    'audience-discovery': `I found something interesting in the Q2 data.

There's a segment we haven't specifically targeted: **Casual Sports Fans** — people who engage primarily through social media highlights rather than watching full games. They represent about 12M potential reach.

What makes them interesting:
- 3x higher engagement on short-form content
- Lower CPM than core sports fans
- Strong overlap with the 25-34 demo Google wants to grow

This could be a good test segment for March Madness. Want me to build out a targeting recommendation, or should we discuss whether this fits the campaign goals first?`,

    'lin-call-prep': `Your call with Lin is at 2pm. Here's what I've prepped:

**What she'll likely ask about:**
1. Holiday campaign results (lead with the ROAS win)
2. March Madness timeline (we're on track, but asset delivery is tight)
3. Q2 planning status (early stages, waiting on budget confirmation)

**Watch out for:**
Lin was skeptical about the TikTok expansion. The 40% overperformance is your chance to build confidence for future channel tests.

**Documents ready:**
- Holiday Performance Summary (1-pager)
- March Madness Status Update
- Talking points

Want me to rehearse any part of this, or adjust the emphasis?`,

    'timeline-risk': `Heads up on March Madness timeline.

**The issue:** Asset delivery deadline is in 5 days, but 2 production steps are still in progress.

**What's at risk:**
- Final creative approval (needs 2 more days)
- Asset localization (blocked until approval)

**Options:**
1. Push the deadline by 3 days (need to negotiate with media team)
2. Reduce the number of asset variants (faster but less personalization)
3. Parallel track — start localization on approved concepts while others finalize

I'd recommend option 3 if we can get at least 2 concepts approved today. Want to talk through the tradeoffs?`
  }

  return briefings[itemId] || `I've prepped everything for "${itemId}". What would you like to focus on first?`
}

function getQuickActions(itemId: string): string[] {
  const actions: Record<string, string[]> = {
    'holiday-metrics-review': [
      'Walk me through the numbers',
      'Build the client narrative',
      'What surprised you?'
    ],
    'march-madness-concepts': [
      'Show me the concepts',
      'Why Community over others?',
      'What would Lin think?'
    ],
    'audience-discovery': [
      'Tell me more about this segment',
      'How would we target them?',
      'What are the risks?'
    ],
    'lin-call-prep': [
      'Rehearse the ROAS story',
      'What if she pushes back?',
      'Show me the docs'
    ],
    'timeline-risk': [
      'Walk me through option 3',
      'What if we miss the deadline?',
      'Who do I need to talk to?'
    ]
  }

  return actions[itemId] || ['What should I know?', 'What do you recommend?']
}

function getContextualResponses(itemId: string): string[] {
  const responses: Record<string, string[]> = {
    'holiday-metrics-review': [
      `Good question. The channel breakdown shows TikTok driving most of the upside — $170K spend generated 5.2M reach at a 3.4% CTR. That's nearly double the benchmark.

Meta was solid at 3.5x ROAS but the CPM increase ate into efficiency. Google held steady.

The story I'd tell: "We tested a new channel, it worked, and the core performers remained stable." That's a low-risk narrative Lin will appreciate.`,
      `For the client deck, I'd structure it as:

1. **Headline win** — 3.2x ROAS, above target
2. **Channel story** — TikTok validation, stable core
3. **What we learned** — Short-form content resonates with younger demo
4. **Recommendation** — Expand TikTok allocation for March Madness

Want me to draft the slides, or should we refine the narrative first?`,
    ],
    'march-madness-concepts': [
      `The Community concept resonates because Google's been pushing toward "technology that brings people together" messaging. It's on-brand without being generic.

Bold Move is the riskier choice — more distinctive but further from their comfort zone. If Lin's feeling confident after the Holiday results, she might be more open to it.

Want to see them side by side?`,
      `Here's my read on Lin's perspective:

She's data-driven, so she'll want to know which concept has the best performance potential. Community has safer testing data from similar campaigns. Bold Move is more differentiated but less proven.

I'd present both as the top two and let her weigh in. That gives her agency while keeping us away from the weaker concepts.`
    ],
    'audience-discovery': [
      `The Casual Sports Fans segment looks like this:

- **Size:** ~12M reachable users
- **Demo:** Skews 25-34, slight male lean but more balanced than core fans
- **Behavior:** High social engagement, low TV viewership, respond to highlights and moments
- **Cost:** ~30% lower CPM than core sports fans

The risk is relevance — they may engage but not convert. I'd recommend a small test budget to validate before scaling.`,
      `If we target them for March Madness, I'd focus on:

1. **Short-form video** — They consume highlights, not full games
2. **Social-first creative** — Designed for scroll, not lean-back viewing
3. **Moment marketing** — Real-time content during key games

This is a test-and-learn play. We'd allocate maybe 10% of media to this segment and measure engagement lift. Sound reasonable?`
    ],
    'lin-call-prep': [
      `Let's rehearse the ROAS story:

"The Holiday Campaign delivered 3.2x ROAS against a 2.8x target — a 14% beat. The standout was TikTok, which overperformed by 40% and validated our channel expansion strategy. Core performers remained stable, so we grew incrementally without taking on risk."

If she asks about the higher Meta CPM, the answer is: "CPM was up 8% but conversion rates improved, so net efficiency held."

How does that land?`,
      `If Lin pushes back on anything, it'll probably be timeline or budget.

**For timeline:** "We're on track but tight on asset delivery. I've got a mitigation plan if we need it."

**For budget:** "Q2 allocation is pending your approval. We can work with the current level or discuss an increase based on Holiday performance."

The ROAS win gives you leverage. Use it to build confidence, not ask for more.`
    ],
    'timeline-risk': [
      `Option 3 works like this:

1. Today: Get at least 2 concepts approved (Bold Move and Community are closest)
2. Tomorrow: Start localization on those while the other 2 finalize
3. Day 3-5: Complete remaining approvals and localization in parallel

The risk is rework if an approved concept changes significantly. But based on feedback so far, that's unlikely.

Want me to draft a quick note to the production team to kick this off?`,
      `If we miss the deadline, here's what happens:

- Media team has to push flight dates back (possible but annoying)
- We lose the first few days of March Madness buzz
- Lin will ask what went wrong

The cost isn't catastrophic, but it's avoidable. The parallel track approach keeps us on schedule with minimal risk.

Should I loop in the production lead, or do you want to handle that conversation?`
    ]
  }

  return responses[itemId] || [
    `That's a good direction. Let me dig into that and come back with specifics.`,
    `Based on what I'm seeing, I think we should focus on the core priorities first. Want me to outline those?`
  ]
}
