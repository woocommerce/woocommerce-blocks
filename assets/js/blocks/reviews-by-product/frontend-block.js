/**
 * External dependencies
 */
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { getOrderArgs, getReviews } from './utils';
import withComponentId from '../../frontend/hocs/with-component-id';
import LoadMoreButton from '../../frontend/components/load-more-button';
import OrderBySelect from '../../frontend/components/order-by-select';
import Reviews from '../../frontend/components/reviews';

/**
 * Block renderer in the frontend.
 */
class FrontendBlock extends Component {
	constructor() {
		super( ...arguments );
		const { attributes } = this.props;

		this.state = {
			orderby: attributes.orderby,
			reviews: [],
			totalReviews: 0,
		};

		this.onChangeOrderby = this.onChangeOrderby.bind( this );
		this.appendReviews = this.appendReviews.bind( this );
	}

	componentDidMount() {
		this.loadFirstReviews();
	}

	getDefaultArgs() {
		const { attributes } = this.props;
		const { order, orderby } = getOrderArgs( this.state.orderby );
		const { productId, reviewsOnPageLoad } = attributes;

		return {
			order,
			orderby,
			per_page: reviewsOnPageLoad,
			product_id: productId,
		};
	}

	loadFirstReviews() {
		const args = this.getDefaultArgs();

		getReviews( args ).then( ( { reviews, totalReviews } ) => {
			this.setState( { reviews, totalReviews } );
		} ).catch( () => {
			this.setState( { reviews: [] } );
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

	onChangeOrderby( event ) {
		const { attributes } = this.props;
		const { reviewsOnPageLoad } = attributes;
		const { totalReviews } = this.state;
		const { order, orderby } = getOrderArgs( event.target.value );
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

	render() {
		const { attributes, componentId } = this.props;
		const { orderby, reviews, totalReviews } = this.state;

		return (
			<Fragment>
				{ ( attributes.showOrderby && wc_product_block_data.enableReviewRating ) && (
					<OrderBySelect
						componentId={ componentId }
						onChange={ this.onChangeOrderby }
						value={ orderby }
					/>
				) }
				<Reviews
					attributes={ attributes }
					componentId={ componentId }
					reviews={ reviews }
				/>
				{ ( attributes.showLoadMore && totalReviews > reviews.length ) && (
					<LoadMoreButton
						onClick={ this.appendReviews }
					/>
				) }
			</Fragment>
		);
	}
}

FrontendBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	// from withComponentId
	componentId: PropTypes.number,
};

export default withComponentId( FrontendBlock );
