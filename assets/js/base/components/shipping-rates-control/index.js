/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import RadioControl from '@woocommerce/base-components/radio-control';
import { useShippingRates } from '@woocommerce/base-hooks';
import { Fragment, useEffect } from '@wordpress/element';

const ShippingRatesControl = ( {
	address,
	className,
	onChange,
	renderOption,
	selected = [],
} ) => {
	const { shippingRates, shippingRatesLoading } = useShippingRates( address );

	// Select first items when shipping rates are loaded.
	useEffect(
		() => {
			if ( shippingRates.length > 0 ) {
				const isSelectedValid = selected.some( ( selectedId, i ) => {
					const rates = shippingRates[ i ].shipping_rates;
					if ( rates.length === 0 ) {
						return false;
					}
					return rates.some(
						( { rate_id: rateId } ) => rateId === selectedId
					);
				} );
				if ( isSelectedValid ) {
					return;
				}
				const newShippingRates = shippingRates
					.map( ( shippingRate ) => {
						if ( shippingRate.shipping_rates.length > 0 ) {
							return shippingRate.shipping_rates[ 0 ].rate_id;
						}
						return null;
					} )
					.filter( Boolean );
				if ( newShippingRates.length > 0 ) {
					onChange( newShippingRates );
				}
			}
		},
		// We only want to run this when `shippingRates` changes,
		// so there is no need to add `selected` to the effect dependencies.
		[ shippingRates ]
	);

	if ( shippingRatesLoading ) {
		// @todo Add some indication that shipping rates are loading.
		return null;
	}

	return shippingRates.map( ( shippingRate, i ) => {
		if ( shippingRate.shipping_rates.length === 0 ) {
			return null;
		}

		const id = shippingRate.items.join();

		return (
			<Fragment key={ id }>
				<RadioControl
					id={ id }
					className={ className }
					onChange={ ( newShippingRate ) => {
						const newSelected = [ ...selected ];
						newSelected[ i ] = newShippingRate;
						onChange( newSelected );
					} }
					options={ shippingRate.shipping_rates.map( renderOption ) }
					selected={ selected[ i ] }
				/>
				{ shippingRates.length > 1 && (
					<span>
						{ /* @todo show product names */ }
						{ shippingRate.items.join( ',' ) }
					</span>
				) }
			</Fragment>
		);
	} );
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
	selected: PropTypes.arrayOf( PropTypes.string ),
};

export default ShippingRatesControl;
