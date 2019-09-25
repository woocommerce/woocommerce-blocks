/**
 * External dependencies
 */
import { Component } from 'react';

/**
 * Internal dependencies
 */
import { getProducts } from '../../components/utils';
import { formatError } from '../utils/errors.js';

const withProducts = ( OriginalComponent ) => {
	class WrappedComponent extends Component {
		constructor() {
			super( ...arguments );
			this.state = {
				products: [],
				error: null,
				loading: true,
			};

			this.loadProducts = this.loadProducts.bind( this );
		}

		componentDidMount() {
			this.loadProducts();
		}

		loadProducts() {
			const { selected } = this.props;

			this.setState( { loading: true } );

			getProducts( [ selected ] )
				.then( ( products ) => {
					products = products.map( ( product ) => {
						const count = product.variations
							? product.variations.length
							: 0;
						return {
							...product,
							parent: 0,
							count,
						};
					} );
					this.setState( {
						products,
						loading: false,
						error: null,
					} );
				} )
				.catch( async ( e ) => {
					const error = await formatError( e );

					this.setState( {
						products: [],
						loading: false,
						error,
					} );
				} );
		}

		render() {
			const { error, loading, products } = this.state;

			return (
				<OriginalComponent
					{ ...this.props }
					products={ products }
					error={ error }
					isLoading={ loading }
				/>
			);
		}
	}
	return WrappedComponent;
};

export default withProducts;
