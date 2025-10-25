"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.okResponse = exports.driverLocationBody = void 0;
// src/modules/drivers/driver.schemas.ts
exports.driverLocationBody = {
    type: 'object',
    required: ['lat', 'lng'],
    properties: {
        lat: { type: 'number', minimum: -90, maximum: 90, example: -2.17 },
        lng: { type: 'number', minimum: -180, maximum: 180, example: -79.92 }
    }
};
exports.okResponse = {
    type: 'object',
    properties: {
        ok: { type: 'boolean' }
    }
};
exports.errorResponse = {
    type: 'object',
    properties: { error: { type: 'string' } }
};
//# sourceMappingURL=driver.schemas.js.map