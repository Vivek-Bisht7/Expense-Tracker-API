const express = require('express');
const app = express();

const dbConnection = require('./config/connection');

dbConnection();

require('dotenv').config()

app.get('/' , (req,res)=>{
    res.send("Namaste");
})

app.listen(process.env.PORT , ()=>{
    console.log("Server has started running..");
})