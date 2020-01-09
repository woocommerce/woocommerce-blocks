'use strict';

const chalk = require( 'chalk' );
const { fetchAllPages, getEntry } = require( './requests' );

/* eslint no-console: 0*/

const make = async ( version ) => {
	const rawEntries = await fetchAllPages( version );
	let entries = await Promise.all(
		rawEntries.map( async ( pr ) => await getEntry( pr ) )
	);
	if ( ! entries || ! entries.length ) {
		console.log(
			chalk.yellow( "This version doesn't have any associated PR." )
		);
		return;
	}

	entries = entries.filter( Boolean );

	if ( ! entries || ! entries.length ) {
		console.log(
			chalk.yellow(
				'None of the PRs of this version are eligible for the changelog.'
			)
		);
		return;
	}
	entries.sort();
	console.log( entries.join( '\n' ) );
};

module.exports = { make };
