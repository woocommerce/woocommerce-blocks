/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import RadioControl, {
	RadioControlOptionLayout,
} from '@woocommerce/base-components/radio-control';
import { useShippingRates } from '@woocommerce/base-hooks';
import { Fragment, useEffect } from '@wordpress/element';

const ShippingRatesControl = ( {
	address,
	className,
	onChange,
	renderOption,
	selected = [],
} ) => {
	const renderSingleOption = ( option ) => {
		const {
			label,
			secondaryLabel,
			description,
			secondaryDescription,
		} = renderOption( option );

		return (
			<RadioControlOptionLayout
				label={ label }
				secondaryLabel={ secondaryLabel }
				description={ description }
				secondaryDescription={ secondaryDescription }
			/>
		);
	};

	const renderSeveralOptions = ( shippingRates, i ) => {
		return (
			<RadioControl
				className={ className }
				onChange={ ( newShippingRate ) => {
					const newSelected = [ ...selected ];
					newSelected[ i ] = newShippingRate;
					onChange( newSelected );
				} }
				options={ shippingRates.map( renderOption ) }
				selected={ selected[ i ] }
			/>
		);
	};

	const { shippingRates, shippingRatesLoading } = useShippingRates( address );

	// Select first item when shipping rates are loaded.
	useEffect(
		() => {
			if ( shippingRates.length === 0 ) {
				return;
			}

			const isSelectedValid =
				selected.length === shippingRates.length &&
				selected.every( ( selectedId, i ) => {
					const rates = shippingRates[ i ].shipping_rates;
					return rates.some(
						( { rate_id: rateId } ) => rateId === selectedId
					);
				} );

			if ( isSelectedValid ) {
				return;
			}

			const newShippingRates = shippingRates.map( ( shippingRate ) => {
				if ( shippingRate.shipping_rates.length > 0 ) {
					return shippingRate.shipping_rates[ 0 ].rate_id;
				}
				return null;
			} );

			if ( newShippingRates.length > 0 ) {
				onChange( newShippingRates );
			}
		},
		// We only want to run this when `shippingRates` changes,
		// so there is no need to add `selected` to the effect dependencies.
		[ shippingRates ]
	);

	if ( shippingRatesLoading ) {
		// @todo Add some indication that shipping rates are loading.
		// see: https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/1555
		return null;
	}

	return shippingRates.map( ( shippingRate, i ) => {
		if ( shippingRate.shipping_rates.length === 0 ) {
			return null;
		}

		const id = shippingRate.items.join();

		return (
			<Fragment key={ id }>
				{ shippingRate.shipping_rates.length > 1
					? renderSeveralOptions( shippingRate.shipping_rates, i )
					: renderSingleOption( shippingRate.shipping_rates[ 0 ] ) }
				{ shippingRates.length > 1 && (
					<span>
						{ /* @todo Show product names,
						see: https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/1554 */ }
						{ shippingRate.items.join( ', ' ) }
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
		country: PropTypes.string,
	} ),
	onChange: PropTypes.func.isRequired,
	renderOption: PropTypes.func.isRequired,
	className: PropTypes.string,
	selected: PropTypes.arrayOf( PropTypes.string ),
};

export default ShippingRatesControl;
