# CAHIER FONCTIONNEL - AFRICASA
## Plateforme Immobilière Africaine

---

## 📋 TABLE DES MATIÈRES
1. [Présentation du Projet](#présentation-du-projet)
2. [Objectifs](#objectifs)
3. [Périmètre Fonctionnel](#périmètre-fonctionnel)
4. [Acteurs du Système](#acteurs-du-système)
5. [Fonctionnalités Détaillées](#fonctionnalités-détaillées)
6. [Spécifications Techniques](#spécifications-techniques)
7. [Interface Utilisateur](#interface-utilisateur)
8. [Gestion des Données](#gestion-des-données)
9. [Sécurité](#sécurité)
10. [Performance et Évolutivité](#performance-et-évolutivité)

---

## 🎯 PRÉSENTATION DU PROJET

**AFRICASA** est une plateforme web dédiée à la promotion et à la commercialisation de l'immobilier en Afrique. Elle permet aux utilisateurs de consulter, acheter, vendre et découvrir des propriétés à travers le continent africain.

### Vision
Devenir la référence en matière d'immobilier africain en connectant acheteurs, vendeurs et agents immobiliers sur une plateforme moderne et sécurisée.

---

## 🎯 OBJECTIFS

### Objectifs Principaux
- **Centraliser** l'offre immobilière africaine
- **Faciliter** les transactions immobilières transfrontalières
- **Valoriser** le patrimoine immobilier africain
- **Connecter** les acteurs du marché immobilier

### Objectifs Secondaires
- Promouvoir l'investissement immobilier en Afrique
- Offrir une expérience utilisateur moderne et intuitive
- Assurer la transparence des transactions
- Créer une communauté d'investisseurs et professionnels

---

## 🔍 PÉRIMÈTRE FONCTIONNEL

### Inclus dans le Projet
✅ Gestion des propriétés (CRUD complet)
✅ Système d'authentification utilisateur
✅ Profils agents immobiliers
✅ Recherche et filtrage avancés
✅ Interface de contact et communication
✅ Dashboard utilisateur
✅ Système de pagination
✅ Interface responsive

### Exclus du Projet (Phase 1)
❌ Système de paiement en ligne
❌ Chat en temps réel
❌ Application mobile native
❌ Géolocalisation avancée
❌ Système d'enchères

---

## 👥 ACTEURS DU SYSTÈME

### 1. **Visiteur Anonyme**
- Consulte les propriétés publiques
- Effectue des recherches de base
- Accède aux informations générales

### 2. **Utilisateur Inscrit**
- Toutes les fonctionnalités du visiteur
- Sauvegarde de favoris
- Contact direct avec les agents
- Accès au dashboard personnel

### 3. **Agent Immobilier**
- Gestion de son profil professionnel
- Publication et gestion de propriétés
- Réception de demandes de contact
- Statistiques de performance

### 4. **Administrateur**
- Gestion globale de la plateforme
- Modération du contenu
- Gestion des utilisateurs et agents
- Accès aux statistiques complètes

---

## ⚙️ FONCTIONNALITÉS DÉTAILLÉES

### 🏠 GESTION DES PROPRIÉTÉS

#### Consultation des Propriétés
- **Liste paginée** avec aperçu (titre, prix, localisation, image)
- **Fiche détaillée** avec galerie photos, description, caractéristiques
- **Filtres de recherche** : prix, localisation, type, superficie, chambres
- **Tri** : prix croissant/décroissant, date, popularité

#### Publication de Propriétés (Agents)
- **Formulaire complet** : informations générales, prix, localisation
- **Upload d'images** multiples avec gestion des miniatures
- **Statut** : actif, inactif, vendu, loué
- **Catégorisation** : vente, location, investissement

#### Caractéristiques Supportées
- Type : maison, appartement, terrain, commercial, industriel
- Localisation : pays, ville, quartier, adresse
- Prix : vente, location, devise locale
- Superficie : terrain, habitable
- Détails : chambres, salles de bain, parking, équipements

### 👤 GESTION DES UTILISATEURS

#### Inscription/Connexion
- **Inscription** : email, mot de passe, profil de base
- **Connexion** sécurisée avec session persistante
- **Récupération** de mot de passe par email
- **Validation** d'email obligatoire

#### Profils Utilisateurs
- **Informations personnelles** : nom, contact, préférences
- **Historique** de navigation et favoris
- **Notifications** : nouvelles propriétés, messages

#### Profils Agents
- **Informations professionnelles** : agence, certifications, expérience
- **Portfolio** de propriétés gérées
- **Évaluations** et avis clients
- **Statistiques** de performance

### 🔍 RECHERCHE ET NAVIGATION

#### Moteur de Recherche
- **Recherche textuelle** : titre, description, localisation
- **Filtres combinés** : prix min/max, type, caractéristiques
- **Géolocalisation** : recherche par pays/ville
- **Sauvegarde** de recherches fréquentes

#### Navigation
- **Menu principal** : accueil, propriétés, agents, contact
- **Breadcrumb** pour l'orientation
- **Pagination** optimisée
- **Bouton retour en haut** pour l'UX

### 📧 COMMUNICATION

#### Système de Contact
- **Formulaire de contact** général
- **Contact direct** agent via propriété
- **Demande d'information** spécifique à une propriété
- **Gestion des leads** pour les agents

### 📊 DASHBOARD

#### Dashboard Utilisateur
- **Propriétés favorites** sauvegardées
- **Historique** de navigation
- **Messages** et notifications
- **Paramètres** de compte

#### Dashboard Agent
- **Propriétés publiées** avec statuts
- **Demandes reçues** et leads
- **Statistiques** : vues, contacts, conversions
- **Gestion de profil** professionnel

---

## 🛠️ SPÉCIFICATIONS TECHNIQUES

### Architecture
- **Frontend** : Next.js 14+ (React)
- **Backend** : Node.js + Express
- **Base de données** : MongoDB avec Mongoose
- **Styling** : Tailwind CSS + CSS Modules

### Structure Actuelle
```
Frontend (Next.js):
├── app/
│   ├── pages/ (routing basé sur les dossiers)
│   ├── components/ (composants réutilisables)
│   └── styles/ (CSS modules)

Backend (Node.js):
├── Controllers/ (logique métier)
├── Models/ (schémas de données)
├── Routes/ (endpoints API)
└── Middleware/ (authentification, validation)
```

### APIs Principales
- **User API** : `/api/users/*` (CRUD utilisateurs)
- **Property API** : `/api/properties/*` (CRUD propriétés)
- **Agent API** : `/api/agents/*` (gestion agents)
- **Mail API** : `/api/mail/*` (communication)

---

## 🎨 INTERFACE UTILISATEUR

### Design Principles
- **Mobile-first** : responsive design prioritaire
- **Accessibilité** : respect des standards WCAG
- **Performance** : chargement optimisé des images
- **Intuitivité** : navigation claire et logique

### Composants Clés Existants
- `Hero` : section d'accueil avec recherche
- `PropertyCard` : carte propriété avec image et infos
- `AgentCard` : profil agent condensé
- `SearchForm` : formulaire de recherche avancée
- `Nav` : navigation principale responsive
- `Footer` : informations et liens

### Pages Principales
- **Accueil** (`/`) : hero, propriétés vedettes, agents
- **Propriétés** (`/properties`) : liste avec filtres
- **Détail propriété** (`/properties/[id]`) : fiche complète
- **Agents** (`/agents`) : annuaire des professionnels
- **Contact** (`/contact`) : formulaire et informations

---

## 📊 GESTION DES DONNÉES

### Modèles de Données

#### Propriété
```javascript
{
  title: String,
  description: String,
  price: Number,
  currency: String,
  location: {
    country: String,
    city: String,
    address: String
  },
  type: String, // maison, appartement, terrain
  category: String, // vente, location
  features: {
    bedrooms: Number,
    bathrooms: Number,
    area: Number,
    parking: Boolean
  },
  images: [String],
  agent: ObjectId,
  status: String, // active, sold, rented
  createdAt: Date
}
```

#### Utilisateur
```javascript
{
  email: String,
  password: String (hashé),
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    preferences: Object
  },
  role: String, // user, agent, admin
  isVerified: Boolean,
  favorites: [ObjectId]
}
```

#### Agent
```javascript
{
  user: ObjectId,
  agency: String,
  license: String,
  experience: Number,
  specialties: [String],
  rating: Number,
  properties: [ObjectId],
  contact: {
    phone: String,
    whatsapp: String,
    office: String
  }
}
```

---

## 🔒 SÉCURITÉ

### Authentification
- **Hachage** des mots de passe (bcrypt)
- **JWT** pour les sessions
- **Validation** des emails
- **Protection** contre les attaques par force brute

### Autorisations
- **Rôles** : visiteur, utilisateur, agent, admin
- **Permissions** : lecture, écriture, modération
- **Propriété** : seul l'agent propriétaire peut modifier

### Validation des Données
- **Sanitization** des entrées utilisateur
- **Validation** côté client et serveur
- **Protection** contre les injections

---

## 🚀 PERFORMANCE ET ÉVOLUTIVITÉ

### Optimisations Prévues
- **Images** : compression et formats modernes
- **Cache** : mise en cache des requêtes fréquentes
- **CDN** : distribution de contenu statique
- **Pagination** : chargement par petits lots

### Métriques de Performance
- **Temps de chargement** < 3 secondes
- **Score Lighthouse** > 90
- **SEO** optimisé pour les moteurs de recherche

### Évolutions Futures
- **API mobile** pour applications natives
- **Paiements** intégrés (Stripe, PayPal, Mobile Money)
- **Géolocalisation** avec cartes interactives
- **Intelligence artificielle** pour recommandations

---

## 📅 PLANNING DE DÉVELOPPEMENT

### Phase 1 - Base (Actuelle)
✅ Structure Next.js et backend
✅ Authentification de base
✅ CRUD propriétés
✅ Interface utilisateur de base

### Phase 2 - Enrichissement
🔄 Amélioration du système de recherche
🔄 Dashboard complet
🔄 Gestion avancée des agents
🔄 Optimisation mobile

### Phase 3 - Fonctionnalités Avancées
⏳ Système de favoris
⏳ Notifications en temps réel
⏳ Système d'évaluation et avis
⏳ Analytics et statistiques

### Phase 4 - Monétisation
⏳ Système de paiement
⏳ Abonnements agents
⏳ Publicités ciblées
⏳ Commission sur transactions

---

## 🎯 CRITÈRES DE SUCCÈS

### Techniques
- Site web entièrement fonctionnel
- Performance optimale sur tous les appareils
- Zéro bugs critiques en production

### Business
- 100+ propriétés référencées
- 50+ agents inscrits
- 1000+ utilisateurs actifs mensuels
- Temps de session > 3 minutes

---

## 📞 CONTACT ET SUPPORT

Pour toute question concernant ce cahier fonctionnel ou le développement du projet AFRICASA, n'hésitez pas à me poser vos questions !

---

*Document créé le 1 juin 2025*  
*Version 1.0*
