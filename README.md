# AFRICASA - Plateforme Immobilière

## 🏗️ Architecture du Projet

Ce projet est une application web moderne composée de :

- **Frontend**: Application Next.js (React) avec Tailwind CSS
- **Backend**: API REST avec Express.js et MongoDB
- **Base de données**: MongoDB avec Docker
- **Containerisation**: Docker et Docker Compose

## 📁 Structure du Projet

```
AFRICASA/
├── frontend/                    # Application Next.js
│   ├── src/
│   │   └── app/                # App Router Next.js 13+
│   │       ├── components/     # Composants réutilisables
│   │       ├── about/         # Page À propos
│   │       ├── agents/        # Pages agents
│   │       ├── properties/    # Pages propriétés
│   │       ├── login/         # Authentication
│   │       └── ...
│   ├── public/                # Assets statiques
│   ├── Dockerfile             # Configuration Docker frontend
│   ├── package.json
│   ├── next.config.mjs
│   └── tailwind.config.js
│
├── backend/                    # API Express.js
│   ├── Controllers/           # Contrôleurs API
│   ├── models/               # Modèles MongoDB
│   ├── routes/               # Routes API
│   ├── middleware/           # Middlewares
│   ├── services/             # Services métier
│   ├── uploads/              # Fichiers uploadés
│   ├── Dockerfile            # Configuration Docker backend
│   ├── server.js             # Point d'entrée
│   └── package.json
│
├── docker-compose.yml         # Orchestration des services
├── TESTING.md                # Stratégie de tests
└── README.md                 # Ce fichier
```

## 🚀 Démarrage Rapide

### Prérequis

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js 18+](https://nodejs.org/) (pour le développement local)

### Avec Docker (Recommandé)

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd AFRICASA
   ```

2. **Lancer l'application complète**
   ```bash
   docker-compose up --build
   ```

3. **Accéder à l'application**
   - Frontend : http://localhost:3000
   - Backend API : http://localhost:5000
   - MongoDB : localhost:27017

### Développement Local

#### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

#### Backend (Express.js)
```bash
cd backend
npm install
npm run dev
```

## 🐳 Services Docker

### MongoDB
- **Image**: mongo:latest
- **Port**: 27017
- **Utilisateur**: admin
- **Mot de passe**: africasa2024
- **Base**: africasa

### Backend API
- **Port**: 5000
- **Environnement**: Production
- **Base URL**: http://localhost:5000/api

### Frontend Next.js
- **Port**: 3000
- **Mode**: Standalone (optimisé pour Docker)
- **API URL**: http://localhost:5000/api

## 🧪 Tests

Voir le fichier [TESTING.md](./TESTING.md) pour la stratégie complète de tests :

- **Tests unitaires** : Jest + React Testing Library
- **Tests d'intégration** : API endpoints avec Supertest
- **Tests E2E** : Playwright ou Cypress
- **Tests de sécurité** : OWASP ZAP
- **Tests de performance** : Lighthouse + K6

## 📋 Scripts Disponibles

### Racine du projet
```bash
# Lancer tous les services
docker-compose up --build

# Arrêter tous les services
docker-compose down

# Voir les logs
docker-compose logs -f [service-name]
```

### Frontend
```bash
npm run dev        # Mode développement
npm run build      # Build de production
npm run start      # Serveur de production
npm run lint       # Linting ESLint
npm test           # Tests unitaires
```

### Backend
```bash
npm run dev        # Mode développement avec nodemon
npm start          # Serveur de production
npm test           # Tests API
npm run lint       # Linting ESLint
```

## 🔧 Configuration

### Variables d'Environnement

#### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:africasa2024@mongodb:27017/africasa?authSource=admin
JWT_SECRET=africasa-super-secret-jwt-key-2024
FRONTEND_URL=http://localhost:3000
```

#### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚢 Déploiement

### Production avec Docker
```bash
# Build optimisé pour la production
docker-compose -f docker-compose.yml up --build -d

# Monitoring des logs
docker-compose logs -f
```

### Déploiement Azure (À venir)
- Azure Container Instances
- Azure App Service
- Azure Database for MongoDB
- Azure DevOps CI/CD

## 🔍 Monitoring et Logs

Les logs sont centralisés dans :
- **Backend logs** : `backend/logs/`
- **Container logs** : `docker-compose logs`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📜 Licence

Ce projet est développé dans le cadre d'un exercice DevOps académique.

## 🆘 Support

Pour toute question ou problème :
1. Vérifier les logs : `docker-compose logs`
2. Redémarrer les services : `docker-compose restart`
3. Rebuild complet : `docker-compose down && docker-compose up --build`

## 📈 Roadmap

- [ ] Tests automatisés complets
- [ ] CI/CD avec GitHub Actions
- [ ] Déploiement Azure
- [ ] Monitoring avec Prometheus/Grafana
- [ ] Sécurité renforcée (HTTPS, CSP, etc.)
- [ ] Performance optimization
- [ ] Documentation API avec Swagger
