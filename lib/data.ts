import {
  User,
  Client,
  Project,
  DocketItem,
  Agent,
  Workflow,
  CalendarEvent,
  CreativeConcept,
  MetricData,
  Decision,
  WorkflowTemplate,
} from './types'

// Current User
export const currentUser: User = {
  id: 'kenny',
  name: 'Kenny',
  firstName: 'Kenny',
  email: 'kenny@agency.com',
  role: 'Strategy Lead',
  avatar: '/avatars/kenny.jpg',
}

// Clients
export const clients: Client[] = [
  {
    id: 'google',
    name: 'Google',
    logo: '/logos/google.svg',
    relationshipSince: '2019',
    primaryContact: {
      id: 'lin',
      name: 'Lin Chen',
      email: 'lin@google.com',
      role: 'Marketing Director',
    },
    contacts: [
      {
        id: 'lin',
        name: 'Lin Chen',
        email: 'lin@google.com',
        role: 'Marketing Director',
      },
      {
        id: 'david',
        name: 'David Park',
        email: 'david@google.com',
        role: 'Brand Manager',
      },
      {
        id: 'rachel',
        name: 'Rachel Kim',
        email: 'rachel@google.com',
        role: 'Procurement',
      },
    ],
    notes: [
      'Prefers async reviews, hates long meetings',
      "Lin is data-driven, always wants to see benchmarks",
      'Budget cycles are quarterly, plan renewals in advance',
      "Creative approval requires David's sign-off",
    ],
  },
]

// Projects
export const projects: Project[] = [
  {
    id: 'march-madness',
    clientId: 'google',
    name: 'March Madness Campaign',
    status: 'active',
    timeline: {
      start: '2025-01-15',
      end: '2025-03-20',
    },
    daysUntilLaunch: 23,
    lastTouched: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    team: [
      { userId: 'kenny', name: 'Kenny', role: 'Strategy Lead' },
      { userId: 'sarah', name: 'Sarah', role: 'Creative Director' },
      { userId: 'mike', name: 'Mike', role: 'Media Planner' },
      { userId: 'lin', name: 'Lin', role: 'Client Contact', isClient: true },
    ],
    workflows: ['creative-dev', 'media-planning', 'asset-production'],
    documents: [
      {
        id: 'brief-v2',
        name: 'Creative Brief v2',
        type: 'brief',
        createdBy: 'Brief Writer Agent',
        createdAt: '2025-02-01',
      },
      {
        id: 'media-plan',
        name: 'Media Plan Draft',
        type: 'plan',
        createdBy: 'Media Planner Agent',
        createdAt: '2025-02-03',
      },
      {
        id: 'audience-deck',
        name: 'Audience Research Deck',
        type: 'deck',
        createdBy: 'Audience Insights Agent',
        createdAt: '2025-01-20',
      },
      {
        id: 'brand-guide',
        name: 'Brand Guidelines',
        type: 'guidelines',
        createdBy: 'Google',
        createdAt: '2024-01-01',
      },
    ],
  },
  {
    id: 'holiday-campaign',
    clientId: 'google',
    name: 'Holiday Campaign',
    status: 'active',
    timeline: {
      start: '2024-10-01',
      end: '2025-02-10',
    },
    lastTouched: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    team: [
      { userId: 'kenny', name: 'Kenny', role: 'Strategy Lead' },
      { userId: 'sarah', name: 'Sarah', role: 'Creative Director' },
    ],
    workflows: ['campaign-review'],
    documents: [],
  },
  {
    id: 'q2-refresh',
    clientId: 'google',
    name: 'Q2 Brand Refresh',
    status: 'active',
    timeline: {
      start: '2025-01-20',
      end: '2025-04-30',
    },
    lastTouched: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    team: [
      { userId: 'kenny', name: 'Kenny', role: 'Strategy Lead' },
    ],
    workflows: [],
    documents: [],
  },
]

