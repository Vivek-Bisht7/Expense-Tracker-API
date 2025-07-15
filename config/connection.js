const mongoose = require('mongoose');

require('dotenv').config();

const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_URL);
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database connection failed" + err.message);
        process.exit(1);
    }
}

module.exports = dbConnection;