/**
 * External dependencies
 */
import classnames from 'classnames';

const Columns = ( { verticalAlignment, children } ) => {
	const className = classnames( 'wp-block-columns', {
		[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );

	return (
		<div className={ className ? className : undefined }>{ children }</div>
	);
};

export default Columns;
