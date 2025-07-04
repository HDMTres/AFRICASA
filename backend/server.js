require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Auth rate limiting (more restrictive)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit auth requests to 5 per 15 minutes
  message: 'Trop de tentatives de connexion, veuillez réessayer plus tard.',
});
app.use('/api/auth', authLimiter);

// Protection against NoSQL injection and XSS
app.use(mongoSanitize());

// Protection against HTTP Parameter Pollution
app.use(hpp());

// Compression for better performance
app.use(compression());

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir les fichiers statiques uploadés
app.use('/uploads', express.static('uploads'));

// JSON format validation middleware (sauf pour multipart/form-data)
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.headers['content-type'] && 
        !req.is("application/json") && 
        !req.is("multipart/form-data")) {
      return res.status(400).json({ message: "Format JSON ou multipart requis." });
    }
  }
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
const userRoutes = require('./routes/userRoute');
const propertyRoutes = require('./routes/propertyRoute');
const mailsRoutes = require('./routes/mailRoute');
const healthRoutes = require('./routes/healthRoute');

// Health check routes (before API routes)
app.use('/', healthRoutes);

// API Routes avec préfixe /api
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/mails', mailsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'AFRICASA API Server is running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint - AJOUTEZ CETTE LIGNE
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'AFRICASA Backend',
    version: '1.0.0',
    port: process.env.PORT || 5000
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AFRICASA API Server sécurisé lancé sur http://localhost:${PORT}`);
  console.log(`📖 Environnement: ${process.env.NODE_ENV || 'development'}`);
});
