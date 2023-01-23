/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { EnteredAddress } from '@woocommerce/settings';
import { formatShippingAddress } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import ShippingLocation from '../../shipping-location';
import { CalculatorButton, CalculatorButtonProps } from './calculator-button';

export interface ShippingAddressProps {
	showCalculator: boolean;
	isShippingCalculatorOpen: boolean;
	setIsShippingCalculatorOpen: CalculatorButtonProps[ 'setIsShippingCalculatorOpen' ];
	shippingAddress: EnteredAddress;
}

export const ShippingAddress = ( {
	showCalculator,
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
	shippingAddress,
}: ShippingAddressProps ): JSX.Element | null => {
	const formattedLocation = formatShippingAddress( shippingAddress );
	if ( ! formattedLocation ) {
		return null;
	}
	return (
		<>
			<ShippingLocation formattedLocation={ formattedLocation } />
			{ showCalculator && (
				<CalculatorButton
					label={ __(
						'(change address)',
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
