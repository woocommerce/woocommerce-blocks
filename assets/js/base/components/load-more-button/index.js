/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.scss';

export const LoadMoreButton = ( { onClick } ) => (
	<button
		className="wc-block-load-more"
		onClick={ onClick }
	>
		{ __( 'Load more', 'woo-gutenberg-products-block' ) }
	</button>
);

LoadMoreButton.propTypes = {
	onClick: PropTypes.func,
};

export default LoadMoreButton;
