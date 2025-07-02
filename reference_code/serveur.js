const express = require('express');
const { swaggerUi, specs } = require("./src/configs/swaggerConfig.js");
const expressMongoSanitize = require("express-mongo-sanitize");
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./src/routes/user.routes.js');
const connectDB = require('./src/configs/db.js');

dotenv.config({
  path: path.join(__dirname, './src/configs/.env') 
});

const app = express();
connectDB();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50,
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
});
app.use('/api/', limiter);

// Protection contre les attaques NoSQL et XSS
app.use(mongoSanitize());

// Protection contre la pollution des paramètres HTTP
app.use(hpp());

// Compression pour améliorer les performances
app.use(compression());

// Configuration stricte de CORS
const corsOptions = {
  origin: ["http://localhost:3000"], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressMongoSanitize()); // protection contre NoSQL Injection
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.is("application/json")) {
      return res.status(400).json({ message: "Format JSON requis." });
    }
  }
  next();
});

// ici on genere la doccumentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// liste des routes
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`🚀 Serveur sécurisé lancé sur http://localhost:${PORT}`);
});
