#!/bin/bash

echo "🔍 AFRICASA - Script de diagnostic Docker"
echo "==========================================="

# Fonction pour tester une URL
test_url() {
    local url=$1
    local description=$2
    echo -n "Testing $description... "
    if curl -s -f "$url" > /dev/null; then
        echo "✅ OK"
    else
        echo "❌ FAILED"
        echo "   URL: $url"
    fi
}

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 10

echo ""
echo "🧪 Tests de connectivité:"
echo "------------------------"

# Test MongoDB
echo -n "MongoDB... "
if docker exec africasa-mongodb mongosh --eval "db.stats()" > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FAILED"
fi

# Test Backend
test_url "http://localhost:5000/api/health" "Backend API"
test_url "http://localhost:5000/health" "Backend Health"

# Test Frontend
test_url "http://localhost:3000" "Frontend"

echo ""
echo "🐳 Statut des conteneurs:"
echo "------------------------"
docker ps --filter "name=africasa" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "📋 Logs récents du backend:"
echo "-------------------------"
docker logs africasa-backend --tail=10

echo ""
echo "📋 Logs récents du frontend:"
echo "---------------------------"
docker logs africasa-frontend --tail=10

echo ""
echo "🔍 Variables d'environnement du backend:"
echo "---------------------------------------"
docker exec africasa-backend env | grep -E "MONGODB_URI|JWT_SECRET|NODE_ENV|PORT"

echo ""
echo "🔍 Variables d'environnement du frontend:"
echo "----------------------------------------"
docker exec africasa-frontend env | grep -E "NEXT_PUBLIC|NODE_ENV"

echo ""
echo "🎯 Test d'inscription/connexion:"
echo "-------------------------------"

# Test d'inscription
echo "📝 Test d'inscription..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Docker User",
    "email": "testdocker@test.com",
    "password": "testdocker123",
    "phoneNumber": "+33123456789",
    "role": "user"
  }')

echo "Réponse inscription: $REGISTER_RESPONSE"

# Test de connexion
echo ""
echo "🔐 Test de connexion..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testdocker@test.com",
    "password": "testdocker123"
  }')

echo "Réponse connexion: $LOGIN_RESPONSE"

echo ""
echo "✅ Diagnostic terminé!"
