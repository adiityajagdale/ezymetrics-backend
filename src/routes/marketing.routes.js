import express from 'express';
import { marketingService } from '../services/marketing.service.js';

const router = express.Router();

router.post('/sync', async (req, res, next) => {
    try {
        const campaigns = await marketingService.syncCampaigns();
        res.json({
            status: 'success',
            message: 'Marketing data synced successfully',
            records: campaigns.length
        });
    } catch (error) {
        next(error);
    }
});

export default router;  