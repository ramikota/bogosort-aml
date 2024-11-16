const express = require("express");
const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const sequelize = require("./config/db");
// const userController = require("./controllers/userController");
// const subscriptionController = require("./controllers/subscriptionController");
// const mediaController = require("./controllers/mediaController");
//const authMiddleware = require("./middlewares/authMiddleware"); // Moved the import here to avoid duplication
const router = express.Router(); // Initialize router

// Initialize Express app
const app = express();
dotenv.config(); // No need to call it again if already required

// Middleware
// app.use(cors());
// app.use(bodyParser.json());

// Set the port for the server
const PORT = process.env.PORT || 3000;

// User Routes
// const { register, login, getBorrowedBooks } = userController;
// router.post("/register", register);
// router.post("/login", login);
//router.get("/borrowed", authMiddleware, getBorrowedBooks);

// Media Routes
// const { searchMedia, borrowMedia } = mediaController;
// router.get("/search", searchMedia);
//router.post("/:mediaId/borrow", authMiddleware, borrowMedia);

// Subscription Routes
//const { subscribeUser, processPayment } = subscriptionController;
//router.post("/subscribe", authMiddleware, subscribeUser);
//router.post("/payment", authMiddleware, processPayment);



// Home Route
app.get("/", (req, res) => {
  res.send("Library Management System");
});

// Use Router
//app.use(router);

// Sync Database and Start Server

  app.listen(PORT, () => {
    console.log("The server is running on port number: " + PORT);
  
});