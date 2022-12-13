/**
 * External dependencies
 */
import { dispatch } from '@wordpress/data';
import { previewCart } from '@woocommerce/resource-previews';
import { camelCase, cloneDeep, mapKeys } from 'lodash';
import { Cart } from '@woocommerce/type-defs/cart';
import { CartResponse } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { notifyQuantityChanges } from '../notify-quantity-changes';

jest.mock( '@wordpress/data' );

const mockedCreateInfoNotice = jest.fn();
dispatch.mockImplementation( ( store ) => {
	if ( store === 'core/notices' ) {
		return {
			createInfoNotice: mockedCreateInfoNotice,
		};
	}
} );

/**
 * Clones the preview cart and turns it into a `Cart`.
 */
const getFreshCarts = (): { oldCart: Cart; newCart: Cart } => {
	const oldCart = mapKeys(
		cloneDeep< CartResponse >( previewCart ),
		( _, key ) => camelCase( key )
	) as unknown as Cart;
	const newCart = mapKeys(
		cloneDeep< CartResponse >( previewCart ),
		( _, key ) => camelCase( key )
	) as unknown as Cart;
	return { oldCart, newCart };
};

describe( 'notifyQuantityChanges', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );
	it( 'shows notices when the quantity limits of an item change', () => {
		const { oldCart, newCart } = getFreshCarts();
		newCart.items[ 0 ].quantity_limits.minimum = 50;
		notifyQuantityChanges( oldCart, newCart, [] );
		expect( mockedCreateInfoNotice ).toHaveBeenLastCalledWith(
			'The quantity of "Beanie" has been increased to 50. This is the minimum required quantity.',
			{
				context: 'wc/cart',
				speak: true,
				type: 'snackbar',
				id: '1-quantity-update',
			}
		);

		newCart.items[ 0 ].quantity_limits.minimum = 1;
		newCart.items[ 0 ].quantity_limits.maximum = 10;
		// Quantity needs to be outside the limits for the notice to show.
		newCart.items[ 0 ].quantity = 11;
		notifyQuantityChanges( oldCart, newCart, [] );
		expect( mockedCreateInfoNotice ).toHaveBeenLastCalledWith(
			'The quantity of "Beanie" has been decreased to 10. This is the maximum allowed quantity.',
			{
				context: 'wc/cart',
				speak: true,
				type: 'snackbar',
				id: '1-quantity-update',
			}
		);
		newCart.items[ 0 ].quantity = 10;
		oldCart.items[ 0 ].quantity = 10;
		newCart.items[ 0 ].quantity_limits.multiple_of = 6;
		notifyQuantityChanges( oldCart, newCart, [] );
		expect( mockedCreateInfoNotice ).toHaveBeenLastCalledWith(
			'The quantity of "Beanie" has been changed to 6. This product must be purchased in groups of 6.',
			{
				context: 'wc/cart',
				speak: true,
				type: 'snackbar',
				id: '1-quantity-update',
			}
		);
	} );
	it( 'does not show notices if the quantity limit changes, and the quantity is within limits', () => {
		const { oldCart, newCart } = getFreshCarts();
		newCart.items[ 0 ].quantity = 5;
		oldCart.items[ 0 ].quantity = 5;
		newCart.items[ 0 ].quantity_limits.maximum = 10;
		notifyQuantityChanges( oldCart, newCart, [] );
		expect( mockedCreateInfoNotice ).not.toHaveBeenCalled();

		newCart.items[ 0 ].quantity_limits.minimum = 4;
		notifyQuantityChanges( oldCart, newCart, [] );
		expect( mockedCreateInfoNotice ).not.toHaveBeenCalled();
	} );
	it( 'shows notices when the quantity of an item changes', () => {
		const { oldCart, newCart } = getFreshCarts();
		newCart.items[ 0 ].quantity = 50;
		notifyQuantityChanges( oldCart, newCart, [] );
		expect( mockedCreateInfoNotice ).toHaveBeenLastCalledWith(
			'The quantity of "Beanie" has been changed to 50.',
			{
				context: 'wc/cart',
				speak: true,
				type: 'snackbar',
				id: '1-quantity-update',
			}
		);
	} );
	it( 'does not show notices when the the item is the one being updated', () => {
		const { oldCart, newCart } = getFreshCarts();
		newCart.items[ 0 ].quantity = 5;
		newCart.items[ 0 ].quantity_limits.maximum = 10;
		notifyQuantityChanges( oldCart, newCart, [ '1' ] );
		expect( mockedCreateInfoNotice ).not.toHaveBeenCalled();
	} );
} );
