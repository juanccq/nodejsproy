import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';
import Order from '../models/order.js';

const model = Order(sequelize, DataTypes);
console.log('++models', model);

export const createOrder = async (req, res) => {
  try {
    const order = await model.create( req.body );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error:'Failed to create order', details: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await model.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders', details: error.message });
  }
};