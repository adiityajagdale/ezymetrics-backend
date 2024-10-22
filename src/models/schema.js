// src/models/schema.js
import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    source: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['New', 'Contacted', 'Qualified', 'Lost']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Paused', 'Completed']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

export const Lead = mongoose.model('Lead', leadSchema);
export const Campaign = mongoose.model('Campaign', campaignSchema);