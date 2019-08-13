/**
 * External dependencies
 */
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import { getOrderArgs, getReviews } from './utils';
import LoadMoreButton from '../../base/components/load-more-button';
import OrderBySelect from '../../base/components/order-by-select';
import Reviews from '../../base/components/reviews';
import withComponentId from '../../base/hocs/with-component-id';

const enableReviewRating = !! ( typeof wc_product_block_data !== 'undefined' && wc_product_block_data.enableReviewRating );

/**
 * Block rendered in the editor.
 */
class EditorBlock extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			reviews: [],
			totalReviews: 0,
		};

		this.debouncedLoadFirstReviews = debounce( this.loadFirstReviews.bind( this ), 400 );
	}

	componentDidMount() {
		this.loadFirstReviews();
	}

	componentDidUpdate( prevProps ) {
		if (
			prevProps.attributes.orderby !== this.props.attributes.orderby ||
			prevProps.attributes.productId !== this.props.attributes.productId ||
			prevProps.attributes.reviewsOnPageLoad !== this.props.attributes.reviewsOnPageLoad
		) {
			this.debouncedLoadFirstReviews();
		}
	}

	getDefaultArgs() {
		const { attributes } = this.props;
		const { order, orderby } = getOrderArgs( attributes.orderby );
		const { productId, reviewsOnPageLoad } = attributes;

		return {
			order,
			orderby,
			per_page: reviewsOnPageLoad,
			product_id: productId,
		};
	}

	loadFirstReviews() {
		getReviews( this.getDefaultArgs() ).then( ( { reviews, totalReviews } ) => {
			this.setState( { reviews, totalReviews } );
		} ).catch( () => {
			this.setState( { reviews: [] } );
		} );
	}

	render() {
		const { attributes, componentId } = this.props;
		const { reviews, totalReviews } = this.state;

		return (
			<Fragment>
				{ ( attributes.showOrderby && enableReviewRating ) && (
					<OrderBySelect
						componentId={ componentId }
						readOnly
						value={ attributes.orderby }
					/>
				) }
				<Reviews
					attributes={ attributes }
					componentId={ componentId }
					reviews={ reviews }
				/>
				{ ( attributes.showLoadMore && totalReviews > reviews.length ) && (
					<LoadMoreButton />
				) }
			</Fragment>
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
};

export default withComponentId( EditorBlock );
