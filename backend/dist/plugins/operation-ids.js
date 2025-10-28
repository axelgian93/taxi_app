"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/operation-ids.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async (app) => {
    const map = [
        { method: 'GET', url: '/trips/:id/sse', op: 'tripsSseById' },
        { method: 'POST', url: '/trips/request', op: 'tripsRequest' },
        { method: 'GET', url: '/trips/:id', op: 'tripsGetById' },
        { method: 'POST', url: '/trips/:id/accept', op: 'tripsAccept' },
        { method: 'POST', url: '/trips/:id/arrived', op: 'tripsArrived' },
        { method: 'POST', url: '/trips/:id/start', op: 'tripsStart' },
        { method: 'POST', url: '/trips/:id/complete', op: 'tripsComplete' },
        { method: 'POST', url: '/trips/:id/cancel', op: 'tripsCancel' },
        { method: 'POST', url: '/trips/:id/driver-cancel', op: 'tripsDriverCancel' },
        { method: 'GET', url: '/payments', op: 'paymentsList' },
        { method: 'POST', url: '/payments/:tripId/capture', op: 'paymentsCaptureByTrip' },
        { method: 'POST', url: '/payments/:tripId/refund', op: 'paymentsRefundByTrip' },
        { method: 'GET', url: '/payments/:tripId', op: 'paymentsGetByTrip' },
        { method: 'GET', url: '/payments/:tripId/refunds', op: 'paymentsRefundsByTrip' },
        { method: 'GET', url: '/admin/refunds', op: 'adminRefundsList' },
    ];
    app.addHook('onRoute', (route) => {
        const found = map.find(m => m.url === route.url && (!m.method || m.method.toUpperCase() === String(route.method).toUpperCase()));
        if (found) {
            route.schema = route.schema || {};
            // @ts-ignore add operationId if not present
            if (!route.schema.operationId) {
                ;
                route.schema.operationId = found.op;
            }
        }
    });
});
//# sourceMappingURL=operation-ids.js.map