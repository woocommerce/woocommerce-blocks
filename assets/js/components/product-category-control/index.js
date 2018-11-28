/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { find } from 'lodash';
import { MenuItem } from '@wordpress/components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import SearchListControl from '../search-list-control';

class ProductCategoryControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			list: [],
		};
		this.renderListItem = this.renderListItem.bind( this );
	}

	componentDidMount() {
		apiFetch( {
			path: addQueryArgs( '/wc/v3/products/categories', { per_page: -1 } ),
		} )
			.then( ( list ) => {
				this.setState( { list } );
			} )
			.catch( () => {
				this.setState( { list: [] } );
			} );
	}

	renderListItem( { getHighlightedName, item, onSelect, search } ) {
		return (
			<MenuItem
				key={ item.id }
				className="woocommerce-search-list__item"
				onClick={ onSelect( item ) }
				aria-label={ sprintf(
					_n(
						'%s, has %d product',
						'%s, has %d products',
						item.count,
						'woocommerce'
					),
					item.name,
					item.count
				) }
			>
				<span
					className="woocommerce-search-list__item-name"
					dangerouslySetInnerHTML={ {
						__html: getHighlightedName( item.name, search ),
					} }
				/>
				<span className="woocommerce-search-list__item-count">
					{ item.count }
				</span>
			</MenuItem>
		);
	}

	render() {
		const { list } = this.state;
		const { selected, onChange } = this.props;

		const messages = {
			clear: __( 'Clear all product categories', 'woocommerce' ),
			list: __( 'Product Categories', 'woocommerce' ),
			search: __( 'Search for product categories', 'woocommerce' ),
			selected: ( n ) =>
				sprintf(
					_n(
						'%d category selected',
						'%d categories selected',
						n,
						'woocommerce'
					),
					n
				),
			updated: __( 'Category search results updated.', 'woocommerce' ),
		};

		return (
			<SearchListControl
				className="woocommerce-product-categories"
				list={ list }
				selected={ selected.map( ( id ) => find( list, { id } ) ).filter( Boolean ) }
				onChange={ onChange }
				renderListItem={ this.renderListItem }
				messages={ messages }
			/>
		);
	}
}

ProductCategoryControl.propTypes = {
	onChange: PropTypes.func.isRequired,
	selected: PropTypes.array.isRequired,
};

export default ProductCategoryControl;
