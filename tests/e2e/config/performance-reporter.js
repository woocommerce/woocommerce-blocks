/**
 * External dependencies
 */
const { readFileSync, statSync } = require( 'fs' );
const chalk = require( 'chalk' );
const { PERFORMANCE_REPORT_FILENAME } = require( '../../utils/constants' );

class PerformanceReporter {
	onRunComplete() {
		if ( statSync( PERFORMANCE_REPORT_FILENAME ).size === 0 ) {
			return;
		}
		const reportFileContents = readFileSync( PERFORMANCE_REPORT_FILENAME )
			.toString()
			.split( '\n' )
			.slice( 0, -1 )
			.map( ( line ) => JSON.parse( line ) );

		reportFileContents.forEach( ( testReport ) => {
			// eslint-disable-next-line no-console
			console.log(
				chalk.bgGreenBright.underline.bold( testReport.description )
			);
			// eslint-disable-next-line no-console
			console.log( chalk.red( `Longest: ${ testReport.longest }ms` ) );
			// eslint-disable-next-line no-console
			console.log(
				chalk.green( `Shortest: ${ testReport.shortest }ms` )
			);
			// eslint-disable-next-line no-console
			console.log( chalk.yellow( `Average: ${ testReport.average }ms` ) );
			// eslint-disable-next-line no-console
			console.log( '' );
		} );
	}
}

module.exports = PerformanceReporter;
