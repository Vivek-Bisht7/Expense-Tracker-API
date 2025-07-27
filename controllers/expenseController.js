const Expense = require('../models/expenseModel');
const dayjs = require('dayjs');

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

const getDateRange = (filter,fromQuery,toQuery)=>{
    const today = dayjs();

    switch(filter) {
        case 'Last_Week' :
            return {from:today.subtract(7,"day") , to:today};

        case 'Last_Month' :
            return {from:today.subtract(30,"day") , to:today};

        case 'Last_3_Month' :
            return {from:today.subtract(90,"day") , to:today};

        case 'Custom' :
            return {from:fromQuery , to:toQuery};

        default :
            throw new Error("Invalid filter");
    }
}

const readExpenses = async (req,res)=>{
        try{
            // If no query is there that means the user wants all expenses that belong to him
            if(!req.query.filter && !req.query.from && !req.query.to){
                const expenses = await Expense.find({user:req.user.id});
                return res.status(200).json({expenses});
            }

            // If the user wants no filter only from a date to , to a date
            if(!req.query.filter && req.query.from && req.query.to){
                const query = {
                    user : req.user.id,
                    date : {$gte:req.query.from , $lte:req.query.to},
                }

                const expenses = await Expense.find(query);
                return res.status(200).json({expenses});
            }

            // If the user want only from the date
            if(!req.query.filter && req.query.from && !req.query.to){
                const query = {
                    user : req.user.id,
                    date : {$gte:req.query.from},
                }

                const expenses = await Expense.find(query);
                return res.status(200).json({expenses});
            }

            // If the user want only upto a date
            if(!req.query.filter && !req.query.from && req.query.to){
                const query = {
                    user : req.user.id,
                    date : {$lte:req.query.to},
                }

                const expenses = await Expense.find(query);
                return res.status(200).json({expenses});
            }

            // filters
            const {from,to} = getDateRange(req.query.filter,req.query.from,req.query.to);

            const query = {
                user : req.user.id,
                date : {$gte: from , $lte: to},
            }

            const expenses = await Expense.find(query);

            return res.status(200).json({expenses});
        }
        catch(err){
            return res.status(500).json({"message":"Internal server error :" +  err.message });
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