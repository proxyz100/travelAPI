const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Travel API",
      description:
        "In this Travel API you can find a diverse set of Destinations from different Categories",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    }
  },
  apis: ["./routes/*.js"],
};

module.exports = options;