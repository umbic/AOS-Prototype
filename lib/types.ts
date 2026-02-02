// Core Types for AgencyOS

export type Priority = 'urgent' | 'attention' | 'discovery' | 'muted'

export interface User {
  id: string
  name: string
  firstName: string
  email: string
  role: string
  avatar: string
}

export interface Client {
  id: string
  name: string
  logo?: string
  relationshipSince: string
  primaryContact: Contact
  contacts: Contact[]
  notes: string[]
}

export interface Contact {
  id: string
  name: string
  email: string
  role: string
}

export interface Project {
  id: string
  clientId: string
  name: string
  status: 'active' | 'completed' | 'paused'
  timeline: {
    start: string
    end: string
  }
  daysUntilLaunch?: number
  lastTouched: string
  team: TeamMember[]
  workflows: string[]
  documents: Document[]
}

export interface TeamMember {
  userId: string
  name: string
  role: string
  avatar?: string
  isClient?: boolean
}

export interface Document {
  id: string
  name: string
  type: 'brief' | 'plan' | 'deck' | 'guidelines' | 'other'
  createdBy: string
  createdAt: string
  url?: string
}

export interface DocketItem {
  id: string
  title: string
  subtitle: string
  projectId: string
  projectName: string
  priority: Priority
  timeEstimate: string
  agents: Agent[]
  type: 'review' | 'creative' | 'discovery' | 'calendar' | 'operational'
  workflowId?: string
  currentStep?: number
}

export interface Agent {
  id: string
  name: string
  shortName: string
  description: string
  longDescription?: string
  category: 'strategy' | 'creative' | 'media' | 'operations' | 'custom'
  capabilities: string[]
  dataSources?: string[]
  usedInWorkflows: number
  isCustom?: boolean
  createdBy?: string
  createdAt?: string
  avatar?: string
}

export interface Workflow {
  id: string
  name: string
  projectId: string
  status: 'in_progress' | 'completed' | 'not_started'
  currentStep: number
  steps: WorkflowStep[]
}

export interface WorkflowStep {
  id: string
  name: string
  status: 'complete' | 'current' | 'upcoming'
  assignee?: string
  agents: string[]
  completedAt?: string
  startedAt?: string
  timeEstimate?: string
  documents?: string[]
  notes?: string[]
}

export interface ChatMessage {
  id: string
  agentId?: string
  userId?: string
  content: string
  timestamp: string
  type: 'agent' | 'user' | 'system'
}

export interface Annotation {
  id: string
  x: number
  y: number
  content: string
  authorId: string
  authorType: 'agent' | 'user'
  createdAt: string
  resolved?: boolean
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  attendees: string[]
  projectId?: string
  clientId?: string
  hasPrepMaterials: boolean
  prepDocuments?: Document[]
  context?: string
}

export interface CreativeConcept {
  id: string
  name: string
  description: string
  imageUrl: string
  createdBy: string
  status: 'pending' | 'approved' | 'revision_requested' | 'rejected'
  annotations: Annotation[]
}

export interface MetricData {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  benchmark?: number
}

export interface AudienceSegment {
  id: string
  name: string
  size: string
  characteristics: string[]
  affinities: string[]
  dataSources: string[]
}