// Agents
export const agents: Agent[] = [
  // Strategy Agents
  {
    id: 'audience-insights',
    name: 'Audience Insights Agent',
    shortName: 'Audience Insights',
    description: 'Discovers and profiles audience segments from first and third-party data.',
    longDescription: 'I discover and profile audience segments by analyzing first-party data, third-party data sources, and behavioral signals. I can identify new opportunities, validate existing assumptions, and flag segments you might be missing.',
    category: 'strategy',
    capabilities: ['Segment identification', 'Behavioral analysis', 'Lookalike modeling', 'Trend correlation'],
    dataSources: ['Your CRM data', 'Google Analytics', 'Social listening feeds', 'Converge data partnerships'],
    usedInWorkflows: 12,
  },
  {
    id: 'competitive-intel',
    name: 'Competitive Intel Agent',
    shortName: 'Competitive Intel',
    description: 'Monitors competitor activity and surfaces relevant signals.',
    category: 'strategy',
    capabilities: ['Competitor monitoring', 'Market analysis', 'Signal detection'],
    usedInWorkflows: 8,
  },
  {
    id: 'brief-writer',
    name: 'Brief Writer Agent',
    shortName: 'Brief Writer',
    description: 'Drafts creative and media briefs from strategy inputs.',
    category: 'strategy',
    capabilities: ['Brief drafting', 'Strategy synthesis', 'Requirement gathering'],
    usedInWorkflows: 23,
  },
  {
    id: 'trend-spotter',
    name: 'Trend Spotter Agent',
    shortName: 'Trend Spotter',
    description: 'Identifies cultural and market trends relevant to your clients.',
    category: 'strategy',
    capabilities: ['Trend identification', 'Cultural analysis', 'Market signals'],
    usedInWorkflows: 6,
  },
  {
    id: 'messaging-strategist',
    name: 'Messaging Strategist Agent',
    shortName: 'Messaging Strategist',
    description: 'Develops positioning and messaging frameworks.',
    category: 'strategy',
    capabilities: ['Positioning', 'Messaging frameworks', 'Value proposition'],
    usedInWorkflows: 15,
  },
  {
    id: 'scenario-agent',
    name: 'Scenario Agent',
    shortName: 'Scenario',
    description: 'Models timelines, budget scenarios, and trade-offs for strategic decisions.',
    longDescription: 'I help you think through what-if scenarios by modeling different timelines, budget allocations, and strategic trade-offs. I can show you the implications of various choices before you commit.',
    category: 'strategy',
    capabilities: ['Timeline modeling', 'Budget scenarios', 'Trade-off analysis', 'Risk assessment'],
    usedInWorkflows: 8,
  },
  // Creative Agents
  {
    id: 'concept-generator',
    name: 'Concept Generator Agent',
    shortName: 'Concept Generator',
    description: 'Creates creative concepts based on briefs and strategy.',
    category: 'creative',
    capabilities: ['Concept creation', 'Visual direction', 'Ideation'],
    usedInWorkflows: 28,
  },
  {
    id: 'copywriter',
    name: 'Copywriter Agent',
    shortName: 'Copywriter',
    description: 'Writes compelling copy for campaigns and assets.',
    category: 'creative',
    capabilities: ['Copywriting', 'Headline creation', 'Tone adaptation'],
    usedInWorkflows: 35,
  },
  {
    id: 'visual-director',
    name: 'Visual Director Agent',
    shortName: 'Visual Director',
    description: 'Guides visual direction and asset creation.',
    category: 'creative',
    capabilities: ['Visual direction', 'Art direction', 'Style guidance'],
    usedInWorkflows: 20,
  },
  {
    id: 'asset-reviewer',
    name: 'Asset Reviewer Agent',
    shortName: 'Asset Reviewer',
    description: 'Reviews assets for quality and brand compliance.',
    category: 'creative',
    capabilities: ['Quality review', 'Brand compliance', 'Asset feedback'],
    usedInWorkflows: 18,
  },
  {
    id: 'localization',
    name: 'Localization Agent',
    shortName: 'Localization',
    description: 'Adapts content for different markets and languages.',
    category: 'creative',
    capabilities: ['Translation', 'Cultural adaptation', 'Market localization'],
    usedInWorkflows: 10,
  },
  // Media Agents
  {
    id: 'media-planner',
    name: 'Media Planner Agent',
    shortName: 'Media Planner',
    description: 'Creates comprehensive media plans and channel strategies.',
    category: 'media',
    capabilities: ['Media planning', 'Channel strategy', 'Reach forecasting'],
    usedInWorkflows: 25,
  },
  {
    id: 'budget-optimizer',
    name: 'Budget Optimizer Agent',
    shortName: 'Budget Optimizer',
    description: 'Optimizes budget allocation across channels.',
    category: 'media',
    capabilities: ['Budget optimization', 'ROI analysis', 'Allocation modeling'],
    usedInWorkflows: 22,
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    shortName: 'Analytics',
    description: 'Pulls and analyzes performance data from all platforms.',
    category: 'media',
    capabilities: ['Data collection', 'Performance analysis', 'Reporting'],
    usedInWorkflows: 40,
  },
  {
    id: 'placement-scout',
    name: 'Placement Scout Agent',
    shortName: 'Placement Scout',
    description: 'Finds optimal ad placements and inventory.',
    category: 'media',
    capabilities: ['Placement discovery', 'Inventory analysis', 'Opportunity finding'],
    usedInWorkflows: 12,
  },
  {
    id: 'attribution',
    name: 'Attribution Analyst Agent',
    shortName: 'Attribution',
    description: 'Analyzes attribution and conversion paths.',
    category: 'media',
    capabilities: ['Attribution modeling', 'Conversion analysis', 'Path analysis'],
    usedInWorkflows: 15,
  },
  // Operations Agents
  {
    id: 'timeline-manager',
    name: 'Timeline Manager Agent',
    shortName: 'Timeline Manager',
    description: 'Monitors project timelines and flags risks.',
    category: 'operations',
    capabilities: ['Timeline tracking', 'Risk detection', 'Deadline management'],
    usedInWorkflows: 30,
  },
  {
    id: 'resource-allocator',
    name: 'Resource Allocator Agent',
    shortName: 'Resource Allocator',
    description: 'Manages team capacity and resource allocation.',
    category: 'operations',
    capabilities: ['Resource planning', 'Capacity management', 'Allocation'],
    usedInWorkflows: 18,
  },
  {
    id: 'meeting-prepper',
    name: 'Meeting Prepper Agent',
    shortName: 'Meeting Prepper',
    description: 'Prepares materials and talking points for meetings.',
    category: 'operations',
    capabilities: ['Meeting prep', 'Talking points', 'Document assembly'],
    usedInWorkflows: 25,
  },
  {
    id: 'status-reporter',
    name: 'Status Reporter Agent',
    shortName: 'Status Reporter',
    description: 'Creates status updates and progress reports.',
    category: 'operations',
    capabilities: ['Status reports', 'Progress tracking', 'Stakeholder updates'],
    usedInWorkflows: 20,
  },
  {
    id: 'qa-agent',
    name: 'QA Agent',
    shortName: 'QA',
    description: 'Quality assurance and final checks before delivery.',
    category: 'operations',
    capabilities: ['Quality assurance', 'Final review', 'Checklist verification'],
    usedInWorkflows: 22,
  },
  {
    id: 'dashboard',
    name: 'Dashboard Agent',
    shortName: 'Dashboard',
    description: 'Creates visualizations and dashboards from data.',
    category: 'operations',
    capabilities: ['Data visualization', 'Dashboard creation', 'Chart design'],
    usedInWorkflows: 18,
  },
  {
    id: 'insights',
    name: 'Insights Agent',
    shortName: 'Insights',
    description: 'Identifies key insights and anomalies in data.',
    category: 'operations',
    capabilities: ['Insight detection', 'Anomaly identification', 'Pattern recognition'],
    usedInWorkflows: 25,
  },
  {
    id: 'knowledge',
    name: 'Knowledge Agent',
    shortName: 'Knowledge',
    description: 'Archives learnings and maintains institutional knowledge.',
    category: 'operations',
    capabilities: ['Knowledge archival', 'Learning synthesis', 'Documentation'],
    usedInWorkflows: 15,
  },
  {
    id: 'presentation',
    name: 'Presentation Agent',
    shortName: 'Presentation',
    description: 'Creates client presentations and decks.',
    category: 'operations',
    capabilities: ['Presentation creation', 'Deck design', 'Storytelling'],
    usedInWorkflows: 20,
  },
  {
    id: 'compliance-agent',
    name: 'Compliance Agent',
    shortName: 'Compliance',
    description: 'Reviews content for brand guidelines, legal requirements, and claim verification.',
    longDescription: 'I ensure all content meets brand guidelines, legal requirements, and regulatory standards. I verify claims, check disclaimers, and flag potential compliance issues before they become problems.',
    category: 'operations',
    capabilities: ['Brand guideline review', 'Legal compliance', 'Claim verification', 'Disclaimer checks'],
    usedInWorkflows: 14,
  },
  // Custom Agent
  {
    id: 'google-brand-voice',
    name: 'Google Brand Voice Agent',
    shortName: 'Google Brand Voice',
    description: 'Trained on Google\'s brand guidelines. Reviews copy for brand consistency.',
    category: 'custom',
    capabilities: ['Brand voice review', 'Copy compliance', 'Tone checking'],
    usedInWorkflows: 8,
    isCustom: true,
    createdBy: 'Sarah',
    createdAt: '2025-01',
  },
]

