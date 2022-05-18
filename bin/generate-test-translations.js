#!/usr/bin/env node
const { ensureDirSync, writeJsonSync } = require( 'fs-extra' );
const crypto = require( 'crypto' );
const path = require( 'path' );
const fixtures = require( '../tests/e2e/fixtures/fixture-data' );

ensureDirSync( path.join( __dirname, '../languages' ) );

fixtures.Translations().forEach( ( file ) => {
	const { filePath, content } = file;
	const data = {
		locale_data: {
			messages: {
				'': {
					lang: 'nl',
				},
			},
		},
	};
	content.forEach( ( item ) => {
		data.locale_data.messages[ item.string ] = [ item.translation ];
	} );
	const md5Path = crypto
		.createHash( 'md5' )
		.update( filePath )
		.digest( 'hex' );

	writeJsonSync(
		`${ path.dirname(
			__filename
		) }/../languages/woo-gutenberg-products-block-nl_NL-${ md5Path }.json`,
		data
	);
} );
