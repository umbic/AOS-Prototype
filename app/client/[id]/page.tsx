'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Mail, Plus, Edit2, Building2 } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { ProjectCard } from '@/components/cards/project-card'
import { getClient, getProjectsByClient } from '@/lib/data'

export default function ClientPage() {
  const params = useParams()
  const client = getClient(params.id as string)

  if (!client) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-stone-500">Client not found</p>
        </div>
      </MainLayout>
    )
  }

  const projects = getProjectsByClient(client.id)
  const activeProjects = projects.filter(p => p.status === 'active')
  const completedProjects = projects.filter(p => p.status === 'completed')

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
                {client.name}
              </h1>
              <p className="text-sm text-stone-500">
                Relationship since {client.relationshipSince}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-stone-600">
            <span>Primary contact:</span>
            <span className="font-medium text-stone-900">{client.primaryContact.name}</span>
            <a href={`mailto:${client.primaryContact.email}`} className="text-blue-600 hover:text-blue-700">
              ({client.primaryContact.email})
            </a>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Active Projects */}
            <section>
              <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
                Active Projects
              </h2>

              <div className="space-y-3">
                {activeProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                <button className="w-full flex items-center justify-center gap-2 p-4 text-sm text-stone-500 border border-dashed border-stone-300 rounded-xl hover:border-stone-400 hover:text-stone-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Create new project
                </button>
              </div>
            </section>

            {/* Completed Projects */}
            {completedProjects.length > 0 && (
              <section>
                <details className="group">
                  <summary className="flex items-center gap-2 text-sm font-medium text-stone-500 uppercase tracking-wider mb-4 cursor-pointer list-none">
                    <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                    Completed Projects ({completedProjects.length})
                  </summary>

                  <div className="space-y-3 mt-4">
                    {completedProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </details>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Contacts */}
            <section className="bg-white rounded-xl border border-stone-200 p-5">
              <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">
                Client Contacts
              </h3>

              <div className="space-y-3">
                {client.contacts.map(contact => (
                  <div key={contact.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 text-sm font-medium">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-stone-900">
                          {contact.name}
                          {contact.id === client.primaryContact.id && (
                            <span className="ml-1 text-xs text-blue-600">(primary)</span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500">{contact.role}</div>
                      </div>
                    </div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                ))}
                <button className="w-full flex items-center justify-center gap-2 p-2 text-sm text-stone-500 border border-dashed border-stone-200 rounded-lg hover:border-stone-300 hover:text-stone-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add contact
                </button>
              </div>
            </section>

            {/* Client Notes */}
            <section className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                  Things to know about {client.name}
                </h3>
                <button className="p-1 text-stone-400 hover:text-stone-600 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <ul className="space-y-2">
                {client.notes.map((note, i) => (
                  <li key={i} className="flex gap-2 text-sm text-stone-600">
                    <span className="text-stone-400">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
