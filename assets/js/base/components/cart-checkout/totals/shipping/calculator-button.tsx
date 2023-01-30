/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

export interface CalculatorButtonProps {
	label?: string;
	hasRates?: boolean | undefined;
	isShippingCalculatorOpen: boolean;
	setIsShippingCalculatorOpen: ( isShippingCalculatorOpen: boolean ) => void;
}

export const CalculatorButton = ( {
	label = __( 'Calculate', 'woo-gutenberg-products-block' ),
	hasRates = true,
	isShippingCalculatorOpen,
	setIsShippingCalculatorOpen,
}: CalculatorButtonProps ): JSX.Element => {
	// If shipping rates are available. We want to show a button instead of a link.
	if ( hasRates ) {
		return (
			<button
				className="wc-block-components-totals-shipping__change-address-button"
				onClick={ () => {
					setIsShippingCalculatorOpen( ! isShippingCalculatorOpen );
				} }
				aria-expanded={ isShippingCalculatorOpen }
			>
				{ label }
			</button>
		);
	}

	// If no shipping rates are available, we want to show a link instead of a button.
	// This is because the style of the link will match the link style of the theme like "Add a coupon".
	return (
		<a
			role="button"
			href="#wc-block-components-shipping-calculator-address__link"
			className="wc-block-components-totals-shipping__change-address__link"
			id="wc-block-components-totals-shipping__change-address__link"
			onClick={ () => {
				setIsShippingCalculatorOpen( ! isShippingCalculatorOpen );
			} }
			aria-label={ label }
			aria-expanded={ isShippingCalculatorOpen }
		>
			{ label }
		</a>
	);
};

export default CalculatorButton;
