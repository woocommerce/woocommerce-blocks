/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { formatPrice } from '@woocommerce/base-utils';

export const formatPriceRange = ( minPrice, maxPrice ) => {
	let priceString;

	if ( Number.isFinite( minPrice ) && Number.isFinite( maxPrice ) ) {
		/* translators: %s min price, %s max price */
		priceString = sprintf(
			__( 'Between %s and %s', 'woo-gutenberg-products-block' ),
			formatPrice( minPrice ),
			formatPrice( maxPrice )
		);
	} else if ( Number.isFinite( minPrice ) ) {
		/* translators: %s min price */
		priceString = sprintf(
			__( 'From %s', 'woo-gutenberg-products-block' ),
			formatPrice( minPrice )
		);
	} else {
		/* translators: %s max price */
		priceString = sprintf(
			__( 'Up to %s', 'woo-gutenberg-products-block' ),
			formatPrice( maxPrice )
		);
	}

	return priceString;
};
