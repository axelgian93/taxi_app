"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.loginResponseSchema = exports.userSchema = exports.loginBodySchema = exports.registerBodySchema = void 0;
// src/modules/auth/auth.schemas.ts
exports.registerBodySchema = {
    type: 'object',
    required: ['email', 'password', 'firstName', 'lastName', 'role'],
    properties: {
        email: { type: 'string', format: 'email', example: 'rider@taxi.local' },
        password: { type: 'string', minLength: 6, example: '123456' },
        firstName: { type: 'string', example: 'Ada' },
        lastName: { type: 'string', example: 'Lovelace' },
        role: { type: 'string', enum: ['RIDER', 'DRIVER'] }
    }
};
exports.loginBodySchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: { type: 'string', format: 'email', example: 'rider@taxi.local' },
        password: { type: 'string', example: '123456' }
    }
};
exports.userSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }
    }
};
exports.loginResponseSchema = {
    type: 'object',
    properties: {
        token: { type: 'string' },
        user: exports.userSchema
    }
};
exports.errorResponse = {
    type: 'object',
    properties: {
        error: { type: 'string' }
    }
};
//# sourceMappingURL=auth.schemas.js.map