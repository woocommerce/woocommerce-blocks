/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import classNames from 'classnames';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { adminUrl } from '@woocommerce/settings';
import { IconExternal } from '../../components/icons';

export const getBlockClassName = ( blockClassName, attributes ) => {
	const { className, contentVisibility } = attributes;

	return classNames( blockClassName, className, {
		'has-image': contentVisibility.image,
		'has-title': contentVisibility.title,
		'has-rating': contentVisibility.rating,
		'has-price': contentVisibility.price,
		'has-button': contentVisibility.button,
	} );
};

export const renderNoProductsPlaceholder = ( blockTitle, blockIcon ) => (
	<Placeholder
		className="wc-block-products"
		icon={ blockIcon }
		label={ blockTitle }
	>
		<p>
			{ __(
				"You haven't published any products to list here yet.",
				'woo-gutenberg-products-block'
			) }
		</p>
		<Button
			className="wc-block-products__add_product_button"
			isDefault
			isLarge
			href={ adminUrl + 'post-new.php?post_type=product' }
		>
			{ __( 'Add new product', 'woo-gutenberg-products-block' ) + ' ' }
			<IconExternal />
		</Button>
		<Button
			className="wc-block-products__read_more_button"
			isTertiary
			href="https://docs.woocommerce.com/document/managing-products/"
		>
			{ __( 'Learn more', 'woo-gutenberg-products-block' ) }
		</Button>
	</Placeholder>
);

export const renderHiddenContentPlaceholder = ( blockTitle, blockIcon ) => (
	<Placeholder
		className="wc-block-products"
		icon={ blockIcon }
		label={ blockTitle }
	>
		{ __(
			'The content for this block is hidden due to block settings.',
			'woo-gutenberg-products-block'
		) }
	</Placeholder>
);

export const getProducts = ( queryArgs ) => {
	const args = {
		catalog_visibility: 'visible',
		status: 'publish',
		...queryArgs,
	};
	return apiFetch( {
		path:
			'/wc/blocks/products?' +
			Object.entries( args )
				.map( ( arg ) => arg.join( '=' ) )
				.join( '&' ),
		parse: false,
	} ).then( ( response ) => {
		return response.json().then( ( products ) => {
			const totalProducts = parseInt(
				response.headers.get( 'x-wp-total' ),
				10
			);
			return { products, totalProducts };
		} );
	} );
};
