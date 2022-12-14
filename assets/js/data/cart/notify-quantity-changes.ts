/**
 * External dependencies
 */
import { Cart, CartItem } from '@woocommerce/types';
import { dispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

const isWithinQuantityLimits = ( cartItem: CartItem ) => {
	return (
		cartItem.quantity >= cartItem.quantity_limits.minimum &&
		cartItem.quantity <= cartItem.quantity_limits.maximum &&
		cartItem.quantity % cartItem.quantity_limits.multiple_of === 0
	);
};

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

		if ( isWithinQuantityLimits( cartItem ) ) {
			return;
		}

		const quantityAboveMax =
			cartItem.quantity > cartItem.quantity_limits.maximum;
		const quantityBelowMin =
			cartItem.quantity < cartItem.quantity_limits.minimum;
		const quantityOutOfStep =
			cartItem.quantity % cartItem.quantity_limits.multiple_of !== 0;

		// If the quantity is still within the constraints, then we don't need to show any notice, this is because
		// QuantitySelector will not automatically update the value.
		if ( ! quantityAboveMax && ! quantityBelowMin && ! quantityOutOfStep ) {
			return;
		}

		if ( quantityOutOfStep ) {
			dispatch( 'core/notices' ).createInfoNotice(
				sprintf(
					/* translators: %1$s is the name of the item, %2$d is the quantity of the item. %3$d is a number that the quantity must be a multiple of. */
					__(
						'The quantity of "%1$s" was changed to %2$d. You must purchase this product in groups of %3$d.',
						'woo-gutenberg-products-block'
					),
					cartItem.name,
					// We round down to the nearest step value here. We need to do it this way because at this point we
					// don't know the next quantity. That only gets set once the HTML Input field applies its min/max
					// constraints.
					Math.floor(
						cartItem.quantity / cartItem.quantity_limits.multiple_of
					) * cartItem.quantity_limits.multiple_of,
					cartItem.quantity_limits.multiple_of
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

		if ( quantityBelowMin ) {
			dispatch( 'core/notices' ).createInfoNotice(
				sprintf(
					/* translators: %1$s is the name of the item, %2$d is the quantity of the item. */
					__(
						'The quantity of "%1$s" was increased to %2$d. This is the minimum required quantity.',
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
					'The quantity of "%1$s" was decreased to %2$d. This is the maximum allowed quantity.',
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
			if (
				cartItem.quantity !== oldCartItem.quantity &&
				isWithinQuantityLimits( cartItem )
			) {
				dispatch( 'core/notices' ).createInfoNotice(
					sprintf(
						/* translators: %1$s is the name of the item, %2$d is the quantity of the item. */
						__(
							'The quantity of "%1$s" was changed to %2$d.',
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
