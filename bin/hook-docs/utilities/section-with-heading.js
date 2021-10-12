const sectionWithHeading = ( content, heading, headingLevel = 'h3' ) => {
	return content
		? [
				{ [ headingLevel ]: heading },
				...( Array.isArray( content ) ? content : [ content ] ),
		  ]
		: [];
};

module.exports = { sectionWithHeading };
