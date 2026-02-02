'use client'

import { ReactNode, useState } from 'react'
import { SidebarThin } from './sidebar-thin'
import { TaskContextSidebar } from './task-context-sidebar'
import { ChatPanelSlide } from '../chat/chat-panel-slide'
import { DocketItem, Workflow, Project, Client } from '@/lib/types'

interface TaskLayoutProps {
  children: ReactNode
  docketItem: DocketItem
  workflow?: Workflow | null
  project?: Project | null
  client?: Client | null
  relatedTasks?: DocketItem[]
}

export function TaskLayout({
  children,
  docketItem,
  workflow,
  project,
  client,
  relatedTasks = [],
}: TaskLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#FAF9F7]">
      {/* Thin sidebar */}
      <SidebarThin />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>

      {/* Context sidebar */}
      <TaskContextSidebar
        docketItem={docketItem}
        workflow={workflow}
        project={project}
        client={client}
        relatedTasks={relatedTasks}
      />

      {/* Dotti Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#86BC24] rounded-full shadow-[0_4px_20px_rgba(134,188,36,0.3)] flex items-center justify-center hover:scale-105 hover:shadow-[0_6px_24px_rgba(134,188,36,0.4)] transition-all duration-200 z-50"
        aria-label="Open chat with Dotti"
      >
        <span className="w-3 h-3 bg-white rounded-full"></span>
      </button>

      {/* Chat panel */}
      <ChatPanelSlide
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context={docketItem.title}
      />
    </div>
  )
}
