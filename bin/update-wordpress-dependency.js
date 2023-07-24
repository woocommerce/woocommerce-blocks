const packageJson = require( '../package.json' );
const fs = require( 'fs' );

// From the root of the project, you can run this script with:
// node bin/update-wordpress-dependency.js $wordpress-version

const wpVersion = process.argv[ 2 ];

Object.keys( packageJson.devDependencies ).forEach( ( key ) => {
	if (
		key.includes( '@wordpress' ) &&
		key !== '@wordpress/e2e-test-utils-playwright'
	) {
		packageJson.devDependencies[ key ] = `wp-${ wpVersion }`;
	}
} );

fs.writeFileSync(
	__dirname + '/../package.json',
	JSON.stringify( packageJson, null, '\t' ),
	{
		recusive: true,
	}
);
