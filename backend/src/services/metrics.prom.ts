// src/services/metrics.prom.ts
import { getCounters, getCurrentSse, getCurrentDriversAvailable } from './metrics.service'

type PromModule = {
  register: any
  collectDefaultMetrics: (opts?: any) => void
  Gauge: new (opts: any) => any
}

let prom: PromModule | null = null
try {
   
  // @ts-ignore - prom-client is optional at runtime
  prom = require('prom-client')
} catch {
  prom = null
}

let reg: any | null = null
let gauges: Record<string, any> | null = null
const APP_NAME = process.env.APP_NAME || process.env.SERVICE_NAME || 'taxi_api'

function ensurePromRegistry() {
  if (!prom) return
  if (!reg) {
    // Use default registry from prom-client
    reg = prom.register
    try {
      prom.collectDefaultMetrics()
    } catch {
      // ignore if already registered
    }
  }
  if (!gauges) {
    gauges = {
      matching_postgis: new prom.Gauge({ name: 'app_matching_postgis_total', help: 'Matches using PostGIS', labelNames: ['app'] }),
      matching_haversine: new prom.Gauge({ name: 'app_matching_haversine_total', help: 'Matches using Haversine fallback', labelNames: ['app'] }),
      matching_idle_fallback: new prom.Gauge({ name: 'app_matching_idle_fallback_total', help: 'Matches using idle fallback', labelNames: ['app'] }),
      sse_connections: new prom.Gauge({ name: 'app_sse_connections_total', help: 'Total SSE connections (lifetime count)', labelNames: ['app'] }),
      sse_connections_current: new prom.Gauge({ name: 'app_sse_connections_current', help: 'Current SSE connections', labelNames: ['app'] }),
      drivers_available_current: new prom.Gauge({ name: 'app_drivers_available_current', help: 'Current available drivers (IDLE & fresh location)', labelNames: ['app'] }),
      login_failures: new prom.Gauge({ name: 'app_login_failures_total', help: 'Total login failures', labelNames: ['app'] }),
      login_locked: new prom.Gauge({ name: 'app_login_locked_total', help: 'Total login locks triggered', labelNames: ['app'] }),
      session_revokes_total: new prom.Gauge({ name: 'app_session_revokes_total', help: 'Total session revocations', labelNames: ['app'] }),
      admin_trips_queries_total: new prom.Gauge({ name: 'app_admin_trips_queries_total', help: 'Total /admin/trips queries', labelNames: ['app'] }),
      admin_trips_csv_exports_total: new prom.Gauge({ name: 'app_admin_trips_csv_exports_total', help: 'Total /admin/trips CSV exports', labelNames: ['app'] }),
      admin_trips_report_queries_total: new prom.Gauge({ name: 'app_admin_trips_report_queries_total', help: 'Total /admin/trips/report queries', labelNames: ['app'] }),
      admin_trips_report_csv_exports_total: new prom.Gauge({ name: 'app_admin_trips_report_csv_exports_total', help: 'Total /admin/trips/report CSV exports', labelNames: ['app'] }),
    }
    for (const g of Object.values(gauges)) reg.registerMetric(g)
  }
}

