"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.tripResponse = exports.requestTripBody = void 0;
// src/modules/trips/trip.schemas.ts
exports.requestTripBody = {
    type: 'object',
    required: ['city', 'pickupLat', 'pickupLng', 'dropoffLat', 'dropoffLng', 'distanceKm', 'durationMin'],
    properties: {
        city: { type: 'string', example: 'Guayaquil' },
        pickupLat: { type: 'number', example: -2.17 },
        pickupLng: { type: 'number', example: -79.92 },
        dropoffLat: { type: 'number', example: -2.19 },
        dropoffLng: { type: 'number', example: -79.89 },
        pickupAddress: { type: 'string', nullable: true },
        dropoffAddress: { type: 'string', nullable: true },
        distanceKm: { type: 'number', example: 5.4 },
        durationMin: { type: 'number', example: 14 },
        preferredMethod: { type: 'string', enum: ['CASH', 'CARD'], nullable: true, example: 'CASH' }
    }
};
exports.tripResponse = {
    type: 'object',
    properties: {
        ok: { type: 'boolean' },
        trip: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                status: { type: 'string', enum: ['ASSIGNED', 'ACCEPTED', 'ARRIVED', 'ONGOING', 'COMPLETED', 'CANCELED'] }
            }
        }
    }
};
exports.errorResponse = {
    type: 'object',
    properties: { error: { type: 'string' } }
};
//# sourceMappingURL=trip.schemas.js.map