# ── Stage 1: Build ──────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production --base-href /admin/

# ── Stage 2: Serve ──────────────────────────────────────
FROM nginx:alpine

# ⚠️ Ahora copiamos dentro de una subcarpeta /admin/
COPY --from=builder /app/dist/bomboplats-admin-panel/browser /usr/share/nginx/html/admin

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
