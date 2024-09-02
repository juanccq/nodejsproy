import fs from 'fs';
import path, { join } from 'path';
import sequelize from "../../config/database.js";
import { fileURLToPath } from 'url';
import { DataTypes } from "sequelize";

const __filename = fileURLToPath( import.meta.url );
const __dirname = join( __filename, '..' );
const basename = path.basename( __filename );
const models = {};

fs.readdirSync( __dirname )
  .filter( file => {
    return file.indexOf( '.' ) !== 0 && ( file !== basename ) && ( file.slice( -3 ) === '.js' );
  } )
  .forEach( async (file) => {
    const { default: defineModel } = await import( path.join( __dirname, file ) );
    const model = defineModel( sequelize, DataTypes );
    
    models[ model.name ] = model;
  } );

export { sequelize };
export default models;