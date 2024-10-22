import { Lead } from '../models/schema.js';

export const crmService = {
    async fetchDummyCRMData() {
        return [
            { name: "John Doe", email: "john@example.com", source: "Website", status: "New" },
            { name: "Jane Smith", email: "jane@example.com", source: "LinkedIn", status: "Contacted" }
        ];
    },

    async syncLeads() {
        const leads = await this.fetchDummyCRMData();
        return await Lead.insertMany(leads);
    }
};
