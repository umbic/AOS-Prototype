'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { MainLayoutCentered } from '@/components/layout/main-layout-centered'
import { ElegantCard } from '@/components/cards/elegant-card'
import { docketItems, currentUser } from '@/lib/data'
import { getGreeting } from '@/lib/utils'

export default function TodayPage() {
  const [showSuggestion, setShowSuggestion] = useState(false)

  return (
    <MainLayoutCentered pageContext="Today">
      <div className="flex-1 px-12 py-12">
        <div className="w-full max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-semibold text-black">
              {getGreeting()}, {currentUser.firstName}
              <span className="text-deloitte-green">.</span>
            </h1>
            <p className="mt-2 text-neutral-400">
              {docketItems.length} items need your attention
            </p>
          </header>

          {/* Suggestion indicator */}
          <div className="mb-8">
            <button
              onClick={() => setShowSuggestion(!showSuggestion)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-neutral-500 hover:text-deloitte-green hover:bg-deloitte-green/5 rounded-full transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>90 min free before 2pm</span>
            </button>
          </div>

          {/* Suggestion dropdown */}
          {showSuggestion && (
            <div className="mb-8 p-5 bg-white border border-neutral-100 rounded-xl animate-fade-in max-w-lg">
              <p className="text-sm text-neutral-600 mb-4">
                Here's what we could tackle:
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Review holiday campaign metrics</span>
                  <span className="text-neutral-400">~25 min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black">Quick pass on March Madness concepts</span>
                  <span className="text-neutral-400">~40 min</span>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setShowSuggestion(false)}
                  className="px-4 py-2 text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => window.location.href = '/today/holiday-metrics-review'}
                  className="px-4 py-2 text-sm font-medium bg-deloitte-green text-white rounded-lg hover:bg-deloitte-green-dark transition-colors"
                >
                  Let's do it
                </button>
              </div>
            </div>
          )}

          {/* Cards - Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {docketItems.map((item, i) => (
              <div
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <ElegantCard
                  href={`/today/${item.id}`}
                  title={item.title}
                  subtitle={item.projectName}
                  type={item.type as 'review' | 'creative' | 'discovery' | 'calendar' | 'operational'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayoutCentered>
  )
}
