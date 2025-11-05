"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminRevenueRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const crypto_1 = __importDefault(require("crypto"));
async function adminRevenueRoutes(app) {
    const qs = {
        type: 'object',
        properties: {
            from: { type: 'string', format: 'date-time' },
            to: { type: 'string', format: 'date-time' },
            city: { type: 'string' },
            method: { type: 'string' },
            groupBy: { type: 'string', enum: ['city', 'method', 'city_method', 'day', 'city_day'], default: 'city_method' },
            format: { type: 'string', enum: ['json', 'csv'], default: 'json' },
            limit: { type: 'integer', minimum: 1, maximum: 2000, default: 1000 }
        },
        additionalProperties: false,
    };
    app.get('/admin/revenue/report', {
        schema: { operationId: 'adminRevenueReport', tags: ['admin'], summary: 'Reporte de revenue', description: 'Suma de pagos PAID por ciudad/método/día, con CSV.', querystring: qs },
        preHandler: app.auth.requireRole('ADMIN'),
        config: { rateLimit: { max: Number(process.env.RL_ADMIN_EXPORT_MAX || 30), timeWindow: process.env.RL_ADMIN_EXPORT_WIN || '1 minute', keyGenerator: (req) => `admexp:${req.user?.id || req.ip}` } }
    }, async (req, reply) => {
        const { from, to, city, method, groupBy = 'city_method', format = 'json', limit = 1000 } = req.query;
        const params = [];
        const where = ['p.status = \"PAID\"'];
        if (from) {
            params.push(new Date(from).toISOString());
            where.push(`p."createdAt" >= $${params.length}`);
        }
        if (to) {
            params.push(new Date(to).toISOString());
            where.push(`p."createdAt" <= $${params.length}`);
        }
        if (city) {
            params.push(String(city));
            where.push(`(t.city = $${params.length} OR (t."pricingSnapshot" ->> 'city') = $${params.length})`);
        }
        if (method) {
            params.push(String(method));
            where.push(`p.method = $${params.length}`);
        }
        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
        let selectSql = '';
        let groupSql = '';
        if (groupBy === 'city') {
            selectSql = 'COALESCE(t.city, t."pricingSnapshot" ->> \"city\") AS city';
            groupSql = 'GROUP BY 1';
        }
        else if (groupBy === 'method') {
            selectSql = 'p.method AS method';
            groupSql = 'GROUP BY 1';
        }
        else if (groupBy === 'city_method') {
            selectSql = 'COALESCE(t.city, t."pricingSnapshot" ->> \"city\") AS city, p.method AS method';
            groupSql = 'GROUP BY 1,2';
        }
        else if (groupBy === 'day') {
            selectSql = 'to_char(p."createdAt", \"YYYY-MM-DD\") AS day';
            groupSql = 'GROUP BY 1';
        }
        else /* city_day */ {
            selectSql = 'COALESCE(t.city, t."pricingSnapshot" ->> \"city\") AS city, to_char(p."createdAt", \"YYYY-MM-DD\") AS day';
            groupSql = 'GROUP BY 1,2';
        }
        const sql = `SELECT ${selectSql}, COUNT(*)::int AS count, COALESCE(SUM(p."amountUsd"),0)::float AS amountUsd
                 FROM "Payment" p
                 LEFT JOIN "Trip" t ON t.id = p."tripId"
                 ${whereSql}
                 ${groupSql}
                 ORDER BY amountUsd DESC
                 LIMIT ${Number(limit)}`;
        const rows = await prisma_1.default.$queryRawUnsafe(sql, ...params);
        if (format === 'csv') {
            const keys = groupBy === 'city' ? ['city'] : groupBy === 'method' ? ['method'] : groupBy === 'day' ? ['day'] : groupBy === 'city_method' ? ['city', 'method'] : ['city', 'day'];
            const header = [...keys, 'count', 'amountUsd'].join(',') + '\n';
            const body = rows.map(r => keys.map(k => String(r[k] ?? '')).concat([String(r.count ?? 0), String(Number(r.amountUsd ?? 0).toFixed(2))])
                .map(v => /[,"]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v).join(',')).join('\n');
            const csv = header + body + '\n';
            const etag = 'W/"' + crypto_1.default.createHash('md5').update(csv).digest('hex') + '"';
            if (req.headers['if-none-match'] === etag) {
                return reply.code(304).send();
            }
            reply.header('ETag', etag);
            reply.header('Cache-Control', 'private, max-age=60');
            reply.header('Content-Type', 'text/csv; charset=utf-8');
            return reply.send(csv);
        }
        const payload = { items: rows };
        const etag = 'W/"' + crypto_1.default.createHash('md5').update(JSON.stringify(payload)).digest('hex') + '"';
        if (req.headers['if-none-match'] === etag) {
            return reply.code(304).send();
        }
        reply.header('ETag', etag);
        reply.header('Cache-Control', 'private, max-age=60');
        return reply.send(payload);
    });
}
//# sourceMappingURL=admin.revenue.routes.js.map