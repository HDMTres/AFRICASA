#!/usr/bin/env powershell

Write-Host "🐳 AFRICASA - Script de redémarrage Docker" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

# Fonction pour vérifier si Docker est en cours d'exécution
function Test-DockerRunning {
    try {
        docker --version | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Vérifier si Docker Desktop est démarré
Write-Host "🔍 Vérification de Docker Desktop..." -ForegroundColor Yellow

if (-not (Test-DockerRunning)) {
    Write-Host "⚠️  Docker Desktop n'est pas en cours d'exécution" -ForegroundColor Red
    Write-Host "🚀 Démarrage de Docker Desktop..." -ForegroundColor Yellow
    
    # Tenter de démarrer Docker Desktop
    try {
        Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe" -WindowStyle Hidden
        Write-Host "⏳ Attente du démarrage de Docker (60 secondes)..." -ForegroundColor Yellow
        
        # Attendre que Docker soit prêt (max 60 secondes)
        $timeout = 60
        $elapsed = 0
        
        while (-not (Test-DockerRunning) -and $elapsed -lt $timeout) {
            Start-Sleep 5
            $elapsed += 5
            Write-Host "." -NoNewline -ForegroundColor Yellow
        }
        
        Write-Host ""
        
        if (Test-DockerRunning) {
            Write-Host "✅ Docker Desktop est maintenant prêt!" -ForegroundColor Green
        } else {
            Write-Host "❌ Timeout: Docker Desktop n'a pas démarré dans les temps" -ForegroundColor Red
            Write-Host "Veuillez lancer Docker Desktop manuellement et réessayer." -ForegroundColor Red
            exit 1
        }
    }
    catch {
        Write-Host "❌ Erreur lors du démarrage de Docker Desktop" -ForegroundColor Red
        Write-Host "Veuillez lancer Docker Desktop manuellement." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Docker Desktop est déjà en cours d'exécution" -ForegroundColor Green
}

# Afficher la version de Docker
Write-Host "📋 Version Docker:" -ForegroundColor Cyan
docker --version
docker-compose --version

Write-Host ""
Write-Host "🛑 Arrêt des conteneurs existants..." -ForegroundColor Yellow
docker-compose down --remove-orphans

Write-Host ""
Write-Host "🔨 Construction des images (sans cache)..." -ForegroundColor Yellow
docker-compose build --no-cache

Write-Host ""
Write-Host "🚀 Démarrage des conteneurs..." -ForegroundColor Yellow
docker-compose up -d

Write-Host ""
Write-Host "📊 Statut des conteneurs:" -ForegroundColor Cyan
docker-compose ps

Write-Host ""
Write-Host "⏳ Attente du démarrage des services (30 secondes)..." -ForegroundColor Yellow
Start-Sleep 30

Write-Host ""
Write-Host "🧪 Test de connectivité:" -ForegroundColor Cyan
Write-Host "------------------------" -ForegroundColor Cyan

# Test Backend
Write-Host "Backend API..." -NoNewline -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host " ✅ OK" -ForegroundColor Green
    } else {
        Write-Host " ❌ FAILED (Status: $($response.StatusCode))" -ForegroundColor Red
    }
}
catch {
    Write-Host " ❌ FAILED (Error: $($_.Exception.Message))" -ForegroundColor Red
}

# Test Frontend
Write-Host "Frontend..." -NoNewline -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host " ✅ OK" -ForegroundColor Green
    } else {
        Write-Host " ❌ FAILED (Status: $($response.StatusCode))" -ForegroundColor Red
    }
}
catch {
    Write-Host " ❌ FAILED (Error: $($_.Exception.Message))" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 URLs d'accès:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:5000/api" -ForegroundColor White

Write-Host ""
Write-Host "📋 Pour voir les logs:" -ForegroundColor Cyan
Write-Host "  docker-compose logs -f backend" -ForegroundColor White
Write-Host "  docker-compose logs -f frontend" -ForegroundColor White

Write-Host ""
Write-Host "✅ Script terminé!" -ForegroundColor Green
