const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const UserController = require('./controllers/userController');
const MediaController = require('./controllers/mediaController');
const cors = require('cors');


// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

const router = express.Router();
app.use('/api', router);

// User Routes
router.post('/login', UserController.login);  // for login
router.post('/loginAccountant', UserController.loginAccountant);  // for login
router.post('/register', UserController.register);  // for registration

// Media Routes
router.get('/getHomeMedia', MediaController.getHomeMedia); // Endpoint for fetching all media
router.get('/searchMedia', MediaController.searchMedia); // Endpoint for searching media

// Route to get media details and availability by branch
router.get('/media/:mediaId', MediaController.getMediaDetails);

// Route to borrow a media item
router.post('/borrow', MediaController.borrowMedia);

// Home Route
app.get("/", (req, res) => {
  res.send("Library Management System");
});


// Set the port for the server
const PORT = 3001;

  app.listen(PORT, () => {
    console.log("The server is running on port number: " + PORT);
  
});