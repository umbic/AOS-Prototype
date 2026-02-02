'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  MessageSquare,
  GitCompare,
  History,
  Download,
  ZoomIn,
  Move,
  MessageCircle,
  Pin,
  Send,
  Sparkles,
  FileText,
  Users,
  Shield,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import { SidebarThin } from '@/components/layout/sidebar-thin'
import { ChatPanelSlide } from '@/components/chat/chat-panel-slide'
import { cn } from '@/lib/utils'
import { getProject, getClient, creativeConcepts } from '@/lib/data'

// Extended concept data for the canvas view
const conceptDetails: Record<string, {
  strategicAngle: string
  keyMessage: string
  visualDirection: string
  tone: string[]
  channels: string[]
  assets: string[]
  annotations: Array<{
    id: string
    author: string
    isAgent?: boolean
    content: string
    position: { x: number; y: number }
    target: string
  }>
  brandCompliance: { passed: boolean; issues: number }
  predictedPerformance: { score: number; confidence: number; level: 'high' | 'medium' | 'low' }
  riskFlags: string[]
  inputs: {
    brief: string
    audience: string
    references: string
    brandGuidelines: string
  }
}> = {
  'concept-1': {
    strategicAngle: 'High energy, athlete-focused, captures tournament intensity. Appeals to sports enthusiasts and competitive spirits.',
    keyMessage: '"Every bracket. Every upset. Every moment. Be there with Google."',
    visualDirection: 'Dynamic action shots, bold typography, vibrant colors (tournament orange + Google blue). Fast cuts, high energy music.',
    tone: ['Exciting', 'Competitive', 'Inclusive', 'Celebratory'],
    channels: ['TV :30', 'Social (9:16, 1:1, 16:9)', 'Display', 'OOH'],
    assets: [
      'Hero video storyboard',
      '3 social mockups',
      'Display banner concepts',
      'Headline variants (5)',
    ],
    annotations: [
      {
        id: 'ann-1',
        author: 'Kenny',
        content: 'Love the energy. Can we see a version with more diverse athletes?',
        position: { x: 20, y: 15 },
        target: 'visual',
      },
      {
        id: 'ann-2',
        author: 'Concept Generator Agent',
        isAgent: true,
        content: 'This message tested well with 18-34 demo in similar campaigns',
        position: { x: 75, y: 45 },
        target: 'message',
      },
      {
        id: 'ann-3',
        author: 'Brand Voice Agent',
        isAgent: true,
        content: '✓ Aligned with Google brand guidelines',
        position: { x: 60, y: 65 },
        target: 'tone',
      },
    ],
    brandCompliance: { passed: true, issues: 0 },
    predictedPerformance: { score: 78, confidence: 78, level: 'high' },
    riskFlags: [],
    inputs: {
      brief: 'Creative Brief v2',
      audience: 'March Madness Enthusiasts (segment)',
      references: 'Holiday Campaign 2024 (high performer)',
      brandGuidelines: 'Google 2025',
    },
  },
  'concept-2': {
    strategicAngle: 'Understated elegance with focus on the mental game. Clean compositions with subtle motion and premium feel.',
    keyMessage: '"The game is won before it\'s played. Prepare with Google."',
    visualDirection: 'Minimalist compositions, focus on concentration moments, black and white with subtle color accents.',
    tone: ['Sophisticated', 'Focused', 'Premium', 'Thoughtful'],
    channels: ['TV :30', 'Digital Video', 'Display'],
    assets: [
      'Hero video storyboard',
      '2 social mockups',
      'Display banner concepts',
    ],
    annotations: [],
    brandCompliance: { passed: true, issues: 0 },
    predictedPerformance: { score: 65, confidence: 72, level: 'medium' },
    riskFlags: ['May feel too subdued for tournament energy'],
    inputs: {
      brief: 'Creative Brief v2',
      audience: 'March Madness Enthusiasts (segment)',
      references: 'Google Pixel Campaign 2024',
      brandGuidelines: 'Google 2025',
    },
  },
  'concept-3': {
    strategicAngle: 'Celebrates the fan experience and shared moments. Warm, inclusive imagery with diverse representation.',
    keyMessage: '"64 teams. Millions of fans. One moment. Share it with Google."',
    visualDirection: 'Warm, golden lighting, diverse groups watching together, authentic reactions, community gatherings.',
    tone: ['Warm', 'Inclusive', 'Communal', 'Authentic'],
    channels: ['TV :30', 'TV :15', 'Social', 'Display', 'OOH'],
    assets: [
      'Hero video storyboard',
      '4 social mockups',
      'Display banner concepts',
      'OOH concepts (2)',
      'Headline variants (6)',
    ],
    annotations: [],
    brandCompliance: { passed: true, issues: 0 },
    predictedPerformance: { score: 72, confidence: 75, level: 'high' },
    riskFlags: [],
    inputs: {
      brief: 'Creative Brief v2',
      audience: 'March Madness Enthusiasts (segment)',
      references: 'Holiday Campaign 2024',
      brandGuidelines: 'Google 2025',
    },
  },
  'concept-4': {
    strategicAngle: 'Data-driven visuals showing the technology and precision behind the game. Modern, tech-forward aesthetic.',
    keyMessage: '"Every stat. Every play. Every prediction. Powered by Google."',
    visualDirection: 'Clean data visualizations, smooth animations, tech-forward UI elements, precision graphics.',
    tone: ['Modern', 'Intelligent', 'Precise', 'Innovative'],
    channels: ['Digital Video', 'Social', 'Display'],
    assets: [
      'Hero video storyboard',
      '2 social mockups',
      'Interactive display concepts',
    ],
    annotations: [],
    brandCompliance: { passed: true, issues: 0 },
    predictedPerformance: { score: 58, confidence: 65, level: 'medium' },
    riskFlags: ['May feel too clinical for emotional tournament moments'],
    inputs: {
      brief: 'Creative Brief v2',
      audience: 'March Madness Enthusiasts (segment)',
      references: 'Google Search Campaign 2024',
      brandGuidelines: 'Google 2025',
    },
  },
}

