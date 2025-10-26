"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeKey = makeKey;
exports.withRetry = withRetry;
exports.reqOpts = reqOpts;
function makeKey(parts) {
    return parts.filter(Boolean).join(':');
}
async function withRetry(fn) {
    try {
        return await fn();
    }
    catch (e) {
        const code = e?.type || e?.code || '';
        const retryable = [
            'RateLimitError',
            'APIConnectionError',
            'StripeConnectionError',
            'TimeoutError',
            'api_connection_error',
            'rate_limit'
        ];
        if (retryable.includes(code)) {
            await new Promise(r => setTimeout(r, 300));
            return await fn();
        }
        throw e;
    }
}
function reqOpts(idempotencyKey) {
    return { idempotencyKey };
}
//# sourceMappingURL=stripe.idempotency.js.map