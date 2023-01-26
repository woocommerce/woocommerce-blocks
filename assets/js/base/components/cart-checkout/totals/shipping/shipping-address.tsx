/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	formatShippingAddress,
	isAddressComplete,
} from '@woocommerce/base-utils';
import { useEditorContext } from '@woocommerce/base-context';
import { ShippingAddress as ShippingAddressType } from '@woocommerce/settings';
import PickupLocation from '@woocommerce/base-components/cart-checkout/pickup-location';

/**
 * Internal dependencies
 */
import ShippingLocation from '../../shipping-location';
import { CalculatorButton, CalculatorButtonProps } from './calculator-button';

export interface ShippingAddressProps {
	showCalculator: boolean;
	isShippingCalculatorOpen: boolean;
	setIsShippingCalculatorOpen: CalculatorButtonProps[ 'setIsShippingCalculatorOpen' ];
	shippingAddress: ShippingAddressType;
	prefersCollection?: boolean | undefined;
}

export const ShippingAddress = ( {
	showCalculator,
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
	shippingAddress,
	prefersCollection = false,
}: ShippingAddressProps ): JSX.Element | null => {
	const addressComplete = isAddressComplete( shippingAddress );
	const { isEditor } = useEditorContext();

	// If the address is incomplete, and we're not in the editor, don't show anything.
	if ( ! addressComplete && ! isEditor ) {
		return null;
	}
	const formattedLocation = formatShippingAddress( shippingAddress );
	return (
		<>
			{ prefersCollection ? (
				<PickupLocation />
			) : (
				<ShippingLocation formattedLocation={ formattedLocation } />
			) }
			{ showCalculator && (
				<CalculatorButton
					label={ __(
						'Change address',
						'woo-gutenberg-products-block'
					) }
					isShippingCalculatorOpen={ isShippingCalculatorOpen }
					setIsShippingCalculatorOpen={ setIsShippingCalculatorOpen }
				/>
			) }
		</>
	);
};

export default ShippingAddress;
