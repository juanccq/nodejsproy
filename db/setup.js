import sequelize from '../config/database.js';
import models from '../src/models/index.js';
import minimist from 'minimist';
import inquirer from 'inquirer';

const args = minimist(process.argv);
const prompt = inquirer.createPromptModule();

async function setup() {
  console.log('args', args, args.yes);
  
  if( !args.yes ) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'Desea borrar y crear la base de datos?'
      }
    ]);
  
    if( !answer.setup ) {
      return console.log('Setup skipped.');
    }
  }


  try {
    await sequelize.sync({ force: true });
    console.log('Models synchronized and created', Object.keys( models ).join( ', ' ) + '.');
  }
  catch (error) {
    console.error(error);
  }
}

setup().then( () => console.log('Setup is done...') );