// Docket Items
export const docketItems: DocketItem[] = [
  {
    id: 'holiday-metrics-review',
    title: 'Review holiday campaign performance',
    subtitle: 'The Analytics Agent pulled the final numbers. Some surprises.',
    projectId: 'holiday-campaign',
    projectName: 'Holiday Campaign',
    priority: 'urgent',
    timeEstimate: '~25 min',
    agents: [
      agents.find(a => a.id === 'analytics')!,
      agents.find(a => a.id === 'dashboard')!,
    ],
    type: 'review',
    workflowId: 'campaign-review',
    currentStep: 3,
  },
  {
    id: 'march-madness-concepts',
    title: 'Creative concepts ready for March Madness',
    subtitle: '4 concepts from the Concept Generator. Waiting on your take.',
    projectId: 'march-madness',
    projectName: 'March Madness Campaign',
    priority: 'attention',
    timeEstimate: '~40 min',
    agents: [
      agents.find(a => a.id === 'concept-generator')!,
      agents.find(a => a.id === 'visual-director')!,
    ],
    type: 'creative',
    workflowId: 'creative-dev',
    currentStep: 4,
  },
  {
    id: 'audience-discovery',
    title: 'New audience segment discovered',
    subtitle: 'The Audience Insights Agent found something interesting in the data.',
    projectId: 'q2-refresh',
    projectName: 'Q2 Brand Refresh',
    priority: 'discovery',
    timeEstimate: '~15 min',
    agents: [agents.find(a => a.id === 'audience-insights')!],
    type: 'discovery',
  },
  {
    id: 'lin-call-prep',
    title: 'Prep for 2pm call with Lin',
    subtitle: 'Lin will want to know about Q1 results and March Madness timeline.',
    projectId: 'google',
    projectName: 'Google',
    priority: 'attention',
    timeEstimate: '~20 min',
    agents: [agents.find(a => a.id === 'meeting-prepper')!],
    type: 'calendar',
  },
  {
    id: 'timeline-risk',
    title: 'March Madness timeline at risk',
    subtitle: 'Asset delivery deadline is in 5 days. 2 steps still in progress.',
    projectId: 'march-madness',
    projectName: 'March Madness Campaign',
    priority: 'urgent',
    timeEstimate: '~10 min',
    agents: [agents.find(a => a.id === 'timeline-manager')!],
    type: 'operational',
  },
]

