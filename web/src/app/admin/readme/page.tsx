'use client'
import Link from 'next/link'

export default function DemoReadmePage() {
  return (
    <div>
      <h2>Guía de Demo</h2>
      <p className="muted">Resumen de pasos. Ver también README_DEMO.md en el repo.</p>
      <div className="card">
        <strong>Si los contenedores ya están corriendo</strong>
        <ul>
          <li>Abre la web: http://localhost:3000</li>
          <li>Activa el “Modo Demo” en el banner para crear datos</li>
          <li>Panel: <Link href="/admin">/admin</Link> → usa accesos rápidos</li>
        </ul>
      </div>
      <div className="card" style={{marginTop:12}}>
        <strong>Flujo sugerido</strong>
        <ol>
          <li>Dashboard → “Crear viaje demo (Ciudad)”</li>
          <li>Simulador → Solicitar + Asignar + Aceptar/Llegar/Iniciar/Completar</li>
          <li>Operaciones → ver SSE en vivo</li>
          <li>Trips/Reportes → validar listados y agregados</li>
        </ol>
      </div>
      <div className="card" style={{marginTop:12}}>
        <strong>Enlaces útiles</strong>
        <ul>
          <li>Dashboard: <Link href="/admin">/admin</Link></li>
          <li>Simulador: <Link href="/admin/demo">/admin/demo</Link></li>
          <li>Operaciones: <Link href="/admin/ops">/admin/ops</Link></li>
          <li>Trips: <Link href="/admin/trips">/admin/trips</Link></li>
          <li>Reportes: <Link href="/admin/reports">/admin/reports</Link></li>
        </ul>
      </div>
      <div className="card" style={{marginTop:12}}>
        <strong>Archivo completo</strong>
        <p>Consulta el archivo <code>README_DEMO.md</code> en el repositorio para detalles.</p>
      </div>
    </div>
  )
}

