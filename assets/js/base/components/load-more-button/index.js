/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

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

LoadMoreButton.propTypes = {
	onClick: PropTypes.func,
};

export default LoadMoreButton;
