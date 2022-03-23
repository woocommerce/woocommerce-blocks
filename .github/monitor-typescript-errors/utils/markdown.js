exports.generateMarkdownMessage = ( dataFromParsedXml ) => {
	const header = generateHeader( dataFromParsedXml );
	const body = generateBody( dataFromParsedXml );

	return `
	${ header }
	<details>
		<summary>${ body.join( '\r\n' ) }</summary>
	</details>
	`;
};

const generateHeader = ( dataFromParsedXml ) => {
	return `Coding Style Check Results
	--------------------------
	Files with errors: ${ dataFromParsedXml.totalFileWithErrors }
	Total errors: ${ dataFromParsedXml.totalErrors }
	`;
};

const generateBody = ( dataFromParsedXml ) => {
	const files = dataFromParsedXml.files;

	console.log( files );

	return Object.keys( files ).map( ( file ) => {
		return `
		File: ${ file }
		${ files[ file ].map( ( error ) => `- ${ error }` ).join( '\r\n' ) }
		`;
	} );
};
