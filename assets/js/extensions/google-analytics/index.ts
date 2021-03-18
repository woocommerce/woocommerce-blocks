/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { addAction } from '@wordpress/hooks';
import type {
	ProductResponseItem,
	CartResponseItem,
	StoreCart,
} from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { namespace, actionPrefix } from './constants';
import {
	getProductFieldObject,
	getProductImpressionObject,
	trackEvent,
	trackCheckoutStep,
	trackCheckoutOption,
} from './utils';

/**
 * Track customer progress through steps of the checkout. Triggers the event when the step changes.
 *
 * 1 - Contact information
 * 2 - Shipping address
 * 3 - Billing address
 * 4 - Shipping options
 * 5 - Payment options
 */
addAction(
	`${ actionPrefix }-checkout-render-checkout-form`,
	namespace,
	trackCheckoutStep( 0 )
);
addAction(
	`${ actionPrefix }-checkout-set-email-address`,
	namespace,
	trackCheckoutStep( 1 )
);
addAction(
	`${ actionPrefix }-checkout-set-shipping-address`,
	namespace,
	trackCheckoutStep( 2 )
);
addAction(
	`${ actionPrefix }-checkout-set-billing-address`,
	namespace,
	trackCheckoutStep( 3 )
);
addAction(
	`${ actionPrefix }-checkout-set-phone-number`,
	namespace,
	( { step, ...rest }: { step: string; storeCart: StoreCart } ): void => {
		trackCheckoutStep( step === 'shipping' ? 2 : 3 )( rest );
	}
);
addAction(
	`${ actionPrefix }-checkout-set-selected-shipping-rate`,
	namespace,
	( { shippingRateId }: { shippingRateId: string } ): void => {
		trackCheckoutOption( {
			step: 4,
			option: __( 'Shipping Method', 'woo-gutenberg-products-block' ),
			value: shippingRateId,
		} )();
	}
);
addAction(
	`${ actionPrefix }-checkout-set-active-payment-method`,
	namespace,
	( { paymentMethodSlug }: { paymentMethodSlug: string } ): void => {
		trackCheckoutOption( {
			step: 6,
			option: __( 'Payment Method', 'woo-gutenberg-products-block' ),
			value: paymentMethodSlug,
		} )();
	}
);

/**
 * Cart Events.
 */
addAction(
	`${ actionPrefix }-add-product-to-cart`,
	namespace,
	( {
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
	}
);
addAction(
	`${ actionPrefix }-set-cart-item-quantity`,
	namespace,
	( {
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
	}
);
addAction(
	`${ actionPrefix }-remove-cart-item`,
	namespace,
	( {
		product,
		quantity = 1,
	}: {
		product: CartResponseItem;
		quantity: number;
	} ): void => {
		trackEvent( 'remove_from_cart', {
			event_category: 'ecommerce',
			event_label: __(
				'Remove Cart Item',
				'woo-gutenberg-products-block'
			),
			items: [ getProductFieldObject( product, quantity ) ],
		} );
	}
);

/**
 * Product Events.
 */
addAction(
	`${ actionPrefix }-render-product-list`,
	namespace,
	( {
		products,
		listName = __( 'Product List', 'woo-gutenberg-products-block' ),
	}: {
		products: Array< ProductResponseItem >;
		listName: string;
	} ): void => {
		if ( products.length === 0 ) {
			return;
		}
		trackEvent( 'view_item_list', {
			event_category: 'engagement',
			event_label: __(
				'Viewing products',
				'woo-gutenberg-products-block'
			),
			items: products.map( ( product, index ) => ( {
				...getProductImpressionObject( product, listName ),
				list_position: index + 1,
			} ) ),
		} );
	}
);
addAction(
	`${ actionPrefix }-render-single-product`,
	namespace,
	( {
		product,
		listName,
	}: {
		product: ProductResponseItem;
		listName: string;
	} ): void => {
		if ( product ) {
			trackEvent( 'view_item', {
				items: [ getProductImpressionObject( product, listName ) ],
			} );
		}
	}
);
addAction(
	`${ actionPrefix }-view-product`,
	namespace,
	( {
		product,
		listName,
	}: {
		product: ProductResponseItem;
		listName: string;
	} ): void => {
		trackEvent( 'select_content', {
			content_type: 'product',
			items: [ getProductImpressionObject( product, listName ) ],
		} );
	}
);
addAction(
	`${ actionPrefix }-search-for-product`,
	namespace,
	( { searchTerm }: { searchTerm: string } ): void => {
		trackEvent( 'search', {
			search_term: searchTerm,
		} );
	}
);
