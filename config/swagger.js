const options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
          in: "header"
        },
      },
    },
    info: {
      version: "1.0.0",
      title: "Travel API",
      description:
        "In this Travel API you can find a diverse set of Destinations from different Categories",
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = options;