// Workflows
export const workflows: Workflow[] = [
  {
    id: 'campaign-review',
    name: 'Campaign Review Workflow',
    projectId: 'holiday-campaign',
    status: 'in_progress',
    currentStep: 3,
    steps: [
      {
        id: 'data-collection',
        name: 'Data Collection',
        status: 'complete',
        agents: ['analytics'],
        completedAt: '2025-02-02T09:00:00',
      },
      {
        id: 'analysis',
        name: 'Analysis & Dashboard',
        status: 'complete',
        agents: ['analytics', 'dashboard', 'insights'],
        completedAt: '2025-02-03T14:30:00',
      },
      {
        id: 'kenny-review',
        name: 'Kenny Review',
        status: 'current',
        assignee: 'kenny',
        agents: [],
        startedAt: '2025-02-04T09:15:00',
        timeEstimate: '~25 min',
      },
      {
        id: 'client-presentation',
        name: 'Client Presentation Prep',
        status: 'upcoming',
        agents: ['meeting-prepper', 'presentation'],
      },
      {
        id: 'archive',
        name: 'Archive & Learnings',
        status: 'upcoming',
        agents: ['qa-agent', 'knowledge'],
      },
    ],
  },
  {
    id: 'creative-dev',
    name: 'Creative Development',
    projectId: 'march-madness',
    status: 'in_progress',
    currentStep: 4,
    steps: [
      {
        id: 'brief-creation',
        name: 'Brief Creation',
        status: 'complete',
        agents: ['brief-writer'],
        completedAt: '2025-01-25T10:00:00',
      },
      {
        id: 'concept-ideation',
        name: 'Concept Ideation',
        status: 'complete',
        agents: ['concept-generator', 'trend-spotter'],
        completedAt: '2025-01-30T16:00:00',
      },
      {
        id: 'visual-development',
        name: 'Visual Development',
        status: 'complete',
        agents: ['visual-director', 'concept-generator'],
        completedAt: '2025-02-03T11:00:00',
      },
      {
        id: 'kenny-review',
        name: 'Kenny Review',
        status: 'current',
        assignee: 'kenny',
        agents: [],
        startedAt: '2025-02-04T09:00:00',
        timeEstimate: '~40 min',
      },
      {
        id: 'client-review',
        name: 'Client Review',
        status: 'upcoming',
        agents: ['presentation'],
      },
      {
        id: 'final-production',
        name: 'Final Production',
        status: 'upcoming',
        agents: ['asset-reviewer', 'qa-agent'],
      },
    ],
  },
  {
    id: 'media-planning',
    name: 'Media Planning',
    projectId: 'march-madness',
    status: 'in_progress',
    currentStep: 2,
    steps: [
      {
        id: 'research',
        name: 'Audience & Market Research',
        status: 'complete',
        agents: ['audience-insights', 'competitive-intel'],
        completedAt: '2025-01-28T14:00:00',
      },
      {
        id: 'plan-draft',
        name: 'Plan Draft',
        status: 'current',
        agents: ['media-planner', 'budget-optimizer'],
        startedAt: '2025-02-01T09:00:00',
      },
      {
        id: 'review',
        name: 'Internal Review',
        status: 'upcoming',
        agents: [],
      },
      {
        id: 'finalize',
        name: 'Finalize & Present',
        status: 'upcoming',
        agents: ['presentation'],
      },
    ],
  },
  {
    id: 'asset-production',
    name: 'Asset Production',
    projectId: 'march-madness',
    status: 'not_started',
    currentStep: 0,
    steps: [
      {
        id: 'setup',
        name: 'Production Setup',
        status: 'upcoming',
        agents: ['resource-allocator'],
      },
      {
        id: 'creation',
        name: 'Asset Creation',
        status: 'upcoming',
        agents: ['visual-director', 'copywriter'],
      },
      {
        id: 'review',
        name: 'Review & QA',
        status: 'upcoming',
        agents: ['asset-reviewer', 'qa-agent'],
      },
    ],
  },
]

