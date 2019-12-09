/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor';
import { SHOP_URL } from '@woocommerce/block-settings';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import iconDataUri from './icon-data-uri.js';
import './style.scss';

/**
 * Component to handle edit mode for the Cart block when cart is empty.
 */
const EmptyCart = ( { hidden } ) => {
	return (
		<div hidden={ hidden }>
			<InnerBlocks
				template={ [
					[
						'core/image',
						{
							align: 'center',
							url: iconDataUri,
							sizeSlug: 'small',
						},
					],
					[
						'core/heading',
						{
							align: 'center',
							content: __(
								'Your cart is currently empty!',
								'woo-gutenberg-products-block'
							),
							level: 2,
							className: 'wc-block-cart__empty-cart__title',
						},
					],
					[
						'core/paragraph',
						{
							align: 'center',
							content: sprintf(
								__(
									'<a href="%s">Browse store</a>.',
									'woo-gutenberg-products-block'
								),
								SHOP_URL
							),
							dropCap: false,
						},
					],
					[
						'core/separator',
						{
							className: 'is-style-dots',
						},
					],
					[
						'core/heading',
						{
							align: 'center',
							content: __(
								'New in store',
								'woo-gutenberg-products-block'
							),
							level: 2,
						},
					],
					[
						'woocommerce/product-new',
						{
							columns: 3,
							rows: 1,
						},
					],
				] }
			/>
		</div>
	);
};

EmptyCart.propTypes = {
	hidden: PropTypes.bool,
};

export default EmptyCart;
