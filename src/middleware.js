// src/middleware.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from './config/config.js';

export const setupMiddleware = (app) => {
    // Enable CORS
    app.use(cors({
        origin: config.corsOrigins || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Logging middleware
    if (process.env.NODE_ENV === 'production') {
        app.use(morgan('combined'));
    } else {
        app.use(morgan('dev'));
    }

    // Security middleware
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });

    // Request ID middleware
    app.use((req, res, next) => {
        req.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        next();
    });

    // Response time middleware
    app.use((req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
        });
        next();
    });
};