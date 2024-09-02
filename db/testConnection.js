import 'dotenv/config';
import { createRequire } from 'module';
import pg from 'pg';

const require = createRequire( import.meta.url );
const waitPort = require( 'wait-port' );

const HOST_PG = '127.0.0.1';
const USER = process.env.DB_USER;
const DB = process.env.DB_NAME;
const PORT = 6543;

async function testConnectionPG() {
  console.log('port', PORT, typeof PORT);
  
  await waitPort({
    host: HOST_PG,
    port: PORT,
    timeout: 10000,
    waitForDns: true,
  });

  const client = new pg.Client({
    host: HOST_PG,
    user: USER,
    password: 'mys3cr3tpassw0rd#44',
    database: DB,
  });

  try {
    await client.connect();
    console.log(`Connected to Postgres database: ${DB}`);
  } catch (error) {
    console.error('Error connecting to Postgres database:', error);
  }
}

await testConnectionPG();