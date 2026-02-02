'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  Folder,
  Home,
  Settings,
  Store,
  Users,
  Workflow,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconNavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

function IconNavItem({ href, icon, label, isActive }: IconNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-150',
        isActive
          ? 'bg-[#86BC24]/10 text-[#86BC24]'
          : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600'
      )}
      title={label}
    >
      {icon}
    </Link>
  )
}

export function SidebarThin() {
  const pathname = usePathname()

  return (
    <aside className="w-16 h-screen bg-white border-r border-neutral-100 flex flex-col items-center py-4 flex-shrink-0">
      {/* Logo */}
      <Link href="/today" className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-6">
        <span className="text-white font-bold text-sm">A</span>
      </Link>

      {/* Main nav icons */}
      <nav className="flex-1 flex flex-col items-center gap-1">
        <IconNavItem
          href="/today"
          icon={<Home className="w-5 h-5" strokeWidth={1.5} />}
          label="Today"
          isActive={pathname === '/today' || pathname === '/'}
        />
        <IconNavItem
          href="/today"
          icon={<Folder className="w-5 h-5" strokeWidth={1.5} />}
          label="Projects"
          isActive={pathname.startsWith('/project/') || pathname.startsWith('/today/')}
        />
        <IconNavItem
          href="/workflows"
          icon={<Workflow className="w-5 h-5" strokeWidth={1.5} />}
          label="Workflows"
          isActive={pathname.startsWith('/workflow')}
        />
        <IconNavItem
          href="/calendar"
          icon={<Calendar className="w-5 h-5" strokeWidth={1.5} />}
          label="Calendar"
          isActive={pathname === '/calendar'}
        />
        <IconNavItem
          href="/agents"
          icon={<Store className="w-5 h-5" strokeWidth={1.5} />}
          label="Agents"
          isActive={pathname === '/agents'}
        />
        <IconNavItem
          href="/team"
          icon={<Users className="w-5 h-5" strokeWidth={1.5} />}
          label="Team"
          isActive={pathname === '/team'}
        />
      </nav>

      {/* Bottom: Settings + User */}
      <div className="flex flex-col items-center gap-2">
        <IconNavItem
          href="/settings"
          icon={<Settings className="w-5 h-5" strokeWidth={1.5} />}
          label="Settings"
          isActive={pathname === '/settings'}
        />
        <div
          className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-all"
          title="Kenny"
        >
          K
        </div>
      </div>
    </aside>
  )
}
