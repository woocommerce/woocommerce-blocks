/**
 * Script to override the default plugins that wp-env will be initialised with.
 * It will write a .wp-env.override.json file with any plugins provided
 * by CLI arguments.
 *
 * You can use the script as follows:
 *
 * `node wp-env-override.js --plugins https://downloads.wordpress.org/plugin/gutenberg.latest-stable.zip
 *
 * It can be called with any number of arguments after --plugins.
 * The arguments should contain a url with the plugin zip file
 */

const fs = require( 'fs' );
const path = require( 'path' );

const wpEnvRaw = fs.readFileSync(
	path.join( __dirname, '..', '.wp-env.json' )
);
const wpEnv = JSON.parse( wpEnvRaw );
const indexOfPluginsOptn = process.argv.indexOf( '--plugins' );
const plugins = Array.from(
	new Set( process.argv.slice( indexOfPluginsOptn + 1 ) )
);

plugins.forEach( ( plugin ) => wpEnv.plugins.push( plugin ) );
// We write the new file to .wp-env.override.json (https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#wp-env-override-json)
fs.writeFileSync(
	path.join( __dirname, '..', '.wp-env.override.json' ),
	JSON.stringify( wpEnv )
);
