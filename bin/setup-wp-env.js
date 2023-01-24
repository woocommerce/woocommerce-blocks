const fs = require( 'fs' );
const path = require( 'path' );
const { isEmpty } = require( 'lodash' );

const wpEnvRaw = fs.readFileSync(
	path.join( __dirname, '..', '.wp-env.json' )
);

const wpEnv = JSON.parse( wpEnvRaw );

if ( ! isEmpty( process.env.GUTENBERG_EDITOR_CONTEXT ) ) {
	wpEnv.plugins.push(
		'https://downloads.wordpress.org/plugin/gutenberg.latest-stable.zip'
	);
}

fs.writeFileSync(
	path.join( __dirname, '..', '.wp-env.override.json' ),
	JSON.stringify( wpEnv )
);