// Calendar Events
export const calendarEvents: CalendarEvent[] = [
  {
    id: 'internal-sync',
    title: 'Internal sync',
    date: '2025-02-03',
    startTime: '10:00',
    endTime: '10:30',
    attendees: ['kenny', 'sarah', 'mike'],
    hasPrepMaterials: false,
  },
  {
    id: 'creative-review-sarah',
    title: 'Creative review with Sarah',
    date: '2025-02-03',
    startTime: '14:00',
    endTime: '15:00',
    attendees: ['kenny', 'sarah'],
    projectId: 'march-madness',
    hasPrepMaterials: false,
  },
  {
    id: 'lin-call',
    title: 'Call with Lin @ Google',
    date: '2025-02-04',
    startTime: '14:00',
    endTime: '14:45',
    attendees: ['kenny', 'lin', 'sarah'],
    clientId: 'google',
    hasPrepMaterials: true,
    context: 'This is a regular check-in. Lin will likely want updates on: Holiday campaign results, March Madness timeline, Q2 planning status.',
    prepDocuments: [
      { id: 'prep-1', name: 'Holiday Performance Summary (1-pager)', type: 'other', createdBy: 'Meeting Prepper Agent', createdAt: '2025-02-04' },
      { id: 'prep-2', name: 'March Madness Status Update', type: 'other', createdBy: 'Meeting Prepper Agent', createdAt: '2025-02-04' },
      { id: 'prep-3', name: 'Talking points', type: 'other', createdBy: 'Meeting Prepper Agent', createdAt: '2025-02-04' },
    ],
  },
  {
    id: 'mm-status',
    title: 'March Madness status',
    date: '2025-02-04',
    startTime: '16:00',
    endTime: '16:30',
    attendees: ['kenny', 'sarah', 'mike'],
    projectId: 'march-madness',
    hasPrepMaterials: false,
  },
  {
    id: 'client-presentation',
    title: 'Client presentation: Holiday results',
    date: '2025-02-05',
    startTime: '09:00',
    endTime: '10:00',
    attendees: ['kenny', 'sarah', 'lin', 'david'],
    clientId: 'google',
    projectId: 'holiday-campaign',
    hasPrepMaterials: true,
  },
  {
    id: 'media-review',
    title: 'Media plan review',
    date: '2025-02-05',
    startTime: '15:00',
    endTime: '16:00',
    attendees: ['kenny', 'mike'],
    projectId: 'march-madness',
    hasPrepMaterials: false,
  },
]

// Creative Concepts for March Madness
export const creativeConcepts: CreativeConcept[] = [
  {
    id: 'concept-1',
    name: 'Bold Move',
    description: 'High-energy, dynamic visuals that capture the intensity of the tournament. Features athletes in motion with bold typography.',
    imageUrl: '/concepts/bold-move.jpg',
    createdBy: 'concept-generator',
    status: 'pending',
    annotations: [],
  },
  {
    id: 'concept-2',
    name: 'Quiet Confidence',
    description: 'Understated elegance with focus on the mental game. Clean compositions with subtle motion and premium feel.',
    imageUrl: '/concepts/quiet-confidence.jpg',
    createdBy: 'concept-generator',
    status: 'pending',
    annotations: [],
  },
  {
    id: 'concept-3',
    name: 'Community',
    description: 'Celebrates the fan experience and shared moments. Warm, inclusive imagery with diverse representation.',
    imageUrl: '/concepts/community.jpg',
    createdBy: 'concept-generator',
    status: 'pending',
    annotations: [],
  },
  {
    id: 'concept-4',
    name: 'Performance',
    description: 'Data-driven visuals showing the technology and precision behind the game. Modern, tech-forward aesthetic.',
    imageUrl: '/concepts/performance.jpg',
    createdBy: 'concept-generator',
    status: 'pending',
    annotations: [],
  },
]

