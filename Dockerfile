# Etapa 1: build da aplicação (instala dependências)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas arquivos de dependências primeiro
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o restante da aplicação
COPY . .

# Etapa 2: imagem final (leve e otimizada)
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário da etapa anterior
COPY --from=builder /app /app

# Define variáveis padrão (pode sobrescrever no Kubernetes)
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Comando de inicialização
CMD ["node", "server/server.js"]
