"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const jwt_1 = require("../lib/jwt");
function authGuard(roles) {
    return async (req, reply) => {
        const auth = req.headers.authorization;
        if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
            return reply.code(401).send({ error: 'Missing Bearer token' });
        }
        const token = auth.slice(7);
        try {
            const payload = (0, jwt_1.verifyJwt)(token);
            req.user = { id: payload.sub, role: payload.role, email: payload.email };
            if (roles && roles.length > 0 && !roles.includes(payload.role)) {
                return reply.code(403).send({ error: 'Forbidden: role not allowed' });
            }
        }
        catch {
            return reply.code(401).send({ error: 'Invalid/expired token' });
        }
    };
}
//# sourceMappingURL=authGuard.js.map