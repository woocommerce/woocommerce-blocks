/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import classNames from 'classnames';
import { Component } from '@wordpress/element';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { renderReview } from './utils';

/**
 * Component to handle edit mode of "Reviews by Product".
 */
class ReviewsByProduct extends Component {
	constructor() {
		super( ...arguments );
		const { attributes } = this.props;
		this.state = {
			order: attributes.orderby,
			reviews: [],
			totalReviews: 0,
		};

		this.debouncedGetReviews = debounce( this.getReviews.bind( this ), 200 );
		this.onChangeOrderby = this.onChangeOrderby.bind( this );
		this.getReviews = this.getReviews.bind( this );
		this.appendReviews = this.appendReviews.bind( this );
	}

	componentDidMount() {
		this.getReviews();
	}

	componentWillUnmount() {
		this.debouncedGetReviews.cancel();
	}

	componentDidUpdate( prevProps ) {
		if (
			prevProps.attributes.orderby !== this.props.attributes.orderby ||
			prevProps.attributes.perPage !== this.props.attributes.perPage ||
			prevProps.attributes.productId !== this.props.attributes.productId
		) {
			this.debouncedGetReviews();
		}
	}

	onChangeOrderby( event ) {
		const { attributes } = this.props;
		const { perPage } = attributes;
		const { totalReviews } = this.state;
		const newReviews = Math.min( totalReviews, perPage );
		this.setState( {
			reviews: Array( newReviews ).fill( {} ),
			order: event.target.value,
		} );
		this.getReviews( event.target.value );
	}

	getReviews( order, page = 1 ) {
		const { attributes } = this.props;
		const { perPage, productId } = attributes;
		const { reviews } = this.state;
		const orderby = order || this.state.order || attributes.orderby;

		if ( ! productId ) {
			// We've removed the selected product, or no product is selected yet.
			return;
		}

		apiFetch( {
			path: addQueryArgs( `/wc/blocks/products/reviews`, {
				order_by: orderby,
				page,
				per_page: parseInt( perPage, 10 ) || 1,
				product_id: productId,
			} ),
			parse: false,
		} ).then( ( response ) => {
			if ( response.json ) {
				response.json().then( ( newReviews ) => {
					const totalReviews = parseInt( response.headers.get( 'x-wp-total' ), 10 );
					if ( page === 1 ) {
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
		const { perPage } = attributes;
		const { reviews, totalReviews } = this.state;

		const newReviews = Math.min( totalReviews - reviews.length, perPage );
		this.setState( { reviews: reviews.concat( Array( newReviews ).fill( {} ) ) } );

		const page = Math.round( reviews.length / perPage ) + 1;
		this.getReviews( null, page );
	}

	render() {
		const { attributes, instanceId, isPreview } = this.props;
		const { order, reviews, totalReviews } = this.state;
		const { className, showProductRating, showReviewDate, showReviewerName } = attributes;
		const showAvatar = wc_product_block_data.showAvatars && attributes.showAvatar;
		const classes = classNames( 'wc-block-reviews-by-product', className, {
			'has-avatar': showAvatar,
			'has-date': showReviewDate,
			'has-name': showReviewerName,
			'has-rating': showProductRating,
		} );
		const attrs = {
			...attributes,
			showAvatar,
		};

		const selectId = `wc-block-reviews-by-product__orderby__select-${ instanceId }`;
		const selectProps = isPreview ? {
			readOnly: true,
			value: attributes.orderby,
		} : {
			defaultValue: order,
			onBlur: this.onChangeOrderby,
		};

		return (
			<div className={ classes }>
				<p className="wc-block-reviews-by-product__orderby">
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
				<ul className="wc-block-reviews-by-product__list">
					{ reviews.length === 0 ?
						(
							renderReview( attrs )
						) : (
							reviews.map( ( review, i ) => renderReview( attrs, review, i ) )
						)
					}
				</ul>
				{ totalReviews > reviews.length && (
					<button
						className="wc-block-reviews-by-product__load-more"
						onClick={ isPreview ? null : this.appendReviews }
					>
						{ __( 'Load more', 'woo-gutenberg-products-block' ) }
					</button>
				) }
			</div>
		);
	}
}

ReviewsByProduct.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * A unique ID for identifying the label for the select dropdown.
	 */
	instanceId: PropTypes.number,
	/**
	 * Whether this is the block preview or frontend display.
	 */
	isPreview: PropTypes.bool,
};

export default withInstanceId( ReviewsByProduct );
