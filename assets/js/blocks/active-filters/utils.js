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

/**
 * Render a removable item in the active filters block list.
 * @param {string} type Type string.
 * @param {string} name Name string.
 * @param {*} removeCallback Callback to remove item.
 * @param {*} removeIcon Icon for the remove button.
 */
export const renderRemovableListItem = (
	type,
	name,
	removeCallback = () => {}
) => {
	return (
		<li
			className="wc-block-active-filters-list-item"
			key={ type + ':' + name }
		>
			<span className="wc-block-active-filters-list-item__type">
				{ type + ': ' }
			</span>
			<strong className="wc-block-active-filters-list-item__name">
				{ name }
			</strong>
			<button
				onClick={ removeCallback }
				aria-label={ __( 'Remove', 'woo-gutenberg-products-block' ) }
			>
				{ __( 'Remove', 'woo-gutenberg-products-block' ) }
			</button>
		</li>
	);
};
