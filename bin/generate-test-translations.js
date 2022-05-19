#!/usr/bin/env node
const { readFileSync } = require( 'fs' );
const { ensureDirSync, writeJsonSync } = require( 'fs-extra' );
const crypto = require( 'crypto' );
const path = require( 'path' );
const glob = require( 'glob' );

ensureDirSync( path.join( __dirname, '../languages' ) );

const builtJsFiles = glob.sync(
	`${ path.dirname( __filename ) }/../build/**/*.js`,
	{}
);

const strings = [ 'Start shopping', 'Your cart (%d item)' ];

builtJsFiles.forEach( ( filePath ) => {
	const fileContent = readFileSync( filePath );
	const stringsInFile = strings.filter(
		( string ) => fileContent.indexOf( string ) !== -1
	);
	if ( stringsInFile.length === 0 ) {
		return;
	}
	const data = {
		locale_data: {
			messages: {
				'': {
					lang: 'nl',
				},
			},
		},
	};
	stringsInFile.forEach( ( string ) => {
		data.locale_data.messages[ string ] = `Translated ${ string }`;
	} );
	const relativeFilePath = filePath.substring( filePath.indexOf( 'build/' ) );
	const md5Path = crypto
		.createHash( 'md5' )
		.update( relativeFilePath )
		.digest( 'hex' );

	writeJsonSync(
		`${ path.dirname(
			__filename
		) }/../languages/woo-gutenberg-products-block-nl_NL-${ md5Path }.json`,
		data
	);
} );
