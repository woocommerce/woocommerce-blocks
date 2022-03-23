const args = process.argv.slice( 2 );

const { isValidPath, openFile } = require( './utils/file' );
const { parseXml } = require( './utils/xml' );
const { getOctokit, context } = require( '@actions/github' );
const { setFailed, getInput } = require( '@actions/core' );
const { generateMarkdownMessage } = require( './utils/markdown' );

const parse = ( path ) => {
	const isValidFile = isValidPath( path );

	if ( ! isValidFile ) {
		return;
	}

	const file = openFile( path );

	const parsedXml = parseXml( file );
	const markdownMessage = generateMarkdownMessage( parsedXml );

	process.stdin.resume();
};

parse( args[ 0 ] );

const runner = async () => {
	try {
		const token = getInput( 'repo-token', { required: true } );
		const octokit = getOctokit( token );
		const payload = context.payload;
		const repo = payload.repository.name;
		const owner = payload.repository.owner.login;
		const oldCheckStyleFilePath = require( '../../' +
			getInput( 'main_branch_folder', { required: true } ) +
			getInput( 'compare', {
				required: true,
			} ) );

		if ( ! oldAssets ) {
			return;
		}

		const newCheckStyleFilePath = getInput( 'compare', {
			required: true,
		} );

		if ( ! newAssets ) {
			return;
		}

		const newCheckStyleFile = openFile( newCheckStyleFilePath );
		const parsedXml = parseXml( newCheckStyleFile );
		const markdownMessage = generateMarkdownMessage( parsedXml );

		await octokit.rest.issues.createComment( {
			owner,
			repo,
			issue_number: payload.pull_request.number,
			body: markdownMessage,
		} );
	} catch ( error ) {
		setFailed( error.message );
	}
};

parse();
