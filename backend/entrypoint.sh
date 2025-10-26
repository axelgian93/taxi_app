#!/bin/sh
set -e

# Espera simple de DB si hace falta (docker compose ya tiene healthcheck)
echo "➡️  Aplicando migraciones (prisma migrate deploy)..."
if ! npx prisma migrate deploy; then
  echo "⚠️  prisma migrate deploy falló (continuando de forma no fatal)"
fi

echo "🚀 Iniciando API..."
node dist/index.js
