const { XMLParser } = require( 'fast-xml-parser' );

exports.parseXml = ( filePath ) => {
	const parser = new XMLParser( {
		ignoreAttributes: false,
		attributeNamePrefix: '',
		attributesGroupName: '',
	} );
	const parsedFile = parser.parse( filePath );

	return getDataFromParsedXml( parsedFile );
};

const getErrorInfo = ( error ) => {
	const line = error.line;
	const column = error.column;
	const message = error.message;

	return `${ line }:${ column } - ${ message }`;
};

const getDataFromParsedXml = ( parsedXml ) => {
	const data = parsedXml.checkstyle.file;

	return data.reduce(
		( acc, { name, error } ) => {
			const pathFile = name;

			return {
				files: {
					[ pathFile ]: Array.isArray( error )
						? error.map( getErrorInfo )
						: [ getErrorInfo( error ) ],
					...acc.files,
				},
				totalErrors: acc.totalErrors + error.length,
				totalFileWithErrors: acc.totalFileWithErrors + 1,
			};
		},
		{
			totalErrors: 0,
			totalFileWithErrors: 0,
		}
	);
};
