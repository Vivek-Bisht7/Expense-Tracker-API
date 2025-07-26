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
        return res.status(500).json({message:"Internal server error" + err.message});
    }
}

const readExpenses = async (req,res)=>{
    try{
        const user = req.user.id;

        const expenses = await Expense.find({user});

        return res.status(200).json({expenses});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error" + err.message});
    }
}

const updateExpenses = async (req,res) => {
    try{
        const id = req.params.id;

        const updatedExpense = await Expense.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
        });

        if(!updatedExpense){
            return res.status(400).json({message:"Unauthorized to update the expnese"});
        }

        return res.status(200).json({success:true,Expnese : updatedExpense});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error" + err.message});
    }
}

const deletedExpense = async (req,res)=>{
    const id = req.params.id;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    return res.status(200).json({message : "Expense deleted successfully" , Deleted_Expense : deletedExpense});
}

module.exports = {createExpense , readExpenses , updateExpenses , deletedExpense};