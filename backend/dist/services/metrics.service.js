"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incCounter = incCounter;
exports.getCounters = getCounters;
exports.incCurrentSse = incCurrentSse;
exports.decCurrentSse = decCurrentSse;
exports.getCurrentSse = getCurrentSse;
exports.updateCurrentDriversAvailable = updateCurrentDriversAvailable;
exports.getCurrentDriversAvailable = getCurrentDriversAvailable;
const counters = {
    matching_postgis: 0,
    matching_haversine: 0,
    matching_idle_fallback: 0,
    sse_connections: 0,
    login_failures: 0,
    login_locked: 0,
    session_revokes_total: 0,
    admin_trips_queries_total: 0,
    admin_trips_csv_exports_total: 0,
    admin_trips_report_queries_total: 0,
    admin_trips_report_csv_exports_total: 0,
};
function incCounter(name) {
    counters[name] = (counters[name] ?? 0) + 1;
}
function getCounters() {
    return { ...counters };
}
// Gauges (current values)
let currentSseConnections = 0;
let currentDriversAvailable = 0;
function incCurrentSse() {
    currentSseConnections += 1;
}
function decCurrentSse() {
    currentSseConnections = Math.max(0, currentSseConnections - 1);
}
function getCurrentSse() {
    return currentSseConnections;
}
function updateCurrentDriversAvailable(n) {
    currentDriversAvailable = n >= 0 ? Math.floor(n) : 0;
}
function getCurrentDriversAvailable() {
    return currentDriversAvailable;
}
//# sourceMappingURL=metrics.service.js.map