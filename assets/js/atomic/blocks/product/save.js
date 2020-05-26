/**
 * External dependencies
 */
import classnames from 'classnames';

const Save = ( { attributes } ) => {
	return (
		<div className={ classnames( 'is-loading', attributes.className ) } />
	);
};

export default Save;
