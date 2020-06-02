/**
 * Given some block attributes, gets attributes from the dataset or uses defaults.
 *
 * @todo Importing this from base-utils causes errors in the editor - find out why.
 *
 * @param {Object} blockAttributes Object containing block attributes.
 * @param {Array} rawAttributes Dataset from DOM.
 * @return {Array} Array of parsed attributes.
 */
const getValidBlockAttributes = ( blockAttributes, rawAttributes ) => {
	const attributes = [];

	Object.keys( blockAttributes ).forEach( ( key ) => {
		if ( typeof rawAttributes[ key ] !== 'undefined' ) {
			switch ( blockAttributes[ key ].type ) {
				case 'boolean':
					attributes[ key ] = rawAttributes[ key ] !== 'false';
					break;
				case 'number':
					attributes[ key ] = parseInt( rawAttributes[ key ], 10 );
					break;
				case 'array':
				case 'object':
					attributes[ key ] = JSON.parse( rawAttributes[ key ] );
					break;
				default:
					attributes[ key ] = rawAttributes[ key ];
					break;
			}
		} else {
			attributes[ key ] = blockAttributes[ key ].default;
		}
	} );

	return attributes;
};

/**
 * HOC that filters given attributes by valid block attribute values, or uses defaults if undefined.
 *
 * @param {Object} blockAttributes Component being wrapped.
 */
const withFilteredAttributes = ( blockAttributes ) => ( OriginalComponent ) => {
	return ( ownProps ) => {
		const validBlockAttributes = getValidBlockAttributes(
			blockAttributes,
			ownProps
		);

		return (
			<OriginalComponent { ...ownProps } { ...validBlockAttributes } />
		);
	};
};

export default withFilteredAttributes;
