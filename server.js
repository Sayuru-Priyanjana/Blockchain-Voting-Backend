// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import db connection (your db.js already connects)
require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running and connected to MongoDB Atlas');
});

// Example placeholder route for votes
app.get('/votes', (req, res) => {
  res.json({ message: 'Votes endpoint placeholder' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
