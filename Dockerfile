# Usamos node 18
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el proyecto
COPY . .

# Generamos Prisma client
RUN npx prisma generate

# Exponemos el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "start:dev"]
