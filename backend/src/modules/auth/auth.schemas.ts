// src/modules/auth/auth.schemas.ts
export const registerBodySchema = {
  type: 'object',
  required: ['email', 'password', 'firstName', 'lastName', 'role'],
  properties: {
    email: { type: 'string', format: 'email', example: 'rider@taxi.local' },
    password: { type: 'string', minLength: 6, example: '123456' },
    firstName: { type: 'string', example: 'Ada' },
    lastName: { type: 'string', example: 'Lovelace' },
    role: { type: 'string', enum: ['RIDER', 'DRIVER'] }
  }
} as const

export const loginBodySchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email', example: 'rider@taxi.local' },
    password: { type: 'string', example: '123456' }
  }
} as const

export const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }
  }
} as const

export const loginResponseSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    user: userSchema
  }
} as const

export const errorResponse = {
  type: 'object',
  properties: {
    error: { type: 'string' }
  }
} as const
