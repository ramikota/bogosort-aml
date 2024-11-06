const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const connectDB = require('/Users/habib/Documents/bogosort-aml/Database/dbConn')
const mongoose = require ('mongoose')
mongoose.set('strictQuery', true)

//Connect TO Mongo DB
connectDB()
mongoose.connection.once('open', ()=> {
    console.log("Connected to MongoDB")
});

app.get("/", (req, res)=>{
    console.log("Response sent")
    res.send("Hello World")})



//setting up the view engine




app.listen(PORT, ()=>{
    console.log("The server is running on port number: "+PORT)
    })


