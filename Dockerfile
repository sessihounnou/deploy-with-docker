# Utilisez une image Node.js version 19.8.1 comme base
FROM node:19.8.1

# Créez un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers de votre application
COPY package*.json ./
COPY prisma ./prisma

# Installez les dépendances de production (sans les devDependencies)
RUN npm install

# Copiez le reste de votre application
COPY . .

# Exposez le port sur lequel votre application écoute (remplacez 3000 par le port de votre application)
EXPOSE 3000

# Générez les fichiers Prisma
RUN npx prisma generate

# Définissez les volumes
VOLUME ["/usr/src/app/node_modules", "/usr/src/app"]

# Donnez des autorisations 777 à /usr/src/app
RUN chmod -R 777 /usr/src/app

# Utilisez nodemon pour démarrer votre application avec le fichier de point d'entrée (index.js)
CMD ["npx", "nodemon", "index.js"]