// Metrics Data for Holiday Campaign
export const holidayMetrics: MetricData[] = [
  { label: 'Total Reach', value: '45.2M', change: 12, changeLabel: 'vs. target' },
  { label: 'Engagement Rate', value: '4.8%', change: 8, changeLabel: 'vs. benchmark' },
  { label: 'Conversions', value: '128K', change: 15, changeLabel: 'vs. last year' },
  { label: 'ROAS', value: '3.2x', change: 14, changeLabel: 'vs. 2.8x target', benchmark: 2.8 },
]

export const channelMetrics = [
  { channel: 'Meta', spend: '$450K', reach: '22M', ctr: '2.1%', roas: '3.5x', performance: 92 },
  { channel: 'Google', spend: '$380K', reach: '18M', ctr: '1.8%', roas: '3.1x', performance: 85 },
  { channel: 'TikTok', spend: '$170K', reach: '5.2M', ctr: '3.4%', roas: '2.8x', performance: 140 },
]

// Activity feed items
export const activityItems = [
  { timestamp: 'Today, 9:15am', description: 'Kenny started reviewing creative concepts', projectId: 'march-madness' },
  { timestamp: 'Yesterday, 4:30pm', description: 'Concept Generator Agent created 4 new concepts', projectId: 'march-madness' },
  { timestamp: 'Yesterday, 2:00pm', description: 'Sarah left feedback on concept direction', projectId: 'march-madness' },
  { timestamp: 'Feb 2, 11:00am', description: 'Media Planner Agent completed first draft of media plan', projectId: 'march-madness' },
  { timestamp: 'Feb 1, 3:00pm', description: 'Brief Writer Agent finalized Creative Brief v2', projectId: 'march-madness' },
]

// Decisions
export const decisions: Decision[] = [
  {
    id: 'decision-1',
    workflowId: 'creative-dev',
    stepId: 'kenny-review',
    title: 'Approve March Madness Creative Direction',
    context: 'The Concept Generator Agent has prepared 4 creative concepts. Review and select a direction to proceed with asset production.',
    priority: 'urgent',
    clientName: 'Google',
    workflowName: 'Creative Development',
    timeEstimate: '~40 min',
    deadline: 'Today',
    agentWaiting: 'Concept Generator Agent',
    status: 'pending',
  },
  {
    id: 'decision-2',
    workflowId: 'campaign-review',
    stepId: 'kenny-review',
    title: 'Review Holiday Campaign Analysis',
    context: 'The Analytics Agent has compiled the final performance report. Review the data and insights before the client presentation.',
    priority: 'waiting',
    clientName: 'Google',
    workflowName: 'Campaign Review Workflow',
    timeEstimate: '~25 min',
    agentWaiting: 'Analytics Agent',
    status: 'pending',
  },
]

