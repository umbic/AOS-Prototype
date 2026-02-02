'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  ChevronDown,
  Home,
  Settings,
  Store,
  Users,
  Workflow,
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
        'flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 rounded-lg',
        isActive
          ? 'bg-[#86BC24] text-white'
          : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
      )}
    >
      <span className={cn('w-[18px] h-[18px] flex items-center justify-center', isActive ? 'opacity-100' : 'opacity-70')}>
        {icon}
      </span>
      {label}
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
    <aside className="w-60 h-screen bg-white border-r border-[#e5e5e5] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6">
        <Link href="/today" className="flex items-center gap-1.5">
          <span className="text-lg font-semibold text-black">AgencyOS</span>
          <span className="w-2 h-2 bg-[#86BC24] rounded-full"></span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 space-y-0.5">
        <NavItem
          href="/today"
          icon={<Home className="w-[18px] h-[18px]" />}
          label="Today"
          isActive={pathname === '/today' || pathname === '/'}
        />
      </nav>

      {/* Projects Section */}
      <div className="px-3 pt-5 pb-2">
        <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#a3a3a3]">
          Projects
        </div>
      </div>

      <nav className="px-3 flex-1 overflow-y-auto">
        {clients.map(client => {
          const isExpanded = expandedClients.includes(client.id)
          const projects = getProjectsByClient(client.id)

          return (
            <div key={client.id}>
              <button
                onClick={() => toggleClient(client.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-150"
              >
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-[#a3a3a3] transition-transform duration-200',
                    !isExpanded && '-rotate-90'
                  )}
                />
                {client.name}
              </button>

              {isExpanded && (
                <div className="pl-9 space-y-0.5">
                  {projects.map(project => (
                    <Link
                      key={project.id}
                      href={`/project/${project.id}`}
                      className={cn(
                        'block px-3 py-2 text-[13px] rounded-md transition-all duration-150',
                        pathname === `/project/${project.id}`
                          ? 'text-neutral-900 bg-neutral-100'
                          : 'text-[#737373] hover:text-neutral-900 hover:bg-neutral-100'
                      )}
                    >
                      {project.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Other Nav Items */}
        <div className="mt-4 space-y-0.5">
          <NavItem
            href="/workflows"
            icon={<Workflow className="w-[18px] h-[18px]" />}
            label="Workflows"
            isActive={pathname.startsWith('/workflow')}
          />
          <NavItem
            href="/calendar"
            icon={<Calendar className="w-[18px] h-[18px]" />}
            label="Calendar"
            isActive={pathname === '/calendar'}
          />
          <NavItem
            href="/agents"
            icon={<Store className="w-[18px] h-[18px]" />}
            label="Agent Store"
            isActive={pathname === '/agents'}
          />
          <NavItem
            href="/team"
            icon={<Users className="w-[18px] h-[18px]" />}
            label="Team"
            isActive={pathname === '/team'}
          />
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-[#f0f0f0] px-3 py-3">
        <NavItem
          href="/settings"
          icon={<Settings className="w-[18px] h-[18px]" />}
          label="Settings"
          isActive={pathname === '/settings'}
        />

        {/* User Profile */}
        <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-lg hover:bg-neutral-100 transition-all duration-150 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-sm font-medium">
            K
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-black">Kenny</div>
            <div className="text-xs text-[#a3a3a3]">Strategy Lead</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
