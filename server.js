const express = require('express');
const cors = require('cors');
const path = require('path');

// Try to load config, fall back to environment variables
let config;
try {
    config = require('./config.js');
} catch (e) {
    config = {
        GOOGLE_SHEETS_ID: process.env.GOOGLE_SHEETS_ID,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        PORT: process.env.PORT || 3001
    };
}

const app = express();
const PORT = config.PORT;

// Enable CORS for all routes
app.use(cors());

// Serve static files from current directory
app.use(express.static('.'));

// API endpoint to fetch beer data
app.get('/api/beers', async (req, res) => {
    try {
        const GOOGLE_SHEETS_ID = config.GOOGLE_SHEETS_ID;
        const GOOGLE_API_KEY = config.GOOGLE_API_KEY;
        
        if (!GOOGLE_SHEETS_ID || !GOOGLE_API_KEY) {
            return res.status(500).json({ error: 'Google Sheets not configured' });
        }
        
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/Sheet1!A:F?key=${GOOGLE_API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch from Google Sheets');
        }
        
        const data = await response.json();
        const rows = data.values;
        
        if (!rows || rows.length === 0) {
            return res.json([]);
        }
        
        // Skip header row and parse data
        const beers = rows.slice(1).map(row => ({
            name: row[0] || '',
            type: row[1] || '',
            abv: row[2] || '',
            ibu: row[3] || '',
            status: row[4] || 'available',
            description: row[5] || ''
        }));
        
        res.json(beers);
        
    } catch (error) {
        console.error('Error fetching beers:', error);
        res.status(500).json({ error: 'Failed to fetch beer data' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; 