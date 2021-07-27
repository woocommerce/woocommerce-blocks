/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { renderFrontend } from '@woocommerce/base-utils';
import { useStoreCart } from '@woocommerce/base-context/hooks';
import {
	withStoreCartApiHydration,
	withRestApiHydration,
} from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import CartLineItemsTable from '../cart-checkout/cart/full-cart/cart-line-items-table';

const MiniCartContents = () => {
	const { cartItems, cartIsLoading } = useStoreCart();

	if ( cartItems.length === 0 ) {
		return <>{ __( 'Cart is empty', 'woo-gutenberg-products-block' ) }</>;
	}

	return (
		<CartLineItemsTable
			lineItems={ cartItems }
			isLoading={ cartIsLoading }
		/>
	);
};

renderFrontend( {
	selector: '.wc-blocks-mini-cart-contents',
	Block: withStoreCartApiHydration(
		withRestApiHydration( MiniCartContents )
	),
} );
