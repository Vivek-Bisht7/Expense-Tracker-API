const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_URL);
        console.log("Server connected to database...");
    } 
    catch(err){
        console.log("Faild to connect with database... ERROR : " + err.message);
        process.exit(1);
        
    }
}

module.exports = {dbConnect};