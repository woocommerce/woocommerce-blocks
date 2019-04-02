/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { Component, Fragment } from '@wordpress/element';
import { debounce, find, flatten, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import { SearchListControl } from '@woocommerce/components';

const isLargeCatalog = wc_product_block_data.catalogSize > 200;
const path = addQueryArgs( '/wc-blocks/v1/products', {
	per_page: isLargeCatalog ? 100 : -1,
	catalog_visibility: 'visible',
	status: 'publish',
} );

class ProductsControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			list: [],
			loading: true,
		};

		this.debouncedOnSearch = debounce( this.onSearch.bind( this ), 400 );
	}

	componentDidMount() {
		const { selected } = this.props;
		const requests = [ apiFetch( { path } ) ];
		// If we have a large catalog, we might not get all selected products in the first page.
		if ( isLargeCatalog ) {
			requests.push(
				apiFetch( {
					path: addQueryArgs( path, { include: selected } ),
				} )
			);
		}

		Promise.all( requests )
			.then( ( data ) => {
				const list = uniqBy( flatten( data ), 'id' );
				this.setState( { list, loading: false } );
			} )
			.catch( () => {
				this.setState( { list: [], loading: false } );
			} );
	}

	onSearch( search ) {
		const { selected } = this.props;
		Promise.all( [
			apiFetch( { path: addQueryArgs( path, { search } ) } ),
			apiFetch( { path: addQueryArgs( path, { include: selected } ) } ),
		] )
			.then( ( data ) => {
				const list = uniqBy( flatten( data ), 'id' );
				this.setState( { list, loading: false } );
			} )
			.catch( () => {
				this.setState( { list: [], loading: false } );
			} );
	}

	render() {
		const { list, loading } = this.state;
		const { onChange, selected } = this.props;

		const messages = {
			clear: __( 'Clear all products', 'woo-gutenberg-products-block' ),
			list: __( 'Products', 'woo-gutenberg-products-block' ),
			noItems: __(
				"Your store doesn't have any products.",
				'woo-gutenberg-products-block'
			),
			search: __(
				'Search for products to display',
				'woo-gutenberg-products-block'
			),
			selected: ( n ) =>
				sprintf(
					_n(
						'%d product selected',
						'%d products selected',
						n,
						'woo-gutenberg-products-block'
					),
					n
				),
			updated: __(
				'Product search results updated.',
				'woo-gutenberg-products-block'
			),
		};

		return (
			<Fragment>
				<SearchListControl
					className="woocommerce-products"
					list={ list }
					isLoading={ loading }
					selected={ selected.map( ( id ) => find( list, { id } ) ).filter( Boolean ) }
					onSearch={ isLargeCatalog && this.debouncedOnSearch }
					onChange={ onChange }
					messages={ messages }
				/>
			</Fragment>
		);
	}
}

ProductsControl.propTypes = {
	/**
	 * Callback to update the selected products.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * The list of currently selected IDs.
	 */
	selected: PropTypes.array.isRequired,
};

export default ProductsControl;
