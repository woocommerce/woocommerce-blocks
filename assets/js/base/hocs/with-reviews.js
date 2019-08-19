/**
 * External dependencies
 */
import { Component } from 'react';
import { __, _n, sprintf } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import { getReviews, getOrderArgs } from '../../blocks/reviews/utils';

const withReviews = ( OriginalComponent ) => {
	return class WrappedComponent extends Component {
		constructor() {
			super( ...arguments );

			this.state = {
				error: null,
				loading: false,
				overwrittenArgs: {},
				reviews: [],
				totalReviews: 0,
			};

			this.getReviews = this.getReviews.bind( this );
			this.appendReviews = this.appendReviews.bind( this );
			this.onChangeArgs = this.onChangeArgs.bind( this );
			this.updateListOfReviews = this.updateListOfReviews.bind( this );
			this.setError = this.setError.bind( this );
		}

		componentDidMount() {
			this.getReviews();
		}

		getDefaultArgs() {
			const { attributes } = this.props;
			const { overwrittenArgs } = this.state;
			const { order, orderby } = getOrderArgs( attributes.orderby );
			const { categoryIds, productId, reviewsOnPageLoad } = attributes;

			const args = {
				order,
				orderby,
				per_page: reviewsOnPageLoad,
				...overwrittenArgs,
			};

			if ( categoryIds ) {
				args.category_id = Array.isArray( categoryIds ) ? categoryIds.join( ',' ) : categoryIds;
			}

			if ( productId ) {
				args.product_id = productId;
			}

			return args;
		}

		getReviews() {
			const { reviewsOnPageLoad } = this.props.attributes;
			const args = this.getDefaultArgs();

			this.updateListOfReviews( args, reviewsOnPageLoad );
		}

		onChangeArgs( newArgs ) {
			const { reviewsOnPageLoad } = this.props.attributes;
			const args = {
				...this.getDefaultArgs(),
				...newArgs,
			};

			this.setState( {
				overwrittenArgs: newArgs,
			} );

			this.updateListOfReviews( args, reviewsOnPageLoad ).then( () => {
				speak( __( 'Reviews order updated.', 'woo-gutenberg-products-block' ) );
			} );
		}

		appendReviews() {
			const { reviewsOnLoadMore } = this.props.attributes;
			const oldReviews = this.state.reviews;
			const args = {
				...this.getDefaultArgs(),
				offset: oldReviews.length,
				per_page: reviewsOnLoadMore,
			};

			this.updateListOfReviews( args, reviewsOnLoadMore, oldReviews ).then( ( { newReviews } ) => {
				speak(
					sprintf(
						_n(
							'%d review loaded.',
							'%d reviews loaded.',
							newReviews.length,
							'woo-gutenberg-products-block'
						),
						newReviews.length,
					)
				);
			} );
		}

		updateListOfReviews( args, reviewsOnLoad, oldReviews = [] ) {
			const { totalReviews } = this.state;
			const reviewsToLoad = Math.min( totalReviews - oldReviews.length, reviewsOnLoad );

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
			const error = typeof apiError === 'object' && apiError.hasOwnProperty( 'message' ) ? {
				apiMessage: apiError.message,
			} : {
				apiMessage: null,
			};

			this.setState( { reviews: [], loading: false, error } );
			speak(
				__( 'There was an error loading the reviews.', 'woo-gutenberg-products-block' )
			);
		}

		render() {
			const { error, loading, reviews, totalReviews } = this.state;

			return <OriginalComponent
				{ ...this.props }
				error={ error }
				getReviews={ this.getReviews }
				appendReviews={ this.appendReviews }
				onChangeArgs={ this.onChangeArgs }
				isLoading={ loading }
				reviews={ reviews }
				totalReviews={ totalReviews }
			/>;
		}
	};
};

export default withReviews;
