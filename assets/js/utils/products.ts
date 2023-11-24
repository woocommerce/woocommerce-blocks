/**
 * Internal dependencies
 */
import type { ProductResponseItem } from '~/types';
import type { SearchListItem } from '~/editor-components/search-list-control/types';

/**
 * Converts a Product object into a shape compatible with the `SearchListControl`
 */
export const convertProductResponseItemToSearchItem = (
	product: ProductResponseItem
): SearchListItem< ProductResponseItem > => {
	const { id, name, parent } = product;

	return {
		id,
		name,
		parent,
		breadcrumbs: [],
		children: [],
		details: product,
		value: product.slug,
	};
};

/**
 * Get the src of the first image attached to a product (the featured image).
 */
export function getImageSrcFromProduct( product: ProductResponseItem ) {
	if ( ! product || ! product.images || ! product.images.length ) {
		return '';
	}

	return product.images[ 0 ].src || '';
}

/**
 * Get the ID of the first image attached to a product (the featured image).
 */
export function getImageIdFromProduct( product: ProductResponseItem ) {
	if ( ! product || ! product.images || ! product.images.length ) {
		return 0;
	}

	return product.images[ 0 ].id || 0;
}
