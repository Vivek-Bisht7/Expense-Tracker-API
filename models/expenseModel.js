const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        trim : true,
    },
    category : {
        type : String,
        enum : ['Groceries','Leisure','Electronics','Utilities','Clothing','Health','Others'],
        required:true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    amount : {
        type : Number,
        required : true,
        min : 0.01,
    },
    date : {
        type : Date,
        default : Date.now,
    }
},
{
    timestamps : true
} 

);

module.exports = mongoose.model("Expense" , expenseSchema);