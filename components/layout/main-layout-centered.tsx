'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SidebarMinimal } from './sidebar-minimal'
import { ChatPanelSlide } from '../chat/chat-panel-slide'

interface MainLayoutCenteredProps {
  children: ReactNode
  pageContext?: string
  hideChatButton?: boolean
}

export function MainLayoutCentered({ children, pageContext, hideChatButton }: MainLayoutCenteredProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const pathname = usePathname()

  // Derive context from pathname if not provided
  const context = pageContext || deriveContext(pathname)

  return (
    <div className="flex h-screen bg-neutral-50">
      <SidebarMinimal />

      {/* Main content - centered */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col">
          {children}
        </div>
      </main>

      {/* Floating chat button */}
      {!hideChatButton && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-deloitte-green rounded-full shadow-elevated flex items-center justify-center hover:bg-deloitte-green-dark transition-colors z-30 group"
          aria-label="Open chat"
        >
          <span className="w-3 h-3 bg-white rounded-full group-hover:scale-110 transition-transform"></span>
        </button>
      )}

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
  if (pathname.startsWith('/project/')) {
    const slug = pathname.split('/')[2]
    // Convert slug to readable name
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  if (pathname.startsWith('/workflow')) return 'Workflows'
  if (pathname === '/calendar') return 'Calendar'
  if (pathname === '/agents') return 'Agents'
  if (pathname === '/team') return 'Team'
  if (pathname === '/settings') return 'Settings'
  return 'AgencyOS'
}
