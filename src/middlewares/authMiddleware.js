import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import User from '../models/user.js';
import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';

const model = User(sequelize, DataTypes);

export const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if( !token ) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify( token, config.jwtSecret );
    req.user = await model.findByPk( decoded.id );

    if( !req.user ) {
      throw new Error('User not found');
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    console.log('Error on loggin', error);
  }
};