/**
 * External dependencies
 */
import classnames from 'classnames';

export const save = ( { attributes } ) => {
	if (
		attributes.isDescendentOfSingleProductBlock ||
		attributes.isDescendentOfSingleProductTemplate
	) {
		return null;
	}

	return (
		<div className={ classnames( 'is-loading', attributes.className ) } />
	);
};
