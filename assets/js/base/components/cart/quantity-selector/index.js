/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

const QuantitySelector = ( { quantity, onChange } ) => {
	return (
		<div className="wc-block-quantity-selector">
			<button onClick={ () => onChange( quantity - 1 ) }>-</button>
			<span>{ quantity }</span>
			<button onClick={ () => onChange( quantity + 1 ) }>+</button>
		</div>
	);
};

QuantitySelector.propTypes = {
	quantity: PropTypes.number,
	onChange: PropTypes.func,
};

export default QuantitySelector;
