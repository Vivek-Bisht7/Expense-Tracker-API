//express
const express = require('express');
const app = express();

//Database Connection
const {dbConnect} = require('./config/connection');
dbConnect();

//form handling
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//router setup
const userRoutes = require('./routers/userRoutes');
app.use('/',userRoutes);

//dotenv
require('dotenv').config();


//port
app.listen(process.env.PORT,()=>{
    console.log("Server has started running...");
})