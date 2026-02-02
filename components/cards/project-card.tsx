'use client'

import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
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
        className="flex items-center gap-3 px-4 py-3 bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-card transition-all duration-200 group"
      >
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-black truncate">
            {project.name}
          </div>
          <div className="text-xs text-neutral-500">
            {getRelativeTime(project.lastTouched)}
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-deloitte-green group-hover:translate-x-1 transition-all duration-200" />
      </Link>
    )
  }

  return (
    <Link
      href={`/project/${project.id}`}
      className="block bg-white border border-neutral-200 p-6 hover:border-neutral-300 hover:shadow-card-hover transition-all duration-200 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-black group-hover:text-deloitte-green transition-colors">
            {project.name}
          </h3>
          <div className="mt-2 flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
              project.status === 'active'
                ? 'bg-deloitte-green text-white'
                : project.status === 'completed'
                ? 'bg-neutral-200 text-neutral-600'
                : 'bg-neutral-100 text-neutral-500'
            }`}>
              {project.status === 'active' ? 'Active' : project.status === 'completed' ? 'Completed' : 'Paused'}
            </span>
            {project.daysUntilLaunch && (
              <span className="text-xs text-neutral-500 font-medium">
                {project.daysUntilLaunch} days to launch
              </span>
            )}
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-deloitte-green group-hover:translate-x-1 transition-all duration-200" />
      </div>

      {project.timeline && (
        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {new Date(project.timeline.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(project.timeline.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      )}
    </Link>
  )
}
