# Utiliser l'image officielle Node.js LTS
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production && npm cache clean --force

# Copier le code source
COPY . .

# Créer le dossier uploads si nécessaire
RUN mkdir -p uploads

# Exposer le port 5000 (port de votre backend)
EXPOSE 5000

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001 -G nodejs

# Changer le propriétaire des fichiers
RUN chown -R backend:nodejs /app

# Changer vers l'utilisateur non-root
USER backend

# Variable d'environnement
ENV NODE_ENV=production

# Commande pour démarrer l'application
CMD ["npm", "start"]