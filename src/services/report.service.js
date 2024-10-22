import fs from 'fs';
import PDFDocument from 'pdfkit';
import { Lead, Campaign } from '../models/schema.js';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';

export const reportService = {
    async generateReport(type, format) {
        let data;

        if (type === 'leads') {
            data = await Lead.find();
        } else if (type === 'campaigns') {
            data = await Campaign.find();
        } else {
            throw new Error('Invalid report type');
        }

        if (format === 'json') {
            return data;
        } else if (format === 'csv') {
            const filename = `report_${type}_${Date.now()}.csv`;
            const filepath = path.join(process.cwd(), 'reports', filename);

            await fs.promises.mkdir(path.join(process.cwd(), 'reports'), { recursive: true });

            const csvWriter = createObjectCsvWriter({
                path: filepath,
                header: Object.keys(data[0].toObject()).map(id => ({ id, title: id }))
            });

            await csvWriter.writeRecords(data);
            return filepath;
        } else if (format === 'pdf') {
            const filename = `report_${type}_${Date.now()}.pdf`;
            const filepath = path.join(process.cwd(), 'reports', filename);

            await fs.promises.mkdir(path.join(process.cwd(), 'reports'), { recursive: true });

            const doc = new PDFDocument();
            const writeStream = fs.createWriteStream(filepath); // Use fs.createWriteStream here

            doc.pipe(writeStream);

            // Add content to the PDF
            doc.fontSize(25).text(`Report for ${type}`, { align: 'center' });

            data.forEach(item => {
                doc.addPage().fontSize(12).text(JSON.stringify(item.toObject()));
            });

            doc.end();

            // Return a promise that resolves when the write stream finishes
            await new Promise((resolve, reject) => {
                writeStream.on('finish', resolve);
                writeStream.on('error', reject);
            });

            return filepath;
        }

        throw new Error('Unsupported format');
    }
};
