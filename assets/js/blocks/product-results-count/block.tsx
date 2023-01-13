/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

const ProductResultsCount = () => {
	return (
		<div className=".wc-block-product-results-count">
			{ __( 'Showing 1-X of X results', 'woo-gutenberg-products-block' ) }
		</div>
	);
};

export default ProductResultsCount;
