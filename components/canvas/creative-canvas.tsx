'use client'

import { useState } from 'react'
import { Check, Download, MessageCircle, Plus, RefreshCw, Share2, X, ZoomIn, ZoomOut, Columns, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { creativeConcepts, getAgent } from '@/lib/data'
import type { CreativeConcept } from '@/lib/types'

interface CreativeCanvasProps {
  concepts?: CreativeConcept[]
  onConceptSelect?: (concept: CreativeConcept) => void
  onApprove?: (conceptId: string) => void
  onReject?: (conceptId: string) => void
  onRequestRevision?: (conceptId: string) => void
}

export function CreativeCanvas({
  concepts = creativeConcepts,
  onConceptSelect,
  onApprove,
  onReject,
  onRequestRevision,
}: CreativeCanvasProps) {
  const [zoom, setZoom] = useState(100)
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [compareItems, setCompareItems] = useState<string[]>([])

  const handleConceptClick = (concept: CreativeConcept) => {
    if (compareMode) {
      setCompareItems(prev => {
        if (prev.includes(concept.id)) {
          return prev.filter(id => id !== concept.id)
        }
        if (prev.length >= 2) {
          return [prev[1], concept.id]
        }
        return [...prev, concept.id]
      })
    } else {
      setSelectedConcept(concept.id === selectedConcept ? null : concept.id)
      onConceptSelect?.(concept)
    }
  }

  const conceptColors = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-cyan-500',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
  ]

  return (
    <div className="h-full flex flex-col bg-stone-50">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-white">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-stone-500 w-12 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-stone-200 mx-2" />
          <button
            onClick={() => {
              setCompareMode(!compareMode)
              setCompareItems([])
            }}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors',
              compareMode
                ? 'bg-blue-100 text-blue-700'
                : 'text-stone-600 hover:text-stone-800 hover:bg-stone-100'
            )}
          >
            <Columns className="w-4 h-4" />
            Compare
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Add annotation
          </button>
          <button className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {compareMode && compareItems.length > 0 && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-200 flex items-center justify-between">
          <span className="text-sm text-blue-700">
            Select {2 - compareItems.length} more concept{compareItems.length === 0 ? 's' : ''} to compare
          </span>
          <button
            onClick={() => {
              setCompareMode(false)
              setCompareItems([])
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Canvas Content */}
      <div className="flex-1 overflow-auto p-6" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
        {/* Compare View */}
        {compareMode && compareItems.length === 2 ? (
          <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
            {compareItems.map((conceptId, i) => {
              const concept = concepts.find(c => c.id === conceptId)!
              return (
                <div key={conceptId} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  <div className={cn('h-64 bg-gradient-to-br', conceptColors[concepts.indexOf(concept)])} />
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-stone-900">{concept.name}</h3>
                    <p className="mt-2 text-sm text-stone-600">{concept.description}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => onApprove?.(concept.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => onRequestRevision?.(concept.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Revise
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
            {concepts.map((concept, i) => (
              <button
                key={concept.id}
                onClick={() => handleConceptClick(concept)}
                className={cn(
                  'bg-white rounded-xl border-2 overflow-hidden text-left transition-all',
                  selectedConcept === concept.id
                    ? 'border-blue-500 ring-4 ring-blue-100'
                    : compareItems.includes(concept.id)
                    ? 'border-blue-500 ring-2 ring-blue-100'
                    : 'border-stone-200 hover:border-stone-300 hover:shadow-md',
                  concept.status === 'approved' && 'border-green-500 ring-2 ring-green-100',
                  concept.status === 'rejected' && 'opacity-50'
                )}
              >
                {/* Concept Visual */}
                <div className={cn('h-48 bg-gradient-to-br relative', conceptColors[i])}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/80 text-xl font-medium">{concept.name}</span>
                  </div>
                  {concept.status === 'approved' && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {compareItems.includes(concept.id) && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                      {compareItems.indexOf(concept.id) + 1}
                    </div>
                  )}
                </div>

                {/* Concept Info */}
                <div className="p-5">
                  <h3 className="text-base font-medium text-stone-900">{concept.name}</h3>
                  <p className="mt-1 text-sm text-stone-500 line-clamp-2">{concept.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
                    <Bot className="w-3.5 h-3.5" />
                    Created by {getAgent(concept.createdBy)?.shortName || 'Agent'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Concept Panel */}
      {selectedConcept && !compareMode && (
        <div className="border-t border-stone-200 bg-white p-5">
          <div className="max-w-5xl mx-auto">
            {(() => {
              const concept = concepts.find(c => c.id === selectedConcept)!
              return (
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-stone-900">{concept.name}</h3>
                    <p className="mt-1 text-sm text-stone-600">{concept.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRequestRevision?.(concept.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Request revision
                    </button>
                    <button
                      onClick={() => onReject?.(concept.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => onApprove?.(concept.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
