// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const blockRoutes = require('./routers/blockRoutes');
const chains = require('./routers/VotingSection');
const candidateNames = require('./routers/candidatenames');
const statisticsRoutes = require('./routers/staticticsRoutes');
const userRoutes = require('./routers/UserRoutes');
const authRoutes = require('./routers/authRoutes');

// Import db connection (your db.js already connects)
require('./db');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running and connected to MongoDB Atlas');
});



app.use('/admin-voting', chains);
app.use('/blocks', blockRoutes);
app.use('/candidates', candidateNames);
app.use('/statistics', statisticsRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Handle undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
