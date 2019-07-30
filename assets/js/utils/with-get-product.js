/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { debounce, isObject } from 'lodash';

const withGetProduct = createHigherOrderComponent(
	( OriginalComponent ) => {
		return class WrappedComponent extends Component {
			constructor() {
				super( ...arguments );
				this.state = {
					error: false,
					loading: false,
					product: false,
				};
				this.getProduct = this.getProduct.bind( this );
				this.debouncedGetProduct = debounce( this.getProduct, 200 );
			}

			componentWillUnmount() {
				this.debouncedGetProduct.cancel();
			}

			getProduct( productId ) {
				if ( ! productId ) {
					this.setState( { product: false, loading: false, error: false } );
					return;
				}

				this.setState( { loading: true } );

				apiFetch( {
					path: `/wc/blocks/products/${ productId }`,
				} )
					.then( ( product ) => {
						this.setState( { product, loading: false, error: false } );
					} )
					.catch( ( apiError ) => {
						const error = isObject( apiError ) ? {
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
					debouncedGetProduct={ this.debouncedGetProduct }
					error={ error }
					getProduct={ this.getProduct }
					isLoading={ loading }
					product={ product }
				/>;
			}
		};
	},
	'withGetProduct'
);

export default withGetProduct;
