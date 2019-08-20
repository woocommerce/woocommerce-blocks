/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { getOrderArgs } from './utils';
import FrontendBlock from './frontend-block';

/**
 * Container of the block rendered in the frontend.
 */
class FrontendContainerBlock extends Component {
	constructor() {
		super( ...arguments );
		const { attributes } = this.props;

		this.state = {
			orderby: attributes.orderby,
			reviewsToDisplay: parseInt( attributes.reviewsOnPageLoad, 10 ),
		};

		this.onAppendReviews = this.onAppendReviews.bind( this );
		this.onChangeOrderby = this.onChangeOrderby.bind( this );
	}

	onAppendReviews() {
		const { attributes } = this.props;
		const { reviewsToDisplay } = this.state;

		this.setState( {
			reviewsToDisplay: reviewsToDisplay + parseInt( attributes.reviewsOnLoadMore, 10 ),
		} );
	}

	onChangeOrderby( event ) {
		const { attributes } = this.props;

		this.setState( {
			orderby: event.target.value,
			reviewsToDisplay: parseInt( attributes.reviewsOnPageLoad, 10 ),
		} );
	}

	render() {
		const { attributes } = this.props;
		const { categoryIds, productId } = attributes;
		const { reviewsToDisplay } = this.state;
		const { order, orderby } = getOrderArgs( this.state.orderby );

		return (
			<FrontendBlock
				attributes={ attributes }
				categoryIds={ categoryIds }
				onAppendReviews={ this.onAppendReviews }
				onChangeOrderby={ this.onChangeOrderby }
				order={ order }
				orderby={ orderby }
				productId={ productId }
				reviewsToDisplay={ reviewsToDisplay }
				announceUpdates
			/>
		);
	}
}

FrontendContainerBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
};

export default FrontendContainerBlock;
