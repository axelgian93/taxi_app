"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDriverLocation = updateDriverLocation;
exports.setDriverStatus = setDriverStatus;
exports.findNearestIdleDriver = findNearestIdleDriver;
// src/services/driver.service.ts
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Actualiza la ubicación del driver:
 * - Inserta un registro en DriverLocationHistory con lat/lng
 * - Deja al driver en estado IDLE (disponible)
 * Nota: No tocamos lastLat/lastLng porque no existen en DriverProfile.
 */
async function updateDriverLocation(userId, coord) {
    // Buscar el perfil del driver por userId
    const dp = await prisma_1.default.driverProfile.findFirst({ where: { userId } });
    if (!dp)
        return;
    // Guardar punto en historial
    await prisma_1.default.driverLocationHistory.create({
        data: { driverId: dp.id, lat: coord.lat, lng: coord.lng }
    });
    // Ponerlo disponible
    await prisma_1.default.driverProfile.update({
        where: { id: dp.id },
        data: { status: 'IDLE' }
    });
}
/** Cambia el estado del driver (OFFLINE | IDLE | ON_TRIP). */
async function setDriverStatus(userId, status) {
    await prisma_1.default.driverProfile.updateMany({
        where: { userId },
        data: { status: status }
    });
}
/** Busca un driver disponible simple: el más recientemente actualizado con status IDLE. */
async function findNearestIdleDriver() {
    return prisma_1.default.driverProfile.findFirst({
        where: { status: 'IDLE' },
        orderBy: { updatedAt: 'desc' }
    });
}
//# sourceMappingURL=driver.service.js.map