// src/modules/drivers/driver.schemas.ts
export const driverLocationBody = {
  type: 'object',
  required: ['lat', 'lng'],
  properties: {
    lat: { type: 'number', minimum: -90, maximum: 90, example: -2.17 },
    lng: { type: 'number', minimum: -180, maximum: 180, example: -79.92 }
  }
} as const

export const okResponse = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' }
  }
} as const

export const errorResponse = {
  type: 'object',
  properties: { error: { type: 'string' } }
} as const
