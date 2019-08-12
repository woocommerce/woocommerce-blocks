/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
export const LoadMoreButton = ( { onClick } ) => (
	<button
		className="wc-block-reviews-by-product__load-more"
		onClick={ onClick }
	>
		{ __( 'Load more', 'woo-gutenberg-products-block' ) }
	</button>
);

export default LoadMoreButton;
