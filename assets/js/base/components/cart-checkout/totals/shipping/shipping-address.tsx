/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { EnteredAddress } from '@woocommerce/settings';
import { formatShippingAddress } from '@woocommerce/base-utils';
import { useEditorContext } from '@woocommerce/base-context';

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
	const { isEditor } = useEditorContext();

	// If there is no address, and we're not in the editor, don't show anything.
	if ( ! formattedLocation && ! isEditor ) {
		return null;
	}
	return (
		<>
			<ShippingLocation formattedLocation={ formattedLocation } />
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
