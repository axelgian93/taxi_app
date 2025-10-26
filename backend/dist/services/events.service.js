"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToTrip = subscribeToTrip;
exports.publishTripEvent = publishTripEvent;
const subs = new Map();
function subscribeToTrip(tripId, handler) {
    const set = subs.get(tripId) ?? new Set();
    set.add(handler);
    subs.set(tripId, set);
    return () => {
        const s = subs.get(tripId);
        if (!s)
            return;
        s.delete(handler);
        if (s.size === 0)
            subs.delete(tripId);
    };
}
function publishTripEvent(tripId, ev) {
    const s = subs.get(tripId);
    if (!s || s.size === 0)
        return 0;
    for (const h of s) {
        try {
            h(ev);
        }
        catch { }
    }
    return s.size;
}
//# sourceMappingURL=events.service.js.map