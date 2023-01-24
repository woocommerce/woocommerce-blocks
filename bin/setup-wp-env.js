const fs = require( 'fs' );
const path = require( 'path' );

const wpEnvRaw = fs.readFileSync(
	path.join( __dirname, '..', '.wp-env.json' )
);

const wpEnv = JSON.parse( wpEnvRaw );

if ( process.env.GUTENBERG_EDITOR_CONTEXT ) {
	wpEnv.plugins.push(
		'https://downloads.wordpress.org/plugin/gutenberg.latest-stable.zip'
	);
}

if ( process.env.WORDPRESS_VERSION ) {
	wpEnv.core = `WordPress/WordPress#${ process.env.WORDPRESS_VERSION }`;
}

fs.writeFileSync(
	path.join( __dirname, '..', '.wp-env.override.json' ),
	JSON.stringify( wpEnv )
);
