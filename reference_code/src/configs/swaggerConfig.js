const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de PSP Paiement et Microfinance",
      version: "1.0.0",
      description: "Documentation de l'API",
    },
    servers: [
      {
        url: "http://localhost:5000/api", 
      },
    ],
  },
  apis: ["../routes/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
