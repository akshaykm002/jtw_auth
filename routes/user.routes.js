const express = require('express');
const { signup, signin, getAllUsers } = require('../controllers/user.controller');
const { authenticateToken } = require('../utils/auth.middleware');
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/users',authenticateToken,getAllUsers)



module.exports = router;