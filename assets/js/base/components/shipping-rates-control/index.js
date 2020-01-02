/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import RadioControl from '@woocommerce/base-components/radio-control';
import { useShippingRates } from '@woocommerce/base-hooks';
import { useEffect } from '@wordpress/element';

const ShippingRatesControl = ( {
	address,
	className,
	onChange,
	renderOption,
	selected,
} ) => {
	const { shippingRates, shippingRatesLoading } = useShippingRates( address );

	// Select first item when shipping rates are loaded.
	useEffect( () => {
		if ( ! selected && shippingRates && shippingRates.length > 0 ) {
			onChange( shippingRates[ 0 ].method_id );
		}
	}, [ shippingRates ] );

	if ( shippingRates.length === 0 || shippingRatesLoading ) {
		return null;
	}

	return (
		<RadioControl
			className={ className }
			onChange={ onChange }
			options={ shippingRates.map( renderOption ) }
			selected={ selected }
		/>
	);
};

ShippingRatesControl.propTypes = {
	address: PropTypes.shape( {
		address_1: PropTypes.string,
		address_2: PropTypes.string,
		city: PropTypes.string,
		state: PropTypes.string,
		postcode: PropTypes.string,
		country: PropTypes.string.isRequired,
	} ).isRequired,
	onChange: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired,
	className: PropTypes.string,
	selected: PropTypes.string,
};

export default ShippingRatesControl;
