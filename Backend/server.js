const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const UserController = require('./controllers/userController');
const MediaController = require('./controllers/mediaController');
const BorrowController = require("./controllers/borrowController");
const SubController = require("./controllers/subscriptionController");
const authenticateToken = require('./middleware/authmiddleware'); 

dotenv.config(); 

const app = express();

// Middleware configuration
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true                
}));
app.use(bodyParser.json());        
app.use(cookieParser());           

const router = express.Router();
app.use('/api', router);

// User Routes
router.post('/login', UserController.login);  
router.post('/loginAccountant', UserController.loginAccountant);  
router.post('/register', UserController.register);  

// Media Routes
router.get('/getHomeMedia',  MediaController.getHomeMedia); 
router.get('/searchMedia', MediaController.searchMedia); 
router.get('/media/:mediaId', authenticateToken, MediaController.getMediaDetails); 

// Borrow Routes 
router.post('/borrow', authenticateToken, BorrowController.borrowMedia);  
router.get('/borrowed', authenticateToken, BorrowController.getBorrowedMedia);


// Subscription Routes
router.get('/subscription', authenticateToken, SubController.getSubscription); 

// Logout Route
app.post('/logout', UserController.logout);


const PORT = 3001;
app.listen(PORT, () => {
  console.log("The server is running on port number: " + PORT);
});
