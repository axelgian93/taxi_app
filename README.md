# taxi_app

[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)
[![Release](https://github.com/OWNER/REPO/actions/workflows/release.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/release.yml)

taxi app test

Nota: reemplaza OWNER/REPO por el nombre real del repositorio en GitHub para que los badges funcionen.

## Monitor (Prometheus, Grafana, Alertmanager)

- Levantar monitoreo:
  - `docker compose --profile monitor up -d`

- Prometheus: `http://127.0.0.1:9090`
  - Target API: job `taxi_api` (usa `/metrics` con token Bearer en `prometheus.yml`).
  - Reglas: `infra/prometheus/alerts.yml` (p95 latencia global y pagos, y 4xx de webhook Stripe).

- Grafana: `http://127.0.0.1:3000` (admin/admin123)
  - Dashboards en `infra/grafana/provisioning`.

- Alertmanager: `http://127.0.0.1:9093`
  - Config: `infra/alertmanager/alertmanager.yml` (receiver ‘noop’ por defecto).
  - Para activar Slack/Email, edita la config y establece variables en `docker-compose.yml`.

## PostGIS (índice opcional)

- Si tu base tiene PostGIS habilitado, puedes crear un índice GiST para acelerar el matching geográfico:
  - Habilitar extensión (segura si ya existe):
    - Docker: `docker exec -it taxi_db psql -U taxi -d taxi_app -c "CREATE EXTENSION IF NOT EXISTS postgis;"`
  - Crear índice funcional (usa geography para metros):
    - Docker: `docker exec -i taxi_db psql -U taxi -d taxi_app < backend/scripts/postgis_create_gist_index.sql`
  - Nota: la app detecta PostGIS en runtime; si no está disponible, usa Haversine como fallback.
