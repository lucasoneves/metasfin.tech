# Use uma imagem Node.js como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta que o Nuxt.js usa (padrão é 3000)
EXPOSE 3000

# Comando para iniciar a aplicação Nuxt.js (em produção)
# CMD ["npm", "run", "start"]

# Para desenvolvimento, você pode usar:
CMD ["npm", "run", "dev"]