// Workflow Templates
export const workflowTemplates: WorkflowTemplate[] = [
  // Campaign Templates
  {
    id: 'template-creative-dev',
    name: 'Creative Development',
    description: 'End-to-end creative process from brief to final production assets.',
    category: 'campaign',
    estimatedDuration: '2-3 weeks',
    stepCount: 6,
    decisionPoints: 2,
    steps: [
      { name: 'Brief Creation', type: 'agent', agentIds: ['brief-writer'] },
      { name: 'Concept Ideation', type: 'agent', agentIds: ['concept-generator', 'trend-spotter'] },
      { name: 'Visual Development', type: 'agent', agentIds: ['visual-director', 'concept-generator'] },
      { name: 'Internal Review', type: 'human', assigneeRole: 'Strategy Lead' },
      { name: 'Client Review', type: 'human', assigneeRole: 'Client' },
      { name: 'Final Production', type: 'agent', agentIds: ['asset-reviewer', 'qa-agent'] },
    ],
    recommendedAgents: ['brief-writer', 'concept-generator', 'visual-director', 'asset-reviewer'],
  },
  {
    id: 'template-media-planning',
    name: 'Media Planning',
    description: 'Research-driven media strategy and channel allocation.',
    category: 'campaign',
    estimatedDuration: '1-2 weeks',
    stepCount: 4,
    decisionPoints: 1,
    steps: [
      { name: 'Audience & Market Research', type: 'agent', agentIds: ['audience-insights', 'competitive-intel'] },
      { name: 'Plan Draft', type: 'agent', agentIds: ['media-planner', 'budget-optimizer'] },
      { name: 'Internal Review', type: 'human', assigneeRole: 'Strategy Lead' },
      { name: 'Finalize & Present', type: 'agent', agentIds: ['presentation'] },
    ],
    recommendedAgents: ['audience-insights', 'media-planner', 'budget-optimizer'],
  },
  {
    id: 'template-campaign-review',
    name: 'Campaign Review',
    description: 'Post-campaign analysis and client reporting workflow.',
    category: 'campaign',
    estimatedDuration: '1 week',
    stepCount: 5,
    decisionPoints: 1,
    steps: [
      { name: 'Data Collection', type: 'agent', agentIds: ['analytics'] },
      { name: 'Analysis & Dashboard', type: 'agent', agentIds: ['analytics', 'dashboard', 'insights'] },
      { name: 'Internal Review', type: 'human', assigneeRole: 'Strategy Lead' },
      { name: 'Client Presentation Prep', type: 'agent', agentIds: ['meeting-prepper', 'presentation'] },
      { name: 'Archive & Learnings', type: 'agent', agentIds: ['qa-agent', 'knowledge'] },
    ],
    recommendedAgents: ['analytics', 'dashboard', 'insights', 'presentation'],
  },
  {
    id: 'template-asset-production',
    name: 'Asset Production',
    description: 'Efficient production of campaign assets at scale.',
    category: 'campaign',
    estimatedDuration: '1-2 weeks',
    stepCount: 3,
    decisionPoints: 1,
    steps: [
      { name: 'Production Setup', type: 'agent', agentIds: ['resource-allocator'] },
      { name: 'Asset Creation', type: 'agent', agentIds: ['visual-director', 'copywriter'] },
      { name: 'Review & QA', type: 'human', assigneeRole: 'Creative Director' },
    ],
    recommendedAgents: ['resource-allocator', 'visual-director', 'copywriter', 'qa-agent'],
  },
  {
    id: 'template-launch-activation',
    name: 'Launch & Activation',
    description: 'Campaign launch coordination and go-live checklist.',
    category: 'campaign',
    estimatedDuration: '3-5 days',
    stepCount: 4,
    decisionPoints: 1,
    steps: [
      { name: 'Pre-launch QA', type: 'agent', agentIds: ['qa-agent', 'compliance-agent'] },
      { name: 'Final Approval', type: 'human', assigneeRole: 'Strategy Lead' },
      { name: 'Launch Execution', type: 'agent', agentIds: ['timeline-manager'] },
      { name: 'Day 1 Monitoring', type: 'agent', agentIds: ['analytics'] },
    ],
    recommendedAgents: ['qa-agent', 'compliance-agent', 'timeline-manager', 'analytics'],
  },
  // Content Templates
  {
    id: 'template-blog-production',
    name: 'Blog Post Production',
    description: 'End-to-end blog content creation and publishing.',
    category: 'content',
    estimatedDuration: '3-5 days',
    stepCount: 4,
    decisionPoints: 1,
    steps: [
      { name: 'Topic Research', type: 'agent', agentIds: ['trend-spotter', 'competitive-intel'] },
      { name: 'Content Draft', type: 'agent', agentIds: ['copywriter'] },
      { name: 'Review & Edit', type: 'human', assigneeRole: 'Content Lead' },
      { name: 'Final QA & Publish', type: 'agent', agentIds: ['qa-agent'] },
    ],
    recommendedAgents: ['trend-spotter', 'copywriter', 'qa-agent'],
  },
  {
    id: 'template-social-calendar',
    name: 'Social Content Calendar',
    description: 'Monthly social media content planning and creation.',
    category: 'content',
    estimatedDuration: '1 week',
    stepCount: 5,
    decisionPoints: 1,
    steps: [
      { name: 'Trend Analysis', type: 'agent', agentIds: ['trend-spotter'] },
      { name: 'Content Ideation', type: 'agent', agentIds: ['concept-generator', 'copywriter'] },
      { name: 'Calendar Draft', type: 'agent', agentIds: ['timeline-manager'] },
      { name: 'Approval', type: 'human', assigneeRole: 'Content Lead' },
      { name: 'Asset Production', type: 'agent', agentIds: ['visual-director', 'copywriter'] },
    ],
    recommendedAgents: ['trend-spotter', 'concept-generator', 'copywriter', 'visual-director'],
  },
  // Analysis Templates
  {
    id: 'template-performance-review',
    name: 'Performance Review',
    description: 'Comprehensive performance analysis with actionable insights.',
    category: 'analysis',
    estimatedDuration: '3-5 days',
    stepCount: 4,
    decisionPoints: 1,
    steps: [
      { name: 'Data Pull', type: 'agent', agentIds: ['analytics'] },
      { name: 'Analysis', type: 'agent', agentIds: ['insights', 'attribution'] },
      { name: 'Insights Review', type: 'human', assigneeRole: 'Strategy Lead' },
      { name: 'Report Generation', type: 'agent', agentIds: ['dashboard', 'presentation'] },
    ],
    recommendedAgents: ['analytics', 'insights', 'attribution', 'dashboard'],
  },
  {
    id: 'template-competitive-analysis',
    name: 'Competitive Analysis',
    description: 'Deep-dive into competitor strategies and market positioning.',
    category: 'analysis',
    estimatedDuration: '1 week',
    stepCount: 4,
    decisionPoints: 1,
    steps: [
      { name: 'Competitor Monitoring', type: 'agent', agentIds: ['competitive-intel'] },
      { name: 'Market Analysis', type: 'agent', agentIds: ['trend-spotter', 'audience-insights'] },
      { name: 'Strategic Review', type: 'human', assigneeRole: 'Strategy Lead' },
      { name: 'Recommendations', type: 'agent', agentIds: ['messaging-strategist', 'scenario-agent'] },
    ],
    recommendedAgents: ['competitive-intel', 'trend-spotter', 'audience-insights', 'scenario-agent'],
  },
  // Operations Templates
  {
    id: 'template-client-onboarding',
    name: 'Client Onboarding',
    description: 'Structured onboarding process for new client relationships.',
    category: 'operations',
    estimatedDuration: '2 weeks',
    stepCount: 5,
    decisionPoints: 2,
    steps: [
      { name: 'Discovery & Research', type: 'agent', agentIds: ['audience-insights', 'competitive-intel'] },
      { name: 'Kickoff Prep', type: 'agent', agentIds: ['meeting-prepper'] },
      { name: 'Kickoff Meeting', type: 'human', assigneeRole: 'Account Lead' },
      { name: 'Strategy Development', type: 'agent', agentIds: ['messaging-strategist', 'brief-writer'] },
      { name: 'Onboarding Complete', type: 'human', assigneeRole: 'Account Lead' },
    ],
    recommendedAgents: ['audience-insights', 'competitive-intel', 'meeting-prepper', 'messaging-strategist'],
  },
  {
    id: 'template-qbr',
    name: 'Quarterly Business Review',
    description: 'Comprehensive quarterly review and planning session.',
    category: 'operations',
    estimatedDuration: '1 week',
    stepCount: 5,
    decisionPoints: 1,
    steps: [
      { name: 'Performance Summary', type: 'agent', agentIds: ['analytics', 'insights'] },
      { name: 'Learnings Synthesis', type: 'agent', agentIds: ['knowledge'] },
      { name: 'Next Quarter Planning', type: 'agent', agentIds: ['scenario-agent', 'timeline-manager'] },
      { name: 'Leadership Review', type: 'human', assigneeRole: 'Strategy Lead' },
      { name: 'Client Presentation', type: 'agent', agentIds: ['presentation', 'meeting-prepper'] },
    ],
    recommendedAgents: ['analytics', 'insights', 'knowledge', 'scenario-agent', 'presentation'],
  },
]

