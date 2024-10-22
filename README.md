# Ezymetrics Backend

## Project Overview

Ezymetrics is a backend service designed to integrate with dummy CRM and marketing platforms. It simulates fetching lead and campaign data, allows storage in a database, and provides functionality to generate reports in various formats (PDF, CSV).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Usage](#api-usage)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

- Integrates with dummy CRM and marketing platforms
- Simulates fetching lead and campaign data
- Data stored in a NoSQL database (MongoDB)
- ETL process for transforming raw data into meaningful metrics
- Generate reports in PDF and CSV formats
- Basic email notifications for alerts based on certain conditions

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- PDFKit (for PDF generation)
- CSV Writer
- Jest (for testing)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ezymetrics-backend.git
   cd ezymetrics-backend

   ```

2. Configure the .env file.

API Usage
Base URL: http://localhost:3000/api/v1

Leads Report:

JSON: GET /reports/leads
CSV: GET /reports/leads?format=csv
PDF: GET /reports/leads?format=pdf
Campaigns Report:

JSON: GET /reports/campaigns
CSV: GET /reports/campaigns?format=csv
PDF: GET /reports/campaigns?format=pdf

Request Example:
curl -X GET "http://localhost:3000/api/v1/reports/leads?format=pdf"
npm test
