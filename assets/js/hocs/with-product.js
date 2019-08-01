/**
 * External dependencies
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { getProduct } from '../components/utils';

const withProduct = createHigherOrderComponent(
	( OriginalComponent ) => {
		return class WrappedComponent extends Component {
			constructor() {
				super( ...arguments );
				this.state = {
					error: false,
					loading: false,
					product: false,
				};
				this.loadProduct = this.loadProduct.bind( this );
			}

			componentDidMount() {
				this.loadProduct();
			}

			componentDidUpdate( prevProps ) {
				if ( prevProps.attributes.productId !== this.props.attributes.productId ) {
					this.loadProduct();
				}
			}

			loadProduct() {
				const { productId } = this.props.attributes;

				if ( ! productId ) {
					this.setState( { product: false, loading: false, error: false } );
					return;
				}

				this.setState( { loading: true } );

				getProduct( productId ).then( ( product ) => {
					this.setState( { product, loading: false, error: false } );
				} ).catch( ( apiError ) => {
					const error = typeof apiError === 'object' && apiError.hasOwnProperty( 'message' ) ? {
						apiMessage: apiError.message,
					} : {
						// If we can't get any message from the API, set it to null and
						// let <ApiErrorPlaceholder /> handle the message to display.
						apiMessage: null,
					};

					this.setState( { product: false, loading: false, error } );
				} );
			}

			render() {
				const { error, loading, product } = this.state;

				return <OriginalComponent
					{ ...this.props }
					error={ error }
					getProduct={ this.loadProduct }
					isLoading={ loading }
					product={ product }
				/>;
			}
		};
	},
	'withProduct'
);

export default withProduct;
