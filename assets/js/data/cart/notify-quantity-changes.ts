/**
 * External dependencies
 */
import { Cart } from '@woocommerce/types';
import { dispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

const notifyIfQuantityLimitsChanged = ( oldCart: Cart, newCart: Cart ) => {
	newCart.items.forEach( ( cartItem ) => {
		const oldCartItem = oldCart.items.find( ( item ) => {
			return item.key === cartItem.key;
		} );

		// If getCartData has not finished resolving, then this is the first load.
		const isFirstLoad = oldCart.items.length === 0;

		// Item has been removed, we don't need to do any more checks.
		if ( ! oldCartItem && ! isFirstLoad ) {
			return;
		}

		const quantityAboveMax =
			cartItem.quantity > cartItem.quantity_limits.maximum;
		const quantityBelowMin =
			cartItem.quantity < cartItem.quantity_limits.minimum;

		// If the quantity is still within the constraints, then we don't need to show any notice, this is because
		// QuantitySelector will not automatically update the value.
		if ( ! quantityAboveMax && ! quantityBelowMin ) {
			return;
		}

		if ( quantityBelowMin ) {
			dispatch( 'core/notices' ).createInfoNotice(
				sprintf(
					/* translators: %1$s is the name of the item, %2$d is the quantity of the item. */
					__(
						'The quantity of "%1$s" has been increased to %2$d. This is the minimum required quantity.',
						'woo-gutenberg-products-block'
					),
					cartItem.name,
					cartItem.quantity_limits.minimum
				),
				{
					context: 'wc/cart',
					speak: true,
					type: 'snackbar',
					id: `${ cartItem.key }-quantity-update`,
				}
			);
			return;
		}

		// Quantity is above max, so has been reduced.
		dispatch( 'core/notices' ).createInfoNotice(
			sprintf(
				/* translators: %1$s is the name of the item, %2$d is the quantity of the item. */
				__(
					'The quantity of "%1$s" has been decreased to %2$d. This is the maximum allowed quantity.',
					'woo-gutenberg-products-block'
				),
				cartItem.name,
				cartItem.quantity_limits.maximum
			),
			{
				context: 'wc/cart',
				speak: true,
				type: 'snackbar',
				id: `${ cartItem.key }-quantity-update`,
			}
		);
	} );
};

const notifyIfQuantityChanged = (
	oldCart: Cart,
	newCart: Cart,
	cartItemsPendingQuantity: string[]
) => {
	newCart.items.forEach( ( cartItem ) => {
		if ( cartItemsPendingQuantity.includes( cartItem.key ) ) {
			return;
		}
		const oldCartItem = oldCart.items.find( ( item ) => {
			return item.key === cartItem.key;
		} );
		if ( ! oldCartItem ) {
			return;
		}
		if ( cartItem.key === oldCartItem.key ) {
			if ( cartItem.quantity !== oldCartItem.quantity ) {
				dispatch( 'core/notices' ).createInfoNotice(
					sprintf(
						/* translators: %1$s is the name of the item, %2$d is the quantity of the item. */
						__(
							'The quantity of %1$s has been updated to %2$d.',
							'woo-gutenberg-products-block'
						),
						cartItem.name,
						cartItem.quantity
					),
					{
						context: 'wc/cart',
						speak: true,
						type: 'snackbar',
						id: `${ cartItem.key }-quantity-update`,
					}
				);
			}
			return cartItem;
		}
	} );
};

/**
 * This function is used to notify the user when the quantity of an item in the cart has changed. It checks both the
 * item's quantity and quantity limits.
 */
export const notifyQuantityChanges = (
	oldCart: Cart,
	newCart: Cart,
	cartItemsPendingQuantity: string[]
) => {
	notifyIfQuantityLimitsChanged( oldCart, newCart );
	notifyIfQuantityChanged( oldCart, newCart, cartItemsPendingQuantity );
};
