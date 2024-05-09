const express = require('express');
const { signup, signin, getAllUsers, getUserbyToken } = require('../controllers/user.controller');
const { authenticateToken } = require('../utils/auth.middleware');
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/user',authenticateToken,getUserbyToken)
router.get('/users',getAllUsers)





module.exports = router;