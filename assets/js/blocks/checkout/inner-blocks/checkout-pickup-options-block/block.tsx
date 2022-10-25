/**
 * External dependencies
 */
import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	useShippingData,
	useSelectShippingRate,
} from '@woocommerce/base-context/hooks';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import { decodeEntities } from '@wordpress/html-entities';
import { getSetting } from '@woocommerce/settings';
import { Icon, mapMarker } from '@wordpress/icons';
import RadioControl from '@woocommerce/base-components/radio-control';
import type { RadioControlOption } from '@woocommerce/base-components/radio-control/types';

/**
 * Internal dependencies
 */
import './style.scss';

interface pickupLocation {
	rate_id: string;
	name: string;
	address: string;
	details: string;
}

interface pickupLocationRate extends pickupLocation {
	price: number;
	taxes: number;
}

const renderPickupLocation = (
	option: pickupLocationRate
): RadioControlOption => {
	const priceWithTaxes = getSetting( 'displayCartPricesIncludingTax', false )
		? option.price + option.taxes
		: option.price;
	return {
		value: option.rate_id,
		label: decodeEntities( option.name ),
		secondaryLabel: (
			<FormattedMonetaryAmount
				currency={ getCurrencyFromPriceResponse( option ) }
				value={ priceWithTaxes }
			/>
		),
		description: decodeEntities( option.details ),
		secondaryDescription: option.address ? (
			<>
				<Icon
					icon={ mapMarker }
					className="wc-block-editor-components-block-icon"
				/>
				{ decodeEntities( option.address ) }
			</>
		) : undefined,
	};
};

const Block = (): JSX.Element | null => {
	const { shippingRates } = useShippingData();
	const { selectShippingRate } = useSelectShippingRate();
	const [ selectedOption, setSelectedOption ] = useState< string >( '' );
	const onSelectRate = useCallback(
		( rateId: string ) => {
			shippingRates.forEach( ( { package_id: packageId } ) => {
				selectShippingRate( rateId, packageId );
			} );
		},
		[ selectShippingRate, shippingRates ]
	);

	const pickupLocations = (
		getSetting( 'localPickupLocations', [] ) as pickupLocation[]
	 ).map( ( pickupLocation: pickupLocation ): pickupLocationRate => {
		// Find the cost and taxes from the shipping rates response.
		const pickupRate = shippingRates.reduce(
			( acc, shippingRatePackage ) => {
				const rate =
					shippingRatePackage.shipping_rates.find(
						( { rate_id: rateId } ) =>
							rateId === pickupLocation.rate_id
					) || null;
				if ( rate ) {
					acc.price = acc.price + parseInt( rate.price, 10 );
					acc.taxes = acc.taxes + parseInt( rate.taxes, 10 );
				}
				return acc;
			},
			{ price: 0, taxes: 0 }
		);
		return {
			...pickupLocation,
			...pickupRate,
		};
	} );

	// Update the selected option if there is no rate selected on mount.
	useEffect( () => {
		if ( ! selectedOption && pickupLocations[ 0 ] ) {
			setSelectedOption( pickupLocations[ 0 ].rate_id );
			onSelectRate( pickupLocations[ 0 ].rate_id );
		}
	}, [ onSelectRate, pickupLocations, selectedOption ] );

	return (
		<RadioControl
			onChange={ ( value: string ) => {
				setSelectedOption( value );
				onSelectRate( value );
			} }
			selected={ selectedOption }
			options={ pickupLocations.map( renderPickupLocation ) }
		/>
	);
};

export default Block;
