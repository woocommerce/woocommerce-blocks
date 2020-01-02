/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import RadioControl from '@woocommerce/base-components/radio-control';

/**
 * Internal dependencies
 */
import placeholderShippingMethods from '../../../blocks/cart-checkout/placeholder-shipping-methods';

const ShippingMethodsControl = ( {
	className,
	onChange,
	renderOption,
	selected,
} ) => {
	return (
		<RadioControl
			className={ className }
			onChange={ onChange }
			options={ placeholderShippingMethods.map( renderOption ) }
			selected={ selected }
		/>
	);
};

ShippingMethodsControl.propTypes = {
	onChange: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default ShippingMethodsControl;
