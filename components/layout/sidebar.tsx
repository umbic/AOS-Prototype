'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  Calendar,
  Home,
  Settings,
  Store,
  Users,
  Workflow as WorkflowIcon,
  FolderOpen,
  GitBranch,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getProjectsByClient, workflows } from '@/lib/data'

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

  // Hardcoded to Google (single client)
  const projects = getProjectsByClient('google')
  const projectIds = projects.map(p => p.id)
  const activeWorkflows = workflows.filter(w => projectIds.includes(w.projectId))

  return (
    <aside className="w-60 h-screen bg-white border-r border-[#e5e5e5] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6">
        <Link href="/today" className="flex items-center gap-1.5">
          <span className="text-lg font-semibold text-black">AgencyOS</span>
          <span className="w-2 h-2 bg-[#86BC24] rounded-full"></span>
        </Link>
        {/* Current Client Label */}
        <div className="mt-2 text-[11px] text-neutral-400">
          Current client: <span className="text-neutral-500">Google</span>
        </div>
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
        <div className="flex items-center justify-between px-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#a3a3a3]">
            Projects
          </div>
          <Link
            href="/projects/new"
            className="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded transition-colors"
            title="New Project"
          >
            <Plus className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <nav className="px-3 space-y-0.5">
        {projects.map(project => (
          <Link
            key={project.id}
            href={`/project/${project.id}`}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-150',
              pathname === `/project/${project.id}`
                ? 'text-neutral-900 bg-neutral-100'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
            )}
          >
            <FolderOpen className="w-4 h-4 opacity-60" />
            <span className="truncate">{project.name}</span>
          </Link>
        ))}
      </nav>

      {/* Workflows Section */}
      <div className="px-3 pt-5 pb-2">
        <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#a3a3a3]">
          Workflows
        </div>
      </div>

      <nav className="px-3 space-y-0.5 flex-1 overflow-y-auto">
        {activeWorkflows.map(workflow => (
          <Link
            key={workflow.id}
            href={`/workflow/${workflow.id}`}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-150',
              pathname === `/workflow/${workflow.id}`
                ? 'text-neutral-900 bg-neutral-100'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
            )}
          >
            <WorkflowIcon className="w-4 h-4 opacity-60" />
            <span className="truncate">{workflow.name}</span>
          </Link>
        ))}

        {/* Other Nav Items */}
        <div className="mt-4 pt-4 border-t border-neutral-100 space-y-0.5">
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
            href="/workflow-library"
            icon={<GitBranch className="w-[18px] h-[18px]" />}
            label="Workflow Library"
            isActive={pathname === '/workflow-library'}
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
          <Image
            src="/avatars/kenny.jpg"
            alt="Kenny"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-black">Kenny</div>
            <div className="text-xs text-[#a3a3a3]">Strategy Lead</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
