'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, FileText, MessageCircle, Users, Sparkles } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { calendarEvents, getClient, getProject, getAgent } from '@/lib/data'
import type { CalendarEvent } from '@/lib/types'
import { cn } from '@/lib/utils'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date('2025-02-03'))

  // Get dates for current week
  const weekDates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(currentWeekStart)
    date.setDate(date.getDate() + i)
    return date
  })

  const today = new Date('2025-02-04') // Simulated today

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return calendarEvents.filter(e => e.date === dateStr)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const isToday = (date: Date) => {
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0]
  }

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="px-8 py-6 border-b border-stone-200 bg-white">
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
            Your schedule
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Integrated with your calendar. We'll help you prep.
          </p>

          {/* Week Navigation */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => {
                const newDate = new Date(currentWeekStart)
                newDate.setDate(newDate.getDate() - 7)
                setCurrentWeekStart(newDate)
              }}
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-stone-900">
              Week of {formatDate(currentWeekStart)}
            </span>
            <button
              onClick={() => {
                const newDate = new Date(currentWeekStart)
                newDate.setDate(newDate.getDate() + 7)
                setCurrentWeekStart(newDate)
              }}
              className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentWeekStart(new Date('2025-02-03'))}
              className="ml-2 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Today
            </button>
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto bg-stone-50">
          <div className="grid grid-cols-5 divide-x divide-stone-200 h-full">
            {weekDates.map((date, i) => {
              const events = getEventsForDate(date)
              const dateIsToday = isToday(date)

              return (
                <div key={i} className={cn('flex flex-col', dateIsToday && 'bg-blue-50/50')}>
                  {/* Day Header */}
                  <div className={cn(
                    'px-4 py-3 border-b border-stone-200 bg-white sticky top-0',
                    dateIsToday && 'bg-blue-50'
                  )}>
                    <div className="text-xs text-stone-500 uppercase">{weekDays[i]}</div>
                    <div className={cn(
                      'text-lg font-medium',
                      dateIsToday ? 'text-blue-600' : 'text-stone-900'
                    )}>
                      {date.getDate()}
                    </div>
                    {dateIsToday && (
                      <span className="text-xs text-blue-600 font-medium">Today</span>
                    )}
                  </div>

                  {/* Events */}
                  <div className="flex-1 p-3 space-y-2">
                    {events.map(event => (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={cn(
                          'w-full text-left p-3 rounded-lg border transition-all',
                          selectedEvent?.id === event.id
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'
                        )}
                      >
                        <div className="text-xs text-stone-500">
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="mt-1 text-sm font-medium text-stone-900 line-clamp-2">
                          {event.title}
                        </div>
                        {event.hasPrepMaterials && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                            <Sparkles className="w-3 h-3" />
                            Prep available
                          </div>
                        )}
                      </button>
                    ))}
                    {events.length === 0 && (
                      <div className="text-center py-8 text-xs text-stone-400">
                        No events
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

function EventDetailPanel({
  event,
  onClose,
}: {
  event: CalendarEvent
  onClose: () => void
}) {
  const client = event.clientId ? getClient(event.clientId) : null
  const project = event.projectId ? getProject(event.projectId) : null
  const meetingPrepper = getAgent('meeting-prepper')

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-200">
        <h2 className="text-lg font-medium text-stone-900">{event.title}</h2>
        <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
          <Clock className="w-4 h-4" />
          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}, {event.startTime} - {event.endTime}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Attendees */}
        <div>
          <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Attendees</h4>
          <div className="flex items-center gap-2 flex-wrap">
            {event.attendees.map(attendee => (
              <div
                key={attendee}
                className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-full"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-medium">
                  {attendee.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-stone-700 capitalize">
                  {attendee === 'kenny' ? 'Kenny (you)' : attendee}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Context */}
        {event.context && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Context</h4>
            <p className="text-sm text-stone-600 leading-relaxed">{event.context}</p>
          </div>
        )}

        {/* Prep Materials */}
        {event.hasPrepMaterials && event.prepDocuments && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Prep materials</h4>
            <div className="space-y-2">
              {event.prepDocuments.map(doc => (
                <button
                  key={doc.id}
                  className="w-full flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors text-left"
                >
                  <FileText className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-700">{doc.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Project/Client Links */}
        {(project || client) && (
          <div>
            <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-2">Related</h4>
            <div className="space-y-2">
              {client && (
                <a
                  href={`/client/${client.id}`}
                  className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                    {client.name.charAt(0)}
                  </div>
                  <span className="text-sm text-stone-700">{client.name}</span>
                </a>
              )}
              {project && (
                <a
                  href={`/project/${project.id}`}
                  className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <span className="text-sm text-stone-700">{project.name}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 py-4 border-t border-stone-200 space-y-2">
        {event.hasPrepMaterials && (
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Chat with Meeting Prepper Agent
          </button>
        )}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors">
          Add to Today's docket
        </button>
      </div>
    </div>
  )
}
