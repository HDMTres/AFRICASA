# 🧪 Guide de Tests - AFRICASA

Ce document présente la stratégie de tests complète pour l'application AFRICASA, une plateforme immobilière africaine.

## 📋 Vue d'ensemble des tests

### Types de tests implémentés
- ✅ **Tests Unitaires** (Jest)
- ✅ **Tests d'Intégration** (Supertest)
- ✅ **Tests End-to-End** (Selenium WebDriver)
- ✅ **Tests E2E Modernes** (Cypress)
- ✅ **Tests de Performance** (Artillery)
- ✅ **Tests de Sécurité** (OWASP ZAP)

## 🏗️ Architecture de tests

```
AFRICASA/
├── tests/
│   ├── unit/                    # Tests unitaires
│   │   ├── backend/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   └── middleware/
│   │   └── frontend/
│   │       ├── components/
│   │       └── utils/
│   ├── integration/             # Tests d'intégration
│   │   ├── api/
│   │   └── database/
│   ├── e2e-selenium/           # Tests E2E Selenium
│   │   ├── specs/
│   │   ├── pages/
│   │   └── utils/
│   ├── e2e-cypress/            # Tests E2E Cypress
│   │   ├── e2e/
│   │   ├── fixtures/
│   │   └── support/
│   ├── performance/            # Tests de performance
│   └── security/               # Tests de sécurité
├── docker-compose.test.yml     # Services de test
└── test-reports/               # Rapports de tests
```

## 🛠️ Installation des outils de test

### Backend (Node.js)
```bash
npm install --save-dev jest supertest mongodb-memory-server
npm install --save-dev @types/jest @types/supertest
```

### Frontend (React/Next.js)
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event jest-environment-jsdom
```

### Tests E2E
```bash
# Selenium
npm install --save-dev selenium-webdriver chromedriver geckodriver

# Cypress
npm install --save-dev cypress @cypress/code-coverage
```

### Tests de Performance
```bash
npm install --save-dev artillery artillery-plugin-metrics-by-endpoint
```

## 🧪 Tests Unitaires

### Backend - Exemple test contrôleur
```javascript
// tests/unit/backend/controllers/userController.test.js
const request = require('supertest');
const app = require('../../../../backend/app');
const User = require('../../../../backend/models/User');

describe('User Controller', () => {
  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe(userData.email);
    });
  });
});
```

### Frontend - Exemple test composant
```javascript
// tests/unit/frontend/components/NavbarModern.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import NavbarModern from '../../../../src/app/components/NavbarModern';

describe('NavbarModern', () => {
  it('should display login button when not authenticated', () => {
    render(<NavbarModern />);
    
    const loginButton = screen.getByText('Se connecter');
    expect(loginButton).toBeInTheDocument();
  });

  it('should display user dropdown when authenticated', () => {
    // Mock localStorage
    const mockUser = { fullName: 'John Doe', email: 'john@test.com' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    render(<NavbarModern />);
    
    const userButton = screen.getByText('John Doe');
    expect(userButton).toBeInTheDocument();
    
    // Test dropdown
    fireEvent.click(userButton);
    expect(screen.getByText('Mon Profil')).toBeInTheDocument();
  });
});
```

## 🔗 Tests d'Intégration

### API Tests avec Supertest
```javascript
// tests/integration/api/auth.test.js
const request = require('supertest');
const app = require('../../../backend/app');
const { setupTestDB, cleanupTestDB } = require('../../utils/testDB');

describe('Authentication API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await cleanupTestDB();
  });

  describe('Login Flow', () => {
    it('should complete full authentication flow', async () => {
      // Register
      const userData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@africasa.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201);

      // Login
      const loginResponse = await request(app)
        .post('/api/users/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      expect(loginResponse.body.token).toBeDefined();

      // Access protected route
      const profileResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .expect(200);

      expect(profileResponse.body.user.email).toBe(userData.email);
    });
  });
});
```

## 🎯 Tests End-to-End avec Selenium

### Configuration Selenium
```javascript
// tests/e2e-selenium/config/selenium.config.js
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class SeleniumConfig {
  static async createDriver() {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    return await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }
}

