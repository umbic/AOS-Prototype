'use client'

import { useState } from 'react'
import { Download, MessageCircle, Plus, Share2, TrendingUp, TrendingDown, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { holidayMetrics, channelMetrics } from '@/lib/data'

interface Insight {
  id: string
  x: number
  y: number
  content: string
  agentId: string
  type: 'positive' | 'negative' | 'neutral'
}

const sampleInsights: Insight[] = [
  {
    id: '1',
    x: 75,
    y: 35,
    content: 'TikTok outperformed by 40% — worth exploring for March Madness',
    agentId: 'insights',
    type: 'positive',
  },
  {
    id: '2',
    x: 45,
    y: 60,
    content: 'Day 3 drop likely due to creative fatigue — see note',
    agentId: 'insights',
    type: 'negative',
  },
]

interface DataCanvasProps {
  onInsightClick?: (insight: Insight) => void
  onAddAnnotation?: () => void
}

export function DataCanvas({ onInsightClick, onAddAnnotation }: DataCanvasProps) {
  const [zoom, setZoom] = useState(100)
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)

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
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAddAnnotation}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
          >
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

      {/* Canvas Content */}
      <div className="flex-1 overflow-auto p-6" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
        <div className="max-w-5xl mx-auto space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {holidayMetrics.map((metric, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
                <div className="text-sm text-stone-500">{metric.label}</div>
                <div className="mt-1 text-3xl font-semibold text-stone-900">{metric.value}</div>
                {metric.change && (
                  <div className={cn(
                    'mt-2 flex items-center gap-1 text-sm',
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {metric.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>+{metric.change}%</span>
                    <span className="text-stone-400">{metric.changeLabel}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Channel Performance */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 relative">
            <h3 className="text-base font-medium text-stone-900 mb-4">Channel Performance</h3>
            <div className="space-y-4">
              {channelMetrics.map((channel, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 items-center py-3 border-b border-stone-100 last:border-0">
                  <div className="font-medium text-stone-900">{channel.channel}</div>
                  <div className="text-sm text-stone-600">{channel.spend}</div>
                  <div className="text-sm text-stone-600">{channel.reach}</div>
                  <div className="text-sm text-stone-600">{channel.ctr}</div>
                  <div className="text-sm text-stone-600">{channel.roas}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          channel.performance >= 100 ? 'bg-green-500' : channel.performance >= 80 ? 'bg-blue-500' : 'bg-amber-500'
                        )}
                        style={{ width: `${Math.min(100, channel.performance)}%` }}
                      />
                    </div>
                    <span className={cn(
                      'text-xs font-medium',
                      channel.performance >= 100 ? 'text-green-600' : 'text-stone-500'
                    )}>
                      {channel.performance}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Insight Markers */}
            {sampleInsights.map(insight => (
              <button
                key={insight.id}
                onClick={() => {
                  setSelectedInsight(insight.id === selectedInsight ? null : insight.id)
                  onInsightClick?.(insight)
                }}
                className={cn(
                  'absolute w-6 h-6 rounded-full flex items-center justify-center transition-all',
                  insight.type === 'positive' ? 'bg-green-500' : insight.type === 'negative' ? 'bg-amber-500' : 'bg-blue-500',
                  selectedInsight === insight.id && 'ring-4 ring-offset-2',
                  insight.type === 'positive' ? 'ring-green-200' : insight.type === 'negative' ? 'ring-amber-200' : 'ring-blue-200'
                )}
                style={{ left: `${insight.x}%`, top: `${insight.y}%` }}
              >
                <AlertCircle className="w-3.5 h-3.5 text-white" />
              </button>
            ))}
          </div>

          {/* Performance Timeline */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <h3 className="text-base font-medium text-stone-900 mb-4">Performance Over Time</h3>
            <div className="h-48 flex items-end gap-2">
              {Array.from({ length: 14 }).map((_, i) => {
                const height = Math.random() * 60 + 40
                const isDay3 = i === 2
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className={cn(
                        'w-full rounded-t-sm',
                        isDay3 ? 'bg-amber-300' : 'bg-blue-400'
                      )}
                      style={{ height: `${height}%` }}
                    />
                    <span className="mt-2 text-xs text-stone-400">D{i + 1}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-blue-400" />
                Normal
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-amber-300" />
                Flagged
              </div>
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <h3 className="text-base font-medium text-stone-900 mb-4">Benchmark Comparison</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-xs text-stone-500 mb-2">vs. Previous Campaign</div>
                <div className="text-2xl font-semibold text-green-600">+18%</div>
                <div className="text-sm text-stone-500">Holiday 2023</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-stone-500 mb-2">vs. Industry Average</div>
                <div className="text-2xl font-semibold text-green-600">+24%</div>
                <div className="text-sm text-stone-500">Tech sector Q4</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-stone-500 mb-2">vs. Target</div>
                <div className="text-2xl font-semibold text-green-600">+14%</div>
                <div className="text-sm text-stone-500">3.2x vs 2.8x ROAS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Insight Panel */}
      {selectedInsight && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-stone-200 p-4 max-w-md">
          <div className="flex items-start gap-3">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
              sampleInsights.find(i => i.id === selectedInsight)?.type === 'positive'
                ? 'bg-green-100'
                : 'bg-amber-100'
            )}>
              <AlertCircle className={cn(
                'w-4 h-4',
                sampleInsights.find(i => i.id === selectedInsight)?.type === 'positive'
                  ? 'text-green-600'
                  : 'text-amber-600'
              )} />
            </div>
            <div>
              <div className="text-xs text-stone-500 mb-1">Insights Agent flagged:</div>
              <p className="text-sm text-stone-700">
                {sampleInsights.find(i => i.id === selectedInsight)?.content}
              </p>
            </div>
            <button
              onClick={() => setSelectedInsight(null)}
              className="p-1 text-stone-400 hover:text-stone-600"
            >
              &times;
            </button>
          </div>
          <button className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
            <MessageCircle className="w-4 h-4" />
            Chat with Insights Agent
          </button>
        </div>
      )}
    </div>
  )
}
