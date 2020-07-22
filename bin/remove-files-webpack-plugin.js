/*eslint-env node*/
/**
 * External dependencies
 */
const fs = require( 'fs' );
const glob = require( 'glob' );

// This is a simple webpack plugin to delete the JS files generated by MiniCssExtractPlugin.

function RemoveFilesPlugin( filePath = '' ) {
	this.filePath = filePath;
}

RemoveFilesPlugin.prototype.apply = function( compiler ) {
	compiler.hooks.afterEmit.tap( 'afterEmit', () => {
		const files = glob.sync( this.filePath );
		files.forEach( ( f ) => {
			fs.unlink( f, ( err ) => {
				if ( err ) {
					/* eslint-disable-next-line no-console */
					console.log( `There was an error removing ${ f }.`, err );
				}
			} );
		} );
	} );
};

module.exports = RemoveFilesPlugin;
