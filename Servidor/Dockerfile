    # Dockerfile.server - Para el servidor Node.js/Express
	FROM node:18.0.0-alpine3.15 AS build

	WORKDIR /app

    # Copiar package.json y package-lock.json primero (para cache)
    COPY package*.json ./

    #Instalar dependencias como root (permisos completos
    # solo produccion = npm ci --only=production
    # "Limpia archivos temporales para ahorrar espacio" = npm cache clean --force
    RUN npm ci --only=production && npm cache clean --force

    # Ahora copia TODO el código del servidor
    # Usamos un punto (.) para indicar que copie todos los archivos
    # del directorio actual (el contexto de compilación)
    COPY . ./

    # Crear usuario innovatube y grupo nodejs
    # Comando Linux: crear grupo
    RUN addgroup -g 1001 -S nodejs        
     # Comando Linux: crear usuario
    RUN adduser -S innovatube -u 1001    

    # Exponer puerto del servidor (ajusta según tu configuración)
	EXPOSE 8080

    # Arranque de la app
    CMD ["npm", "start"]