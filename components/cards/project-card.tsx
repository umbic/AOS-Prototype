'use client'

import Link from 'next/link'
import { ChevronRight, Clock } from 'lucide-react'
import { getRelativeTime } from '@/lib/utils'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  variant?: 'default' | 'compact'
}

export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/project/${project.id}`}
        className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-stone-200 hover:border-stone-300 transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-stone-900 truncate">
            {project.name}
          </div>
          <div className="text-xs text-stone-500">
            last touched {getRelativeTime(project.lastTouched)}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-400" />
      </Link>
    )
  }

  return (
    <Link
      href={`/project/${project.id}`}
      className="block bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium text-stone-900 group-hover:text-stone-700">
            {project.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              project.status === 'active'
                ? 'bg-green-50 text-green-700'
                : project.status === 'completed'
                ? 'bg-stone-100 text-stone-600'
                : 'bg-amber-50 text-amber-700'
            }`}>
              {project.status === 'active' ? 'Active' : project.status === 'completed' ? 'Completed' : 'Paused'}
            </span>
            {project.daysUntilLaunch && (
              <span className="text-xs text-stone-500">
                {project.daysUntilLaunch} days until launch
              </span>
            )}
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-stone-400" />
      </div>

      {project.timeline && (
        <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {new Date(project.timeline.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(project.timeline.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      )}
    </Link>
  )
}
