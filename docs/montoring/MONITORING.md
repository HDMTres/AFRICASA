# AFRICASA - Stack de Monitoring

## Vue d'ensemble

Cette documentation décrit la stack de monitoring complète mise en place pour l'infrastructure AFRICASA. La solution utilise Prometheus, Grafana, Node Exporter et cAdvisor pour fournir une surveillance complète des serveurs et conteneurs.

## Architecture

### Composants

1. **Prometheus** (Port 9090)
   - Collecte et stockage des métriques
   - Moteur d'alertes
   - Auto-discovery des targets

2. **Grafana** (Port 3000)
   - Dashboards et visualisation
   - Alerting et notifications
   - Provisioning automatique

3. **Node Exporter** (Port 9100)
   - Métriques système (CPU, mémoire, disque, réseau)

4. **cAdvisor** (Port 8080)
   - Métriques des conteneurs Docker
   - Surveillance des ressources conteneurs

### Auto-Discovery

Le système utilise un mécanisme d'auto-discovery basé sur :
- **Inventaire Ansible** : Détection automatique des serveurs
- **Labels Docker** : Auto-discovery des conteneurs avec des labels Prometheus
- **Service Discovery** : Script de mise à jour automatique des targets

## Déploiement

### Prérequis

1. **Inventaire Azure configuré** :
   ```bash
   # Vérifier l'inventaire
   cd /home/azureuser/AFRICASA/infra/ansible
   ansible-inventory -i inventory.azure_rm.yml --list
   ```

2. **Azure CLI authentifié** :
   ```bash
   az login
   az account show
   ```

3. **Collections Ansible installées** :
   ```bash
   ansible-galaxy collection install azure.azcollection
   ansible-galaxy collection install community.general
   ```

### Validation de la configuration

Avant le déploiement, validez la configuration :

```bash
cd /home/azureuser/AFRICASA/infra/ansible
ansible-playbook validate-monitoring.yml
```

### Déploiement complet

```bash
# Déploiement standard
ansible-playbook -i inventory.azure_rm.yml monitoring-setup.yml --ask-vault-pass

# Déploiement optimisé (recommandé)
ansible-playbook -i inventory.azure_rm.yml monitoring-setup-enhanced.yml --ask-vault-pass
```

### Configuration des secrets

Les mots de passe sont gérés avec Ansible Vault :

```bash
# Éditer les secrets
ansible-vault edit group_vars/all/vault.yml

# Contenu du vault :
vault_grafana_admin_password: "votre_mot_de_passe_securise"
```

## Accès aux interfaces

### Prometheus
- **URL** : `http://<server_ip>:9090`
- **Fonctionnalités** :
  - Targets: `/targets`
  - Règles: `/rules`
  - Alertes: `/alerts`
  - Configuration: `/config`

### Grafana
- **URL** : `http://<server_ip>:3000`
- **Connexion** :
  - Utilisateur: `admin`
  - Mot de passe: (défini dans le vault)

### Dashboards Grafana

#### AFRICASA Infrastructure Overview
- Vue d'ensemble des serveurs
- Métriques CPU, mémoire, disque, réseau
- État des services
- Alertes actives

#### AFRICASA Containers
- Surveillance des conteneurs Docker
- Utilisation des ressources par conteneur
- Performance et disponibilité

## Auto-Discovery des conteneurs

### Configuration Docker Compose

Pour activer l'auto-discovery, ajoutez des labels à vos services :

```yaml
version: '3.8'
services:
  backend:
    image: africasa/backend:latest
    labels:
      - "prometheus.io/scrape=true"
      - "prometheus.io/port=3001"
      - "prometheus.io/path=/metrics"
      - "prometheus.service.name=africasa-backend"
      - "prometheus.service.environment=production"
    ports:
      - "3001:3001"

  frontend:
    image: africasa/frontend:latest
    labels:
      - "prometheus.io/scrape=true"
      - "prometheus.io/port=3000"
      - "prometheus.io/path=/metrics"
      - "prometheus.service.name=africasa-frontend"
      - "prometheus.service.environment=production"
    ports:
      - "3000:3000"
```

### Service Discovery automatique

Le script de service discovery s'exécute toutes les 2 minutes via cron et :
1. Scan l'inventaire Ansible pour les nouveaux serveurs
2. Détecte les conteneurs avec les labels Prometheus
3. Met à jour les fichiers de targets JSON
4. Recharge la configuration Prometheus

## Alertes

### Règles d'infrastructure

- **ServiceDown** : Service indisponible
- **HighCPUUsage** : Utilisation CPU > 80%
- **CriticalCPUUsage** : Utilisation CPU > 95%
- **HighMemoryUsage** : Utilisation mémoire > 85%
- **CriticalMemoryUsage** : Utilisation mémoire > 95%
- **HighDiskUsage** : Utilisation disque > 85%
- **CriticalDiskUsage** : Utilisation disque > 95%

### Règles containers

