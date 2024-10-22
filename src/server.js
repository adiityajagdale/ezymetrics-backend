// src/server.js
import app from './app.js';
import { config } from './config/config.js';
import { connectDB } from './services/database.js';

const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Start server
        app.listen(config.port, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${config.port}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.error('Unhandled Promise Rejection:', err);
            // Don't exit the process in development
            if (process.env.NODE_ENV === 'production') {
                process.exit(1);
            }
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();