"use client"
import React from 'react'

type LatLng = { lat: number, lng: number }
type TripPoint = { id: string, origin?: LatLng | null, destination?: LatLng | null }
type DriverPoint = { id: string, pos?: LatLng | null, status?: string }

type Props = {
  trips: TripPoint[]
  drivers: DriverPoint[]
  height?: number
  onSelect?: (sel: { type: 'trip'|'driver', id: string }) => void
  selected?: { type: 'trip'|'driver', id: string } | null
  follow?: boolean
  center?: { lat: number, lng: number, zoom?: number } | null
  bounds?: { sw: { lat: number, lng: number }, ne: { lat: number, lng: number } } | null
}

export default function OpsMap(props: Props) {
  const { trips, drivers, height = 520, onSelect, selected, follow, center, bounds } = props
  const ref = React.useRef<HTMLDivElement | null>(null)
  const mapRef = React.useRef<any>(null)
  const tripLayersRef = React.useRef<any[]>([])
  const driverMarkersRef = React.useRef<Map<string, any>>(new Map())
  const rectRef = React.useRef<any>(null)
  const selectedRingRef = React.useRef<any>(null)

  React.useEffect(() => {
    let cancelled = false
    const ensureLeaflet = () => new Promise<void>((resolve) => {
      const L = (window as any).L
      if (L) { resolve(); return }
      const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link)
      const s = document.createElement('script'); s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.defer = true; s.onload = () => resolve(); document.body.appendChild(s)
    })
    ;(async () => { await ensureLeaflet(); if (cancelled) return; initMap() })()
    return () => { cancelled = true }
  }, [])

  React.useEffect(() => { if (mapRef.current) { renderTrips(); fitOrCenter() } }, [JSON.stringify(trips)])
  React.useEffect(() => { if (mapRef.current) { renderDrivers() } }, [JSON.stringify(drivers)])
  React.useEffect(() => { if (mapRef.current) { maybeFollow() } }, [JSON.stringify(selected), JSON.stringify(trips), JSON.stringify(drivers), follow])
  React.useEffect(() => {
    const L = (window as any).L; const map = mapRef.current; if (!L || !map) return
    if (selectedRingRef.current) { try { map.removeLayer(selectedRingRef.current) } catch {} selectedRingRef.current = null }
    if (!selected) return
    let target: any = null
    if (selected.type === 'driver') {
      const d = drivers.find(x => x.id === selected.id)
      if (d && d.pos && isFinite((d.pos as any).lat) && isFinite((d.pos as any).lng)) target = d.pos
    } else {
      const t = trips.find(x => x.id === selected.id)
      if (t) target = (t.origin && isFinite((t.origin as any).lat) && isFinite((t.origin as any).lng)) ? t.origin : t.destination
    }
    if (target) {
      selectedRingRef.current = L.circleMarker([target.lat, target.lng], { radius: 14, color: '#f59e0b', weight: 3, fill: false })
      selectedRingRef.current.addTo(map)
    }
  }, [JSON.stringify(selected), JSON.stringify(trips), JSON.stringify(drivers)])

  React.useEffect(() => {
    fitOrCenter()
  }, [JSON.stringify(bounds), center && center.lat, center && center.lng, center && center.zoom])

  function initMap() {
    const L = (window as any).L
    if (!L || !ref.current) return
    if (!mapRef.current) {
      const map = L.map(ref.current, { zoomControl: true })
      map.setView([0, 0], 2)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map)
      mapRef.current = map
    }
  }

  function renderTrips() {
    const L = (window as any).L; const map = mapRef.current; if (!L || !map) return
    for (const l of tripLayersRef.current) { try { map.removeLayer(l) } catch {} }
    tripLayersRef.current = []
    for (const t of trips) {
      if (t.origin && isFinite((t.origin as any).lat) && isFinite((t.origin as any).lng)) {
        const m = L.circleMarker([t.origin.lat, t.origin.lng], { radius: 6, color: '#22c55e', weight: 2 })
        m.on('click', () => onSelect && onSelect({ type: 'trip', id: t.id }))
        m.addTo(map); tripLayersRef.current.push(m)
      }
      if (t.destination && isFinite((t.destination as any).lat) && isFinite((t.destination as any).lng)) {
        const m = L.circleMarker([t.destination.lat, t.destination.lng], { radius: 6, color: '#ef4444', weight: 2 })
        m.on('click', () => onSelect && onSelect({ type: 'trip', id: t.id }))
        m.addTo(map); tripLayersRef.current.push(m)
      }
    }
  }

  function renderDrivers() {
    const L = (window as any).L; const map = mapRef.current; if (!L || !map) return
    const seen = new Set<string>()
    for (const d of drivers) {
      seen.add(d.id)
      const pos = d.pos
      let marker = driverMarkersRef.current.get(d.id)
      if (!pos || !isFinite((pos as any).lat) || !isFinite((pos as any).lng)) {
        if (marker) { try { map.removeLayer(marker) } catch {}; driverMarkersRef.current.delete(d.id) }
        continue
      }
      const color = d.status === 'ON_TRIP' ? '#4f46e5' : '#9aa4b2'
      if (!marker) {
        marker = L.circleMarker([pos.lat, pos.lng], { radius: 5, color, weight: 2 })
        marker.on('click', () => onSelect && onSelect({ type: 'driver', id: d.id }))
        marker.addTo(map)
        driverMarkersRef.current.set(d.id, marker)
      } else {
        marker.setStyle({ color })
        marker.setLatLng([pos.lat, pos.lng])
      }
    }
    for (const [id, m] of Array.from(driverMarkersRef.current.entries())) {
      if (!seen.has(id)) { try { map.removeLayer(m) } catch {}; driverMarkersRef.current.delete(id) }
    }
  }

  function maybeFollow() {
    if (!follow || !selected || !mapRef.current) return
    let target: LatLng | null = null
    if (selected.type === 'driver') {
      const d = drivers.find(x => x.id === selected.id)
      if (d && d.pos) target = d.pos
    } else {
      const t = trips.find(x => x.id === selected.id)
      if (t) target = t.origin || t.destination || null
    }
    if (target) mapRef.current.setView([target.lat, target.lng], Math.max(13, mapRef.current.getZoom() || 13), { animate: true })
  }

  function fitOrCenter() {
    const map = mapRef.current; const L = (window as any).L; if (!map || !L) return
    if (rectRef.current) { try { map.removeLayer(rectRef.current) } catch {} rectRef.current = null }
    if (bounds) {
      const b = L.latLngBounds([[bounds.sw.lat, bounds.sw.lng], [bounds.ne.lat, bounds.ne.lng]])
      rectRef.current = L.rectangle(b, { color: '#eab308', weight: 2, fillOpacity: 0.05 })
      rectRef.current.addTo(map)
      map.fitBounds(b.pad(0.1), { maxZoom: 15 })
    } else if (center) {
      map.setView([center.lat, center.lng], center.zoom || Math.max(12, map.getZoom() || 12), { animate: true })
    }
  }

  return <div ref={ref} style={{ height }} />
}

