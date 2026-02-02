'use client'

import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { docketItems, currentUser, getPendingDecisions } from '@/lib/data'
import { getGreeting, formatDate } from '@/lib/utils'
import { DecisionsSection } from '@/components/today/decisions-section'

// Get the lead story (most urgent item)
function getLeadStory() {
  // Prioritize: operational (timeline risk) > urgent > others
  const priorityOrder = ['operational', 'review', 'discovery', 'creative', 'calendar']
  const sorted = [...docketItems].sort((a, b) => {
    return priorityOrder.indexOf(a.type) - priorityOrder.indexOf(b.type)
  })
  return sorted[0]
}

// Get other stories (excluding lead)
function getOtherStories() {
  const lead = getLeadStory()
  return docketItems.filter(item => item.id !== lead.id)
}

export default function TodayPage() {
  const leadStory = getLeadStory()
  const otherStories = getOtherStories()
  const pendingDecisions = getPendingDecisions()
  const today = new Date()

  return (
    <MainLayout pageContext="Today">
      <div className="px-12 py-10">
        <div className="max-w-[800px] mx-auto">
          {/* Masthead */}
          <div className="text-center pb-6 border-b-2 border-black mb-8 relative">
            {/* Current Client Label */}
            <div className="absolute right-0 top-0 text-[11px] text-neutral-400">
              Google
            </div>
            <div className="text-[11px] uppercase tracking-[0.15em] text-[#86BC24] font-semibold mb-2">
              Your Daily Brief
            </div>
            <h1 className="text-[32px] font-light tracking-tight text-black">
              {getGreeting()}, {currentUser.firstName}
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              {formatDate(today)} · {docketItems.length} items on your plate
            </p>
          </div>

          {/* Decisions Section */}
          <DecisionsSection decisions={pendingDecisions} />

          {/* Lead Story */}
          <Link
            href={`/today/${leadStory.id}`}
            className="block text-center py-10 border-b border-neutral-200 mb-8 group cursor-pointer"
          >
            <span className="inline-block text-[10px] uppercase tracking-[0.1em] text-[#ef4444] font-semibold mb-4 px-3 py-1 bg-[#fef2f2] rounded-sm">
              Needs Attention
            </span>
            <h2 className="text-[28px] font-normal text-black mb-3 tracking-tight group-hover:text-[#86BC24] transition-colors duration-150">
              {leadStory.title}
            </h2>
            <p className="text-[15px] text-neutral-500 max-w-[560px] mx-auto leading-relaxed">
              {leadStory.subtitle}
            </p>
          </Link>

          {/* Column Items */}
          <div className="grid grid-cols-4 gap-6">
            {otherStories.map((item) => (
              <Link
                key={item.id}
                href={`/today/${item.id}`}
                className="block pt-4 border-t border-neutral-200 group cursor-pointer hover:-translate-y-0.5 transition-all duration-150"
              >
                <h3 className="text-sm font-medium text-black mb-1.5 group-hover:text-[#86BC24] transition-colors duration-150">
                  {getColumnTitle(item)}
                </h3>
                <p className="text-xs text-neutral-400">
                  {getColumnSubtitle(item)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

// Helper to get shortened column titles
function getColumnTitle(item: typeof docketItems[0]): string {
  const titleMap: Record<string, string> = {
    'holiday-metrics-review': 'Holiday metrics ready',
    'march-madness-concepts': '4 creative concepts',
    'lin-call-prep': 'Lin call at 2pm',
    'audience-discovery': 'New audience segment',
  }
  return titleMap[item.id] || item.title
}

// Helper to get short subtitles for columns
function getColumnSubtitle(item: typeof docketItems[0]): string {
  const subtitleMap: Record<string, string> = {
    'holiday-metrics-review': 'ROAS 3.2x — above target',
    'march-madness-concepts': 'Need your direction',
    'lin-call-prep': 'Prep docs ready',
    'audience-discovery': 'Found in Q2 data',
  }
  return subtitleMap[item.id] || item.projectName
}
