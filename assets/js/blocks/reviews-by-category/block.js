/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { getReviews, renderReview } from './utils';
import withComponentId from '../../hocs/with-component-id';

/**
 * Component to handle edit mode of "Reviews by Category".
 */
class ReviewsByCategory extends Component {
	constructor() {
		super( ...arguments );
		const { attributes } = this.props;

		this.state = {
			orderby: attributes.orderby,
			reviews: [],
			totalReviews: 0,
			loading: true,
		};

		this.onChangeOrderby = this.onChangeOrderby.bind( this );
		this.appendReviews = this.appendReviews.bind( this );
	}

	componentDidMount() {
		this.loadFirstReviews();
	}

	componentDidUpdate( prevProps ) {
		if (
			prevProps.attributes.orderby !== this.props.attributes.orderby ||
			prevProps.attributes.categoryId !== this.props.attributes.categoryId
		) {
			this.loadFirstReviews();
		} else if ( prevProps.attributes.reviewsOnPageLoad !== this.props.attributes.reviewsOnPageLoad ) {
			const isIncreasing = this.props.attributes.reviewsOnPageLoad > prevProps.attributes.reviewsOnPageLoad;
			const allReviewsWereAlreadyLoaded = this.state.reviews.length >= this.state.totalReviews && this.state.totalReviews > 0;

			if ( isIncreasing && allReviewsWereAlreadyLoaded ) {
				return;
			}
			this.loadFirstReviews();
		}
	}

	getDefaultArgs() {
		const { attributes, isPreview } = this.props;
		const { order, orderby } = this.getOrderArgs( isPreview ? attributes.orderby : this.state.orderby );
		const { categoryId, reviewsOnPageLoad } = attributes;

		return {
			order,
			orderby,
			per_page: reviewsOnPageLoad,
			category_id: categoryId,
		};
	}

	loadFirstReviews( argsAttr = {} ) {
		const args = {
			...this.getDefaultArgs(),
			...argsAttr,
		};

		getReviews( args ).then( ( { reviews, totalReviews } ) => {
			this.setState( { reviews, totalReviews, loading: false } );
		} ).catch( () => {
			this.setState( { reviews: [], loading: false } );
		} );
	}

	appendReviews() {
		const { attributes } = this.props;
		const { reviewsOnLoadMore } = attributes;
		const { reviews, totalReviews } = this.state;

		const reviewsToLoad = Math.min( totalReviews - reviews.length, reviewsOnLoadMore );
		this.setState( { reviews: reviews.concat( Array( reviewsToLoad ).fill( {} ) ) } );

		const args = {
			...this.getDefaultArgs(),
			offset: reviews.length,
			per_page: reviewsOnLoadMore,
		};
		getReviews( args ).then( ( { reviews: newReviews, totalReviews: newTotalReviews } ) => {
			this.setState( {
				reviews: reviews.filter( ( review ) => Object.keys( review ).length ).concat( newReviews ),
				totalReviews: newTotalReviews,
			} );
		} ).catch( () => {
			this.setState( { reviews: [] } );
		} );
	}

	getOrderArgs( orderValue ) {
		if ( wc_product_block_data.enableReviewRating ) {
			if ( orderValue === 'lowest-rating' ) {
				return {
					order: 'asc',
					orderby: 'rating',
				};
			}
			if ( orderValue === 'highest-rating' ) {
				return {
					order: 'desc',
					orderby: 'rating',
				};
			}
		}

		return {
			order: 'desc',
			orderby: 'date_gmt',
		};
	}

	onChangeOrderby( event ) {
		const { attributes } = this.props;
		const { reviewsOnPageLoad } = attributes;
		const { totalReviews } = this.state;
		const { order, orderby } = this.getOrderArgs( event.target.value );
		const newReviews = Math.min( totalReviews, reviewsOnPageLoad );

		this.setState( {
			reviews: Array( newReviews ).fill( {} ),
			orderby: event.target.value,
		} );

		const args = {
			...this.getDefaultArgs(),
			order,
			orderby,
			per_page: reviewsOnPageLoad,
		};
		getReviews( args ).then( ( { reviews, totalReviews: newTotalReviews } ) => {
			this.setState( { reviews, totalReviews: newTotalReviews } );
		} ).catch( () => {
			this.setState( { reviews: [] } );
		} );
	}

