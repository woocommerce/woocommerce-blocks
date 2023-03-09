/**
 * External dependencies
 */
import classnames from 'classnames';

const save = ( { attributes } ) => {
	if ( attributes.isDescendentOfQueryLoop || attributes.renderOnServerSide ) {
		return null;
	}

	return (
		<div className={ classnames( 'is-loading', attributes.className ) } />
	);
};

export default save;
