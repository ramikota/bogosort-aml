const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const branchRoutes = require('./routes/branchRoutes');

//Initialize Express app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3000

// // Load environment variables from .env file
// dotenv.config();


// // Connect to MongoDB
// const mongoURI = process.env.MONGODB_URI;
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((error) => console.error('MongoDB connection error:', error));


app.get('/', (req, res) => {
    res.send('Library Management System');
  });

// Start the server
app.listen(PORT, ()=>{
    console.log("The server is running on port number: "+PORT)
    })


