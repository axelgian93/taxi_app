'use client'
import React from 'react'

type Props = { height?: number|string, width?: number|string, style?: React.CSSProperties, className?: string }

export function SkeletonBlock({ height = 16, width = '100%', style, className }: Props) {
  return (
    <div className={className} style={{
      height, width,
      background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 37%, rgba(255,255,255,0.06) 63%)',
      backgroundSize: '400% 100%',
      animation: 'skeleton 1.2s ease-in-out infinite',
      borderRadius: 8,
      ...style,
    }} />
  )
}

export function SkeletonLines({ lines = 3 }: { lines?: number }) {
  return (
    <div className="row" style={{gap:8, flexDirection:'column'}}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock key={i} height={12} width={`${80 - i*8}%`} />
      ))}
    </div>
  )
}

export function SkeletonCard({ height = 180 }: { height?: number }) {
  return (
    <div className="card" style={{padding:12}}>
      <SkeletonBlock height={14} width={120} />
      <div style={{marginTop:10}}>
        <SkeletonBlock height={height} />
      </div>
    </div>
  )
}

// Inject keyframes once
if (typeof window !== 'undefined' && !document.getElementById('sk-keyframes')) {
  const style = document.createElement('style')
  style.id = 'sk-keyframes'
  style.innerHTML = `@keyframes skeleton { 0%{background-position:100% 50%} 100%{background-position:0 50%} }`
  document.head.appendChild(style)
}

