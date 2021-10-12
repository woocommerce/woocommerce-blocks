'use strict';
/* eslint no-console: 0 */

/**
 * External dependencies
 */
const chalk = require( 'chalk' );

/**
 * Internal dependencies
 */
const { params, returns, example, related } = require( '../format-hook-doc' );
const {
	createDocs,
	generateHookName,
	generateIntroduction,
	sectionWithHeading,
	generateToc,
} = require( '../utilities' );

const generate = ( hooks ) => {
	console.log( chalk.blue( 'Generating Filter Docs...' ) );

	const jsonDocs = [
		{ h1: 'Filters' },
		{ h2: 'Table of Contents' },
		...generateToc( hooks ),
		{ hr: '' },
		...hooks.map( ( hook ) => {
			const hookDocs = hook.doc || [];

			return [
				...generateHookName( hook ),
				...generateIntroduction( hook ),
				...sectionWithHeading(
					{ html: `${ hook.doc.long_description_html }` },
					'Description'
				),
				...sectionWithHeading( params( hookDocs ), 'Parameters' ),
				...sectionWithHeading( returns( hookDocs ), 'Returns' ),
				...sectionWithHeading( example( hookDocs ), 'Example' ),
				...sectionWithHeading( related( hookDocs ), 'Related' ),
				{ h3: `Source` },
				{ p: `File: [${ hook.file }](../src/${ hook.file })` },
				{ hr: '' },
			].filter( Boolean );
		} ),
	];
	createDocs( 'docs/filters.md', jsonDocs );
	console.log( chalk.green( 'Done!' ) );
};

module.exports = { generate };
