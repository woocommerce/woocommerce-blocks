/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { debounce, isObject } from 'lodash';
import { escapeHTML } from '@wordpress/escape-html';

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
						const error = {};

						if ( isObject( apiError ) ) {
							error.message = (
								<span>
									{ __( 'The following error was returned from the API', 'woo-gutenberg-products-block' ) }
									<br />
									<code>{ escapeHTML( apiError.message ) }</code>
								</span>
							);
						} else {
							error.message = __( 'An unknown error occurred which prevented the block from being updated.', 'woo-gutenberg-products-block' );
						}

						this.setState( { product: false, loading: false, error } );
					} );
			}

			render() {
				const { error, loading, product } = this.state;

				return <OriginalComponent
					{ ...this.props }
					debouncedGetProduct={ this.debouncedGetProduct }
					error={ error }
					isLoading={ loading }
					product={ product }
					getProduct={ this.getProduct }
				/>;
			}
		};
	},
	'withGetProduct'
);

export default withGetProduct;
