'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Bell, Moon, Palette, Shield, User } from 'lucide-react'

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
            Settings
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Manage your account and preferences.
          </p>
        </header>

        <div className="space-y-6">
          {/* Profile */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-stone-500" />
              <h2 className="text-lg font-medium text-stone-900">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input
                  type="text"
                  defaultValue="Kenny"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="kenny@agency.com"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Role</label>
                <input
                  type="text"
                  defaultValue="Strategy Lead"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-stone-500" />
              <h2 className="text-lg font-medium text-stone-900">Appearance</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-stone-700">Dark mode</div>
                <div className="text-sm text-stone-500">Switch to dark theme</div>
              </div>
              <button className="relative w-12 h-6 bg-stone-200 rounded-full transition-colors">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-stone-500" />
              <h2 className="text-lg font-medium text-stone-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-stone-700">Email notifications</div>
                  <div className="text-sm text-stone-500">Receive updates via email</div>
                </div>
                <button className="relative w-12 h-6 bg-blue-500 rounded-full transition-colors">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-stone-700">Agent updates</div>
                  <div className="text-sm text-stone-500">Get notified when agents complete tasks</div>
                </div>
                <button className="relative w-12 h-6 bg-blue-500 rounded-full transition-colors">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-stone-500" />
              <h2 className="text-lg font-medium text-stone-900">Security</h2>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-stone-700 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
              Change password
            </button>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
