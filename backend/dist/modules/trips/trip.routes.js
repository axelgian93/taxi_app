"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tripRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const events_service_1 = require("../../services/events.service");
const metrics_service_1 = require("../../services/metrics.service");
const pricing_service_1 = require("../../services/pricing.service");
const haversine_1 = require("../../utils/haversine");
const stripe_service_1 = require("../../services/stripe.service");
const trip_schemas_1 = require("./trip.schemas");
const push_service_1 = require("../../services/push.service");
async function tripRoutes(app) {
    const MATCH_RADIUS_M = Number(process.env.MATCH_RADIUS_M || 5000);
    const LOCATION_MAX_AGE_MIN = Number(process.env.LOCATION_MAX_AGE_MIN || 10);
    async function ensurePostgisFlag() {
        if (globalThis.__POSTGIS_AVAILABLE__ === undefined) {
            try {
                const chk = await prisma_1.default.$queryRaw `SELECT extname FROM pg_extension WHERE extname='postgis'`;
                globalThis.__POSTGIS_AVAILABLE__ = Array.isArray(chk) && chk.length > 0;
            }
            catch {
                ;
                globalThis.__POSTGIS_AVAILABLE__ = false;
            }
        }
    }
    async function findNearestDriver(pickupLat, pickupLng, maxAgeMin, radiusM) {
        await ensurePostgisFlag();
        if (globalThis.__POSTGIS_AVAILABLE__) {
            try {
                const nearest = await prisma_1.default.$queryRaw `
          SELECT dp."userId",
                 public.ST_Distance(
                   public.ST_SetSRID(public.ST_MakePoint(${pickupLng}, ${pickupLat}), 4326)::public.geography,
                   public.ST_SetSRID(public.ST_MakePoint(dp."currentLng", dp."currentLat"), 4326)::public.geography
                 ) AS meters
          FROM "DriverProfile" dp
          WHERE dp.status = 'IDLE'
            AND dp."currentLat" IS NOT NULL AND dp."currentLng" IS NOT NULL
            AND dp."locationUpdatedAt" IS NOT NULL
            AND dp."locationUpdatedAt" >= NOW() - (interval '1 minute' * ${maxAgeMin})
            AND public.ST_DWithin(
                public.ST_SetSRID(public.ST_MakePoint(${pickupLng}, ${pickupLat}), 4326)::public.geography,
                public.ST_SetSRID(public.ST_MakePoint(dp."currentLng", dp."currentLat"), 4326)::public.geography,
                ${radiusM}
            )
          ORDER BY meters ASC
          LIMIT 1
        `;
                if (nearest && nearest.length > 0)
                    return nearest[0].userId;
            }
            catch {
                // fallthrough to haversine
            }
        }
        const cutoff = new Date(Date.now() - maxAgeMin * 60 * 1000);
        const candidates = await prisma_1.default.driverProfile.findMany({
            where: { status: 'IDLE', currentLat: { not: null }, currentLng: { not: null }, locationUpdatedAt: { gte: cutoff } },
            select: { userId: true, currentLat: true, currentLng: true },
            take: 200,
            orderBy: { locationUpdatedAt: 'desc' }
        });
        let best = null;
        let bestDist = Number.POSITIVE_INFINITY;
        for (const c of candidates) {
            const dKm = (0, haversine_1.haversineKm)(pickupLat, pickupLng, Number(c.currentLat), Number(c.currentLng));
            if (dKm < bestDist) {
                bestDist = dKm;
                best = c.userId;
            }
        }
        return best;
    }
    // POST /trips/request â€” Rider creates a trip and assigns nearest driver
    app.post('/trips/request', {
        preHandler: [app.auth.verifyJWT],
        schema: {
            operationId: 'tripsRequest',
            summary: 'Solicitar viaje',
            description: 'Crea un viaje y asigna el conductor disponible mÃ¡s cercano.',
            tags: ['Trips'],
            body: trip_schemas_1.requestTripBody,
            response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ACCEPTED' } } }, 400: { ...trip_schemas_1.errorResponse, example: { error: 'Missing city' } }
            }
        }
    }, async (req, reply) => {
        const user = req.user;
        if (user.role !== 'RIDER' && user.role !== 'ADMIN')
            return reply.code(403).send({ error: 'Forbidden' });
        const b = (req.body || {});
        const required = ['city', 'pickupLat', 'pickupLng', 'dropoffLat', 'dropoffLng', 'distanceKm', 'durationMin'];
        for (const k of required) {
            if (b[k] === undefined || b[k] === null)
                return reply.code(400).send({ error: `Missing ${k}` });
        }
        const fare = await (0, pricing_service_1.computeFare)({ city: String(b.city), distanceKm: Number(b.distanceKm), durationMin: Number(b.durationMin) });
        const bestUserId = await findNearestDriver(Number(b.pickupLat), Number(b.pickupLng), LOCATION_MAX_AGE_MIN, MATCH_RADIUS_M);
        const trip = await prisma_1.default.trip.create({
            data: {
                riderId: user.id,
                driverId: bestUserId ?? null,
                status: (bestUserId ? 'ACCEPTED' : 'REQUESTED'),
                pickupLat: Number(b.pickupLat),
                pickupLng: Number(b.pickupLng),
                pickupAddress: b.pickupAddress ?? null,
                dropoffLat: Number(b.dropoffLat),
                dropoffLng: Number(b.dropoffLng),
                dropoffAddress: b.dropoffAddress ?? null,
                distanceKm: Number(b.distanceKm),
                durationMin: Number(b.durationMin) || null,
                pricingSnapshot: { city: String(b.city), fare, preferredMethod: b.preferredMethod ?? null },
                costUsd: Number(fare.totalUsd),
                currency: 'USD',
                acceptedAt: bestUserId ? new Date() : null
            }
        });
        if (bestUserId) {
            (0, events_service_1.publishTripEvent)(trip.id, { type: 'ASSIGNED', status: 'ACCEPTED', at: new Date().toISOString(), data: { driverId: bestUserId } });
            // Push notifications
            (0, push_service_1.sendPushToUser)(trip.riderId, { title: 'Conductor asignado', body: 'Se asignÃ³ un conductor a tu viaje.' });
            (0, push_service_1.sendPushToUser)(bestUserId, { title: 'Nuevo viaje asignado', body: 'Tienes un nuevo viaje por atender.' });
        }
        else {
            (0, events_service_1.publishTripEvent)(trip.id, { type: 'INIT', status: 'REQUESTED', at: new Date().toISOString() });
        }
        return reply.send({ ok: true, trip: { id: trip.id, status: trip.status } });
    });
    // POST /trips/:id/accept â€” Driver accepts assigned trip
    app.post('/trips/:id/accept', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsAccept', tags: ['Trips'], summary: 'Aceptar viaje', description: 'El conductor acepta el viaje asignado.', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ACCEPTED' } } }, 400: { ...trip_schemas_1.errorResponse, example: { error: 'Missing city' } }, 403: trip_schemas_1.errorResponse, 404: trip_schemas_1.errorResponse } } }, async (req, reply) => {
        const p = req.params;
        const id = p?.id || '';
        if (!id)
            return reply.code(400).send({ error: 'Invalid id' });
        const user = req.user;
        if (user.role !== 'DRIVER' && user.role !== 'ADMIN')
            return reply.code(403).send({ error: 'Forbidden' });
        const t = await prisma_1.default.trip.findUnique({ where: { id }, select: { id: true, status: true, driverId: true } });
        if (!t)
            return reply.code(404).send({ error: 'Trip not found' });
        if (t.driverId && t.driverId !== user.id && user.role !== 'ADMIN')
            return reply.code(403).send({ error: 'Not your trip' });
        const up = await prisma_1.default.trip.update({ where: { id }, data: { status: 'ACCEPTED', acceptedAt: new Date(), driverId: t.driverId ?? user.id } });
        (0, events_service_1.publishTripEvent)(id, { type: 'ACCEPTED', status: 'ACCEPTED', at: new Date().toISOString(), data: { driverId: up.driverId } });
        // Notify rider
        if (up.driverId)
            (0, push_service_1.sendPushToUser)((await prisma_1.default.trip.findUnique({ where: { id }, select: { riderId: true } })).riderId, { title: 'Conductor aceptÃ³', body: 'Tu conductor aceptÃ³ el viaje.' });
        return reply.send({ ok: true, trip: { id: up.id, status: up.status } });
    });
    // POST /trips/:id/arrived â€” Driver arrived at pickup
    app.post('/trips/:id/arrived', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsArrived', tags: ['Trips'], summary: 'Arribo del conductor', description: 'El conductor llega al punto de recogida.', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ACCEPTED' } } }, 400: { ...trip_schemas_1.errorResponse, example: { error: 'Missing city' } }, 403: trip_schemas_1.errorResponse, 404: trip_schemas_1.errorResponse } } }, async (req, reply) => {
        const id = req.params.id;
        const user = req.user;
        if (!id)
            return reply.code(400).send({ error: 'Invalid id' });
        if (user.role !== 'DRIVER' && user.role !== 'ADMIN')
            return reply.code(403).send({ error: 'Forbidden' });
        const t = await prisma_1.default.trip.findUnique({ where: { id }, select: { id: true, driverId: true } });
        if (!t)
            return reply.code(404).send({ error: 'Trip not found' });
        if (t.driverId && t.driverId !== user.id && user.role !== 'ADMIN')
            return reply.code(403).send({ error: 'Not your trip' });
        const up = await prisma_1.default.trip.update({ where: { id }, data: { status: 'ARRIVED', arrivedAt: new Date(), driverId: t.driverId ?? user.id } });
        (0, events_service_1.publishTripEvent)(id, { type: 'ARRIVED', status: 'ARRIVED', at: new Date().toISOString() });
        const tr = await prisma_1.default.trip.findUnique({ where: { id }, select: { riderId: true } });
        if (tr)
            (0, push_service_1.sendPushToUser)(tr.riderId, { title: 'Conductor llegÃ³', body: 'Tu conductor ha llegado al punto de recogida.' });
        return reply.send({ ok: true, trip: { id: up.id, status: up.status } });
    });
    // POST /trips/:id/start â€” Start trip, optionally preauthorize CARD
    app.post('/trips/:id/start', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsStart', tags: ['Trips'], summary: 'Iniciar viaje', description: 'Inicia el viaje; si method=CARD y Stripe estÃ¡ configurado, preautoriza.', body: { type: 'object', properties: { method: { type: 'string', enum: ['CASH', 'CARD'], default: 'CASH' } }, additionalProperties: false, example: { method: 'CASH' } }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ACCEPTED' } } }, 400: { ...trip_schemas_1.errorResponse, example: { error: 'Missing city' } }, 403: trip_schemas_1.errorResponse, 404: trip_schemas_1.errorResponse } } }, async (req, reply) => {
        const id = req.params.id;
        const { method } = (req.body || {});
        const payMethod = method || 'CASH';
        const user = req.user;
        if (!id)
            return reply.code(400).send({ error: 'Invalid id' });
        if (user.role !== 'DRIVER' && user.role !== 'ADMIN')
            return reply.code(403).send({ error: 'Forbidden' });
        const t = await prisma_1.default.trip.findUnique({ where: { id }, include: { payment: true, rider: true } });
        if (!t)
            return reply.code(404).send({ error: 'Trip not found' });
        // Preauth if CARD and Stripe configured
        if (payMethod === 'CARD' && !t.payment) {
            const stripe = (0, stripe_service_1.getStripe)();
            const rider = await prisma_1.default.user.findUnique({ where: { id: t.riderId }, select: { stripeCustomerId: true, stripeDefaultPaymentMethodId: true } });
            if (stripe && rider?.stripeCustomerId) {
                const amountCents = Math.max(1, Math.round(Number(t.costUsd || 0) * 100)) || 100;
                const intent = await stripe.paymentIntents.create({
                    amount: amountCents, currency: 'usd', capture_method: 'manual',
                    customer: rider.stripeCustomerId,
                    payment_method: rider.stripeDefaultPaymentMethodId || undefined,
                    confirm: Boolean(rider.stripeDefaultPaymentMethodId),
                    metadata: { tripId: id }
                });
                await prisma_1.default.payment.create({ data: { tripId: id, amountUsd: Number(t.costUsd || 0), status: 'AUTHORIZED', method: 'CARD', provider: 'Stripe', externalId: intent.id } });
            }
            else {
                await prisma_1.default.payment.create({ data: { tripId: id, amountUsd: Number(t.costUsd || 0), status: 'AUTHORIZED', method: 'CARD', provider: null, externalId: null } });
            }
        }
        else if (!t.payment && payMethod === 'CASH') {
            await prisma_1.default.payment.create({ data: { tripId: id, amountUsd: Number(t.costUsd || 0), status: 'PENDING', method: 'CASH', provider: null, externalId: null } });
        }
        const up = await prisma_1.default.trip.update({ where: { id }, data: { status: 'STARTED', startedAt: new Date() } });
        (0, events_service_1.publishTripEvent)(id, { type: 'STARTED', status: 'STARTED', at: new Date().toISOString() });
        const trS = await prisma_1.default.trip.findUnique({ where: { id }, select: { riderId: true } });
        if (trS)
            (0, push_service_1.sendPushToUser)(trS.riderId, { title: 'Viaje iniciado', body: 'Tu viaje ha comenzado.' });
        return reply.send({ ok: true, trip: { id: up.id, status: up.status } });
    });
    // POST /trips/:id/complete â€” Complete trip and settle payment
    app.post('/trips/:id/complete', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsComplete', tags: ['Trips'], summary: 'Completar viaje', description: 'Completa el viaje y liquida el pago (captura Stripe o marca CASH pagado).', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ACCEPTED' } } }, 400: { ...trip_schemas_1.errorResponse, example: { error: 'Missing city' } }, 403: trip_schemas_1.errorResponse, 404: trip_schemas_1.errorResponse } } }, async (req, reply) => {
        const id = req.params.id;
        const user = req.user;
        if (!id)
            return reply.code(400).send({ error: 'Invalid id' });
        if (user.role !== 'DRIVER' && user.role !== 'ADMIN')
            return reply.code(403).send({ error: 'Forbidden' });
        const t = await prisma_1.default.trip.findUnique({ where: { id }, include: { payment: true } });
        if (!t)
            return reply.code(404).send({ error: 'Trip not found' });
        // Capture if needed
        if (t.payment && t.payment.provider === 'Stripe' && t.payment.status === 'AUTHORIZED' && t.payment.externalId) {
            const stripe = (0, stripe_service_1.getStripe)();
            if (stripe) {
                const amountCents = Math.max(1, Math.round(Number(t.payment.amountUsd) * 100));
                try {
                    const cap = await stripe.paymentIntents.capture(t.payment.externalId, { amount_to_capture: amountCents });
                    await prisma_1.default.payment.update({ where: { tripId: id }, data: { status: cap.status === 'succeeded' ? 'PAID' : 'AUTHORIZED' } });
                }
                catch {
                    // leave as AUTHORIZED if capture fails; admin can retry
                }
            }
        }
        else if (t.payment && t.payment.method === 'CASH') {
            await prisma_1.default.payment.update({ where: { tripId: id }, data: { status: 'PAID' } });
        }
        const up = await prisma_1.default.trip.update({ where: { id }, data: { status: 'COMPLETED', completedAt: new Date() } });
        (0, events_service_1.publishTripEvent)(id, { type: 'COMPLETED', status: 'COMPLETED', at: new Date().toISOString() });
        const trC = await prisma_1.default.trip.findUnique({ where: { id }, select: { riderId: true, driverId: true } });
        if (trC) {
            (0, push_service_1.sendPushToUser)(trC.riderId, { title: 'Viaje completado', body: 'Gracias por viajar con nosotros.' });
            if (trC.driverId)
                (0, push_service_1.sendPushToUser)(trC.driverId, { title: 'Viaje completado', body: 'Has completado un viaje.' });
        }
        return reply.send({ ok: true, trip: { id: up.id, status: up.status } });
    });
    // POST /trips/:id/cancel â€” Rider cancels; may apply fee if ARRIVED or beyond grace
    app.post('/trips/:id/cancel', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsCancel', tags: ['Trips'], summary: 'Cancelar viaje (rider)', description: 'El rider cancela el viaje; puede aplicar fee segÃºn estado y reglas.', body: { type: 'object', properties: { reason: { type: 'string' } }, additionalProperties: false, example: { reason: 'CHANGED_MIND' } }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ACCEPTED' } } }, 400: { ...trip_schemas_1.errorResponse, example: { error: 'Missing city' } }, 403: trip_schemas_1.errorResponse, 404: trip_schemas_1.errorResponse } } }, async (req, reply) => {
        const id = req.params.id;
        const user = req.user;
        const { reason } = (req.body || {});
        if (!id)
            return reply.code(400).send({ error: 'Invalid id' });
        if (user.role !== 'RIDER' && user.role !== 'ADMIN')
            return reply.code(403).send({ error: 'Forbidden' });
        const t = await prisma_1.default.trip.findUnique({ where: { id }, select: { id: true, riderId: true, status: true, acceptedAt: true, arrivedAt: true, pricingSnapshot: true } });
        if (!t)
            return reply.code(404).send({ error: 'Trip not found' });
        if (user.role !== 'ADMIN' && t.riderId !== user.id)
            return reply.code(403).send({ error: 'Not your trip' });
        let fee = 0;
        // Determine fee by status
        const city = t.pricingSnapshot?.city || 'default';
        const rule = await prisma_1.default.tariffRule.findFirst({ where: { city, active: true }, orderBy: { updatedAt: 'desc' } });
        const graceSec = Number(rule?.cancellationGraceSec ?? process.env.CANCELLATION_FEE_GRACE_SEC ?? 120);
        if (t.status === 'ARRIVED') {
            fee = Number(rule?.cancellationFeeArrivedUsd ?? process.env.CANCELLATION_FEE_USD_ARRIVED ?? 2);
        }
        else if (t.status === 'ACCEPTED') {
            const ageSec = t.acceptedAt ? Math.floor((Date.now() - new Date(t.acceptedAt).getTime()) / 1000) : 0;
            if (ageSec > graceSec) {
                fee = Number(rule?.cancellationFeeAcceptedUsd ?? process.env.CANCELLATION_FEE_USD_ACCEPTED ?? 1);
            }
        }
        await prisma_1.default.trip.update({ where: { id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: reason || null } });
        if (fee > 0) {
            const existing = await prisma_1.default.payment.findUnique({ where: { tripId: id } });
            if (existing) {
                await prisma_1.default.payment.update({ where: { tripId: id }, data: { amountUsd: fee, status: 'PAID', method: 'CASH', provider: null, externalId: null } });
            }
            else {
                await prisma_1.default.payment.create({ data: { tripId: id, amountUsd: fee, status: 'PAID', method: 'CASH', provider: null, externalId: null } });
            }
        }
        (0, events_service_1.publishTripEvent)(id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: reason || 'RIDER_CANCEL' } });
        const trX = await prisma_1.default.trip.findUnique({ where: { id }, select: { driverId: true } });
        if (trX?.driverId)
            (0, push_service_1.sendPushToUser)(trX.driverId, { title: 'Viaje cancelado', body: 'El pasajero cancelÃ³ el viaje.' });
        return reply.send({ ok: true, trip: { id, status: 'CANCELED' } });
    });
    // GET /trips/:id/sse â€” Server-Sent Events stream for live trip updates
    app.get('/trips/:id/sse', {
        preHandler: [app.auth.verifyJWT],
        schema: {
            summary: 'Trip live updates (SSE)',
            description: 'Stream de eventos del viaje en tiempo real para Rider/Driver via Server-Sent Events. EnvÃ­a eventos como INIT/ASSIGNED/ACCEPTED/ARRIVED/STARTED/COMPLETED/CANCELED.',
            tags: ['Trips'],
            produces: ['text/event-stream'],
            response: {
                200: {
                    description: 'text/event-stream',
                    content: {
                        'text/event-stream': {
                            schema: { type: 'string', example: 'event: INIT\ndata: {"status":"ASSIGNED"}\n\n' }
                        }
                    }
                }
            }
        },
        handler: async (req, reply) => {
            const p = req.params;
            const id = (p && typeof p.id === 'string' ? p.id : '');
            if (!id)
                return reply.code(400).send({ error: 'Invalid id' });
            const trip = await prisma_1.default.trip.findUnique({ where: { id }, select: { id: true, status: true, riderId: true, driverId: true } });
            if (!trip)
                return reply.code(404).send({ error: 'Trip not found' });
            const u = req.user;
            if (u.role !== 'ADMIN' && u.id !== trip.riderId && u.id !== trip.driverId) {
                return reply.code(403).send({ error: 'Forbidden' });
            }
            reply.raw.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
            reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
            reply.raw.setHeader('Connection', 'keep-alive');
            // Disable proxy buffering (e.g., Nginx) if present
            reply.raw.setHeader('X-Accel-Buffering', 'no');
            // Flush headers early
            // @ts-ignore
            if (typeof reply.raw.flushHeaders === 'function')
                reply.raw.flushHeaders();
            const write = (chunk) => {
                try {
                    reply.raw.write(chunk);
                }
                catch { /* ignore broken pipe */ }
            };
            // Metrics
            (0, metrics_service_1.incCounter)('sse_connections');
            (0, metrics_service_1.incCurrentSse)();
            // Initial event (current status)
            write('event: INIT\n');
            write('data: ' + JSON.stringify({ status: trip.status, at: new Date().toISOString() }) + '\n\n');
            // Subscribe to further trip events
            const unsubscribe = (0, events_service_1.subscribeToTrip)(id, (ev) => {
                write('event: ' + ev.type + '\n');
                write('data: ' + JSON.stringify(ev) + '\n\n');
            });
            // Keepalive comments to prevent timeouts in some proxies
            const keepAliveMs = Math.max(10, Number(process.env.SSE_KEEPALIVE_SEC || 15)) * 1000;
            const timer = setInterval(() => write(': ping ' + Date.now() + '\n\n'), keepAliveMs);
            // Handle client disconnect
            req.raw.on('close', () => {
                clearInterval(timer);
                unsubscribe();
                (0, metrics_service_1.decCurrentSse)();
                try {
                    reply.raw.end();
                }
                catch { /* ignore */ }
            });
            // Optional: inform stream is ready
            (0, events_service_1.publishTripEvent)(id, { type: 'INFO', at: new Date().toISOString(), data: { message: 'SSE connected' } });
            return reply.hijack();
        }
    });
}
//# sourceMappingURL=trip.routes.js.map