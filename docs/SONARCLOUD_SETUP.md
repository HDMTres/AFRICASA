# 🔍 Checklist Configuration SonarCloud - AFRICASA

## 📋 Étapes obligatoires (À FAIRE MAINTENANT)

### ✅ 1. Compte SonarCloud
- [ ] Aller sur https://sonarcloud.io
- [ ] Se connecter avec GitHub
- [ ] Autoriser SonarCloud à accéder au compte GitHub

### ✅ 2. Projet SonarCloud
- [ ] Cliquer sur "+" puis "Analyze new project"
- [ ] Sélectionner le repository AFRICASA
- [ ] Noter l'**Organization key** : `HDMTres`
- [ ] Noter le **Project key** : `HDMTres_AFRICASA`

### ✅ 3. Token SonarCloud
- [ ] Aller dans "My Account" > "Security"
- [ ] Générer un token :
  - Name: `AFRICASA-GitHub-Actions`
  - Type: `Global Analysis Token`
  - Expiration: 90 jours minimum
- [ ] **COPIER LE TOKEN** : `_____________`

### ✅ 4. Secrets GitHub
- [ ] Aller dans GitHub repo > Settings > Secrets and variables > Actions
- [ ] Ajouter ces secrets :
  - [ ] `SONAR_TOKEN` : le token copié
  - [ ] `SONAR_ORGANIZATION` : HDMTres
  - [ ] `SONAR_PROJECT_KEY` : HDMTres_AFRICASA

### ✅ 5. Mise à jour des fichiers
- [ ] Mettre à jour `sonar-project.properties` avec les vraies valeurs
- [ ] Remplacer `HDMTres_AFRICASA` par la vraie valeur (✅ Déjà fait)
- [ ] Remplacer `HDMTres` par la vraie valeur (✅ Déjà fait)

### ✅ 6. Test de la configuration
- [ ] Committer et pousser les modifications
- [ ] Vérifier que les workflows se déclenchent
- [ ] Consulter les résultats dans SonarCloud

## 🔗 Liens utiles
- **SonarCloud** : https://sonarcloud.io
- **Documentation** : https://docs.sonarcloud.io/getting-started/github/
- **Votre projet** : https://sonarcloud.io/project/overview?id=HDMTres_AFRICASA

## 🚨 Points d'attention
- Le token SonarCloud expire (90 jours minimum)
- Les secrets GitHub sont sensibles à la casse
- La première analyse peut prendre plusieurs minutes
- Assurez-vous que les branches configurées correspondent à votre repo

## 🎯 Résultat attendu
Après configuration, vous devriez voir :
- ✅ Workflows GitHub Actions qui passent
- ✅ Analyse de code dans SonarCloud
- ✅ Métriques de qualité (bugs, vulnérabilités, code smells)
- ✅ Historique des analyses
