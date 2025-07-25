const Expense = require('../models/expenseModel');

const createExpense = async (req,res)=>{
    const {name,category,amount,date} = req.body;
    const user = req.user.id;

    try{
        const expense = new Expense({name,category,user,amount,date});
        await expense.save();

        return res.status(201).json({expense});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

const readExpenses = async (req,res)=>{
    try{
        const user = req.user.id;

        const expenses = await Expense.find({user});

        return res.status(200).json({expenses});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports = {createExpense , readExpenses};