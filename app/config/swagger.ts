import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API Documentation",
      version: "1.0.0",
      description: "API documentation for User CRUD operations",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      { url: "http://localhost:5000/api", description: "Local Server" },
    ],
  },
  apis: [
    "./app/auth/auth.routes.ts",
    "./app/routes.ts",
    "./app/users/users.routes.ts",
  ], // Ensure correct paths
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs available at: http://localhost:5000/api-docs");
}
