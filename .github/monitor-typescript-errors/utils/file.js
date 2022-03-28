const fs = require( 'fs' );

exports.isValidPath = ( path ) => {
	return fs.existsSync( path ) && fs.lstatSync( path ).isFile();
};

exports.openFile = ( path ) => {
	return fs.readFileSync( path );
};

exports.saveFile = ( path, content ) => {
	fs.writeFileSync( path, content );
};
