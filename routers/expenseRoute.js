const express = require('express');
const router = express.Router();
const {authorization} = require('../middleware/authMiddleware');

const {createExpense , readExpenses} = require('../controllers/expenseController');
 
router.post('/expenses' , authorization , createExpense);
router.get('/expenses' , authorization , readExpenses);

module.exports = router;