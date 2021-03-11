/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { addAction } from '@wordpress/hooks';
import type { ProductResponseItem, CartResponseItem } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { namespace, actionPrefix } from './constants';
import { getProductFieldObject, trackEvent } from './utils';

const trackAddToCart = ( {
	product,
	quantity = 1,
}: {
	product: ProductResponseItem;
	quantity: number;
} ): void => {
	trackEvent( 'add_to_cart', {
		event_category: 'ecommerce',
		event_label: __( 'Add to Cart', 'woo-gutenberg-products-block' ),
		items: [ getProductFieldObject( product, quantity ) ],
	} );
};

const trackRemoveCartItem = ( {
	product,
	quantity = 1,
}: {
	product: CartResponseItem;
	quantity: number;
} ): void => {
	trackEvent( 'remove_from_cart', {
		event_category: 'ecommerce',
		event_label: __( 'Remove Cart Item', 'woo-gutenberg-products-block' ),
		items: [ getProductFieldObject( product, quantity ) ],
	} );
};

const trackChangeCartItemQuantity = ( {
	product,
	quantity = 1,
}: {
	product: CartResponseItem;
	quantity: number;
} ): void => {
	trackEvent( 'change_cart_quantity', {
		event_category: 'ecommerce',
		event_label: __(
			'Change Cart Item Quantity',
			'woo-gutenberg-products-block'
		),
		items: [ getProductFieldObject( product, quantity ) ],
	} );
};

function initialize() {
	// eslint-disable-next-line no-console
	console.log( `Tracking initialized` );
	addAction( `${ actionPrefix }-add-cart-item`, namespace, trackAddToCart );
	addAction(
		`${ actionPrefix }-set-cart-item-quantity`,
		namespace,
		trackChangeCartItemQuantity
	);
	addAction(
		`${ actionPrefix }-remove-cart-item`,
		namespace,
		trackRemoveCartItem
	);
}

initialize();
