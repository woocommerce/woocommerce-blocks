/**
 * External dependencies
 */
const config = require( 'config' );
const baseUrl = config.get( 'url' );

/**
 * Shop pages.
 *
 * @type {string}
 */
export const SHOP_CART_BLOCK_PAGE = baseUrl + 'cart-block';
export const SHOP_CART_PAGE = baseUrl + 'cart';
export const SHOP_CHECKOUT_BLOCK_PAGE = baseUrl + 'checkout-block';
export const simpleProductName = 'Woo Single #1';
