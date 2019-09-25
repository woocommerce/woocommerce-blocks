/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const ProductLink = ( { children, className, permalink } ) => {
	if ( ! permalink ) {
		return <div className={ className }>{ children }</div>;
	}

	return (
		<a href={ permalink } className={ className } rel="nofollow">
			{ children }
		</a>
	);
};

ProductLink.propTypes = {
	className: PropTypes.string,
	permalink: PropTypes.string,
};

export default ProductLink;
