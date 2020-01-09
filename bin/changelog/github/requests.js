'use strict';

const requestPromise = require( 'request-promise' );
const octokit = require( '@octokit/rest' )();
const { pkg, REPO } = require( '../config' );

/* eslint no-console: 0 */

const headers = {
	'Content-Type': 'application/json;charset=UTF-8',
	Authorization: `token ${ process.env.GH_API_TOKEN }`,
	Accept: 'application/vnd.github.inertia-preview+json',
	'User-Agent': 'request',
};

const getPullRequestType = ( labels ) => {
	const typeLabel = labels.find( ( label ) =>
		label.name.includes( pkg.changelog.labelPrefix )
	);
	if ( ! typeLabel ) {
		return pkg.changelog.defaultPrefix;
	}
	return typeLabel.name.replace( `${ pkg.changelog.labelPrefix } `, '' );
};

const isCollaborator = async ( username ) => {
	return requestPromise( {
		url: `https://api.github.com/orgs/${
			REPO.split( '/' )[ 0 ]
		}/members/${ username }`,
		headers,
		resolveWithFullResponse: true,
	} )
		.then( ( response ) => {
			return response.statusCode === 204;
		} )
		.catch( ( err ) => {
			if ( err.statusCode !== 404 ) {
				console.log( '🤯' );
				console.log( err.message );
			}
		} );
};

const isMergedPullRequest = async ( pullRequestUrl ) => {
	const options = {
		url: pullRequestUrl,
		headers,
		json: true,
	};
	return requestPromise( options )
		.then( ( data ) => data.merged )
		.catch( ( err ) => {
			console.log( '🤯' );
			console.log( err.message );
		} );
};

const getEntry = async ( data ) => {
	if ( ! data.pull_request ) {
		return;
	}

	const isMerged = await isMergedPullRequest( data.pull_request.url );
	const skipChangelog = data.labels.find(
		( label ) => label.name === pkg.changelog.skipLabel
	);

	if ( ! isMerged || skipChangelog ) {
		return;
	}

	const collaborator = await isCollaborator( data.user.login );
	const type = getPullRequestType( data.labels );
	const authorTag = collaborator ? '' : `👏 @${ data.user.login }`;
	let title;
	if ( /### Changelog\r\n\r\n> /.test( data.body ) ) {
		const bodyParts = data.body.split( '### Changelog\r\n\r\n> ' );
		const note = bodyParts[ bodyParts.length - 1 ];
		title = note
			// Remove comment prompt
			.replace( /<!---(.*)--->/gm, '' )
			// Remove new lines and whitespace
			.trim();
		if ( ! title.length ) {
			title = `${ type }: ${ data.title }`;
		}
	} else {
		title = `${ type }: ${ data.title }`;
	}
	return `- ${ title } [#${ data.number }](https://github.com/${ REPO }/${ data.number }) ${ authorTag }`;
};

const fetchAllPages = async ( version ) =>
	await ( async () => {
		const fetchResults = async ( page = 1 ) => {
			const results = await octokit.search.issuesAndPullRequests( {
				q: `milestone:"${ version }"+type:pr+repo:${ REPO }`,
				sort: 'reactions',
				per_page: 100,
				page,
			} );

			if ( results.data.items < 100 ) {
				return results.data.items;
			}

			const nextResults = await fetchResults( page + 1 );
			return results.data.items.concat( nextResults );
		};
		return await fetchResults();
	} )();

module.exports = {
	fetchAllPages,
	getEntry,
};