export default function CreativeCanvasPage() {
  const params = useParams()
  const projectId = params.id as string
  const conceptId = params.conceptId as string

  const [showAnnotations, setShowAnnotations] = useState(true)
  const [compareMode, setCompareMode] = useState(false)
  const [compareConceptId, setCompareConceptId] = useState<string | null>(null)
  const [chatExpanded, setChatExpanded] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const project = getProject(projectId)
  const client = project?.clientId ? getClient(project.clientId) : null
  const concept = creativeConcepts.find(c => c.id === conceptId)
  const details = conceptDetails[conceptId] || conceptDetails['concept-1']

  // Get concept index for navigation
  const conceptIndex = creativeConcepts.findIndex(c => c.id === conceptId)
  const prevConcept = conceptIndex > 0 ? creativeConcepts[conceptIndex - 1] : null
  const nextConcept = conceptIndex < creativeConcepts.length - 1 ? creativeConcepts[conceptIndex + 1] : null

  if (!concept || !project) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF9F7]">
        <p className="text-neutral-400">Concept not found</p>
      </div>
    )
  }

  const compareConcept = compareConceptId ? creativeConcepts.find(c => c.id === compareConceptId) : null
  const compareDetails = compareConceptId ? conceptDetails[compareConceptId] : null

  return (
    <div className="flex h-screen bg-[#FAF9F7]">
      <SidebarThin />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <header className="px-6 py-3 border-b border-neutral-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/today/march-madness-concepts`}
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to concepts
            </Link>
            <div className="flex items-center gap-2 border-l border-neutral-200 pl-4">
              <button
                onClick={() => prevConcept && window.location.assign(`/project/${projectId}/creative/${prevConcept.id}`)}
                disabled={!prevConcept}
                className={cn(
                  'p-1.5 rounded hover:bg-neutral-100',
                  !prevConcept && 'opacity-30 cursor-not-allowed'
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-neutral-600">
                Concept {conceptIndex + 1} of {creativeConcepts.length}
              </span>
              <button
                onClick={() => nextConcept && window.location.assign(`/project/${projectId}/creative/${nextConcept.id}`)}
                disabled={!nextConcept}
                className={cn(
                  'p-1.5 rounded hover:bg-neutral-100',
                  !nextConcept && 'opacity-30 cursor-not-allowed'
                )}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg">
              <ZoomIn className="w-4 h-4" />
              Zoom
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg">
              <Move className="w-4 h-4" />
              Pan
            </button>
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg',
                showAnnotations
                  ? 'bg-[#86BC24]/10 text-[#86BC24]'
                  : 'text-neutral-600 hover:bg-neutral-100'
              )}
            >
              <Pin className="w-4 h-4" />
              Annotate
            </button>
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg',
                compareMode
                  ? 'bg-[#86BC24]/10 text-[#86BC24]'
                  : 'text-neutral-600 hover:bg-neutral-100'
              )}
            >
              <GitCompare className="w-4 h-4" />
              Compare
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg">
              <History className="w-4 h-4" />
              History
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </header>

        {/* Canvas + Right Rail */}
        <div className="flex-1 flex overflow-hidden">
          {/* Canvas Area */}
          <div className="flex-1 overflow-y-auto p-8">
            {compareMode ? (
              /* Compare View */
              <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* Current Concept */}
                <ConceptCard
                  concept={concept}
                  details={details}
                  showAnnotations={showAnnotations}
                  isSelected={true}
                />

                {/* Compare Concept Selector or Card */}
                {compareConcept && compareDetails ? (
                  <ConceptCard
                    concept={compareConcept}
                    details={compareDetails}
                    showAnnotations={false}
                    onSelect={() => setCompareConceptId(null)}
                  />
                ) : (
                  <div className="bg-white rounded-xl border-2 border-dashed border-neutral-200 p-8 flex flex-col items-center justify-center min-h-[500px]">
                    <GitCompare className="w-8 h-8 text-neutral-300 mb-4" />
                    <p className="text-neutral-500 mb-4">Select a concept to compare</p>
                    <div className="grid grid-cols-2 gap-3">
                      {creativeConcepts
                        .filter(c => c.id !== conceptId)
                        .map(c => (
                          <button
                            key={c.id}
                            onClick={() => setCompareConceptId(c.id)}
                            className="px-4 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-lg"
                          >
                            {c.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Agent Recommendation */}
                {compareConcept && (
                  <div className="col-span-2 bg-[#86BC24]/5 border border-[#86BC24]/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#86BC24]" />
                      <span className="text-sm font-medium text-[#86BC24]">Agent Recommendation</span>
                    </div>
                    <p className="text-sm text-neutral-700">
                      For March Madness specifically, I'd lean <strong>"{concept.name}"</strong> for digital and <strong>"{compareConcept.name}"</strong> for broadcast TV, based on channel-specific performance data.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Single Concept View */
              <div className="max-w-4xl mx-auto">
                <ConceptCard
                  concept={concept}
                  details={details}
                  showAnnotations={showAnnotations}
                  expanded={true}
                />
              </div>
            )}
          </div>

          {/* Right Rail - Context Panel */}
          <aside className="w-80 border-l border-neutral-100 bg-white flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {/* Concept Details */}
              <div className="px-5 py-4 border-b border-neutral-100">
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">Concept Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Status</span>
                    <span className="text-sm font-medium text-amber-600">Ready for review</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Created by</span>
                    <span className="text-sm text-neutral-700">Concept Generator Agent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Created</span>
                    <span className="text-sm text-neutral-700">Feb 3, 2025, 4:30pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Version</span>
                    <span className="text-sm text-neutral-700">1.0</span>
                  </div>
                </div>
              </div>

              {/* Inputs Used */}
              <div className="px-5 py-4 border-b border-neutral-100">
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">Inputs Used</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-700">Brief</p>
                      <p className="text-xs text-neutral-500">{details.inputs.brief}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-700">Audience</p>
                      <p className="text-xs text-neutral-500">{details.inputs.audience}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <History className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-700">References</p>
                      <p className="text-xs text-neutral-500">{details.inputs.references}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-neutral-700">Brand Guidelines</p>
                      <p className="text-xs text-neutral-500">{details.inputs.brandGuidelines}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent Assessment */}
              <div className="px-5 py-4 border-b border-neutral-100">
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">Agent Assessment</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-700">Brand Compliance</span>
                    <span className={cn(
                      'text-sm font-medium flex items-center gap-1',
                      details.brandCompliance.passed ? 'text-[#86BC24]' : 'text-red-500'
                    )}>
                      {details.brandCompliance.passed ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      {details.brandCompliance.passed ? 'Passed' : 'Issues'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 -mt-1 ml-0">
                    {details.brandCompliance.issues} issues found
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-700">Predicted Performance</span>
                    <span className={cn(
                      'text-sm font-medium flex items-center gap-1',
                      details.predictedPerformance.level === 'high' ? 'text-[#86BC24]' :
                      details.predictedPerformance.level === 'medium' ? 'text-amber-500' : 'text-red-500'
                    )}>
                      <TrendingUp className="w-4 h-4" />
                      {details.predictedPerformance.level === 'high' ? 'High' :
                       details.predictedPerformance.level === 'medium' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 -mt-1">
                    {details.predictedPerformance.confidence}% confidence based on similar campaigns
                  </p>

                  {details.riskFlags.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1 text-amber-600 mb-1">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Risk Flags</span>
                      </div>
                      {details.riskFlags.map((flag, i) => (
                        <p key={i} className="text-xs text-amber-600 ml-5">{flag}</p>
                      ))}
                    </div>
                  )}
                  {details.riskFlags.length === 0 && (
                    <div className="flex items-center gap-1 text-neutral-500">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">No risk flags</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Approval Status - Horizontal */}
              <div className="px-5 py-4 border-b border-neutral-100">
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">Approval Status</h3>
                <div className="flex flex-wrap gap-1">
                  {[
                    { name: 'Kenny', status: 'current' },
                    { name: 'Sarah', status: 'pending' },
                    { name: 'Lin', status: 'pending' },
                    { name: 'Legal', status: 'skipped' },
                  ].map((reviewer, index, arr) => (
                    <div key={reviewer.name} className="flex items-center">
                      <div className="flex flex-col items-center">
                        {reviewer.status === 'complete' ? (
                          <div className="w-6 h-6 rounded-full bg-[#86BC24] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        ) : reviewer.status === 'current' ? (
                          <div className="w-6 h-6 rounded-full border-2 border-[#86BC24] bg-[#86BC24]/10 flex items-center justify-center">
                            <span className="w-2 h-2 bg-[#86BC24] rounded-full" />
                          </div>
                        ) : reviewer.status === 'skipped' ? (
                          <div className="w-6 h-6 rounded-full border-2 border-neutral-200 bg-neutral-50 flex items-center justify-center">
                            <span className="text-[10px] text-neutral-400">—</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-neutral-200 bg-white" />
                        )}
                        <span
                          className={cn(
                            'text-[10px] mt-1 text-center leading-tight',
                            reviewer.status === 'current' && 'text-black font-medium',
                            reviewer.status === 'complete' && 'text-[#86BC24]',
                            reviewer.status === 'pending' && 'text-neutral-400',
                            reviewer.status === 'skipped' && 'text-neutral-300'
                          )}
                        >
                          {reviewer.name}
                        </span>
                      </div>
                      {index < arr.length - 1 && (
                        <div className={cn(
                          'w-4 h-0.5 mx-1 mt-[-12px]',
                          reviewer.status === 'complete' ? 'bg-[#86BC24]' : 'bg-neutral-200'
                        )} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-4">
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-[#86BC24] rounded-lg hover:bg-[#6B9A1D]">
                    Approve
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200">
                    Request Changes
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                    Reject
                  </button>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setCompareMode(true)}
                    className="w-full px-3 py-2 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center justify-center gap-2"
                  >
                    <GitCompare className="w-4 h-4" />
                    Compare to other concepts
                  </button>
                  <button className="w-full px-3 py-2 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Request variant
                  </button>
                  <button className="w-full px-3 py-2 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send to Lin for review
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Toggle */}
            <div className="border-t border-neutral-100">
              <button
                onClick={() => setChatExpanded(!chatExpanded)}
                className="w-full px-5 py-3 flex items-center justify-between hover:bg-neutral-50"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#86BC24]" />
                  <span className="text-sm font-medium">Chat with Agent</span>
                </div>
                <ChevronRight className={cn(
                  'w-4 h-4 text-neutral-400 transition-transform',
                  chatExpanded && 'rotate-90'
                )} />
              </button>

              {chatExpanded && (
                <div className="border-t border-neutral-100 h-80 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#86BC24] flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <div className="bg-neutral-100 rounded-lg rounded-tl-none px-3 py-2">
                        <p className="text-xs text-neutral-500 mb-1">Concept Generator Agent</p>
                        <p className="text-sm text-neutral-700">
                          I created "{concept.name}" based on the brief's emphasis on tournament excitement and Google's Q1 push for brand awareness among sports fans. Want me to walk through my creative decisions?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-neutral-100">
                    <div className="flex items-center gap-2 bg-neutral-50 rounded-lg px-3 py-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 bg-transparent text-sm outline-none"
                      />
                      <button className="text-neutral-400 hover:text-[#86BC24]">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Dotti Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#86BC24] rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-50"
      >
        <span className="w-3 h-3 bg-white rounded-full" />
      </button>

      <ChatPanelSlide
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context={`${concept.name} concept`}
      />
    </div>
  )
}

// Concept Card Component
function ConceptCard({
  concept,
  details,
  showAnnotations,
  expanded = false,
  isSelected,
  onSelect,
}: {
  concept: { id: string; name: string; description: string }
  details: typeof conceptDetails['concept-1']
  showAnnotations: boolean
  expanded?: boolean
  isSelected?: boolean
  onSelect?: () => void
}) {
  return (
    <div className={cn(
      'bg-white rounded-xl border overflow-hidden',
      isSelected ? 'border-[#86BC24]' : 'border-neutral-100'
    )}>
      {/* Hero Visual Placeholder */}
      <div className="relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-300 rounded-lg mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <p className="text-sm text-neutral-500">Hero Visual / Mockup</p>
          <p className="text-xs text-neutral-400">Click to expand</p>
        </div>

        {/* Annotation pins */}
        {showAnnotations && details.annotations.map(ann => (
          <div
            key={ann.id}
            className="absolute group"
            style={{ left: `${ann.position.x}%`, top: `${ann.position.y}%` }}
          >
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md',
              ann.isAgent ? 'bg-[#86BC24]' : 'bg-black'
            )}>
              <MessageSquare className="w-3 h-3 text-white" />
            </div>
            <div className="absolute left-8 top-0 w-64 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <p className="text-xs text-neutral-500 mb-1">{ann.author}</p>
              <p className="text-sm text-neutral-700">{ann.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-black mb-1">"{concept.name}"</h2>

        {expanded ? (
          <div className="space-y-5 mt-4">
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Strategic Angle</h4>
              <p className="text-sm text-neutral-700">{details.strategicAngle}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Key Message</h4>
              <p className="text-sm text-neutral-700 italic">{details.keyMessage}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Visual Direction</h4>
              <p className="text-sm text-neutral-700">{details.visualDirection}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Tone</h4>
              <div className="flex flex-wrap gap-2">
                {details.tone.map(t => (
                  <span key={t} className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Channels</h4>
              <div className="flex flex-wrap gap-2">
                {details.channels.map(c => (
                  <span key={c} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Assets Included</h4>
              <ul className="text-sm text-neutral-700 space-y-1">
                {details.assets.map(a => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-neutral-600">{details.strategicAngle}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Demo fit</span>
              <span className="text-neutral-700">18-34</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Predicted</span>
              <span className={cn(
                'font-medium',
                details.predictedPerformance.level === 'high' ? 'text-[#86BC24]' : 'text-amber-500'
              )}>
                {details.predictedPerformance.score}%
              </span>
            </div>
            {onSelect && (
              <button
                onClick={onSelect}
                className="w-full mt-2 px-3 py-2 text-sm text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200"
              >
                {isSelected ? 'Selected' : 'Select'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
