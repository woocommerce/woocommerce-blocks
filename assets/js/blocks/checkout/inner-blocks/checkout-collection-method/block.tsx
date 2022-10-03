/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useShippingData } from '@woocommerce/base-context/hooks';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';
import {
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
} from 'wordpress-components';
import classnames from 'classnames';
import { Icon, store, shipping } from '@wordpress/icons';
import { getSetting } from '@woocommerce/settings';
import type { CartShippingPackageShippingRate } from '@woocommerce/type-defs/cart';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Returns the cheapest rate that isn't a local pickup.
 *
 * @param {Array|undefined} shippingRates Array of shipping Rate.
 *
 * @return {Object|undefined} cheapest rate.
 */
function getShippingStartingPrice(
	shippingRates: CartShippingPackageShippingRate[]
): CartShippingPackageShippingRate | undefined {
	if ( shippingRates ) {
		return shippingRates.reduce(
			(
				lowestRate: CartShippingPackageShippingRate | undefined,
				currentRate: CartShippingPackageShippingRate
			) => {
				if ( currentRate.method_id === 'local_pickup' ) {
					return lowestRate;
				}
				if (
					lowestRate === undefined ||
					currentRate.price < lowestRate.price
				) {
					return currentRate;
				}
				return lowestRate;
			},
			undefined
		);
	}
}

/**
 * Returns the cheapest rate that is a local pickup.
 *
 * @param {Array|undefined} shippingRates Array of shipping Rate.
 *
 * @return {Object|undefined} cheapest rate.
 */
function getLocalPickupStartingPrice(
	shippingRates: CartShippingPackageShippingRate[]
): CartShippingPackageShippingRate | undefined {
	if ( shippingRates ) {
		return shippingRates.reduce(
			(
				lowestRate: CartShippingPackageShippingRate | undefined,
				currentRate: CartShippingPackageShippingRate
			) => {
				if ( currentRate.method_id !== 'local_pickup' ) {
					return lowestRate;
				}
				if (
					lowestRate === undefined ||
					currentRate.price < lowestRate.price
				) {
					return currentRate;
				}
				return lowestRate;
			},
			undefined
		);
	}
}

const LocalPickupSelector = ( {
	checked,
	rate,
	showPrice,
	showIcon,
}: {
	checked: string;
	rate: CartShippingPackageShippingRate;
	showPrice: boolean;
	showIcon: boolean;
} ) => {
	const ratePrice = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( rate.price, 10 ) + parseInt( rate.taxes, 10 )
		: parseInt( rate.price, 10 );

	const Price = () =>
		ratePrice === 0 ? (
			<span>{ __( 'free', 'woo-gutenberg-products-block' ) }</span>
		) : (
			<FormattedMonetaryAmount
				currency={ getCurrencyFromPriceResponse( rate ) }
				value={ ratePrice }
			/>
		);
	return (
		<Radio
			value="pickup"
			className={ classnames( 'wc-block-checkout__collection-item', {
				'wc-block-checkout__collection-item--selected':
					checked === 'pickup',
			} ) }
		>
			{ showIcon === true && <Icon icon={ store } size={ 24 } /> }
			<span className="wc-block-checkout__collection-item-title">
				{ __( 'Local Pickup', 'woo-gutenberg-products-block' ) }
			</span>
			{ showPrice === true && <Price /> }
		</Radio>
	);
};

const ShippingSelector = ( {
	checked,
	rate,
	showPrice,
	showIcon,
}: {
	checked: string;
	rate: CartShippingPackageShippingRate;
	showPrice: boolean;
	showIcon: boolean;
} ) => {
	const Price = () => {
		if ( rate === undefined ) {
			return (
				<span>
					{ __(
						'calculated with an address',
						'woo-gutenberg-products-block'
					) }
				</span>
			);
		}
		const ratePrice = getSetting( 'displayCartPricesIncludingTax', false )
			? parseInt( rate.price, 10 ) + parseInt( rate.taxes, 10 )
			: parseInt( rate.price, 10 );
		if ( ratePrice === 0 ) {
			return (
				<span>{ __( 'free', 'woo-gutenberg-products-block' ) }</span>
			);
		}
		return (
			<FormattedMonetaryAmount
				currency={ getCurrencyFromPriceResponse( rate ) }
				value={ ratePrice }
			/>
		);
	};

	return (
		<Radio
			value="shipping"
			className={ classnames( 'wc-block-checkout__collection-item', {
				'wc-block-checkout__collection-item--selected':
					checked === 'shipping',
			} ) }
		>
			{ showIcon === true && <Icon icon={ shipping } size={ 24 } /> }
			<span className="wc-block-checkout__collection-item-title">
				{ __( 'Delivery', 'woo-gutenberg-products-block' ) }
			</span>
			{ showPrice === true && <Price /> }
		</Radio>
	);
};
const Block = ( {
	checked,
	onChange,
	showPrice,
	showIcon,
}: {
	checked: string;
	onChange: ( value: string ) => void;
	showPrice: boolean;
	showIcon: boolean;
} ): JSX.Element | null => {
	const { shippingRates, needsShipping, hasCalculatedShipping } =
		useShippingData();

	if ( ! needsShipping || ! hasCalculatedShipping ) {
		return null;
	}

	const localPickupStartingPrice = getLocalPickupStartingPrice(
		shippingRates[ 0 ]?.shipping_rates
	);
	const shippingStartingPrice = getShippingStartingPrice(
		shippingRates[ 0 ]?.shipping_rates
	);

	if ( ! localPickupStartingPrice && ! shippingStartingPrice ) {
		return null;
	}
	return (
		<RadioGroup
			id="collection-method"
			className="wc-block-checkout__collection-method-container"
			label="options"
			onChange={ onChange }
			checked={ checked }
		>
			<ShippingSelector
				checked={ checked }
				rate={ shippingStartingPrice }
				showPrice={ showPrice }
				showIcon={ showIcon }
			/>
			<LocalPickupSelector
				checked={ checked }
				rate={ localPickupStartingPrice }
				showPrice={ showPrice }
				showIcon={ showIcon }
			/>
		</RadioGroup>
	);
};

export default Block;
