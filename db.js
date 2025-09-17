    require('dotenv').config(); // create .env file
    const mongoose = require('mongoose');

    const dbURI = process.env.MONGODB_URI;

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('MongoDB connection error:', error));


    module.exports = mongoose;