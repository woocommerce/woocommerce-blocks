const fs = require( 'fs' );
const Mustache = require( 'mustache' );

function objectToFileName( targetObj ) {
	// An utility function to flatten the object and create a string
	function flattenObj( obj, parentKey = '', result = [] ) {
		for ( const key in obj ) {
			if ( obj.hasOwnProperty( key ) ) {
				const newKey = parentKey ? `${ parentKey }-${ key }` : key;
				if (
					typeof obj[ key ] === 'object' &&
					! Array.isArray( obj[ key ] ) &&
					obj[ key ] !== null
				) {
					flattenObj( obj[ key ], newKey, result );
				} else {
					result.push( `${ newKey }-${ obj[ key ] }` );
				}
			}
		}
		return result;
	}

	const flattened = flattenObj( targetObj ).join( '_' );
	const fileName = flattened.replace( /[^a-zA-Z0-9-_]/g, '' ).toLowerCase(); // Remove special characters
	const maxLength = 200; // Set a max length to avoid exceeding OS limits, adjust as necessary.

	return fileName.length > maxLength
		? fileName.substr( 0, maxLength )
		: fileName;
}

function generateFixtures() {
	// scan the e2e/tests directory and for each subdir, scan the fixtures.json
	// file and pass it to handlebars
	const blockDirs = fs.readdirSync( 'tests/e2e/tests' );

	for ( const blockDir of blockDirs ) {
		const fixturesDir = `tests/e2e/tests/${ blockDir }/fixtures`;
		const fixturesPath = `${ fixturesDir }/fixture.json`;

		if ( fs.existsSync( fixturesPath ) ) {
			const fixtureData = JSON.parse(
				fs.readFileSync( fixturesPath, 'utf8' )
			);

			for ( const blockAttributes of fixtureData ) {
				const fixturesTemplate = fs.readFileSync(
					`${ fixturesDir }/template.mustache`,
					'utf8'
				);

				const header = `<!-- THIS IS A GENERATED FILE. DO NOT EDIT DIRECTLY. -->\n`;

				// First create the build directory if not exists
				if ( ! fs.existsSync( `${ fixturesDir }/build` ) ) {
					fs.mkdirSync( `${ fixturesDir }/build` );
				}

				const fixtureFilePath = `${ fixturesDir }/build/${ objectToFileName(
					blockAttributes
				) }.html`;

				fs.writeFileSync( fixtureFilePath, header );

				const result = Mustache.render( fixturesTemplate, {
					blockAttributes: `${ JSON.stringify(
						blockAttributes
					).slice( 1, -1 ) },`,
				} );

				fs.writeFileSync( fixtureFilePath, result );
			}
		}
	}
}

generateFixtures();