module.exports = SeleniumConfig;
```

### Page Object Model
```javascript
// tests/e2e-selenium/pages/LoginPage.js
const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateToLogin() {
    await this.driver.get('http://localhost:3000/login');
  }

  async fillEmail(email) {
    const emailField = await this.driver.findElement(By.name('email'));
    await emailField.clear();
    await emailField.sendKeys(email);
  }

  async fillPassword(password) {
    const passwordField = await this.driver.findElement(By.name('password'));
    await passwordField.clear();
    await passwordField.sendKeys(password);
  }

  async clickLoginButton() {
    const loginButton = await this.driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
  }

  async waitForRedirect() {
    await this.driver.wait(until.urlContains('/profil'), 10000);
  }

  async login(email, password) {
    await this.navigateToLogin();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    await this.waitForRedirect();
  }
}

module.exports = LoginPage;
```

### Test E2E complet
```javascript
// tests/e2e-selenium/specs/user-journey.test.js
const SeleniumConfig = require('../config/selenium.config');
const LoginPage = require('../pages/LoginPage');
const ProfilPage = require('../pages/ProfilPage');

describe('AFRICASA User Journey', () => {
  let driver;
  let loginPage;
  let profilPage;

  beforeAll(async () => {
    driver = await SeleniumConfig.createDriver();
    loginPage = new LoginPage(driver);
    profilPage = new ProfilPage(driver);
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should complete full user journey', async () => {
    // Login
    await loginPage.login('test@africasa.com', 'password123');
    
    // Verify profile page
    const userName = await profilPage.getUserName();
    expect(userName).toContain('Test User');
    
    // Update profile
    await profilPage.updateBio('Je suis un agent immobilier passionné');
    await profilPage.saveProfile();
    
    // Verify update
    const updatedBio = await profilPage.getBio();
    expect(updatedBio).toBe('Je suis un agent immobilier passionné');
  });
});
```

## 🏎️ Tests de Performance avec Artillery

### Configuration Artillery
```yaml
# tests/performance/load-test.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 300
      arrivalRate: 10
      name: "Sustained load"
    - duration: 120
      arrivalRate: 20
      name: "Peak load"

scenarios:
  - name: "User Registration and Login"
    weight: 70
    flow:
      - post:
          url: "/api/users/register"
          json:
            firstName: "Load{{ $randomString() }}"
            lastName: "Test{{ $randomString() }}"
            email: "load{{ $randomString() }}@test.com"
            password: "password123"
          capture:
            - json: "$.token"
              as: "authToken"
      - post:
          url: "/api/users/login"
          json:
            email: "load{{ $randomString() }}@test.com"
            password: "password123"

  - name: "Browse Properties"
    weight: 30
    flow:
      - get:
          url: "/api/properties"
      - think: 2
      - get:
          url: "/api/properties/{{ $randomInt(1, 100) }}"
```

## 🔒 Tests de Sécurité

### Tests de sécurité automatisés
```javascript
// tests/security/security.test.js
const request = require('supertest');
const app = require('../../backend/app');

