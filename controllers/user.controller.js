const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js');

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



async function signin(req, res) {
    try {
      const { email, password } = req.body;

        const validUser = await User.findOne({ where: { email } });
      if (!validUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const validPassword = await bcrypt.compare(password, validUser.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: validUser.username }, process.env.ACCESS_TOKEN_SECRET);
  
      res.status(200).json({ message: 'Signin successful', token });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
 


  async function getUserbyToken(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1]; 

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 

        const users = await User.findAll({ attributes: { exclude: ['password'] } });

        const filteredUsers = users.filter(user => user.username === decodedToken.userId);

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error retrieving users:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getAllUsers(req, res) {
  try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } });

      res.status(200).json(users);
  } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}



module.exports = { signup ,signin,getAllUsers,getUserbyToken};


