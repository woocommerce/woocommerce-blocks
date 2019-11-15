/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { formatPrice } from '@woocommerce/base-utils';

export const formatPriceRange = ( minPrice, maxPrice ) => {
	if ( Number.isFinite( minPrice ) && Number.isFinite( maxPrice ) ) {
		/* translators: %s min price, %s max price */
		return sprintf(
			__( 'Between %s and %s', 'woo-gutenberg-products-block' ),
			formatPrice( minPrice ),
			formatPrice( maxPrice )
		);
	}

	if ( Number.isFinite( minPrice ) ) {
		/* translators: %s min price */
		return sprintf(
			__( 'From %s', 'woo-gutenberg-products-block' ),
			formatPrice( minPrice )
		);
	}

	/* translators: %s max price */
	return sprintf(
		__( 'Up to %s', 'woo-gutenberg-products-block' ),
		formatPrice( maxPrice )
	);
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
			<button onClick={ removeCallback }>
				{ __( 'Remove', 'woo-gutenberg-products-block' ) }
			</button>
		</li>
	);
};
