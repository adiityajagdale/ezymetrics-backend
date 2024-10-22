// src/routes.js
import crmRoutes from './routes/crm.routes.js';
import marketingRoutes from './routes/marketing.routes.js';
import reportRoutes from './routes/report.routes.js';

export const setupRoutes = (app) => {
    // API version prefix
    const API_PREFIX = '/api/v1';

    // Health check endpoint
    app.get('/health', (req, res) => {
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    });

    // API routes
    app.use(`${API_PREFIX}/crm`, crmRoutes);
    app.use(`${API_PREFIX}/marketing`, marketingRoutes);
    app.use(`${API_PREFIX}/reports`, reportRoutes);

    // 404 handler
    app.use((req, res) => {
        res.status(404).json({
            status: 'error',
            message: 'Route not found'
        });
    });
};