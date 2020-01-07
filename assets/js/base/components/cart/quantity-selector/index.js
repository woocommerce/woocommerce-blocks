/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

const QuantitySelector = ( { quantity, onChange } ) => {
	// For now just use a regular number edit.
	// TODO Replace this with custom control based on design (follow up PR).
	return (
		<input
			className="wc-block-quantity-selector-input"
			type="number"
			step="1"
			min="0"
			value={ quantity }
			onChange={ ( event ) => onChange( event.target.value ) }
		/>
	);

	// return (
	// 	<div className="wc-block-quantity-selector">
	// 		<button onClick={ () => onChange( quantity - 1 ) }>-</button>
	// 		<span>{ quantity }</span>
	// 		<button onClick={ () => onChange( quantity + 1 ) }>+</button>
	// 	</div>
	// );
};

QuantitySelector.propTypes = {
	quantity: PropTypes.number,
	onChange: PropTypes.func,
};

export default QuantitySelector;
