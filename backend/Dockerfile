# backend/Dockerfile
FROM node:22-alpine

WORKDIR /app

# 1) Copiamos manifiestos primero para cache
COPY package.json package-lock.json* ./

# 2) Instalamos dependencias
RUN npm ci

# 3) Copiamos código y prisma
COPY prisma ./prisma
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src

# 4) Generamos Prisma Client antes de compilar (necesario para tipos)
RUN npx prisma generate && npm run build

# 5) Podamos devDependencies
RUN npm prune --omit=dev

# 6) Copiamos script de arranque
COPY entrypoint.sh /entrypoint.sh
# Normalizamos fin de línea por si se creó con CRLF en Windows
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
