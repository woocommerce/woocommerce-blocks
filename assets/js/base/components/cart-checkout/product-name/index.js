/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

const ProductName = ( { name, permalink, disabled = false, ...rest } ) => {
	return (
		// we use tabIndex -1 to prevent the link from being focused, pointer-events
		// disabled click events, so we get an almost disabled link.
		<a
			className="wc-block-product-name"
			href={ permalink }
			tabIndex={ disabled ? -1 : 0 }
			{ ...rest }
		>
			{ name }
		</a>
	);
};

ProductName.propTypes = {
	name: PropTypes.string.isRequired,
	permalink: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
};

export default ProductName;
