import sequelize from '../../config/database.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import { DataTypes } from 'sequelize';
import User from '../models/user.js';

const model = User(sequelize, DataTypes);

export const register = async (req, res) => {
  try {
    const user = await model.create(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await model.findOne({ where: { email } });
    
    if( !user || !(await user.validatePassword( password )) ) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id:user.id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};