import 'dotenv/config';
import express from 'express';
import http from 'http';
import chalk from 'chalk';
import routes from './routes/index.js';

const port = process.env.PORT || 3000;

const app = express();
app.use( '/api', routes );

const server = http.createServer(app);

server.listen(port, () => {
  console.log(chalk.green('Server running on port %s'), port);
});