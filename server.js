const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = 'App8fVdWU8QWuXWHQ3NXu1YjwXe6IMKA';
const apiSecret = 'MxdZGWp5lQc0wMlS';

app.use(express.json());
app.use(express.static('public'));

app.post('/track', async (req, res) => {
  const { trackingNumber } = req.body;
  
  try {
    const response = await axios.get(`https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`, {
      headers: {
        'DHL-API-Key': apiKey
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tracking information');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
