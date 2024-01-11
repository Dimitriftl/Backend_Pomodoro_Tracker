import express from "express";
// import { initializeRoutes } from "./routes/index";

export default function application() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  // Connect to DB
  // connectMongodb()
  // Initialize routes
  // initializeRoutes(app);
  // Configure a middleware for 404s
  
  app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found on the server</h1>");
  });

  return app;
}
