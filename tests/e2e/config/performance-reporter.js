/**
 * External dependencies
 */
const { readFileSync } = require( 'fs' );
const chalk = require( 'chalk' );
const { PERFORMANCE_REPORT_FILENAME } = require( '../../utils/constants' );

class PerformanceReporter {
	onTestResult() {
		const reportFileContents = readFileSync( PERFORMANCE_REPORT_FILENAME )
			.toString()
			.split( '\n' )
			.map( ( line ) => JSON.parse( line ) );

		reportFileContents.forEach( ( testReport ) => {
			// eslint-disable-next-line no-console
			console.log(
				chalk.bgGreenBright.underline.bold( testReport.description )
			);
			// eslint-disable-next-line no-console
			console.log( chalk.red( `Longest: ${ testReport.longest }` ) );
			// eslint-disable-next-line no-console
			console.log( chalk.green( `Shortest: ${ testReport.shortest }` ) );
			// eslint-disable-next-line no-console
			console.log( chalk.yellow( `Average: ${ testReport.average } ` ) );
		} );

		// eslint-disable-next-line no-console
		console.log( '' );
	}
}

module.exports = PerformanceReporter;
