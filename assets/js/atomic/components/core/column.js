/**
 * External dependencies
 */
import classnames from 'classnames';

const Column = ( { verticalAlignment, width, children } ) => {
	const wrapperClasses = classnames( 'wp-block-column', {
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );

	let style;
	if ( Number.isFinite( width ) ) {
		style = { flexBasis: width + '%' };
	}

	return (
		<div className={ wrapperClasses } style={ style }>
			{ children }
		</div>
	);
};

export default Column;
