//express
const express = require('express');
const app = express();

//dotenv
require('dotenv').config();

//handle cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Database Connection
const {dbConnect} = require('./config/connection');
dbConnect();

//form handling
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// // User router setup       !!! improve routes names
const userRoutes = require('./routers/userRoutes');
app.use('/',userRoutes);

// // Expense router setup          !!! improve routes names
const expenseRoutes = require('./routers/expenseRoute');
app.use('/user',expenseRoutes);

//port
app.listen(process.env.PORT,()=>{
    console.log("Server has started running...");
})