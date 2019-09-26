/**
 * External dependencies
 */
import { Component } from 'react';

/**
 * Internal dependencies
 */
import { getProducts } from '../../blocks/products/utils';
import { formatError } from '../utils/errors.js';

const withProducts = ( OriginalComponent ) => {
	class WrappedComponent extends Component {
		constructor() {
			super( ...arguments );
			this.state = {
				products: [],
				error: null,
				loading: true,
				totalProducts: 0,
			};

			this.loadProducts = this.loadProducts.bind( this );
		}

		componentDidMount() {
			this.loadProducts();
		}

		componentDidUpdate( prevProps ) {
			if (
				prevProps.currentPage !== this.props.currentPage ||
				prevProps.orderValue !== this.props.orderValue
			) {
				this.loadProducts();
			}
		}

		getOrderArgs( orderName ) {
			switch ( orderName ) {
				case 'menu_order':
				case 'popularity':
				case 'rating':
				case 'date':
				case 'price':
					return {
						orderby: orderName,
						order: 'asc',
					};
				case 'price-desc':
					return {
						orderby: 'price',
						order: 'desc',
					};
			}
		}

		loadProducts() {
			const { attributes, currentPage, orderValue } = this.props;

			this.setState( { loading: true } );

			const args = {
				...this.getOrderArgs( orderValue ),
				per_page: attributes.columns * attributes.rows,
				page: currentPage,
			};

			getProducts( args )
				.then( ( productsData ) => {
					this.setState( {
						products: productsData.products,
						totalProducts: productsData.totalProducts,
						loading: false,
						error: null,
					} );
				} )
				.catch( async ( e ) => {
					const error = await formatError( e );

					this.setState( {
						products: [],
						totalProducts: 0,
						loading: false,
						error,
					} );
				} );
		}

		render() {
			const { error, loading, products, totalProducts } = this.state;

			return (
				<OriginalComponent
					{ ...this.props }
					products={ products }
					totalProducts={ totalProducts }
					error={ error }
					isLoading={ loading }
				/>
			);
		}
	}
	return WrappedComponent;
};

export default withProducts;
