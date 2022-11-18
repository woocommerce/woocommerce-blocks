/**
 * External dependencies
 */
import { render, screen, waitFor } from '@testing-library/react';
import { useCartEventsContext } from '@woocommerce/base-context';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Block from '../block';
import { CartEventsProvider } from '../../../../../base/context/providers';

describe( 'ProceedToCheckoutBlock', () => {
	it( 'dispatches the onProceedToCheckout event when the button is clicked', async () => {
		const mockObserver = jest.fn();
		const MockObserverComponent = () => {
			const { onProceedToCheckout } = useCartEventsContext();
			useEffect( () => {
				return onProceedToCheckout( mockObserver );
			}, [ onProceedToCheckout ] );
			return <div>Mock observer</div>;
		};

		render(
			<CartEventsProvider>
				<div>
					<MockObserverComponent />
					<Block checkoutPageId={ 0 } className="test-block" />
				</div>
			</CartEventsProvider>
		);
		expect( screen.getByText( 'Mock observer' ) ).toBeInTheDocument();
		const button = screen.getByText( 'Proceed to Checkout' );
		button.click();
		await waitFor( () => {
			expect( mockObserver ).toHaveBeenCalled();
		} );
	} );
} );
