const Log = require('../logging_middleware/logger');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy notifications data
const notifications = [
    {
        id: 1,
        category: 'Placement',
        title: 'Google Interview Shortlist',
        message: 'Congratulations! You have been shortlisted for the round 1 interview with Google for the SWE role.',
        type: 'placement'
    },
    {
        id: 2,
        category: 'Event',
        title: 'Annual Hackathon 2026',
        message: 'Registration is now open for the campus-wide hackathon. Join us for 48 hours of innovation!',
        type: 'event'
    }
];

app.get('/api/notifications', (req, res) => {
    Log('backend', 'info', 'route', 'Fetched notifications list'); res.json(notifications);
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

