'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'
import { ChatPanelSlide } from '../chat/chat-panel-slide'

interface MainLayoutProps {
  children: ReactNode
  pageContext?: string
}

export function MainLayout({ children, pageContext }: MainLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const pathname = usePathname()

  // Derive context from pathname if not provided
  const context = pageContext || deriveContext(pathname)

  return (
    <div className="flex h-screen bg-[#FAF9F7]">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Dotti Button - Fixed bottom right */}
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
        context={context}
      />
    </div>
  )
}

function deriveContext(pathname: string): string {
  if (pathname === '/today' || pathname === '/') return 'Today'
  if (pathname.startsWith('/today/')) return 'Task Detail'
  if (pathname.startsWith('/project/')) {
    const slug = pathname.split('/')[2]
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  if (pathname.startsWith('/workflow')) return 'Workflows'
  if (pathname === '/calendar') return 'Calendar'
  if (pathname === '/agents') return 'Agents'
  if (pathname === '/team') return 'Team'
  if (pathname === '/settings') return 'Settings'
  return 'AgencyOS'
}
