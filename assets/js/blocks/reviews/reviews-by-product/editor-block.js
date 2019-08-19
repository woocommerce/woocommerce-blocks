/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Disabled, Placeholder } from '@wordpress/components';

/**
 * Internal dependencies
 */
import LoadMoreButton from '../../../base/components/load-more-button';
import ReviewList from '../../../base/components/review-list';
import ReviewOrderSelect from '../../../base/components/review-order-select';
import withComponentId from '../../../base/hocs/with-component-id';
import withReviews from '../../../base/hocs/with-reviews';
import { IconReviewsByProduct } from '../../../components/icons';
import { ENABLE_REVIEW_RATING } from '../../../constants';

/**
 * Block rendered in the editor.
 */
class EditorBlock extends Component {
	renderNoReviews() {
		return (
			<Placeholder
				className="wc-block-reviews-by-product"
				icon={ <IconReviewsByProduct className="block-editor-block-icon" /> }
				label={ __( 'Reviews by Product', 'woo-gutenberg-products-block' ) }
			>
				<div dangerouslySetInnerHTML={ {
					__html: __(
						"This block lists reviews for a selected product. The selected product doesn't have any reviews yet, but they will show up here when it does.",
						'woo-gutenberg-products-block'
					),
				} } />
			</Placeholder>
		);
	}

	render() {
		const { attributes, componentId, isLoading, reviews, totalReviews } = this.props;

		if ( 0 === reviews.length && ! isLoading ) {
			return this.renderNoReviews();
		}

		return (
			<Disabled>
				{ ( attributes.showOrderby && ENABLE_REVIEW_RATING ) && (
					<ReviewOrderSelect
						componentId={ componentId }
						readOnly
						value={ attributes.orderby }
					/>
				) }
				<ReviewList
					attributes={ attributes }
					componentId={ componentId }
					reviews={ reviews }
				/>
				{ ( attributes.showLoadMore && totalReviews > reviews.length ) && (
					<LoadMoreButton
						screenReaderLabel={ __( 'Load more reviews', 'woo-gutenberg-products-block' ) }
					/>
				) }
			</Disabled>
		);
	}
}

EditorBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	// from withComponentId
	componentId: PropTypes.number,
	// from withReviews
	reviews: PropTypes.array,
	totalReviews: PropTypes.number,
};

export default withComponentId( withReviews( EditorBlock ) );
