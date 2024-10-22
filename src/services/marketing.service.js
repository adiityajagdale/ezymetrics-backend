import { Campaign } from '../models/schema.js';

export const marketingService = {
    async fetchDummyMarketingData() {
        return [
            {
                name: "Summer Sale",
                platform: "Facebook",
                budget: 1000,
                status: "Active",
                startDate: new Date(),
                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        ];
    },

    async syncCampaigns() {
        const campaigns = await this.fetchDummyMarketingData();
        return await Campaign.insertMany(campaigns);
    }
};
