/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	Cart,
	CartShippingPackageShippingRate,
} from '@woocommerce/type-defs/cart';
import { Component } from '@wordpress/element';
import { type RadioControlOptionType } from '@woocommerce/blocks-components';

/**
 * Internal dependencies
 */
import { createSlotFill } from '../../slot';

const slotName = '__experimentalOrderLocalPickupPackages';
const {
	Fill: ExperimentalOrderLocalPickupPackages,
	Slot: OrderLocalPickupPackagesSlot,
	// eslint-disable-next-line @typescript-eslint/naming-convention
} = createSlotFill( slotName );

interface ExperimentalOrderLocalPickupPackagesProps {
	extensions: Record< string, unknown >;
	cart: Cart;
	components: Record< string, Component >;
	renderPickupLocation: (
		option: CartShippingPackageShippingRate,
		packageCount: number
	) => RadioControlOptionType;
}
const Slot = ( {
	extensions,
	cart,
	components,
	renderPickupLocation,
}: ExperimentalOrderLocalPickupPackagesProps ) => {
	return (
		<OrderLocalPickupPackagesSlot
			className={ classnames(
				'wc-block-components-local-pickup-rates-control'
			) }
			fillProps={ {
				extensions,
				cart,
				components,
				renderPickupLocation,
			} }
		/>
	);
};

ExperimentalOrderLocalPickupPackages.Slot = Slot;

export default ExperimentalOrderLocalPickupPackages;
