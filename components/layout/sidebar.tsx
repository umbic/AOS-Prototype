'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Home,
  Settings,
  Store,
  Users,
  Workflow,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { clients, getProjectsByClient } from '@/lib/data'

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
        isActive
          ? 'bg-deloitte-green text-white font-medium'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
      )}
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      {label}
    </Link>
  )
}

interface ProjectItemProps {
  href: string
  name: string
  isCompleted?: boolean
  isActive?: boolean
}

function ProjectItem({ href, name, isCompleted, isActive }: ProjectItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 pl-12 pr-4 py-2 text-sm transition-colors',
        isActive
          ? 'text-black font-medium bg-neutral-100'
          : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700',
        isCompleted && 'line-through opacity-60'
      )}
    >
      {isCompleted && <Check className="w-3 h-3 text-deloitte-green" />}
      <span className="truncate">{name}</span>
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [expandedClients, setExpandedClients] = useState<string[]>(['google'])

  const toggleClient = (clientId: string) => {
    setExpandedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    )
  }

  return (
    <aside className="w-sidebar h-screen bg-white border-r border-neutral-200 flex flex-col">
      {/* Logo - Deloitte style with green dot */}
      <div className="px-6 py-6 border-b border-neutral-100">
        <Link href="/today" className="flex items-center">
          <span className="text-xl font-semibold text-black tracking-tight">AgencyOS</span>
          <span className="w-2 h-2 ml-1 bg-deloitte-green rounded-full"></span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        <NavItem
          href="/today"
          icon={<Home className="w-4 h-4" />}
          label="Today"
          isActive={pathname === '/today' || pathname.startsWith('/today/')}
        />

        {/* Projects Section */}
        <div className="mt-6">
          <div className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            Projects
          </div>
          {clients.map(client => {
            const clientProjects = getProjectsByClient(client.id)
            const isExpanded = expandedClients.includes(client.id)

            return (
              <div key={client.id}>
                <button
                  onClick={() => toggleClient(client.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                    'text-neutral-700 hover:bg-neutral-50'
                  )}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                  <span className="font-medium">{client.name}</span>
                </button>

                {isExpanded && (
                  <div className="space-y-0.5">
                    {clientProjects.map(project => (
                      <ProjectItem
                        key={project.id}
                        href={`/project/${project.id}`}
                        name={project.name}
                        isCompleted={project.status === 'completed'}
                        isActive={pathname === `/project/${project.id}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 space-y-0.5">
          <NavItem
            href="/workflows"
            icon={<Workflow className="w-4 h-4" />}
            label="Workflows"
            isActive={pathname.startsWith('/workflow')}
          />
          <NavItem
            href="/calendar"
            icon={<Calendar className="w-4 h-4" />}
            label="Calendar"
            isActive={pathname === '/calendar'}
          />
          <NavItem
            href="/agents"
            icon={<Store className="w-4 h-4" />}
            label="Agent Store"
            isActive={pathname === '/agents'}
          />
          <NavItem
            href="/team"
            icon={<Users className="w-4 h-4" />}
            label="Team"
            isActive={pathname === '/team'}
          />
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-neutral-100">
        <NavItem
          href="/settings"
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          isActive={pathname === '/settings'}
        />

        {/* User Profile - Deloitte style */}
        <div className="flex items-center gap-3 px-4 py-4 border-t border-neutral-100">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold">
            K
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-black truncate">Kenny</div>
            <div className="text-xs text-neutral-500 truncate">Strategy Lead</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
