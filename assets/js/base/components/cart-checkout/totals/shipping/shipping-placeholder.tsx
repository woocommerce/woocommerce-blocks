/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCustomerData } from '@woocommerce/base-context/hooks';
import { isAddressComplete } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import { CalculatorButton, CalculatorButtonProps } from './calculator-button';

export interface ShippingPlaceholderProps {
	showCalculator: boolean;
	isShippingCalculatorOpen: boolean;
	isCheckout?: boolean;
	setIsShippingCalculatorOpen: CalculatorButtonProps[ 'setIsShippingCalculatorOpen' ];
}

export const ShippingPlaceholder = ( {
	showCalculator,
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
	isCheckout = false,
}: ShippingPlaceholderProps ): JSX.Element => {
	const { shippingAddress } = useCustomerData();
	const addressComplete = isAddressComplete( shippingAddress );

	if ( ! showCalculator ) {
		let message = __(
			'Calculated during checkout',
			'woo-gutenberg-products-block'
		);

		if ( isCheckout ) {
			message = addressComplete
				? __(
						'No shipping options available',
						'woo-gutenberg-products-block'
				  )
				: __(
						'Add an address for shipping options',
						'woo-gutenberg-products-block'
				  );
		}

		return <>{ message }</>;
	}

	return (
		<CalculatorButton
			label={ __(
				'Add an address for shipping options',
				'woo-gutenberg-products-block'
			) }
			isShippingCalculatorOpen={ isShippingCalculatorOpen }
			setIsShippingCalculatorOpen={ setIsShippingCalculatorOpen }
		/>
	);
};

export default ShippingPlaceholder;