export async function getMetricsText(): Promise<string> {
  const c = getCounters()
  if (!prom) {
    // Minimal Prometheus text exposition without prom-client
    const lines = [
      '# HELP app_matching_postgis_total Matches using PostGIS',
      '# TYPE app_matching_postgis_total gauge',
      `app_matching_postgis_total{app="${APP_NAME}"} ${c.matching_postgis ?? 0}`,
      '# HELP app_matching_haversine_total Matches using Haversine fallback',
      '# TYPE app_matching_haversine_total gauge',
      `app_matching_haversine_total{app="${APP_NAME}"} ${c.matching_haversine ?? 0}`,
      '# HELP app_matching_idle_fallback_total Matches using idle fallback',
      '# TYPE app_matching_idle_fallback_total gauge',
      `app_matching_idle_fallback_total{app="${APP_NAME}"} ${c.matching_idle_fallback ?? 0}`,
      '# HELP app_sse_connections_total Total SSE connections (lifetime count)',
      '# TYPE app_sse_connections_total gauge',
      `app_sse_connections_total{app="${APP_NAME}"} ${c.sse_connections ?? 0}`,
      '# HELP app_sse_connections_current Current SSE connections',
      '# TYPE app_sse_connections_current gauge',
      `app_sse_connections_current{app="${APP_NAME}"} ${getCurrentSse()}`,
      '# HELP app_drivers_available_current Current available drivers (IDLE & fresh location)',
      '# TYPE app_drivers_available_current gauge',
      `app_drivers_available_current{app="${APP_NAME}"} ${getCurrentDriversAvailable()}`,
      '# HELP app_login_failures_total Total login failures',
      '# TYPE app_login_failures_total gauge',
      `app_login_failures_total{app=\"${APP_NAME}\"} ${c.login_failures ?? 0}`,
      '# HELP app_login_locked_total Total login locks triggered',
      '# TYPE app_login_locked_total gauge',
      `app_login_locked_total{app=\"${APP_NAME}\"} ${c.login_locked ?? 0}`,
      '# HELP app_session_revokes_total Total session revocations',
      '# TYPE app_session_revokes_total gauge',
      `app_session_revokes_total{app=\"${APP_NAME}\"} ${c.session_revokes_total ?? 0}`,
      '# HELP app_admin_trips_queries_total Total /admin/trips queries',
      '# TYPE app_admin_trips_queries_total gauge',
      `app_admin_trips_queries_total{app=\"${APP_NAME}\"} ${c.admin_trips_queries_total ?? 0}`,
      '# HELP app_admin_trips_csv_exports_total Total /admin/trips CSV exports',
      '# TYPE app_admin_trips_csv_exports_total gauge',
      `app_admin_trips_csv_exports_total{app=\"${APP_NAME}\"} ${c.admin_trips_csv_exports_total ?? 0}`,
      '# HELP app_admin_trips_report_queries_total Total /admin/trips/report queries',
      '# TYPE app_admin_trips_report_queries_total gauge',
      `app_admin_trips_report_queries_total{app=\"${APP_NAME}\"} ${c.admin_trips_report_queries_total ?? 0}`,
      '# HELP app_admin_trips_report_csv_exports_total Total /admin/trips/report CSV exports',
      '# TYPE app_admin_trips_report_csv_exports_total gauge',
      `app_admin_trips_report_csv_exports_total{app=\"${APP_NAME}\"} ${c.admin_trips_report_csv_exports_total ?? 0}`,
    ]
    return lines.join('\n') + '\n'
  }

  ensurePromRegistry()
  if (gauges) {
    gauges.matching_postgis.labels(APP_NAME).set(c.matching_postgis ?? 0)
    gauges.matching_haversine.labels(APP_NAME).set(c.matching_haversine ?? 0)
    gauges.matching_idle_fallback.labels(APP_NAME).set(c.matching_idle_fallback ?? 0)
    gauges.sse_connections.labels(APP_NAME).set(c.sse_connections ?? 0)
    gauges.sse_connections_current.labels(APP_NAME).set(getCurrentSse())
    gauges.drivers_available_current.labels(APP_NAME).set(getCurrentDriversAvailable())
    gauges.login_failures.labels(APP_NAME).set(c.login_failures ?? 0)
    gauges.login_locked.labels(APP_NAME).set(c.login_locked ?? 0)
    gauges.session_revokes_total.labels(APP_NAME).set(c.session_revokes_total ?? 0)
    gauges.admin_trips_queries_total.labels(APP_NAME).set(c.admin_trips_queries_total ?? 0)
    gauges.admin_trips_csv_exports_total.labels(APP_NAME).set(c.admin_trips_csv_exports_total ?? 0)
    gauges.admin_trips_report_queries_total.labels(APP_NAME).set(c.admin_trips_report_queries_total ?? 0)
    gauges.admin_trips_report_csv_exports_total.labels(APP_NAME).set(c.admin_trips_report_csv_exports_total ?? 0)
  }
  try {
    return await reg.metrics()
  } catch {
    // Fallback: simple text
    return `app_matching_postgis_total ${c.matching_postgis ?? 0}`
  }
}
