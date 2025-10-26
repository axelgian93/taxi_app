// src/services/metrics.service.ts
type CounterMap = Record<string, number>

const counters: CounterMap = {
  matching_postgis: 0,
  matching_haversine: 0,
  matching_idle_fallback: 0,
  sse_connections: 0,
}

export function incCounter(name: keyof typeof counters) {
  counters[name] = (counters[name] ?? 0) + 1
}

export function getCounters(): CounterMap {
  return { ...counters }
}

// Gauges (current values)
let currentSseConnections = 0
let currentDriversAvailable = 0

export function incCurrentSse() {
  currentSseConnections += 1
}

export function decCurrentSse() {
  currentSseConnections = Math.max(0, currentSseConnections - 1)
}

export function getCurrentSse(): number {
  return currentSseConnections
}

export function updateCurrentDriversAvailable(n: number) {
  currentDriversAvailable = n >= 0 ? Math.floor(n) : 0
}

export function getCurrentDriversAvailable(): number {
  return currentDriversAvailable
}
