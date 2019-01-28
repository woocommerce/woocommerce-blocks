/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { find } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import SearchListControl from '../search-list-control';

class ProductsControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			list: [],
			loading: true,
		};
	}

	componentDidMount() {
		this.props.mountHandler.bind( this )();
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
	/**
	 * Mount handler usually intended to initialize 'list'.
	 */
	mountHandler: PropTypes.func.isRequired,
};

export default ProductsControl;
