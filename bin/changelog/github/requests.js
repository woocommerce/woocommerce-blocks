'use strict';

const requestPromise = require( 'request-promise' );
const { graphql } = require( '@octokit/graphql' );
const { pkg, REPO } = require( '../config' );

/* eslint no-console: 0 */

const headers = {
	authorization: `token ${ process.env.GH_API_TOKEN }`,
	'user-agent': 'changelog-tool',
};

const authedGraphql = graphql.defaults( { headers } );

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

const getEntry = async ( pullRequest ) => {
	if (
		pullRequest.labels.nodes.some(
			( label ) => label.name === pkg.changelog.skipLabel
		)
	) {
		return;
	}

	const collaborator = await isCollaborator( pullRequest.author.login );
	const type = getPullRequestType( pullRequest.labels.nodes );
	const authorTag = collaborator ? '' : `👏 @${ pullRequest.author.login }`;
	let title;
	if ( /### Changelog\r\n\r\n> /.test( pullRequest.body ) ) {
		const bodyParts = pullRequest.body.split( '### Changelog\r\n\r\n> ' );
		const note = bodyParts[ bodyParts.length - 1 ];
		title = note
			// Remove comment prompt
			.replace( /<!---(.*)--->/gm, '' )
			// Remove new lines and whitespace
			.trim();
		if ( ! title.length ) {
			title = `${ type }: ${ pullRequest.title }`;
		}
	} else {
		title = `${ type }: ${ pullRequest.title }`;
	}
	return `- ${ title } [#${ pullRequest.number }](${ pullRequest.url }) ${ authorTag }`;
};

const getMilestoneNumber = async ( version ) => {
	const [ owner, repo ] = REPO.split( '/' );
	const query = `
	{
		repository(owner: "${ owner }", name: "${ repo }") {
			milestones(last: 50) {
				nodes {
					title
					number
				}
			}
		}
	}
	`;
	const data = await authedGraphql( query );
	const matchingNode = data.repository.milestones.nodes.find(
		( node ) => node.title === version
	);
	if ( ! matchingNode ) {
		throw new Error(
			`Unable to find a milestone matching the given version ${ version }`
		);
	}
	return matchingNode.number;
};

const getQuery = ( milestoneNumber, before ) => {
	const [ owner, repo ] = REPO.split( '/' );
	const paging = before ? ', before: "${before}"' : '';
	return `
	{
		repository(owner: "${ owner }", name: "${ repo }"${ paging }) {
			milestone(number: ${ milestoneNumber }) {
				pullRequests(last: 100, states: [MERGED]) {
					totalCount
					pageInfo {
						hasNextPage
						endCursor
					}
					nodes {
						number
						title
						url
						author {
							login
						}
						body
						labels(last: 10) {
							nodes {
								name
							}
						}
					}
				}
			}
		}
	}
	`;
};

const fetchAllPullRequests = async ( version ) =>
	await ( async () => {
		const milestoneNumber = await getMilestoneNumber( version );
		const fetchResults = async ( before ) => {
			const query = getQuery( milestoneNumber, before );
			const results = await authedGraphql( query );
			if ( results.repository.milestone.pullRequests.totalCount < 100 ) {
				return results.repository.milestone.pullRequests.nodes;
			}

			const nextResults = await fetchResults(
				results.repository.milestone.pullRequests.pageInfo.endCursor
			);
			return results.repository.milestone.pullRequests.nodes.concat(
				nextResults
			);
		};
		return await fetchResults();
	} )();

module.exports = {
	fetchAllPullRequests,
	getEntry,
};
