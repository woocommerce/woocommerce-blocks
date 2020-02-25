/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { PLACEHOLDER_IMG_SRC } from '@woocommerce/block-settings';

/**
 * Return a currency value as a number for doing calculations.
 * Note this doesn't convert into dollars, currency values are in minor units (e.g. cents).
 *
 * @param {string} currencyValue Currency value string (in minor unit).
 * @return {number} The currency value as int (in minor unit).
 */
export const getPriceNumber = ( currencyValue ) => {
	return parseInt( currencyValue, 10 );
};

/**
 * Returns a formatted element containing variation details.
 */
export const ProductVariationDetails = ( { variation } ) => {
	const variationsText = variation
		.map( ( v ) => {
			if ( v.attribute ) {
				return `${ decodeEntities( v.attribute ) }: ${ decodeEntities(
					v.value
				) }`;
			}
			// Support for product attributes with no name/key
			return `${ decodeEntities( v.value ) }`;
		} )
		.join( ' / ' );

	return (
		<div className="wc-block-cart-item__product-attributes">
			{ variationsText }
		</div>
	);
};

/**
 * Formats and returns an image element.
 */
export const ProductImage = ( { image = {} } ) => {
	const imageProps = {
		src: image.src || PLACEHOLDER_IMG_SRC,
		alt: image.alt || '',
		srcSet: image.srcset || '',
		sizes: image.sizes || '',
	};

	return <img { ...imageProps } alt={ decodeEntities( imageProps.alt ) } />;
};

/**
 * Returns a low stock badge for a line item.
 */
export const ProductLowStockBadge = ( { lowStockRemaining } ) => {
	return (
		lowStockRemaining && (
			<div className="wc-block-cart-item__low-stock-badge">
				{ sprintf(
					/* translators: %s stock amount (number of items in stock for product) */
					__( '%s left in stock', 'woo-gutenberg-products-block' ),
					lowStockRemaining
				) }
			</div>
		)
	);
};
