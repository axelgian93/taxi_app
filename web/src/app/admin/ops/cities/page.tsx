'use client'
import { useEffect, useState } from 'react'
import { getValidToken } from '@/src/lib/auth'
import { useToast } from '@/src/components/Toast'

type City = { key: string, name: string, center: { lat: number, lng: number }, zoom?: number, bounds?: { sw: { lat: number, lng: number }, ne: { lat: number, lng: number } } }

export default function CitiesPage() {
  const { show } = useToast()
  const [items, setItems] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [form, setForm] = useState<City>({ key: '', name: '', center: { lat: 0, lng: 0 }, zoom: 12, bounds: undefined as any })
  const [editing, setEditing] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<City | null>(null)

  useEffect(() => { refresh() }, [])

  async function refresh() {
    setLoading(true); setError(null)
    const token = getValidToken(); if (!token) { location.href = '/login'; return }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/admin/ops/cities`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const body = await res.json()
      setItems(Array.isArray(body.items) ? body.items : [])
    } catch (e: any) { setError(e?.message || 'Error al cargar') } finally { setLoading(false) }
  }

  async function addCity() {
    setError(null); setNotice(null)
    // Client-side validation
    if (!form.key.trim() || !form.name.trim()) { setError('Key y Nombre son obligatorios'); return }
    if (form.center.lat < -90 || form.center.lat > 90 || form.center.lng < -180 || form.center.lng > 180) { setError('Centro fuera de rango (-90..90, -180..180)'); return }
    if ((form.zoom ?? 12) < 1 || (form.zoom ?? 12) > 20) { setError('Zoom fuera de rango (1..20)'); return }
    const token = getValidToken(); if (!token) { location.href = '/login'; return }
    try {
      const payload: any = { key: form.key.trim().toLowerCase(), name: form.name.trim(), center: { lat: Number(form.center.lat), lng: Number(form.center.lng) }, zoom: Number(form.zoom || 12) }
      if (form.bounds && (form.bounds as any).sw && (form.bounds as any).ne) {
        const b: any = form.bounds
        if (typeof b.sw.lat === 'number' && typeof b.sw.lng === 'number' && typeof b.ne.lat === 'number' && typeof b.ne.lng === 'number') {
          payload.bounds = { sw: { lat: Number(b.sw.lat), lng: Number(b.sw.lng) }, ne: { lat: Number(b.ne.lat), lng: Number(b.ne.lng) } }
        }
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/admin/ops/cities`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setForm({ key: '', name: '', center: { lat: 0, lng: 0 }, zoom: 12, bounds: undefined as any })
      await refresh()
      setNotice('Ciudad creada')
      show('Ciudad creada', 'success')
      setTimeout(() => setNotice(null), 2000)
    } catch (e: any) { setError(e?.message || 'Error al crear') }
  }

  async function removeCity(key: string) {
    if (!confirm('¿Eliminar ciudad?')) return
    const token = getValidToken(); if (!token) { location.href = '/login'; return }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/admin/ops/cities/${encodeURIComponent(key)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await refresh()
      setNotice('Ciudad eliminada')
      show('Ciudad eliminada', 'success')
      setTimeout(() => setNotice(null), 2000)
    } catch (e: any) { setError(e?.message || 'Error al eliminar') }
  }

  function startEdit(c: City) {
    setEditing(c.key)
    setEditForm({ ...c })
  }

  function cancelEdit() {
    setEditing(null)
    setEditForm(null)
  }

  async function saveEdit() {
    if (!editing || !editForm) return
    // Client-side validation
    if (!editForm.name.trim()) { setError('Nombre es obligatorio'); return }
    if (editForm.center.lat < -90 || editForm.center.lat > 90 || editForm.center.lng < -180 || editForm.center.lng > 180) { setError('Centro fuera de rango (-90..90, -180..180)'); return }
    if ((editForm.zoom ?? 12) < 1 || (editForm.zoom ?? 12) > 20) { setError('Zoom fuera de rango (1..20)'); return }
    const token = getValidToken(); if (!token) { location.href = '/login'; return }
    try {
      const payload: any = {}
      if (editForm.name) payload.name = editForm.name
      if (editForm.center && typeof editForm.center.lat === 'number' && typeof editForm.center.lng === 'number') payload.center = { lat: Number(editForm.center.lat), lng: Number(editForm.center.lng) }
      if (editForm.zoom != null) payload.zoom = Number(editForm.zoom)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/admin/ops/cities/${encodeURIComponent(editing)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setEditing(null)
      setEditForm(null)
      await refresh()
      setNotice('Ciudad actualizada')
      show('Ciudad actualizada', 'success')
      setTimeout(() => setNotice(null), 2000)
    } catch (e: any) { setError(e?.message || 'Error al actualizar') }
  }

  function useInOps(c: City) {
    const params = new URLSearchParams()
    params.set('city', c.name)
    if (c.bounds) {
      params.set('swLat', String(c.bounds.sw.lat))
      params.set('swLng', String(c.bounds.sw.lng))
      params.set('neLat', String(c.bounds.ne.lat))
      params.set('neLng', String(c.bounds.ne.lng))
    } else {
      params.set('centerLat', String(c.center.lat))
      params.set('centerLng', String(c.center.lng))
      if (c.zoom != null) params.set('centerZoom', String(c.zoom))
    }
    location.href = `/admin/ops?${params.toString()}`
  }

  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h2>Ciudades</h2>
        <a className="btn secondary" href="/admin/ops">Volver a Operaciones</a>
      </div>
      <div className="card" style={{marginTop:10}}>
        <div className="row" style={{gap:12, flexWrap:'wrap'}}>
          <label>
            <div className="muted">Key</div>
            <input value={form.key} onChange={e=>setForm({...form, key:e.target.value})} placeholder="guayaquil" />
          </label>
          <label>
            <div className="muted">Nombre</div>
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Guayaquil" />
          </label>
          <label>
            <div className="muted">Lat</div>
            <input type="number" step="0.000001" value={form.center.lat} onChange={e=>setForm({...form, center: { ...form.center, lat: Number(e.target.value) }})} />
          </label>
          <label>
            <div className="muted">Lng</div>
            <input type="number" step="0.000001" value={form.center.lng} onChange={e=>setForm({...form, center: { ...form.center, lng: Number(e.target.value) }})} />
          </label>
          <label>
            <div className="muted">Zoom</div>
            <input type="number" min="1" max="20" value={form.zoom || 12} onChange={e=>setForm({...form, zoom: Number(e.target.value)})} />
          </label>
          <div className="row" style={{gap:8, flexWrap:'wrap', alignItems:'flex-end'}}>
            <div className="muted" style={{width:'100%'}}>Bounds (opcional)</div>
            <label>
              <div className="muted">SW Lat</div>
              <input type="number" step="0.000001" value={form.bounds?.sw?.lat ?? ''} onChange={e=>setForm(v => ({ ...v, bounds: { ...(v.bounds || { sw:{lat:0,lng:0}, ne:{lat:0,lng:0} }), sw: { ...(v.bounds?.sw || {lat:0,lng:0}), lat: Number(e.target.value || 0) } } as any }))} />
            </label>
            <label>
              <div className="muted">SW Lng</div>
              <input type="number" step="0.000001" value={form.bounds?.sw?.lng ?? ''} onChange={e=>setForm(v => ({ ...v, bounds: { ...(v.bounds || { sw:{lat:0,lng:0}, ne:{lat:0,lng:0} }), sw: { ...(v.bounds?.sw || {lat:0,lng:0}), lng: Number(e.target.value || 0) } } as any }))} />
            </label>
            <label>
              <div className="muted">NE Lat</div>
              <input type="number" step="0.000001" value={form.bounds?.ne?.lat ?? ''} onChange={e=>setForm(v => ({ ...v, bounds: { ...(v.bounds || { sw:{lat:0,lng:0}, ne:{lat:0,lng:0} }), ne: { ...(v.bounds?.ne || {lat:0,lng:0}), lat: Number(e.target.value || 0) } } as any }))} />
            </label>
            <label>
              <div className="muted">NE Lng</div>
              <input type="number" step="0.000001" value={form.bounds?.ne?.lng ?? ''} onChange={e=>setForm(v => ({ ...v, bounds: { ...(v.bounds || { sw:{lat:0,lng:0}, ne:{lat:0,lng:0} }), ne: { ...(v.bounds?.ne || {lat:0,lng:0}), lng: Number(e.target.value || 0) } } as any }))} />
            </label>
          </div>
          <button className="btn" onClick={addCity}>Agregar</button>
        </div>
      </div>
      {error && <div style={{color:'var(--danger)', marginTop:10}}>{error}</div>}
      {notice && <div style={{color:'#22c55e', marginTop:10}}>{notice}</div>}
      {loading ? <div>Cargando…</div> : (
        <table className="table" style={{marginTop:12}}>
          <thead>
            <tr><th>Key</th><th>Nombre</th><th>Centro</th><th>Zoom</th><th>Bounds</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.key}>
                <td className="muted">{c.key}</td>
                {editing === c.key ? (
                  <>
                    <td><input value={editForm?.name || ''} onChange={e=>setEditForm(v => ({ ...(v as City), name: e.target.value }))} /></td>
                    <td className="row" style={{gap:6}}>
                      <input type="number" step="0.000001" value={editForm?.center.lat ?? 0} onChange={e=>setEditForm(v => ({ ...(v as City), center: { ...((v as City).center), lat: Number(e.target.value) } }))} />
                      <input type="number" step="0.000001" value={editForm?.center.lng ?? 0} onChange={e=>setEditForm(v => ({ ...(v as City), center: { ...((v as City).center), lng: Number(e.target.value) } }))} />
                    </td>
                    <td><input type="number" min={1} max={20} value={editForm?.zoom ?? 12} onChange={e=>setEditForm(v => ({ ...(v as City), zoom: Number(e.target.value) }))} /></td>
                    <td>
                      <div className="row" style={{gap:6, flexWrap:'wrap'}}>
                        <input placeholder="SW Lat" type="number" step="0.000001" value={editForm?.bounds?.sw?.lat ?? ''} onChange={e=>setEditForm(v => ({ ...(v as City), bounds: { ...(v as City).bounds || { sw:{lat:0,lng:0}, ne:{lat:0,lng:0} }, sw: { ...((v as City).bounds?.sw || {lat:0,lng:0}), lat: Number(e.target.value || 0) } } }))} />
                        <input placeholder="SW Lng" type="number" step="0.000001" value={editForm?.bounds?.sw?.lng ?? ''} onChange={e=>setEditForm(v => ({ ...(v as City), bounds: { ...(v as City).bounds || { sw:{lat:0,lng:0}, ne:{lat:0,lng:0} }, sw: { ...((v as City).bounds?.sw || {lat:0,lng:0}), lng: Number(e.target.value || 0) } } }))} />
                        <input placeholder="NE Lat" type="number" step="0.000001" value={editForm?.bounds?.ne?.lat ?? ''} onChange={e=>setEditForm(v => ({ ...(v as City), bounds: { ...(v as City).bounds || { sw:{lat:0,lng:0}, ne:{lat:0,lng:0} }, ne: { ...((v as City).bounds?.ne || {lat:0,lng:0}), lat: Number(e.target.value || 0) } } }))} />
                        <input placeholder="NE Lng" type="number" step="0.000001" value={editForm?.bounds?.ne?.lng ?? ''} onChange={e=>setEditForm(v => ({ ...(v as City), bounds: { ...(v as City).bounds || { sw:{lat:0,lng:0}, ne:{lat:0,lng:0} }, ne: { ...((v as City).bounds?.ne || {lat:0,lng:0}), lng: Number(e.target.value || 0) } } }))} />
                        <button className="btn secondary" onClick={() => setEditForm(v => (v ? { ...(v as City), bounds: null as any } : v))}>Quitar bounds</button>
                      </div>
                    </td>
                    <td className="row" style={{gap:6}}>
                      <button className="btn" onClick={saveEdit}>Guardar</button>
                      <button className="btn secondary" onClick={cancelEdit}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{c.name}</td>
                    <td className="muted">{c.center.lat}, {c.center.lng}</td>
                    <td className="muted">{c.zoom ?? '-'}</td>
                    <td className="muted">{c.bounds ? `${c.bounds.sw.lat},${c.bounds.sw.lng} — ${c.bounds.ne.lat},${c.bounds.ne.lng}` : '-'}</td>
                    <td className="row" style={{gap:6}}>
                      <button className="btn secondary" onClick={() => useInOps(c)}>Usar en Operaciones</button>
                      <button className="btn secondary" onClick={() => startEdit(c)}>Editar</button>
                      <button className="btn secondary" onClick={() => removeCity(c.key)}>Eliminar</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
