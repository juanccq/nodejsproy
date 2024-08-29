import { readdir } from 'fs/promises';
import { Router } from 'express';
import { fileURLToPath } from 'url';
import { join } from 'path';
import chalk from 'chalk';

const __filename = fileURLToPath( import.meta.url );
const __dirname = join( __filename, '..' );

const router = Router();

async function loadAPIRoutes( directory ) {  
  const routeItems = await readdir( directory, { withFileTypes: true } );

  for( const item of routeItems ) {
    if( item.isDirectory() ) {
      // Load sub-directories recursively
      await loadAPIRoutes( join( directory, item.name ) );
    }
    else if( item.isFile() && item.name.endsWith( '.js' ) ) {
      let routePath = join(directory, item.name).replace( __dirname, '' ).replace(/\\/g, '/');
      routePath = routePath.startsWith('/') ?  `.${routePath}` :  `./${routePath}`;
      
      // Ignore this file itself
      if( routePath === './index.js' ) { continue; }

      const route = await import( routePath );  
      const routeDirectory = directory.replace( __dirname, '' );
      const routeName = routeDirectory + ( item.name === 'index.js' ? '' : `/${item.name.replace( '.js', '' )}` );

      // Register the route
      router.use( routeName, route.default );
      console.log(chalk.blue('Route loaded: %s'), routeName);
    }
  }
}

await loadAPIRoutes( __dirname );

export default router;