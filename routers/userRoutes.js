const express = require('express');
const router = express.Router();

const {userRegistration} = require('../controllers/userControllers');

router.post('/register',userRegistration);

module.exports = router;