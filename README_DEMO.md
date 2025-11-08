Taxi App â€” GuÃ­a de Demo (Frontend + Backend)

Esta guÃ­a te lleva paso a paso para preparar una demostraciÃ³n funcional (endâ€‘toâ€‘end) de la Taxi App en tu mÃ¡quina local, incluyendo creaciÃ³n de datos de ejemplo, simulaciÃ³n de un viaje y visualizaciÃ³n en tiempo real.

Requisitos
- Docker y docker compose
- Puertos libres: `8080` (API), `3001` (Web), `55432` (Postgres), `3100` (Grafana)

Contenedores ya corriendo (importante)

Si ya tienes los contenedores corriendo en esta mÃ¡quina (API, Web y DB):
- No necesitas volver a ejecutar docker compose.
- Abre directamente la Web en `http://localhost:3001`.
- Usa el banner â€œModo Demoâ€ para crear/limpiar datos, y sigue el flujo sugerido mÃ¡s abajo.

Arranque de servicios

OpciÃ³n A â€” Desarrollo (hot reload) â€” si aÃºn no estÃ¡n corriendo:
- Inicia API (dev) + Web (dev):
  - `docker compose --profile dev up -d api-dev web-dev`
- Accesos:
  - Web: `http://localhost:3001`
  - API Swagger (dev expone en 8081->8080 interno): `http://localhost:8081/docs`

OpciÃ³n B â€” â€œProd localâ€ (build + standalone) â€” si aÃºn no estÃ¡n corriendo:
- Inicia API (prod) + Web (prod):
  - `docker compose --profile prod up -d --force-recreate api web`
- Accesos:
  - Web: `http://localhost:3001`
  - API Swagger: `http://localhost:8080/docs`

Nota CORS: ya se permiten llamadas desde `http://localhost:3001` (ver `backend/.env.docker:1`). Si cambias el host/puerto, ajusta `CORS_ORIGIN` y recrea la API.

Usuarios de demo (password: 123456)
- Admin: `admin@taxi.local`
- Rider: `rider@taxi.local`
- Drivers: `driver1@taxi.local`, `driver2@taxi.local`

Si no existen, actÃ­valos con el â€œModo Demoâ€ (banner) o el seeder (ver mÃ¡s abajo).

Modo Demo (recomendado para la presentaciÃ³n)
- â€œModo Demoâ€ aparece como banner en la parte superior de la Web.
- Al activarlo:
  - Ejecuta seeding de datos (usuarios, tarifa e histÃ³ricos) vÃ­a `POST /admin/demo/seed`.
  - Al cerrar/ocultar la pestaÃ±a, realiza limpieza (`POST /admin/demo/reset`).
  - TambiÃ©n puedes â€œReset ahoraâ€ desde el banner.

Flujo sugerido de demo

1) Dashboard Admin
- Ir a `http://localhost:3001/admin`.
- KPIs rÃ¡pidos y accesos directos.
- Botones â€œCrear viaje demo (Guayaquil/Quito/Cuenca)â€ abren el simulador con puntos preâ€‘cargados.

2) Simulador de viaje (Admin)
- Ruta: `http://localhost:3001/admin/demo`
- Si hace falta, pulsa â€œStart Demo (seed)â€.
- Para crear un viaje:
  - Elige Ciudad (ej. Guayaquil).
  - Click izquierdo en el mapa: Origen.
  - Click derecho (o Alt+click): Destino.
  - â€œSolicitar viajeâ€ (llama a `POST /trips/request`).
  - â€œAsignar driverâ€ si aÃºn no quedÃ³ ASSIGNED (endpoint de demo).
  - Avanza estados: â€œAceptarâ€ â†’ â€œLlegarâ€ â†’ â€œIniciarâ€ â†’ â€œCompletarâ€ (endpoint de demo).
  - SSE en vivo: eventos INIT/ACCEPTED/â€¦ y mapa con origen/destino.

3) Operaciones (Mapa tiempo real)
- Ruta: `http://localhost:3001/admin/ops`
- CaracterÃ­sticas:
  - SSE global (o Polling), filtros por estado, â€œSeguir seleccionadoâ€.
  - â€œCentrar ciudadâ€ usando lista de ciudades (`/admin/ops/cities`). Si la ciudad tiene bounds, dibuja rectÃ¡ngulo y encuadra.
  - BotÃ³n â€œAdministrar ciudadesâ€ â†’ CRUD bÃ¡sico (centro/zoom/bounds) en `http://localhost:3001/admin/ops/cities`.

4) Trips y Reportes
- Trips: `http://localhost:3001/admin/trips`
  - Filtros por estado/ciudad/fechas, paginaciÃ³n, export CSV.
- Reportes: `http://localhost:3001/admin/reports`
  - KPIs, grÃ¡fico principal con barras (monto) + lÃ­nea (count), comparativo (prev), y grÃ¡ficos por ciudad/mÃ©todo/dÃ­a. Export CSV.

Endpoints de demo (backend)
- `POST /admin/demo/seed` â€” crea usuarios/driver/tarifa y trips histÃ³ricos.
- `POST /admin/demo/reset` â€” limpia datos de la demo.
- `POST /admin/demo/trips/:id/assign-driver` â€” asigna un driver IDLE a un trip.
- `POST /admin/demo/trips/:id/advance` â€” avanza a `ACCEPTED|ARRIVED|STARTED|COMPLETED`.

Rutas clave del frontend
- Dashboard: `web/src/app/admin/page.tsx:1`
- Simulador: `web/src/app/admin/demo/page.tsx:1`
- Operaciones (mapa): `web/src/app/admin/ops/page.tsx:1`
- Ciudades (CRUD): `web/src/app/admin/ops/cities/page.tsx:1`
- Banner Modo Demo: `web/src/components/DemoBanner.tsx:1`

Notas tÃ©cnicas
- SSE: si tu red/proxy lo bloquea, cambia a Polling en los paneles.
- Puertos/URLs: Web estÃ¡ en `http://localhost:3001`; API en `http://localhost:8080` (prod) o `http://localhost:8081` (dev API dev tras proxy compose).
- Credenciales de demo se crean con el seeder y funcionan en toda la app.

Limpieza final
- Para cerrar servicios:
  - Dev: `docker compose --profile dev down`
  - Prod local: `docker compose --profile prod down`
- Para limpiar datos de demo sin tumbar servicios:
  - En la Web: â€œModo Demoâ€ â†’ â€œReset ahoraâ€, o
  - Backend: `POST /admin/demo/reset` con token Admin.

Â¡Listo! Con esto deberÃ­as poder presentar y ejecutar pruebas bÃ¡sicas con el cliente.

Diagnostico rapido (opcional)
- Ver contenedores: `docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"`
- Logs API: `docker logs -n 100 api` (o `api-dev`)
- Logs Web: `docker logs -n 100 web` (o `web-dev`)
- Salud API: `http://localhost:8080/health` (prod) o `http://localhost:8081/health` (dev)

