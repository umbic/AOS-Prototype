'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { DocketCard } from '@/components/cards/docket-card'
import { ProjectCard } from '@/components/cards/project-card'
import { SuggestionCard } from '@/components/cards/suggestion-card'
import { docketItems, projects, currentUser } from '@/lib/data'
import { getGreeting, formatDate } from '@/lib/utils'

export default function TodayPage() {
  const [showSuggestion, setShowSuggestion] = useState(true)

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.lastTouched).getTime() - new Date(a.lastTouched).getTime())
    .slice(0, 3)

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header - Deloitte style typography */}
        <header className="mb-10">
          <h1 className="text-display-2 text-black">
            {getGreeting()}, {currentUser.firstName}<span className="text-deloitte-green">.</span>
          </h1>
          <p className="mt-2 text-body-lg text-neutral-500">
            {formatDate(new Date())}
          </p>
          <p className="mt-4 text-body text-neutral-600">
            You have {docketItems.length} things that need attention and a call with Lin at 2pm.
          </p>
        </header>

        {/* Time-Aware Suggestion - Deloitte dark style */}
        {showSuggestion && (
          <div className="mb-10 animate-fade-in">
            <SuggestionCard
              timeAvailable="90 minutes"
              items={[
                { title: 'Review holiday campaign metrics', timeEstimate: '~25 min' },
                { title: 'Quick pass on March Madness concepts', timeEstimate: '~40 min' },
              ]}
              onDismiss={() => setShowSuggestion(false)}
              onAccept={() => {
                window.location.href = '/today/holiday-metrics-review'
              }}
            />
          </div>
        )}

        {/* Today's Docket */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">
            On the docket
          </h2>
          <div className="space-y-4">
            {docketItems.map((item, i) => (
              <div key={item.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <DocketCard item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Projects */}
        <section>
          <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">
            Recent
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {recentProjects.map((project, i) => (
              <div key={project.id} className="animate-slide-up" style={{ animationDelay: `${(docketItems.length + i) * 0.05}s` }}>
                <ProjectCard project={project} variant="compact" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
