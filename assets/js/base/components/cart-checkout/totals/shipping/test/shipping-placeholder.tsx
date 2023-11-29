/**
 * External dependencies
 */
import { screen, render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import ShippingPlaceholder from '../shipping-placeholder';

describe( 'ShippingPlaceholder', () => {
	it( 'should show correct text if showCalculator is false', () => {
		const { rerender } = render(
			<ShippingPlaceholder
				showCalculator={ false }
				isCheckout={ true }
				isShippingCalculatorOpen={ false }
				setIsShippingCalculatorOpen={ jest.fn() }
			/>
		);
		expect(
			screen.getByText( 'Add an address for shipping options' )
		).toBeInTheDocument();
		rerender(
			<ShippingPlaceholder
				showCalculator={ false }
				isCheckout={ false }
				isShippingCalculatorOpen={ false }
				setIsShippingCalculatorOpen={ jest.fn() }
			/>
		);
		expect(
			screen.getByText( 'Calculated during checkout' )
		).toBeInTheDocument();
	} );
} );
