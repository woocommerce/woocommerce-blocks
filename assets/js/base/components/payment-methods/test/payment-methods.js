/**
 * External dependencies
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as mockBaseHooks from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import PaymentMethods from '../payment-methods';

jest.mock( '../no-payment-methods', () => () => (
	<span>No payment methods</span>
) );
jest.mock( '../payment-method-options', () => () => (
	<span>Payment method options</span>
) );
jest.mock( '../saved-payment-method-options', () => ( { onChange } ) => (
	<>
		<span>Saved payment method options</span>
		<button onClick={ () => onChange( '1' ) }>Select saved</button>
		<button onClick={ () => onChange( '0' ) }>Select not saved</button>
	</>
) );

jest.mock( '@woocommerce/base-hooks', () => ( {
	...jest.requireActual( '@woocommerce/base-hooks' ),
	usePaymentMethods: jest.fn(),
} ) );

describe( 'PaymentMethods', () => {
	afterEach( () => {
		mockBaseHooks.usePaymentMethods.mockReset();
	} );

	test( 'should show no payment methods component when there are no payment methods', async () => {
		mockBaseHooks.usePaymentMethods.mockImplementation( () => ( {
			isInitialized: true,
			paymentMethods: {},
		} ) );
		render( <PaymentMethods /> );

		await waitFor( () => {
			const noPaymentMethods = screen.queryByText( /No payment methods/ );
			expect( noPaymentMethods ).not.toBeNull();
		} );
	} );

	test( 'should hide/show PaymentMethodOptions when a saved payment method is checked/unchecked', async () => {
		mockBaseHooks.usePaymentMethods.mockImplementation( () => ( {
			isInitialized: true,
			paymentMethods: {
				cheque: {
					name: 'cheque',
					label: 'Cheque',
					content: <div>Cheque payment method</div>,
					edit: <div>Cheque payment method</div>,
					icons: null,
					canMakePayment: () => true,
					ariaLabel: 'Cheque',
				},
			},
		} ) );
		render( <PaymentMethods /> );

		await waitFor( () => {
			const savedPaymentMethodOptions = screen.queryByText(
				/Saved payment method options/
			);
			const paymentMethodOptions = screen.queryByText(
				/Payment method options/
			);
			expect( savedPaymentMethodOptions ).not.toBeNull();
			expect( paymentMethodOptions ).not.toBeNull();
		} );

		fireEvent.click( screen.getByText( 'Select saved' ) );

		await waitFor( () => {
			const savedPaymentMethodOptions = screen.queryByText(
				/Saved payment method options/
			);
			const paymentMethodOptions = screen.queryByText(
				/Payment method options/
			);
			expect( savedPaymentMethodOptions ).not.toBeNull();
			expect( paymentMethodOptions ).toBeNull();
		} );

		fireEvent.click( screen.getByText( 'Select not saved' ) );

		await waitFor( () => {
			const savedPaymentMethodOptions = screen.queryByText(
				/Saved payment method options/
			);
			const paymentMethodOptions = screen.queryByText(
				/Payment method options/
			);
			expect( savedPaymentMethodOptions ).not.toBeNull();
			expect( paymentMethodOptions ).not.toBeNull();
		} );
	} );
} );
