API Docs and SDKs
- OpenAPI JSON: backend/docs/openapi.json
- Dart SDK (dart-dio): backend/docs/dart-sdk
- TypeScript SDK (axios): backend/docs/ts-sdk

Refresh OpenAPI and regenerate SDKs
- From backend/ (API running on the same host):
  - Export OpenAPI: `npm run openapi:export`
  - Regenerate SDKs (requires Docker): `npm run openapi:refresh-sdk`

Use in Flutter (path dependency)
In your Flutter app `pubspec.yaml`:

dependencies:
  taxi_openapi:
    path: ../backend/docs/dart-sdk

Initialize and set bearer token:
import 'package:taxi_openapi/taxi_openapi.dart';
final sdk = TaxiOpenapi();
sdk.dio.options.baseUrl = 'http://localhost:8080';
// Set bearer for the named scheme 'bearerAuth'
sdk.setBearerAuth('bearerAuth', '<token>');

Use in TypeScript (web/admin)
import { Configuration, AuthApi } from '../backend/docs/ts-sdk';
const cfg = new Configuration({ basePath: 'http://localhost:8080' });
const auth = new AuthApi(cfg);
// set header per request or via axios interceptors

Notes
- The generator assigned operationIds where not specified; weâ€™re adding explicit ones incrementally.
- If you change routes/schemas, re-export and regenerate SDKs.

Smoke Tests and Local Setup
- .env essentials (backend/.env)
  - `PORT=8080`
  - `DATABASE_URL=postgresql://taxi:taxi123@localhost:55432/taxi_app`
  - `JWT_SECRET=changeme-supersecret`
  - `JWT_EXPIRES_IN=15m` (short access token lifetime)
  - `REFRESH_TOKEN_TTL_DAYS=30` (refresh token lifetime)
  - `STRIPE_SECRET_KEY=sk_test_xxx` (optional for Stripe smokes)
  - `STRIPE_WEBHOOK_SECRET=whsec_xxx` (optional for webhook)
  - `CORS_ORIGIN=http://localhost:3000,http://localhost:8081`
  - `METRICS_PUBLIC=true` (or `false` + `METRICS_TOKEN=token`)
- Start services with Docker
  - DB/Redis: `docker compose up -d db redis`
  - API (prod): `docker compose --profile prod up -d api`
  - API (dev, hot-reload): `docker compose --profile dev up -d api-dev`
- Dev seed (demo users)
  - `cd backend && npm run bootstrap`
  - Users: admin@taxi.local, driver@taxi.local, rider@taxi.local (pwd: 123456)
- Available smokes (from backend/)
  - `npm run smoke:refund-cash` â†’ Creates CASH/PAID payment, refunds it and validates receipt/CSV.
  - `npm run smoke:stripe-capture-refund` â†’ Creates Stripe manual intent, captures (ADMIN) and refunds (ADMIN). Requires `STRIPE_SECRET_KEY`.
  - `npm run smoke:stripe-cancel-auth` â†’ Cancels Stripe authorization (no capture) via ADMIN endpoint. Requires `STRIPE_SECRET_KEY`.
  - `npm run smoke:stripe-webhook` â†’ Verifies invalid-signature handling or missing webhook route.
  - `npm run smoke:trip-sse` â†’ Connects to trip SSE and prints events.
  - `npm run smoke:cancel-fee` â†’ Simulates cancellation with fee logic.

Metrics (Prometheus/Grafana)
- Scrape: `GET /admin/metrics` (ADMIN) or `GET /metrics` with `x-metrics-token` if configured.
- Optional monitor profile: `docker compose --profile monitor up -d`


