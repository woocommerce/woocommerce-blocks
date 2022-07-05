/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { SearchListControl } from '@woocommerce/editor-components/search-list-control';
import PropTypes from 'prop-types';
import { withSearchedProducts } from '@woocommerce/block-hocs';
import ErrorMessage from '@woocommerce/editor-components/error-placeholder/error-message';

/**
 * The products control exposes a custom selector for searching and selecting
 * products.
 *
 * @param {Object}   props           Component props.
 * @param {string}   props.error
 * @param {Function} props.onChange  Callback fired when the selected item changes
 * @param {Function} props.onSearch  Callback fired when a search is triggered
 * @param {Array}    props.selected  An array of selected products.
 * @param {string}   props.sortable  The current product sorting order.
 * @param {Array}    props.products  An array of products to select from.
 * @param {boolean}  props.isLoading Whether or not the products are being loaded.
 * @param {boolean}  props.isCompact Whether or not the control should have compact styles.
 * @return {Function} A functional component.
 */
const ProductsControl = ( {
	error,
	onChange,
	onSearch,
	selected,
	sortable,
	products,
	isLoading,
	isCompact,
} ) => {
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
				/* translators: %d is the number of selected products. */
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

	if ( error ) {
		return <ErrorMessage error={ error } />;
	}

	return (
		<SearchListControl
			className="woocommerce-products"
			list={ products.map( ( product ) => {
				const formattedSku = product.sku
					? ' (' + product.sku + ')'
					: '';
				return {
					...product,
					name: `${ product.name }${ formattedSku }`,
				};
			} ) }
			isCompact={ isCompact }
			isLoading={ isLoading }
			selected={
				sortable === 'post__in'
					? selected.map( ( id ) => {
							return products.find(
								( product ) => product.id === id
							);
					  } )
					: products.filter( ( { id } ) => selected.includes( id ) )
			}
			onSearch={ onSearch }
			onChange={ onChange }
			messages={ messages }
			sortable={ sortable }
		/>
	);
};

ProductsControl.propTypes = {
	onChange: PropTypes.func.isRequired,
	onSearch: PropTypes.func,
	selected: PropTypes.array,
	products: PropTypes.array,
	isCompact: PropTypes.bool,
	isLoading: PropTypes.bool,
	sortable: PropTypes.string,
};

ProductsControl.defaultProps = {
	selected: [],
	products: [],
	isCompact: false,
	isLoading: true,
	sortable: '',
};

export default withSearchedProducts( ProductsControl );
