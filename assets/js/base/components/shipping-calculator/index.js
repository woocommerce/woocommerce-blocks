/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ShippingCalculatorAddress from './address';
import './style.scss';

const ShippingCalculator = ( {
	address,
	setAddress,
	hidden = false,
	onUpdate = () => {},
	showToggle = true,
	onToggle = () => {},
} ) => {
	return (
		<div className="wc-block-cart__shipping-calculator">
			{ showToggle && (
				<>
					{ '(' }
					<button
						className="wc-block-cart__change-address-button"
						onClick={ onToggle }
					>
						{ __(
							'change address',
							'woo-gutenberg-products-block'
						) }
					</button>
					{ ')' }
				</>
			) }
			{ ! hidden && (
				<ShippingCalculatorAddress
					address={ address }
					onUpdate={ ( newAddress ) => {
						setAddress( newAddress );
						onUpdate();
					} }
				/>
			) }
		</div>
	);
};

ShippingCalculator.propTypes = {
	address: PropTypes.shape( {
		city: PropTypes.string,
		state: PropTypes.string,
		postcode: PropTypes.string,
		country: PropTypes.string,
	} ),
	setAddress: PropTypes.func.isRequired,
	hidden: PropTypes.bool,
	onUpdate: PropTypes.func,
	showToggle: PropTypes.bool,
	onToggle: PropTypes.func,
};

export default ShippingCalculator;
