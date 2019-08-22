/**
 * Internal dependencies
 */
import { buildTermsTree } from './hierarchy';

/**
 * External dependencies
 */
import { PRODUCT_CATEGORIES } from '@woocommerce/settings';

/**
 * Returns categories in tree form.
 */
export default function( { hasEmpty, isHierarchical } ) {
	const categories = PRODUCT_CATEGORIES.filter(
		( cat ) => hasEmpty || !! cat.count
	);
	return isHierarchical ?
		buildTermsTree( categories ) :
		categories;
}
