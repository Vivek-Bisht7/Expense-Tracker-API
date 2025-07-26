const express = require('express');
const router = express.Router();
const {authorization} = require('../middleware/authMiddleware');

const {createExpense , readExpenses ,updateExpenses, deletedExpense} = require('../controllers/expenseController');
 
router.post('/expenses' , authorization , createExpense);
router.get('/expenses' , authorization , readExpenses);
router.put('/expenses/:id',authorization , updateExpenses);
router.delete('/expenses/:id',authorization,deletedExpense);

module.exports = router;