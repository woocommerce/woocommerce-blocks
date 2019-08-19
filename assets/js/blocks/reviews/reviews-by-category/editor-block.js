/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Disabled, Placeholder } from '@wordpress/components';

/**
 * Internal dependencies
 */
import LoadMoreButton from '../../../base/components/load-more-button';
import ReviewList from '../../../base/components/review-list';
import ReviewOrderSelect from '../../../base/components/review-order-select';
import withComponentId from '../../../base/hocs/with-component-id';
import withReviews from '../../../base/hocs/with-reviews';
import { IconReviewsByCategory } from '../../../components/icons';
import { ENABLE_REVIEW_RATING } from '../../../constants';

/**
 * Block rendered in the editor.
 */
class EditorBlock extends Component {
	constructor() {
		super( ...arguments );

		this.debouncedGetReviews = debounce( this.props.getReviews.bind( this ), 400 );
	}

	componentDidUpdate( prevProps ) {
		if (
			prevProps.attributes.reviewsOnPageLoad !== this.props.attributes.reviewsOnPageLoad
		) {
			// Since this attribute is controlled with a slider, it's better to debounce it to
			// avoid making excessive requests.
			this.debouncedGetReviews();
		} else if (
			prevProps.attributes.orderby !== this.props.attributes.orderby ||
			prevProps.attributes.categoryIds !== this.props.attributes.categoryIds
		) {
			this.props.getReviews();
		}
	}

	renderNoReviews() {
		return (
			<Placeholder
				className="wc-block-reviews-by-category"
				icon={ <IconReviewsByCategory className="block-editor-block-icon" /> }
				label={ __( 'Reviews by Category', 'woo-gutenberg-products-block' ) }
			>
				{ __( 'This block lists reviews for products from selected categories. The selected categories do not have any reviews yet, but they will show up here when they do.', 'woo-gutenberg-products-block' ) }
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
	/**
	 * From withComponentId.
	 */
	componentId: PropTypes.number,
	//from withReviews
	getReviews: PropTypes.func,
	reviews: PropTypes.array,
	totalReviews: PropTypes.number,
};

export default withComponentId( withReviews( EditorBlock ) );