- **ContainerDown** : Conteneur arrêté
- **ContainerHighCPU** : CPU conteneur > 80%
- **ContainerCriticalCPU** : CPU conteneur > 95%
- **ContainerHighMemory** : Mémoire conteneur > 85%
- **ContainerCriticalMemory** : Mémoire conteneur > 95%
- **AfricasaBackendDown** : Backend AFRICASA arrêté
- **AfricasaFrontendDown** : Frontend AFRICASA arrêté

## Maintenance

### Vérification des services

```bash
# Status des services
sudo systemctl status prometheus
sudo systemctl status grafana-server
sudo systemctl status node_exporter
sudo systemctl status cadvisor

# Logs
sudo journalctl -u prometheus -f
sudo journalctl -u grafana-server -f
```

### Validation de la configuration

```bash
# Validation Prometheus
sudo /usr/local/bin/promtool check config /etc/prometheus/prometheus.yml

# Validation des règles d'alertes
sudo /usr/local/bin/promtool check rules /etc/prometheus/rules/*.yml

# Test du service discovery
sudo /usr/local/bin/prometheus-discovery.sh
```

### Mise à jour des targets

```bash
# Vérifier les targets découvertes
cat /etc/prometheus/targets/containers.json
cat /etc/prometheus/targets/compose_services.json
cat /etc/prometheus/targets/applications.json

# Forcer le service discovery
sudo /usr/local/bin/prometheus-discovery.sh

# Recharger Prometheus
sudo systemctl reload prometheus
```

### Sauvegarde

```bash
# Sauvegarde des données Prometheus
sudo tar -czf prometheus-backup-$(date +%Y%m%d).tar.gz /var/lib/prometheus/

# Sauvegarde de la configuration
sudo tar -czf prometheus-config-backup-$(date +%Y%m%d).tar.gz /etc/prometheus/

# Sauvegarde Grafana
sudo tar -czf grafana-backup-$(date +%Y%m%d).tar.gz /var/lib/grafana/
```

## Dépannage

### Problèmes courants

#### Prometheus ne démarre pas
```bash
# Vérifier la configuration
sudo /usr/local/bin/promtool check config /etc/prometheus/prometheus.yml

# Vérifier les permissions
sudo chown -R prometheus:prometheus /etc/prometheus/
sudo chown -R prometheus:prometheus /var/lib/prometheus/
```

#### Targets non découvertes
```bash
# Vérifier le service discovery
sudo cat /var/log/cron.log | grep prometheus-discovery

# Exécuter manuellement
sudo /usr/local/bin/prometheus-discovery.sh

# Vérifier les labels Docker
docker ps --format "table {{.Names}}\t{{.Labels}}"
```

#### Grafana inaccessible
```bash
# Vérifier le service
sudo systemctl status grafana-server

# Vérifier les logs
sudo journalctl -u grafana-server -n 50

# Réinitialiser le mot de passe admin
sudo grafana-cli admin reset-admin-password newpassword
```

### Performance

#### Optimisation Prometheus
```bash
# Monitoring des performances
curl http://localhost:9090/metrics | grep prometheus_tsdb

# Ajuster la rétention (dans systemd)
--storage.tsdb.retention.time=15d
--storage.tsdb.retention.size=10GB
```

## Sécurité

### Règles firewall

```bash
# Prometheus
sudo ufw allow 9090/tcp

# Grafana
sudo ufw allow 3000/tcp

# Node Exporter (local seulement)
sudo ufw allow from 10.0.0.0/8 to any port 9100

# cAdvisor (local seulement)
sudo ufw allow from 10.0.0.0/8 to any port 8080
```

### Authentification

1. **Grafana** : Authentification par utilisateur/mot de passe
2. **Prometheus** : Pas d'authentification (accès réseau restreint)
3. **Exporters** : Accès limité aux réseaux internes

### Bonnes pratiques

1. Changer régulièrement les mots de passe Grafana
2. Restreindre l'accès réseau aux composants
3. Sauvegarder régulièrement les configurations
4. Surveiller les logs d'accès
5. Utiliser HTTPS en production

## Métriques personnalisées

### Backend AFRICASA

Pour exposer des métriques applicatives :

```javascript
// Dans votre application Node.js
const client = require('prom-client');

// Créer des métriques personnalisées
const httpRequestDuration = new client.Histogram({
  name: 'africasa_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

// Endpoint /metrics
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});
```

### Intégration avec le monitoring

Les métriques seront automatiquement découvertes si :
1. Le conteneur a les labels Prometheus appropriés
2. L'endpoint `/metrics` est exposé
3. Le service discovery est actif

## Support et documentation

### Logs importants

- **Prometheus** : `/var/log/prometheus/`
- **Grafana** : `/var/log/grafana/`
- **System logs** : `journalctl`
- **Service discovery** : `/var/log/cron.log`

### Ressources utiles

- [Documentation Prometheus](https://prometheus.io/docs/)
- [Documentation Grafana](https://grafana.com/docs/)
- [PromQL Guide](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Grafana Dashboard Gallery](https://grafana.com/grafana/dashboards/)

### Contact

Pour tout problème ou question concernant le monitoring :
- Team SRE: sre@africasa.com
- Documentation Wiki: https://wiki.africasa.com/monitoring
- Runbooks: https://wiki.africasa.com/runbooks/