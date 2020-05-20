/**
 * @jest-environment jest-environment-jsdom-sixteen
 */
/**
 * External dependencies
 */
import {
	render,
	fireEvent,
	waitFor,
	screen,
	act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
	StoreNoticesProvider,
	ValidationContextProvider,
	CartProvider,
	EditorProvider,
} from '@woocommerce/base-context';
import { previewCart } from '@woocommerce/resource-previews';
/**
 * Internal dependencies
 */
import CartSidebar from '../cart-sidebar';

const attributes = {
	isShippingCalculatorEnabled: true,
	isShippingCostHidden: false,
};
describe( 'CartSidebar', () => {
	it( 'should render the cart sidebar ', async () => {
		render(
			<EditorProvider previewData={ { previewCart } } currentPostId={ 1 }>
				<StoreNoticesProvider context="wc/cart">
					<ValidationContextProvider>
						<CartProvider>
							<CartSidebar attributes={ attributes } />
						</CartProvider>
					</ValidationContextProvider>
				</StoreNoticesProvider>
			</EditorProvider>
		);

		const title = screen.getAllByRole( 'heading' );
		expect( title[ 0 ].textContent ).toEqual( 'Cart totals' );
		await waitFor( () => screen.findByText( /free shipping/i ) );
	} );
} );
