// src/app.js
import express from 'express';
import { setupMiddleware } from './middleware.js';
import { setupRoutes } from './routes.js';
import { config } from './config/config.js';
import { connectDB } from './services/database.js';

const app = express();

// Setup middleware
setupMiddleware(app);

// Setup routes
setupRoutes(app);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});

export default app;