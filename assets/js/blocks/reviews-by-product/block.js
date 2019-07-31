/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { renderReview } from './utils';
import withComponentId from '../../utils/with-component-id';

/**
 * Component to handle edit mode of "Reviews by Product".
 */
class ReviewsByProduct extends Component {
	constructor() {
		super( ...arguments );
		const { attributes } = this.props;
		this.state = {
			orderby: attributes.orderby,
			reviews: [],
			totalReviews: 0,
		};

		this.onChangeOrderby = this.onChangeOrderby.bind( this );
		this.getReviews = this.getReviews.bind( this );
		this.appendReviews = this.appendReviews.bind( this );
	}

	componentDidMount() {
		this.getReviews( this.props.attributes.reviewsOnPageLoad );
	}

	componentDidUpdate( prevProps ) {
		if (
			prevProps.attributes.orderby !== this.props.attributes.orderby ||
			prevProps.attributes.productId !== this.props.attributes.productId ||
			prevProps.attributes.reviewsOnPageLoad !== this.props.attributes.reviewsOnPageLoad
		) {
			this.getReviews( this.props.attributes.reviewsOnPageLoad );
		}
	}

	onChangeOrderby( event ) {
		const { attributes } = this.props;
		const { reviewsOnPageLoad } = attributes;
		const { totalReviews } = this.state;
		const newReviews = Math.min( totalReviews, reviewsOnPageLoad );

		this.setState( {
			reviews: Array( newReviews ).fill( {} ),
			orderby: event.target.value,
		} );

		this.getReviews( reviewsOnPageLoad, event.target.value );
	}

	getOrderParams( orderValue ) {
		const { attributes, isPreview } = this.props;
		const selectedOrder = isPreview ? attributes.orderby :
			orderValue || this.state.orderby || attributes.orderby;

		if ( wc_product_block_data.enableReviewRating ) {
			if ( selectedOrder === 'lowest-rating' ) {
				return {
					order: 'asc',
					orderby: 'rating',
				};
			}
			if ( selectedOrder === 'highest-rating' ) {
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

	getReviews( reviewsToLoad, orderValue, offset = 0 ) {
		const { attributes } = this.props;
		const { productId } = attributes;
		const { reviews } = this.state;
		const { order, orderby } = this.getOrderParams( orderValue );

		if ( ! productId ) {
			// We've removed the selected product, or no product is selected yet.
			return;
		}

		const args = {
			offset,
			order,
			orderby,
			per_page: parseInt( reviewsToLoad, 10 ) || 1,
			product_id: productId,
		};
		apiFetch( {
			path: '/wc/blocks/products/reviews?' + Object.entries( args ).map( ( arg ) => arg.join( '=' ) ).join( '&' ),
			parse: false,
		} ).then( ( response ) => {
			if ( response.json ) {
				response.json().then( ( newReviews ) => {
					const totalReviews = parseInt( response.headers.get( 'x-wp-total' ), 10 );
					if ( offset === 0 ) {
						this.setState( { reviews: newReviews, totalReviews } );
					} else {
						this.setState( {
							reviews: reviews.filter( ( review ) => Object.keys( review ).length ).concat( newReviews ),
							totalReviews,
						} );
					}
				} ).catch( () => {
					this.setState( { reviews: [] } );
				} );
			} else {
				this.setState( { reviews: [] } );
			}
		} ).catch( () => {
			this.setState( { reviews: [] } );
		} );
	}

	appendReviews() {
		const { attributes } = this.props;
		const { reviewsOnLoadMore } = attributes;
		const { reviews, totalReviews } = this.state;

		const newReviews = Math.min( totalReviews - reviews.length, reviewsOnLoadMore );
		this.setState( { reviews: reviews.concat( Array( newReviews ).fill( {} ) ) } );

		this.getReviews( reviewsOnLoadMore, null, reviews.length );
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
		return [
			this.renderOrderBySelect(),
			this.renderReviewsList(),
			this.renderLoadMoreButton(),
		];
	}
}

ReviewsByProduct.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * Whether this is the block preview or frontend display.
	 */
	isPreview: PropTypes.bool,
	// from withComponentId
	componentId: PropTypes.number,
};

export default withComponentId( ReviewsByProduct );
