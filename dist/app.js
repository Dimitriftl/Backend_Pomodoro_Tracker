"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { initializeRoutes } from "./routes/index";
function application() {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
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
exports.default = application;
