/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import classNames from 'classnames';
import { ADMIN_URL } from '@woocommerce/settings';
import { Icon, external } from '@woocommerce/icons';

export const getBlockClassName = ( blockClassName, attributes ) => {
	const { className, contentVisibility } = attributes;

	return classNames( blockClassName, className, {
		'has-image': contentVisibility && contentVisibility.image,
		'has-title': contentVisibility && contentVisibility.title,
		'has-rating': contentVisibility && contentVisibility.rating,
		'has-price': contentVisibility && contentVisibility.price,
		'has-button': contentVisibility && contentVisibility.button,
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
			className="wc-block-products__add-product-button"
			isSecondary
			href={ ADMIN_URL + 'post-new.php?post_type=product' }
		>
			{ __( 'Add new product', 'woo-gutenberg-products-block' ) + ' ' }
			<Icon srcElement={ external } />
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
