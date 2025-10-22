#!/bin/sh
set -e

# Espera simple de DB si hace falta (docker compose ya tiene healthcheck)
echo "➡️  Aplicando migraciones (prisma migrate deploy)..."
npx prisma migrate deploy

echo "🚀 Iniciando API..."
node dist/index.js
