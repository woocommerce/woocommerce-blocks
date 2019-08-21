/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { getReviews } from '../../blocks/reviews/utils';

const withReviews = ( OriginalComponent ) => {
	class WrappedComponent extends Component {
		constructor() {
			super( ...arguments );

			this.state = {
				error: null,
				loading: false,
				reviews: [],
				totalReviews: 0,
			};

			this.setError = this.setError.bind( this );
			this.delayedAppendReviews = this.props.delayFunction( this.appendReviews );
		}

		componentDidMount() {
			this.replaceReviews();
		}

		componentDidUpdate( prevProps ) {
			if ( prevProps.reviewsToDisplay < this.props.reviewsToDisplay ) {
				// Since this attribute might be controlled via something with
				// short intervals between value changes, this allows for optionally
				// delaying review fetches via the provided delay function.
				this.delayedAppendReviews();
			} else if (
				prevProps.categoryIds !== this.props.categoryIds ||
				prevProps.orderby !== this.props.orderby ||
				prevProps.order !== this.props.order ||
				prevProps.productId !== this.props.productId
			) {
				this.replaceReviews();
			}
		}

		getArgs() {
			const { categoryIds, order, orderby, productId } = this.props;
			const args = {
				order,
				orderby,
			};

			if ( categoryIds ) {
				args.category_id = Array.isArray( categoryIds ) ? categoryIds.join( ',' ) : categoryIds;
			}

			if ( productId ) {
				args.product_id = productId;
			}

			return args;
		}

		replaceReviews() {
			const { onReviewsReplaced, reviewsToDisplay } = this.props;
			const args = {
				...this.getArgs(),
				per_page: reviewsToDisplay,
			};

			this.updateListOfReviews( args ).then( onReviewsReplaced );
		}

		appendReviews() {
			const { onReviewsAppended, reviewsToDisplay } = this.props;
			const { reviews } = this.state;

			// Given that this function is delayed, props might have been updated since
			// it was called so we need to check again if fetching new reviews is necessary.
			if ( reviewsToDisplay <= reviews.length ) {
				return;
			}

			const args = {
				...this.getArgs(),
				per_page: reviewsToDisplay - reviews.length,
				offset: reviews.length,
			};

			this.updateListOfReviews( args, reviews ).then( onReviewsAppended );
		}

		updateListOfReviews( args, oldReviews = [] ) {
			const { reviewsToDisplay } = this.props;
			const { totalReviews } = this.state;
			const reviewsToLoad = Math.min( totalReviews, reviewsToDisplay ) - oldReviews.length;

			this.setState( {
				loading: true,
				reviews: oldReviews.concat( Array( reviewsToLoad ).fill( {} ) ),
			} );

			return getReviews( args ).then( ( { reviews: newReviews, totalReviews: newTotalReviews } ) => {
				this.setState( {
					reviews: oldReviews.filter( ( review ) => Object.keys( review ).length ).concat( newReviews ),
					totalReviews: newTotalReviews,
					loading: false,
					error: null,
				} );

				return { newReviews };
			} ).catch( this.setError );
		}

		setError( apiError ) {
			const { onReviewsLoadError } = this.props;
			const error = typeof apiError === 'object' && apiError.hasOwnProperty( 'message' ) ? {
				apiMessage: apiError.message,
			} : {
				apiMessage: null,
			};

			this.setState( { reviews: [], loading: false, error } );

			onReviewsLoadError();
		}

		render() {
			const { reviewsToDisplay } = this.props;
			const { error, loading, reviews, totalReviews } = this.state;

			return <OriginalComponent
				{ ...this.props }
				error={ error }
				isLoading={ loading }
				reviews={ reviews.slice( 0, reviewsToDisplay ) }
				totalReviews={ totalReviews }
			/>;
		}
	}

	WrappedComponent.propTypes = {
		order: PropTypes.oneOf( [ 'asc', 'desc' ] ).isRequired,
		orderby: PropTypes.string.isRequired,
		reviewsToDisplay: PropTypes.number.isRequired,
		categoryIds: PropTypes.array,
		delayFunction: PropTypes.func,
		productId: PropTypes.number,
	};

	WrappedComponent.defaultProps = {
		delayFunction: ( f ) => f,
	};

	return WrappedComponent;
};

export default withReviews;
