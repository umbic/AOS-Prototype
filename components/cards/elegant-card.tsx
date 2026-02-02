'use client'

import Link from 'next/link'
import {
  BarChart3,
  Lightbulb,
  Users,
  Calendar,
  AlertTriangle,
  FileText,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type CardType = 'review' | 'creative' | 'discovery' | 'calendar' | 'operational' | 'document' | 'default'

interface ElegantCardProps {
  href: string
  title: string
  subtitle: string
  type?: CardType
  className?: string
}

const iconMap: Record<CardType, { icon: React.ElementType; color: string }> = {
  review: { icon: BarChart3, color: 'bg-blue-50 text-blue-500' },
  creative: { icon: Lightbulb, color: 'bg-amber-50 text-amber-500' },
  discovery: { icon: Users, color: 'bg-purple-50 text-purple-500' },
  calendar: { icon: Calendar, color: 'bg-green-50 text-green-600' },
  operational: { icon: AlertTriangle, color: 'bg-red-50 text-red-500' },
  document: { icon: FileText, color: 'bg-neutral-100 text-neutral-500' },
  default: { icon: Zap, color: 'bg-deloitte-green/10 text-deloitte-green' },
}

export function ElegantCard({
  href,
  title,
  subtitle,
  type = 'default',
  className,
}: ElegantCardProps) {
  const { icon: Icon, color } = iconMap[type] || iconMap.default

  return (
    <Link
      href={href}
      className={cn(
        'block bg-white border border-neutral-100 rounded-xl p-5 hover:border-neutral-200 hover:shadow-card transition-all duration-200 group',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', color)}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="text-sm font-medium text-black group-hover:text-deloitte-green transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="mt-1 text-sm text-neutral-400 line-clamp-1">
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  )
}
