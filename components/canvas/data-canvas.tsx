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
    <div className="h-full flex flex-col bg-neutral-50">
      {/* Toolbar - Deloitte minimal style */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-neutral-500 w-12 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAddAnnotation}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add annotation
          </button>
          <button className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-auto p-8" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
        <div className="max-w-5xl mx-auto space-y-8">
          {/* KPI Cards - Deloitte style */}
          <div className="grid grid-cols-4 gap-6">
            {holidayMetrics.map((metric, i) => (
              <div key={i} className="bg-white border border-neutral-200 p-6">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{metric.label}</div>
                <div className="mt-2 text-4xl font-semibold text-black">{metric.value}</div>
                {metric.change && (
                  <div className={cn(
                    'mt-3 flex items-center gap-1.5 text-sm font-medium',
                    metric.change > 0 ? 'text-deloitte-green' : 'text-black'
                  )}>
                    {metric.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>+{metric.change}%</span>
                    <span className="text-neutral-400 font-normal">{metric.changeLabel}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Channel Performance - Deloitte table style */}
          <div className="bg-white border border-neutral-200 p-8 relative">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">Channel Performance</h3>

            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 pb-3 border-b border-neutral-200 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              <div>Channel</div>
              <div>Spend</div>
              <div>Reach</div>
              <div>CTR</div>
              <div>ROAS</div>
              <div>Performance</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-neutral-100">
              {channelMetrics.map((channel, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 items-center py-4">
                  <div className="font-semibold text-black">{channel.channel}</div>
                  <div className="text-sm text-neutral-600">{channel.spend}</div>
                  <div className="text-sm text-neutral-600">{channel.reach}</div>
                  <div className="text-sm text-neutral-600">{channel.ctr}</div>
                  <div className="text-sm text-neutral-600">{channel.roas}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-neutral-200 overflow-hidden">
                      <div
                        className={cn(
                          'h-full',
                          channel.performance >= 100 ? 'bg-deloitte-green' : 'bg-black'
                        )}
                        style={{ width: `${Math.min(100, channel.performance)}%` }}
                      />
                    </div>
                    <span className={cn(
                      'text-xs font-semibold w-10',
                      channel.performance >= 100 ? 'text-deloitte-green' : 'text-neutral-500'
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
                  'absolute w-7 h-7 flex items-center justify-center transition-all',
                  insight.type === 'positive' ? 'bg-deloitte-green' : 'bg-black',
                  selectedInsight === insight.id && 'ring-4 ring-offset-2 ring-neutral-200'
                )}
                style={{ left: `${insight.x}%`, top: `${insight.y}%` }}
              >
                <AlertCircle className="w-4 h-4 text-white" />
              </button>
            ))}
          </div>

          {/* Performance Timeline */}
          <div className="bg-white border border-neutral-200 p-8">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">Performance Over Time</h3>
            <div className="h-48 flex items-end gap-2">
              {Array.from({ length: 14 }).map((_, i) => {
                const height = Math.random() * 60 + 40
                const isDay3 = i === 2
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className={cn(
                        'w-full',
                        isDay3 ? 'bg-neutral-300' : 'bg-deloitte-green'
                      )}
                      style={{ height: `${height}%` }}
                    />
                    <span className="mt-3 text-xs text-neutral-400">D{i + 1}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-deloitte-green" />
                <span className="text-neutral-500">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-neutral-300" />
                <span className="text-neutral-500">Flagged</span>
              </div>
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div className="bg-white border border-neutral-200 p-8">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">Benchmark Comparison</h3>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center border-r border-neutral-100 last:border-0">
                <div className="text-xs text-neutral-400 mb-2">vs. Previous Campaign</div>
                <div className="text-3xl font-semibold text-deloitte-green">+18%</div>
                <div className="text-sm text-neutral-500 mt-1">Holiday 2023</div>
              </div>
              <div className="text-center border-r border-neutral-100 last:border-0">
                <div className="text-xs text-neutral-400 mb-2">vs. Industry Average</div>
                <div className="text-3xl font-semibold text-deloitte-green">+24%</div>
                <div className="text-sm text-neutral-500 mt-1">Tech sector Q4</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-neutral-400 mb-2">vs. Target</div>
                <div className="text-3xl font-semibold text-deloitte-green">+14%</div>
                <div className="text-sm text-neutral-500 mt-1">3.2x vs 2.8x ROAS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Insight Panel */}
      {selectedInsight && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-elevated border border-neutral-200 p-5 max-w-md">
          <div className="flex items-start gap-4">
            <div className={cn(
              'w-10 h-10 flex items-center justify-center flex-shrink-0',
              sampleInsights.find(i => i.id === selectedInsight)?.type === 'positive'
                ? 'bg-deloitte-green'
                : 'bg-black'
            )}>
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-1">Insights Agent</div>
              <p className="text-sm text-neutral-700">
                {sampleInsights.find(i => i.id === selectedInsight)?.content}
              </p>
            </div>
            <button
              onClick={() => setSelectedInsight(null)}
              className="text-neutral-400 hover:text-black text-lg font-light"
            >
              &times;
            </button>
          </div>
          <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-deloitte-green hover:text-deloitte-green-dark transition-colors">
            <MessageCircle className="w-4 h-4" />
            Chat with Insights Agent
          </button>
        </div>
      )}
    </div>
  )
}
