import express from 'express';
import { crmService } from '../services/crm.service.js';
import { emailService } from '../services/email.service.js';

const router = express.Router();

router.post('/sync', async (req, res, next) => {
    try {
        const leads = await crmService.syncLeads();

        if (leads.length > 10) {
            await emailService.sendAlert(
                'High Lead Volume Alert',
                `Received ${leads.length} new leads in the latest sync.`
            );
        }

        res.json({
            status: 'success',
            message: 'CRM data synced successfully',
            records: leads.length
        });
    } catch (error) {
        next(error);
    }
});

export default router;