import express from 'express';
import { reportService } from '../services/report.service.js';

const router = express.Router();

// Define the route for generating reports
router.get('/:type', async (req, res, next) => {
    try {
        const { type } = req.params;
        const format = req.query.format || 'json';

        const result = await reportService.generateReport(type, format);

        if (format === 'csv') {
            res.download(result); // For CSV files
        } else if (format === 'pdf') {
            res.download(result); // For PDF files
        } else {
            res.json(result); // For JSON responses
        }
    } catch (error) {
        next(error);
    }
});

export default router;