	renderOrderBySelect() {
		const { attributes, componentId, isPreview } = this.props;
		const { orderby } = this.state;

		if ( ! attributes.showOrderby || ! wc_product_block_data.enableReviewRating ) {
			return null;
		}

		const selectId = `wc-block-reviews-by-product__orderby__select-${ componentId }`;
		const selectProps = isPreview ? {
			readOnly: true,
			value: attributes.orderby,
		} : {
			defaultValue: orderby,
			onChange: this.onChangeOrderby,
		};

		return (
			<p
				key={ `wc-block-reviews-by-product__orderby-${ componentId }` }
				className="wc-block-reviews-by-product__orderby"
			>
				<label className="wc-block-reviews-by-product__orderby__label" htmlFor={ selectId }>
					{ __( 'Order by', 'woo-gutenberg-products-block' ) }
				</label>
				<select id={ selectId } className="wc-block-reviews-by-product__orderby__select" { ...selectProps }>
					<option value="most-recent">
						{ __( 'Most recent', 'woo-gutenberg-products-block' ) }
					</option>
					<option value="highest-rating">
						{ __( 'Highest rating', 'woo-gutenberg-products-block' ) }
					</option>
					<option value="lowest-rating">
						{ __( 'Lowest rating', 'woo-gutenberg-products-block' ) }
					</option>
				</select>
			</p>
		);
	}

	renderReviewsList() {
		const { attributes, componentId } = this.props;
		const { reviews } = this.state;
		const showReviewImage = ( wc_product_block_data.showAvatars || attributes.imageType === 'product' ) && attributes.showReviewImage;
		const showReviewRating = wc_product_block_data.enableReviewRating && attributes.showReviewRating;
		const attrs = {
			...attributes,
			showReviewImage,
			showReviewRating,
		};

		return (
			<ul
				key={ `wc-block-reviews-by-product__reviews-list-${ componentId }` }
				className="wc-block-reviews-by-product__list"
			>
				{ reviews.length === 0 ?
					(
						renderReview( attrs )
					) : (
						reviews.map( ( review, i ) => renderReview( attrs, review, i ) )
					)
				}
			</ul>
		);
	}

	renderLoadMoreButton() {
		const { attributes, componentId, isPreview } = this.props;
		const { reviews, totalReviews } = this.state;

		if ( ! attributes.showLoadMore || totalReviews <= reviews.length ) {
			return null;
		}

		return (
			<button
				key={ `wc-block-reviews-by-product__rload-more-${ componentId }` }
				className="wc-block-reviews-by-product__load-more"
				onClick={ isPreview ? null : this.appendReviews }
			>
				{ __( 'Load more', 'woo-gutenberg-products-block' ) }
			</button>
		);
	}

	render() {
		const { reviews, loading } = this.state;
		const { onNoReviews } = this.props;

		// If no results are found, maybe fire a callback.
		if ( reviews.length === 0 && ! loading && onNoReviews ) {
			return onNoReviews();
		}

		return [
			this.renderOrderBySelect(),
			this.renderReviewsList(),
			this.renderLoadMoreButton(),
		];
	}
}

ReviewsByCategory.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * Whether this is the block preview or frontend display.
	 */
	isPreview: PropTypes.bool,
	/**
	 * Optional callback to fire when no reviews are found.
	 */
	onNoReviews: PropTypes.func,
	// from withComponentId
	componentId: PropTypes.number,
};

ReviewsByCategory.defaultProps = {
	onNoReviews: () => {},
};

export default withComponentId( ReviewsByCategory );
