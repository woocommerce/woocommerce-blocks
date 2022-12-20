const separator = '<hr />';
const footer = '<small>This comment is aggregated by merge-comments.</small>';

function getSectionId( section ) {
	const match = section.match( /section-id: ([^\s]+) --/ );
	return match ? match[ 1 ] : null;
}

function parseComment( comment ) {
	if ( ! comment ) {
		return [];
	}
	const sections = comment.split( separator );
	return sections
		.map( ( section ) => {
			const sectionId = getSectionId( section );
			/**
			 * This also remove the footer as it doesn't have a section id. This
			 * is intentional as we want the footer to always be the last
			 * section.
			 */
			if ( ! sectionId ) {
				return null;
			}
			return {
				id: sectionId,
				content: section.trim(),
			};
		} )
		.filter( Boolean );
}

function updateSection( sections, sectionId, content ) {
	const index = sections.findIndex( ( section ) => section.id === sectionId );
	const formattedContent = `<!-- section-id: ${ sectionId } -->\n\n${ content }`;
	if ( index === -1 ) {
		sections.push( {
			id: sectionId,
			content: formattedContent,
		} );
	} else {
		sections[ index ].content = formattedContent;
	}

	return sections;
}

function appendFooter( sections ) {
	return sections.concat( {
		id: 'footer',
		content: `\n${ footer }`,
	} );
}

function combineSections( sections ) {
	return sections
		.map( ( section ) => section.content )
		.join( `\n\n${ separator }\n\n` );
}

exports.updateComment = function ( comment, sectionId, content ) {
	let sections = parseComment( comment );
	sections = updateSection( sections, sectionId, content );
	sections = appendFooter( sections );
	return combineSections( sections );
};

exports.isMergedComment = function ( comment ) {
	return (
		comment.body.includes( footer ) &&
		comment.user.login === 'github-actions[bot]'
	);
};
