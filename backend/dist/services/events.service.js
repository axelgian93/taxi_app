"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToTrip = subscribeToTrip;
exports.publishTripEvent = publishTripEvent;
const localSubs = new Map();
// Optional Redis-backed pub/sub for multi-instance SSE
let useRedis = false;
let RedisCtor = null;
let redisPub = null;
let redisSub = null;
const redisSubscribed = new Set();
function tryInitRedis() {
    if (redisPub || redisSub)
        return;
    // Enable if env requests it, or if ioredis is present and REDIS_URL is set
    const want = (process.env.EVENTS_USE_REDIS === '1' || process.env.EVENT_BUS === 'redis');
    try {
        RedisCtor = require('ioredis');
    }
    catch {
        RedisCtor = null;
    }
    const url = process.env.REDIS_URL || 'redis://redis:6379';
    if (want && RedisCtor) {
        try {
            redisPub = new RedisCtor(url);
            redisSub = new RedisCtor(url);
            useRedis = true;
            // Wire message dispatch
            redisSub.on('message', (_channel, message) => {
                try {
                    const parsed = JSON.parse(message);
                    const tripId = String(parsed?.__tripId || '');
                    const ev = parsed?.ev;
                    if (!tripId || !ev)
                        return;
                    const set = localSubs.get(tripId);
                    if (!set || set.size === 0)
                        return;
                    for (const h of set) {
                        try {
                            h(ev);
                        }
                        catch { }
                    }
                }
                catch {
                    // ignore malformed
                }
            });
        }
        catch {
            useRedis = false;
            redisPub = null;
            redisSub = null;
        }
    }
}
function subscribeToTrip(tripId, handler) {
    // Always keep local subscribers (SSE handlers in this instance)
    const set = localSubs.get(tripId) ?? new Set();
    set.add(handler);
    localSubs.set(tripId, set);
    // If Redis enabled, ensure we are subscribed to the channel for this trip
    tryInitRedis();
    if (useRedis && redisSub && !redisSubscribed.has(tripId)) {
        const channel = `trip:${tripId}`;
        redisSub.subscribe(channel, () => {
            redisSubscribed.add(tripId);
        });
    }
    return () => {
        const s = localSubs.get(tripId);
        if (!s)
            return;
        s.delete(handler);
        if (s.size === 0) {
            localSubs.delete(tripId);
            // Optionally unsubscribe from Redis channel when no local listeners remain
            if (useRedis && redisSub && redisSubscribed.has(tripId)) {
                const channel = `trip:${tripId}`;
                try {
                    redisSub.unsubscribe(channel);
                }
                catch { }
                redisSubscribed.delete(tripId);
            }
        }
    };
}
function publishTripEvent(tripId, ev) {
    tryInitRedis();
    if (useRedis && redisPub) {
        // Publish to Redis; local delivery happens via subscriber callback
        const channel = `trip:${tripId}`;
        try {
            redisPub.publish(channel, JSON.stringify({ __tripId: tripId, ev }));
        }
        catch { }
        // Return approximate local listener count if any
        return (localSubs.get(tripId)?.size) || 0;
    }
    // Fallback: in-memory delivery
    const s = localSubs.get(tripId);
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