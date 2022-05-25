exports.getFileContent = async ( {
	octokit,
	owner,
	repo,
	fileName,
	onFail,
} ) => {
	try {
		const currentCheckStyleFile = await octokit.rest.repos.getContent( {
			owner,
			repo,
			path: fileName,
			ref: 'try/typescript-monitor-second-branch',
		} );

		const buf = Buffer.from(
			currentCheckStyleFile.data.content,
			'base64'
		).toString();

		return buf;
	} catch ( err ) {
		console.log( JSON.stringify( err, null, 4 ) );
		if ( err.status === '404' ) {
			return;
		}

		onFail( err.message );
	}
};
