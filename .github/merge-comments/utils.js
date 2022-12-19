const separator = '<hr separator --->';
const footer = '<small>This comment is created by merge-comments.</small>';

function getSectionId( section ) {
	const match = section.match( /<!-- section-id: (.*) -->/gm );
	return match ? match[ 1 ] : null;
}

function parse( comment ) {
	if ( ! comment ) {
		return [];
	}
	const sections = comment.split( separator );
	return sections
		.map( ( section ) => {
			const sectionId = getSectionId( section );
			if ( ! sectionId ) {
				return null;
			}
			return {
				id: sectionId,
				content: section,
			};
		} )
		.filter( Boolean );
}

function updateSection( sections, sectionId, content ) {
	const index = sections.findIndex( ( section ) => section.id === sectionId );
	const formattedContent = `<!-- section-id: ${ sectionId } -->\n${ content }`;
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

function removeFooter( sections ) {
	return sections.filter(
		( section ) => ! section.content.includes( footer )
	);
}

function appendFooter( sections ) {
	return sections.concat( {
		id: 'footer',
		content: footer,
	} );
}

function combineSections( sections ) {
	return sections
		.map( ( section ) => section.content )
		.join( `\n${ separator }\n` );
}

exports.updateComment = function ( comment, sectionId, content ) {
	let sections = parse( comment );
	sections = removeFooter( sections );
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
