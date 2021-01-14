/**
 * External dependencies
 */
import { render, screen, waitFor } from '@testing-library/react';
import { PaymentMethodDataProvider } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import PaymentMethods from '../payment-methods';

jest.mock( '../payment-method-options', () => () => (
	<span>Payment method options</span>
) );
jest.mock( '../saved-payment-method-options', () => () => (
	<span>Saved payment method options</span>
) );

describe( 'PaymentMethods', () => {
	test( 'should show no payment methods component when there are no payment methods', async () => {
		render(
			<PaymentMethodDataProvider>
				<PaymentMethods />
			</PaymentMethodDataProvider>
		);

		await waitFor( () => {
			const noPaymentMethods = screen.queryAllByText(
				/no payment methods available/
			);
			// We might get more than one match because the `speak()` function
			// creates an extra `div` with the notice contents used for a11y.
			expect( noPaymentMethods.length ).toBeGreaterThanOrEqual( 1 );
		} );
	} );
} );
