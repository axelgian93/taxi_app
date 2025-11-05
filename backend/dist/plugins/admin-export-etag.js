"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/admin-export-etag.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async function adminExportEtag(app) {
    app.addHook('onSend', async (req, reply, payload) => {
        try {
            if (req.method !== 'GET')
                return payload;
            const url = String((req.raw?.url || '').split('?')[0]);
            if (!/^\/admin\/(payments|trips)/.test(url))
                return payload;
            if (payload === undefined || payload === null)
                return payload;
            let buf;
            if (Buffer.isBuffer(payload))
                buf = payload;
            else if (typeof payload === 'string')
                buf = Buffer.from(payload);
            else
                buf = Buffer.from(JSON.stringify(payload));
            const crypto = await Promise.resolve().then(() => __importStar(require('crypto')));
            const etag = 'W/"' + crypto.createHash('md5').update(buf).digest('hex') + '"';
            const inm = req.headers['if-none-match'] || '';
            if (inm === etag) {
                reply.code(304);
                // Ensure minimal body
                return '';
            }
            reply.header('ETag', etag);
            reply.header('Cache-Control', 'private, max-age=60');
            return payload;
        }
        catch {
            return payload;
        }
    });
});
//# sourceMappingURL=admin-export-etag.js.map