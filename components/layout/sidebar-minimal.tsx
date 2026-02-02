'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  Home,
  Settings,
  Store,
  Users,
  Workflow,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
        'flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200',
        isActive
          ? 'bg-deloitte-green text-white font-medium'
          : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
      )}
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      {label}
    </Link>
  )
}

export function SidebarMinimal() {
  const pathname = usePathname()

  return (
    <aside className="w-56 h-screen bg-white border-r border-neutral-100 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6">
        <Link href="/today" className="flex items-center">
          <span className="text-lg font-semibold text-black tracking-tight">AgencyOS</span>
          <span className="w-1.5 h-1.5 ml-1 bg-deloitte-green rounded-full"></span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2">
        <NavItem
          href="/today"
          icon={<Home className="w-4 h-4" />}
          label="Today"
          isActive={pathname === '/today' || pathname.startsWith('/today/')}
        />
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
          label="Agents"
          isActive={pathname === '/agents'}
        />
        <NavItem
          href="/team"
          icon={<Users className="w-4 h-4" />}
          label="Team"
          isActive={pathname === '/team'}
        />
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-neutral-100">
        <NavItem
          href="/settings"
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          isActive={pathname === '/settings'}
        />

        {/* User Profile */}
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-sm font-medium">
            K
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-black">Kenny</div>
            <div className="text-xs text-neutral-400">Strategy Lead</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
