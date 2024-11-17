const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();

app.use(bodyParser.json());

// User Routes
app.use('/api/users', userRoutes);

// Set the port for the server
const PORT = 3000;


// Home Route
app.get("/", (req, res) => {
  res.send("Library Management System");
});



  app.listen(PORT, () => {
    console.log("The server is running on port number: " + PORT);
  
});