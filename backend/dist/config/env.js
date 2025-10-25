"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    port: Number(process.env.PORT || 8080),
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUrl: process.env.DATABASE_URL ?? '',
    jwtSecret: process.env.JWT_SECRET || 'changeme-supersecret',
};
//# sourceMappingURL=env.js.map