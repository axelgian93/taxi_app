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

- Grafana: `http://127.0.0.1:3100` (admin/admin123)
  - Dashboards en `infra/grafana/provisioning`.

- Alertmanager: `http://127.0.0.1:9093`
  - Config: `infra/alertmanager/alertmanager.yml` (receiver ‘noop’ por defecto).
  - Para activar Slack/Email, edita la config y establece variables en `docker-compose.yml`.

## Mobile Quickstart (Rider / Driver)

- Rider (Flutter)
  - `cd mobile-rider && flutter pub get && flutter run -d <device>`
  - Base URL por plataforma: Android emu `http://10.0.2.2:8081`, iOS sim `http://127.0.0.1:8081` (dev).
  - Android SDK path: copia `mobile-rider/android/local.properties.example` a `mobile-rider/android/local.properties` y ajusta `sdk.dir` si ejecutas en Android.

- Driver (Flutter)
  - Crear nativos: `cd mobile-driver && flutter create .`
  - Android: copiar referencias desde `mobile-driver/android/AndroidManifest.example.xml` (permisos y meta-data de Maps), agregar API key.
  - Android SDK path: copia `mobile-driver/android/local.properties.example` a `mobile-driver/android/local.properties` y ajusta `sdk.dir`.
  - iOS: ver `mobile-driver/ios/Info.plist.example` y `ios/AppDelegate*.example`, ejecutar `dart run tool/check_ios_setup.dart`.
  - Ejecutar: `cd mobile-driver && flutter pub get && flutter run -d <device>`

- VS Code tasks
  - Abre el workspace y usa Tasks: `mobile-rider: dev`, `mobile-rider: dev (dart-define)`, `mobile-rider: dev flavor`, `mobile-rider: prod flavor`, `mobile-driver: create`, `mobile-driver: dev`, `mobile-driver: dev (dart-define)`, `mobile-driver: prod (dart-define)`, `mobile-driver: dev flavor`, `mobile-driver: prod flavor`, `mobile-driver: iOS check`.

- Makefile (opcional)
  - `make rider-dev`
  - `make rider-dev-define`
  - `make driver-create`
  - `make driver-dev`
  - `make driver-dev-define`
  - `make driver-ios-check`


## PostGIS (índice opcional)

- Si tu base tiene PostGIS habilitado, puedes crear un índice GiST para acelerar el matching geográfico:
  - Habilitar extensión (segura si ya existe):
    - Docker: `docker exec -it taxi_db psql -U taxi -d taxi_app -c "CREATE EXTENSION IF NOT EXISTS postgis;"`
  - Crear índice funcional (usa geography para metros):
    - Docker: `docker exec -i taxi_db psql -U taxi -d taxi_app < backend/scripts/postgis_create_gist_index.sql`
  - Nota: la app detecta PostGIS en runtime; si no está disponible, usa Haversine como fallback.
