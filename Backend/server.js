const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000


app.get("/", (req, res)=>{
    console.log("Response sent")
    res.send("Hello World")})



//setting up the view engine




app.listen(PORT, ()=>{
    console.log("The server is running on port number: "+PORT)
    })

