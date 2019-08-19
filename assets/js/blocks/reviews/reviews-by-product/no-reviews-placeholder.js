/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { escapeHTML } from '@wordpress/escape-html';
import { Placeholder, Spinner } from '@wordpress/components';
import { RawHTML } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ApiErrorPlaceholder from '../../../components/api-error-placeholder';
import { IconReviewsByProduct } from '../../../components/icons';
import { withProduct } from '../../../hocs';

const NoReviewsPlaceholder = ( { error, getProduct, isLoading, product } ) => {
	const renderApiError = () => (
		<ApiErrorPlaceholder
			className="wc-block-featured-product-error"
			error={ error }
			isLoading={ isLoading }
			onRetry={ getProduct }
		/>
	);

	if ( error ) {
		return renderApiError();
	}

	const content = ( ! product || isLoading ) ? <Spinner /> : (
		<RawHTML>
			{ sprintf(
				__(
					"This block lists reviews for a selected product. %s doesn't have any reviews yet, but they will show up here when it does.",
					'woo-gutenberg-products-block'
				),
				'<strong>' + escapeHTML( product.name ) + '</strong>'
			) }
		</RawHTML>
	);

	return (
		<Placeholder
			className="wc-block-reviews-by-product"
			icon={ <IconReviewsByProduct className="block-editor-block-icon" /> }
			label={ __( 'Reviews by Product', 'woo-gutenberg-products-block' ) }
		>
			{ content }
		</Placeholder>
	);
};

NoReviewsPlaceholder.propTypes = {
};

NoReviewsPlaceholder.defaultProps = {
	// from withProduct
	error: PropTypes.object,
	isLoading: PropTypes.bool,
	product: PropTypes.shape( {
		name: PropTypes.node,
		review_count: PropTypes.number,
	} ),
};

export default withProduct( NoReviewsPlaceholder );
