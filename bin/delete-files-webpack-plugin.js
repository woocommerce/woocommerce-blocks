/**
 * External dependencies
 */
const rimraf = require( 'rimraf' );
const noop = () => {};

function DeleteFilesPlugin( files = [] ) {
	this.files = files;
}

DeleteFilesPlugin.prototype.apply = function( compiler ) {
	compiler.hooks.afterEmit.tap( 'afterEmit', () => {
		// We can silently ignore any errors (noop).
		this.files.forEach( ( f ) => rimraf( f, noop ) );
	} );
};

module.exports = DeleteFilesPlugin;
