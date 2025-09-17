const express = require('express');
const mongoose = require('mongoose');
const blockRoutes = require('./routes/blockRoutes');

// const statisticsRoutes = require('./routes/statisticsRoutes');
// app.use('/statistics', statisticsRoutes);

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/voting', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

// Use block routes
app.use('/blocks', blockRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