describe('Security Tests', () => {
  describe('SQL Injection Protection', () => {
    it('should prevent NoSQL injection in login', async () => {
      const maliciousPayload = {
        email: { $ne: null },
        password: { $ne: null }
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(maliciousPayload)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('XSS Protection', () => {
    it('should sanitize user input', async () => {
      const xssPayload = {
        firstName: '<script>alert("XSS")</script>',
        lastName: 'Test',
        email: 'xss@test.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users/register')
        .send(xssPayload)
        .expect(201);

      expect(response.body.user.firstName).not.toContain('<script>');
    });
  });
});
```

## 🐳 Tests avec Docker

### Docker Compose pour tests
```yaml
# docker-compose.test.yml
version: '3.8'

services:
  # Base de test MongoDB
  mongodb-test:
    image: mongo:7.0
    environment:
      MONGO_INITDB_ROOT_USERNAME: test
      MONGO_INITDB_ROOT_PASSWORD: test
    ports:
      - "27018:27017"

  # Selenium Hub
  selenium-hub:
    image: selenium/hub:latest
    ports:
      - "4444:4444"

  # Chrome pour Selenium
  chrome:
    image: selenium/node-chrome:latest
    depends_on:
      - selenium-hub
    environment:
      - HUB_HOST=selenium-hub
    volumes:
      - /dev/shm:/dev/shm

  # Firefox pour Selenium
  firefox:
    image: selenium/node-firefox:latest
    depends_on:
      - selenium-hub
    environment:
      - HUB_HOST=selenium-hub

  # Application backend pour tests
  backend-test:
    build:
      context: ./backend
    environment:
      NODE_ENV: test
      MONGODB_URI: mongodb://test:test@mongodb-test:27017/africasa_test?authSource=admin
    depends_on:
      - mongodb-test

  # Application frontend pour tests
  frontend-test:
    build:
      context: .
    environment:
      NODE_ENV: test
      NEXT_PUBLIC_API_URL: http://backend-test:5000/api
    depends_on:
      - backend-test
```

## 📊 Scripts de test

### Package.json scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:e2e:selenium": "jest tests/e2e-selenium",
    "test:e2e:cypress": "cypress run",
    "test:performance": "artillery run tests/performance/load-test.yml",
    "test:security": "npm audit && jest tests/security",
    "test:all": "npm run test:unit && npm run test:integration && npm run test:e2e:selenium",
    "test:docker": "docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit"
  }
}
```

## 🚀 Commandes d'exécution

### Tests locaux
```bash
# Tests unitaires
npm run test:unit

# Tests d'intégration
npm run test:integration

# Tests E2E Selenium
npm run test:e2e:selenium

# Tests E2E Cypress
npm run test:e2e:cypress

# Tests de performance
npm run test:performance

# Tous les tests
npm run test:all
```

### Tests avec Docker
```bash
# Lancer l'environnement de test
docker-compose -f docker-compose.test.yml up -d

# Exécuter les tests E2E
npm run test:e2e:selenium

# Nettoyer l'environnement
docker-compose -f docker-compose.test.yml down
```

## 📈 Rapports et Métriques

### Configuration Jest pour couverture
```javascript
// jest.config.js
module.exports = {
  coverageDirectory: 'test-reports/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    'backend/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**'
  ],
  coverageReporters: ['html', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Génération de rapports
```bash
# Rapport de couverture
npm run test:coverage

# Rapport HTML dans test-reports/coverage/lcov-report/index.html
open test-reports/coverage/lcov-report/index.html
```

## 🔄 Intégration CI/CD

### GitHub Actions
```yaml
# .github/workflows/tests.yml
name: Tests AFRICASA

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:7.0
        ports:
          - 27017:27017
        env:
          MONGO_INITDB_ROOT_USERNAME: test
          MONGO_INITDB_ROOT_PASSWORD: test

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        npm ci
        cd backend && npm ci
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Run E2E tests
      run: npm run test:e2e:selenium
    
    - name: Generate coverage report
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
```

## 🎯 Bonnes pratiques

### Structure des tests
1. **AAA Pattern** : Arrange, Act, Assert
2. **Tests isolés** : Chaque test doit être indépendant
3. **Noms descriptifs** : Tests auto-documentés
4. **Setup/Teardown** : Nettoyage après chaque test

### Performance
1. **Tests parallèles** : Utiliser Jest avec `--maxWorkers`
2. **Mocks appropriés** : Éviter les appels réseau inutiles
3. **Base de données en mémoire** : Pour les tests unitaires

### Maintenance
1. **Page Object Model** : Pour les tests E2E
2. **Fixtures réutilisables** : Données de test centralisées
3. **Assertions explicites** : Messages d'erreur clairs

## 📚 Ressources supplémentaires

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Selenium WebDriver](https://selenium-webdriver.readthedocs.io/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Artillery Documentation](https://artillery.io/docs/)
- [Testing Library](https://testing-library.com/docs/)

---

## 🚀 Prochaines étapes

1. ✅ Conteneurisation de l'application
2. 🧪 Implémentation des tests (ce guide)
3. 📊 Monitoring et observabilité
4. ☁️ Déploiement sur Azure
5. 🔄 Pipeline CI/CD complète

*Ce guide sera mis à jour au fur et à mesure de l'implémentation des tests.*