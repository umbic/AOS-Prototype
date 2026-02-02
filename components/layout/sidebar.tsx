'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Folder,
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
        'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
        isActive
          ? 'bg-stone-100 text-stone-900 font-medium'
          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
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
        'flex items-center gap-2 pl-11 pr-3 py-1.5 text-sm rounded-lg transition-colors',
        isActive
          ? 'bg-stone-100 text-stone-900 font-medium'
          : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700',
        isCompleted && 'line-through opacity-60'
      )}
    >
      {isCompleted && <Check className="w-3 h-3 text-green-500" />}
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
    <aside className="w-sidebar h-screen bg-white border-r border-stone-200 flex flex-col">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-stone-100">
        <Link href="/today" className="text-xl font-semibold text-stone-900 tracking-tight">
          AgencyOS
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <NavItem
          href="/today"
          icon={<Home className="w-4 h-4" />}
          label="Today"
          isActive={pathname === '/today' || pathname.startsWith('/today/')}
        />

        {/* Projects Section */}
        <div className="pt-4">
          <div className="px-3 py-2 text-xs font-medium text-stone-400 uppercase tracking-wider">
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
                    'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                    'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  )}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                  <span className="font-medium">{client.name}</span>
                </button>

                {isExpanded && (
                  <div className="ml-2 space-y-0.5">
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

        <div className="pt-4 space-y-1">
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
      <div className="px-3 py-4 border-t border-stone-100 space-y-1">
        <NavItem
          href="/settings"
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          isActive={pathname === '/settings'}
        />

        {/* User Profile */}
        <div className="flex items-center gap-3 px-3 py-2 mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-medium">
            K
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-stone-900 truncate">Kenny</div>
            <div className="text-xs text-stone-500 truncate">Strategy Lead</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
