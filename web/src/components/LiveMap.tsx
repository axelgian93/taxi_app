'use client'
import React from 'react'

type LatLng = { lat: number, lng: number }

type Props = {
  origin?: LatLng | null
  destination?: LatLng | null
  driver?: LatLng | null
  height?: number
  controls?: boolean
}

export default function LiveMap({ origin, destination, driver, height = 320, controls = false }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const mapRef = React.useRef<any>(null)
  const markersRef = React.useRef<{ origin?: any, destination?: any, driver?: any }>({})
  const readyRef = React.useRef(false)

  React.useEffect(() => {
    let cancelled = false
    async function ensureLeaflet() {
      if ((window as any).L) return true
      await injectLeaflet()
      return !!(window as any).L
    }
    ensureLeaflet().then((ok) => {
      if (cancelled || !ok) return
      const L = (window as any).L
      if (!ref.current) return
      if (!mapRef.current) {
        const node = ref.current
        const map = L.map(node, { zoomControl: true })
        map.setView([0, 0], 2)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map)
        mapRef.current = map
      }
      readyRef.current = true
      updateMarkers()
      fitBounds()
    })
    return () => { cancelled = true }
  }, [])

  React.useEffect(() => { if (readyRef.current) { updateMarkers(); fitBounds() } }, [JSON.stringify(origin), JSON.stringify(destination)])
  React.useEffect(() => { if (readyRef.current) { updateMarkers() } }, [JSON.stringify(driver)])

  function updateMarkers() {
    const L = (window as any).L
    if (!L || !mapRef.current) return
    const map = mapRef.current
    const m = markersRef.current
    // Helpers to create colored circle markers
    const makeCircle = (pos: LatLng, color: string) => L.circleMarker([pos.lat, pos.lng], { radius: 8, color, weight: 2, fillColor: color, fillOpacity: 0.6 })

    // Origin
    if (origin && isFinite(origin.lat) && isFinite(origin.lng)) {
      if (!m.origin) { m.origin = makeCircle(origin, '#22c55e').addTo(map) } else { m.origin.setLatLng([origin.lat, origin.lng]) }
    } else if (m.origin) { map.removeLayer(m.origin); m.origin = undefined }

    // Destination
    if (destination && isFinite(destination.lat) && isFinite(destination.lng)) {
      if (!m.destination) { m.destination = makeCircle(destination, '#ef4444').addTo(map) } else { m.destination.setLatLng([destination.lat, destination.lng]) }
    } else if (m.destination) { map.removeLayer(m.destination); m.destination = undefined }

    // Driver
    if (driver && isFinite(driver.lat) && isFinite(driver.lng)) {
      if (!m.driver) { m.driver = makeCircle(driver, '#4f46e5').addTo(map) } else { m.driver.setLatLng([driver.lat, driver.lng]) }
    } else if (m.driver) { map.removeLayer(m.driver); m.driver = undefined }
  }

  function fitBounds() {
    const L = (window as any).L
    if (!L || !mapRef.current) return
    const pts: LatLng[] = []
    if (origin) pts.push(origin)
    if (destination) pts.push(destination)
    if (driver) pts.push(driver)
    if (pts.length === 0) return
    const b = L.latLngBounds(pts.map(p => [p.lat, p.lng]))
    mapRef.current.fitBounds(b.pad(0.25), { maxZoom: 16 })
  }

  return (
    <div style={{ position:'relative', width: '100%', height }}>
      <div ref={ref} style={{ width:'100%', height:'100%' }} />
      {controls && (
        <div style={{ position:'absolute', top:8, right:8, display:'flex', flexDirection:'column', gap:6 }}>
          <button className="btn secondary" aria-label="Centrar a origen" onClick={() => centerTo(origin)}>Origen</button>
          <button className="btn secondary" aria-label="Centrar a destino" onClick={() => centerTo(destination)}>Destino</button>
          <button className="btn secondary" aria-label="Centrar a conductor" onClick={() => centerTo(driver)}>Driver</button>
          <button className="btn secondary" aria-label="Encajar todo" onClick={() => fitBounds()}>Reencuadrar</button>
        </div>
      )}
    </div>
  )

  function centerTo(pos?: LatLng | null) {
    const L = (window as any).L
    if (!L || !mapRef.current || !pos || !isFinite(pos.lat) || !isFinite(pos.lng)) return
    mapRef.current.setView([pos.lat, pos.lng], Math.max(14, mapRef.current.getZoom() || 14), { animate: true })
  }
}

function injectLeaflet(): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.querySelector('link[data-leaflet]')
    const existingJs = document.querySelector('script[data-leaflet]')
    if (!existing) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.setAttribute('data-leaflet', '1')
      document.head.appendChild(link)
    }
    if (existingJs) { resolve(); return }
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.defer = true
    script.setAttribute('data-leaflet', '1')
    script.onload = () => resolve()
    script.onerror = () => resolve()
    document.body.appendChild(script)
  })
}
