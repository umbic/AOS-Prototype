'use client'

import { Mail, Plus } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'

const teamMembers = [
  { id: 'kenny', name: 'Kenny', role: 'Strategy Lead', email: 'kenny@agency.com' },
  { id: 'sarah', name: 'Sarah', role: 'Creative Director', email: 'sarah@agency.com' },
  { id: 'mike', name: 'Mike', role: 'Media Planner', email: 'mike@agency.com' },
]

export default function TeamPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
            Team
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Manage your team members and their access.
          </p>
        </header>

        <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-200">
          {teamMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-medium">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="text-base font-medium text-stone-900">{member.name}</div>
                  <div className="text-sm text-stone-500">{member.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone-500">{member.email}</span>
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full flex items-center justify-center gap-2 p-4 text-sm font-medium text-stone-600 border border-dashed border-stone-300 rounded-xl hover:border-stone-400 hover:text-stone-800 transition-colors">
          <Plus className="w-5 h-5" />
          Invite team member
        </button>
      </div>
    </MainLayout>
  )
}
