// @ts-nocheck
/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useStoreCart, useStoreNotices } from '@woocommerce/base-hooks';
import classnames from 'classnames';
import {
	SidebarLayout,
	Main,
} from '@woocommerce/base-components/sidebar-layout';
import { useEffect } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import CartLineItemsTitle from './cart-line-items-title';
import CartLineItemsTable from './cart-line-items-table';
import CartSidebar from './cart-sidebar';
import './style.scss';

/**
 * Component that renders the Cart block when user has something in cart aka "full".
 */
const Cart = ( { attributes } ) => {
	const {
		cartItems,
		cartIsLoading,
		cartItemsCount,
		cartItemErrors,
	} = useStoreCart();

	const { addErrorNotice } = useStoreNotices();

	// Ensures any cart errors listed in the API response get shown.
	useEffect( () => {
		cartItemErrors.forEach( ( error ) => {
			addErrorNotice( decodeEntities( error.message ), {
				isDismissible: true,
				id: error.code,
			} );
		} );
	}, [ cartItemErrors ] );

	const cartClassName = classnames( 'wc-block-cart', {
		'wc-block-cart--is-loading': cartIsLoading,
	} );

	return (
		<SidebarLayout className={ cartClassName }>
			<Main className="wc-block-cart__main">
				<CartLineItemsTitle itemCount={ cartItemsCount } />
				<CartLineItemsTable
					lineItems={ cartItems }
					isLoading={ cartIsLoading }
				/>
			</Main>
			<CartSidebar attributes={ attributes } />
		</SidebarLayout>
	);
};

Cart.propTypes = {
	attributes: PropTypes.object.isRequired,
};

export default Cart;