// Helper functions to get data
export function getClient(id: string) {
  return clients.find(c => c.id === id)
}

export function getProject(id: string) {
  return projects.find(p => p.id === id)
}

export function getProjectsByClient(clientId: string) {
  return projects.filter(p => p.clientId === clientId)
}

export function getAgent(id: string) {
  return agents.find(a => a.id === id)
}

export function getAgentsByCategory(category: string) {
  if (category === 'all') return agents
  return agents.filter(a => a.category === category)
}

export function getWorkflow(id: string) {
  return workflows.find(w => w.id === id)
}

export function getWorkflowsByProject(projectId: string) {
  return workflows.filter(w => w.projectId === projectId)
}

export function getDocketItem(id: string) {
  return docketItems.find(d => d.id === id)
}

export function getCalendarEventsByDate(date: string) {
  return calendarEvents.filter(e => e.date === date)
}

export function getDecision(id: string) {
  return decisions.find(d => d.id === id)
}

export function getPendingDecisions() {
  return decisions.filter(d => d.status === 'pending')
}

export function getWorkflowTemplate(id: string) {
  return workflowTemplates.find(t => t.id === id)
}

export function getWorkflowTemplatesByCategory(category: string) {
  if (category === 'all') return workflowTemplates
  return workflowTemplates.filter(t => t.category === category)
}
