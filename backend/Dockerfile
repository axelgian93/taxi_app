# backend/Dockerfile
FROM node:22-alpine

WORKDIR /app

# 1) Copiamos manifiestos primero para cachear instalación
COPY package.json package-lock.json* ./

# 2) Instalamos TODAS las deps para poder compilar y generar Prisma Client
RUN npm ci

# 3) Copiamos el código y los assets necesarios
COPY prisma ./prisma
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src

# 4) Compilamos a JS y generamos Prisma Client
RUN npm run build && npx prisma generate

# 5) Podamos devDependencies para una imagen más ligera
RUN npm prune --omit=dev

# 6) Copiamos script de arranque
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
