import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';
import User from '../models/user.js';

const model = User(sequelize, DataTypes);

export const getUsers = async (req, res) => {
  try {
    const users = await model.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users', details: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await model.findByPk(req.params.id);

    if( user ) {
      user.status(200).json(user);
    }
    else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user', details: error.message });
  }
};