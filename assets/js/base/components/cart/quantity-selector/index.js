/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

const QuantitySelector = ( { quantity } ) => {
	return (
		<div className="wc-block-quantity-selector">
			<button>-</button>
			<span>{ quantity }</span>
			<button>+</button>
		</div>
	);
};

QuantitySelector.propTypes = {
	quantity: PropTypes.number,
	onChange: PropTypes.func,
};

export default QuantitySelector;
