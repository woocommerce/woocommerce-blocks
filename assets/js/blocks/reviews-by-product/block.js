/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import classNames from 'classnames';
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import { stringifyQuery } from '@woocommerce/navigation';

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
		this.state = {
			reviews: [],
		};

		this.getReviews();
	}

	componentDidUpdate( prevProps ) {
		if (
			prevProps.attributes.orderby !== this.props.attributes.orderby ||
			prevProps.attributes.perPage !== this.props.attributes.perPage ||
			prevProps.attributes.productId !== this.props.attributes.productId
		) {
			this.getReviews();
		}
	}

	getReviews() {
		const { attributes } = this.props;
		const { orderby, perPage, productId } = attributes;

		if ( ! productId ) {
			// We've removed the selected product, or no product is selected yet.
			return;
		}

		const payload = stringifyQuery( { order_by: orderby, per_page: perPage, product: productId } );

		apiFetch( {
			path: `/wc/v3/products/reviews${ payload }`,
		} )
			.then( ( reviews ) => {
				this.setState( { reviews } );
			} )
			.catch( () => {
				this.setState( { reviews: [] } );
			} );
	}

	render() {
		const { attributes } = this.props;
		const { reviews } = this.state;
		const { className, showProductRating, showReviewerName, showReviewerPicture, showReviewDate } = attributes;
		const classes = classNames( 'wc-block-reviews-by-product', className, {
			'has-picture': showReviewerPicture,
			'has-name': showReviewerName,
			'has-rating': showProductRating,
			'has-date': showReviewDate,
		} );

		return (
			<div className={ classes }>
				<ul className="wc-block-reviews-by-product__list">
					{ reviews.length === 0 ?
						(
							renderReview( attributes )
						) : (
							reviews.map( ( review ) => renderReview( attributes, review ) )
						)
					}
				</ul>
			</div>
		);
	}
}

ReviewsByProduct.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
};

export default ReviewsByProduct;
