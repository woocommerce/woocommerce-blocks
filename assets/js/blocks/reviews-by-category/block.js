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
import { withComponentId } from '../../hocs';

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
			loading: true,
		};

		this.onChangeOrderby = this.onChangeOrderby.bind( this );
		this.getReviews = this.getReviews.bind( this );
		this.appendReviews = this.appendReviews.bind( this );
	}

	componentDidMount() {
		this.getReviews();
	}

	componentDidUpdate( prevProps ) {
		if (
			prevProps.attributes.orderby !== this.props.attributes.orderby ||
			prevProps.attributes.perPage !== this.props.attributes.perPage ||
			prevProps.attributes.categoryId !== this.props.attributes.categoryId
		) {
			this.getReviews();
		}
	}

	onChangeOrderby( event ) {
		const { attributes } = this.props;
		const { perPage } = attributes;
		const { totalReviews } = this.state;
		const newReviews = Math.min( totalReviews, perPage );
		this.setState( {
			reviews: Array( newReviews ).fill( {} ),
			orderby: event.target.value,
		} );
		this.getReviews( event.target.value );
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

	getReviews( orderValue, page = 1 ) {
		const { attributes } = this.props;
		const { perPage, categoryId } = attributes;
		const { reviews } = this.state;
		const { order, orderby } = this.getOrderParams( orderValue );

		if ( ! categoryId ) {
			// We've removed the selected category, or no category is selected yet.
			return;
		}

		const args = {
			order,
			orderby,
			page,
			per_page: parseInt( perPage, 10 ) || 1,
			category_id: categoryId,
		};

		this.setState( { loading: true } );

		apiFetch( {
			path: '/wc/blocks/products/reviews?' + Object.entries( args ).map( ( arg ) => arg.join( '=' ) ).join( '&' ),
			parse: false,
		} ).then( ( response ) => {
			if ( response.json ) {
				response.json().then( ( newReviews ) => {
					const totalReviews = parseInt( response.headers.get( 'x-wp-total' ), 10 );
					if ( page === 1 ) {
						this.setState( { reviews: newReviews, totalReviews, loading: false } );
					} else {
						this.setState( {
							reviews: reviews.filter( ( review ) => Object.keys( review ).length ).concat( newReviews ),
							totalReviews,
							loading: false,
						} );
					}
				} ).catch( () => {
					this.setState( { reviews: [], loading: false } );
				} );
			} else {
				this.setState( { reviews: [], loading: false } );
			}
		} ).catch( () => {
			this.setState( { reviews: [], loading: false } );
		} );
	}

	appendReviews() {
		const { attributes } = this.props;
		const { perPage } = attributes;
		const { reviews, totalReviews } = this.state;

		const newReviews = Math.min( totalReviews - reviews.length, perPage );
		this.setState( { reviews: reviews.concat( Array( newReviews ).fill( {} ) ) } );

		const page = Math.round( reviews.length / perPage ) + 1;
		this.getReviews( null, page );
	}

	renderOrderBySelect() {
		if ( ! wc_product_block_data.enableReviewRating ) {
			return null;
		}

		const { attributes, componentId, isPreview } = this.props;
		const { orderby } = this.state;

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
		const showAvatar = wc_product_block_data.showAvatars && attributes.showAvatar;
		const showProductRating = wc_product_block_data.enableReviewRating && attributes.showProductRating;
		const attrs = {
			...attributes,
			showAvatar,
			showProductRating,
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
		const { componentId, isPreview } = this.props;
		const { reviews, totalReviews } = this.state;

		if ( totalReviews <= reviews.length ) {
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

ReviewsByProduct.propTypes = {
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

ReviewsByProduct.defaultProps = {
	onNoReviews: () => {},
};

export default withComponentId( ReviewsByProduct );
