

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/track/:trackingNumber', async (req, res) => {
    const { trackingNumber } = req.params;
    const apiKey = process.env.DHL_API_KEY;
    const apiSecret = process.env.DHL_API_SECRET;
    
    const url = `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}&service=express&language=en`;
    const authHeader = {
        'DHL-API-Key': apiKey,
        'DHL-API-Secret': apiSecret,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(url, { headers: authHeader });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
