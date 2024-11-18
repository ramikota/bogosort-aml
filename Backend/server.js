const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const UserController = require('./controllers/userController');
const cors = require('cors');


// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

const router = express.Router();
app.use('/api', router);

router.post('/login', UserController.login);  // for login
router.post('/register', UserController.register);  // for registration




// Home Route
app.get("/", (req, res) => {
  res.send("Library Management System");
});


// Set the port for the server
const PORT = 3001;

  app.listen(PORT, () => {
    console.log("The server is running on port number: " + PORT);
  
});