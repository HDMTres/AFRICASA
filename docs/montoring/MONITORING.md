# Configuration Prometheus Auto-Discovery pour AFRICASA

## Vue d'ensemble

Cette configuration implémente un système de découverte automatique de services pour Prometheus qui :

1. **Découvre automatiquement** tous les serveurs de votre infrastructure via l'inventaire Ansible
2. **Monitore les conteneurs** avec des labels spécifiques
3. **S'adapte dynamiquement** quand vous ajoutez/supprimez des services
4. **Supporte les applications containerisées** avec Docker et Docker Compose

## Fonctionnalités

### 1. Auto-discovery des serveurs
- **Node Exporter** : Métriques système de tous les serveurs
- **cAdvisor** : Métriques des conteneurs de tous les serveurs
- **Docker Daemon** : Métriques Docker (si activé)

### 2. Auto-discovery des conteneurs
Le script `/usr/local/bin/prometheus-discovery.sh` s'exécute toutes les 2 minutes et :
- Scanne les conteneurs Docker avec le label `prometheus.scrape=true`
- Génère automatiquement les fichiers de targets JSON
- Recharge la configuration Prometheus

### 3. Labels Prometheus pour containers

Ajoutez ces labels à vos services Docker Compose :

```yaml
labels:
  - "prometheus.scrape=true"          # Active le scraping
  - "prometheus.port=3000"            # Port des métriques
  - "prometheus.path=/metrics"        # Chemin des métriques
  - "prometheus.service=my-app"       # Nom du service
  - "prometheus.env=production"       # Environnement
```

## Configuration

### Variables Ansible principales

```yaml
# Auto-discovery activée
prometheus_container_discovery_enabled: true

# Targets statiques pour apps sans auto-discovery
prometheus_static_targets:
  - address: "{{ ansible_default_ipv4.address }}"
    port: 3000
    service_name: "africasa-backend"
    environment: "production"
    metrics_path: "/metrics"

# Jobs custom avec file service discovery
prometheus_custom_jobs:
  - name: "africasa_applications"
    file_sd_configs:
      - files:
        - "{{ prometheus_config_dir }}/targets/applications.json"
    metrics_path: "/metrics"
    scrape_interval: "30s"
```

## Déploiement d'une nouvelle application

### 1. Application avec métriques intégrées

```yaml
version: '3.8'
services:
  my-app:
    image: my-app:latest
    ports:
      - "3000:3000"
    labels:
      - "prometheus.scrape=true"
      - "prometheus.port=3000"
      - "prometheus.path=/metrics"
      - "prometheus.service=my-app"
      - "prometheus.env=production"
```

### 2. Application avec exporter séparé

```yaml
version: '3.8'
services:
  database:
    image: postgres:13
    # ... config normale

  postgres-exporter:
    image: wrouesnel/postgres_exporter
    environment:
      - DATA_SOURCE_NAME=postgresql://user:pass@database:5432/mydb
    labels:
      - "prometheus.scrape=true"
      - "prometheus.port=9187"
      - "prometheus.path=/metrics"
      - "prometheus.service=postgres"
      - "prometheus.env=production"
```

## Architecture de monitoring

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   VM App 1      │    │   VM App 2      │    │   VM Monitor    │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Node Exporter│ │    │ │Node Exporter│ │    │ │ Prometheus  │ │
│ │   :9100     │ │    │ │   :9100     │ │    │ │   :9090     │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │  cAdvisor   │ │    │ │  cAdvisor   │ │    │ │   Grafana   │ │
│ │   :8080     │ │    │ │   :8080     │ │    │ │   :3000     │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │                 │
│ │   App       │ │    │ │   App       │ │    │                 │
│ │ Container   │ │    │ │ Container   │ │    │                 │
│ │  :3000      │ │    │ │  :3001      │ │    │                 │
│ └─────────────┘ │    │ └─────────────┘ │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Maintenance

### Vérifier les targets découvertes
```bash
# Voir les containers découverts
cat /etc/prometheus/targets/containers.json

# Voir les applications statiques
cat /etc/prometheus/targets/applications.json

# Forcer une découverte manuelle
/usr/local/bin/prometheus-discovery.sh
```

### Recharger Prometheus
```bash
# Recharger la config sans redémarrer
systemctl reload prometheus

# Redémarrer complètement
systemctl restart prometheus
```

### Logs de debugging
```bash
# Logs Prometheus
journalctl -u prometheus -f

# Logs de découverte
grep "prometheus-discovery" /var/log/cron.log
```

## Métriques importantes

- **up** : Statut des targets (1=up, 0=down)
- **node_*** : Métriques système (CPU, RAM, disque, réseau)
- **container_*** : Métriques conteneurs (cAdvisor)
- **prometheus_*** : Métriques internes Prometheus

## Alertes recommandées

- **InstanceDown** : Service indisponible
- **HighCpuLoad** : CPU > 80%
- **HighMemoryUsage** : RAM > 85%
- **DiskSpaceLow** : Disque > 85%
- **ContainerDown** : Conteneur arrêté
