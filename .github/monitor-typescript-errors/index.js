const { getOctokit, context } = require( '@actions/github' );
const { setFailed, getInput } = require( '@actions/core' );
const { openFile } = require( './utils/file' );
const { parseXml, getFilesWithNewErrors } = require( './utils/xml' );
const { generateMarkdownMessage } = require( './utils/markdown' );
const { addRecord } = require( './utils/airtable' );

const runner = async () => {
	const token = getInput( 'repo-token', { required: true } );
	const octokit = getOctokit( token );
	const payload = context.payload;
	const repo = payload.repository.name;
	const owner = payload.repository.owner.login;
	const fileName = getInput( 'compare', {
		required: true,
	} );
	const newCheckStyleFile = openFile( fileName );
	const newCheckStyleFileParsed = parseXml( newCheckStyleFile );
	const currentCheckStyleFilePath =
		getInput( 'trunk_branch_folder', { required: true } ) + '/' + fileName;

	if ( ! currentCheckStyleFilePath ) {
		return;
	}

	const currentCheckStyleFile = openFile( currentCheckStyleFilePath );
	const currentCheckStyleFileParsed = parseXml( currentCheckStyleFile );
	const { header } = generateMarkdownMessage( newCheckStyleFileParsed );
	const filesWithNewErrors = getFilesWithNewErrors(
		newCheckStyleFileParsed,
		currentCheckStyleFileParsed
	);

	const message =
		header +
		'\n' +
		( filesWithNewErrors.length > 0
			? `⚠️ ⚠️ This PR introduces new TS errors on ${ filesWithNewErrors.length } files: \n` +
			  '<details> \n' +
			  filesWithNewErrors.join( '\n' ) +
			  '\n' +
			  '</details>'
			: '' );

	await octokit.rest.issues.createComment( {
		owner,
		repo,
		issue_number: payload.pull_request.number,
		body: message,
	} );

	if ( process.env[ 'CURRENT_BRANCH' ] === 'trunk' ) {
		try {
			await addRecord( currentCheckStyleFileParsed.totalErrors );
		} catch ( error ) {
			setFailed( error );
		}
	}
};

runner();
