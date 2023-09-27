const fs = require( 'fs' );

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
					`${ fixturesDir }/template.hbs`,
					'utf8'
				);
				const result = fixturesTemplate.replace(
					'{{{ attributes }}}',
					Object.entries( blockAttributes ).reduce(
						( acc, [ key, val ] ) => {
							return `${ acc } "${ key }": "${ val }",`;
						},
						''
					)
				);

				fs.writeFileSync(
					`tests/e2e/tests/${ blockDir }/build/${ Object.entries(
						blockAttributes
					)
						.map( ( [ key, val ] ) => `${ key }-${ val }` )
						.join( '_' ) }.html`,
					result
				);
			}
		}
	}
}

generateFixtures();
