'use client'

import { ReactNode } from 'react'
import { Sidebar } from './sidebar'

interface MainLayoutProps {
  children: ReactNode
  rightRail?: ReactNode
}

export function MainLayout({ children, rightRail }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      {rightRail && (
        <aside className="w-rail border-l border-stone-200 bg-white overflow-y-auto">
          {rightRail}
        </aside>
      )}
    </div>
  )
}
