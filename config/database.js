import 'dotenv/config';
import { Sequelize } from 'sequelize';

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const DB = process.env.DB_NAME;

const sequelize = new Sequelize( DB, USER, 'mys3cr3tpassw0rd#44', {
  host: HOST,
  dialect: 'postgres'
} );

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default sequelize;

export {
  testConnection,
};