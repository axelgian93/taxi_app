// src/services/events.service.ts
export type TripEvent = {
  type: 'ASSIGNED' | 'ACCEPTED' | 'ARRIVED' | 'STARTED' | 'COMPLETED' | 'CANCELED' | 'REASSIGNED' | 'INIT' | 'INFO'
  status?: string
  at: string
  data?: Record<string, unknown>
}

type Handler = (ev: TripEvent) => void
const subs = new Map<string, Set<Handler>>()

export function subscribeToTrip(tripId: string, handler: Handler): () => void {
  const set = subs.get(tripId) ?? new Set<Handler>()
  set.add(handler)
  subs.set(tripId, set)
  return () => {
    const s = subs.get(tripId)
    if (!s) return
    s.delete(handler)
    if (s.size === 0) subs.delete(tripId)
  }
}

export function publishTripEvent(tripId: string, ev: TripEvent): number {
  const s = subs.get(tripId)
  if (!s || s.size === 0) return 0
  for (const h of s) {
    try { h(ev) } catch {}
  }
  return s.size
}
