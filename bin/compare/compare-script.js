/* eslint-disable no-console */
const after = require( '../../after.json' ).results;
const before = require( '../../before.json' ).results;
const bytes = require( 'bytes' );
const tablemark = require( 'tablemark' );

const diffAll = [];
after.forEach( ( file ) => {
	let afterFileSize = file.totalBytes;
	afterFileSize = isFinite( afterFileSize ) ? afterFileSize : 0;
	let beforeFileSize = before.find(
		( files ) => files.bundleName === file.bundleName
	);
	beforeFileSize = beforeFileSize ? beforeFileSize.totalBytes : undefined;
	beforeFileSize = isFinite( beforeFileSize ) ? beforeFileSize : 0;

	diffAll.push( {
		bundle: `\`${ file.bundleName }\``,
		[ `${ process.argv[ 2 ] }` ]: bytes( beforeFileSize ),
		[ `${ process.argv[ 3 ] }` ]: bytes( afterFileSize ),
		diff: afterFileSize - beforeFileSize,
	} );
} );
const cleanDiff = diffAll
	.filter( ( file ) => Math.abs( file.diff ) > 10 )
	.sort( ( a, b ) => Math.abs( b.diff ) - Math.abs( a.diff ) )
	.map( ( file ) => ( { ...file, diff: bytes( file.diff ) } ) );

console.log( tablemark( cleanDiff ) );
