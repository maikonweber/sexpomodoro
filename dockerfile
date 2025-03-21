# Etapa 1: Construir a aplicação
FROM node:18 AS builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências com a flag --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Construa a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação usando uma imagem Node.js mais leve
FROM node:18-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos construídos da etapa anterior
COPY --from=builder /app ./

# Instale apenas as dependências de produção
RUN npm install --production --legacy-peer-deps

# Exponha a porta que o servidor Node.js usa
EXPOSE 5173

# Comando para iniciar a aplicação
CMD ["node", "build/index.js"]

