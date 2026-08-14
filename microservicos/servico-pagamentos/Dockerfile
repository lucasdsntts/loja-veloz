# Multi-stage build para imagem final enxuta
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /usr/src/app
# Executa a aplicação com usuário sem privilégios de root por segurança
USER node
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 8080
CMD ["npm", "start"]