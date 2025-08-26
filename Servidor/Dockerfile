    # Dockerfile.server - Para el servidor Node.js/Express
	FROM node:22.17.1-alpine3.21 AS build

	WORKDIR /app

    # Copiar package.json y package-lock.json primero (para cache)
    COPY package*.json ./

    #Instalar dependencias como root (permisos completos
    # solo produccion = npm ci --only=production
    # "Limpia archivos temporales para ahorrar espacio" = npm cache clean --force
    RUN npm ci 

    # Ahora copia TODO el código del servidor
    # Usamos un punto (.) para indicar que copie todos los archivos
    # del directorio actual (el contexto de compilación)
    COPY . ./    

    COPY .env ./

    # Exponer puerto del servidor (ajusta según tu configuración)
	EXPOSE 8080

    # Arranque de la app
    CMD ["npm", "start"]