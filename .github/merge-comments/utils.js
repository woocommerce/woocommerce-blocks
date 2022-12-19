const separator = '<!-- separator --->';

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

function combineSections( sections ) {
	return sections
		.map( ( section ) => section.content )
		.join( `\n${ separator }\n` );
}

exports.updateComment = function ( comment, sectionId, content ) {
	const sections = updateSection( parse( comment ), sectionId, content );
	return combineSections( sections );
};
