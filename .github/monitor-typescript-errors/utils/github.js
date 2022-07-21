exports.getFileContent = async ( {
	octokit,
	owner,
	repo,
	fileName,
	onFail,
} ) => {
	try {
		return await octokit.rest.repos.getContent( {
			owner,
			repo,
			ref: 'try/typescript-monitor-second-branch',
			path: fileName,
		} );
	} catch ( err ) {
		if ( err.status === '404' ) {
			return;
		}

		onFail( err.message );
	}
};
