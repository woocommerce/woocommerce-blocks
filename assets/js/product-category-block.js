/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	TreeSelect,
} from '@wordpress/components';
import PropTypes from 'prop-types';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import '../css/product-category-block.scss';
import ProductPreview from './components/product-preview';
import sharedAttributes from './utils/shared-attributes';

function getQuery( attributes ) {
	const { categories, columns, orderby, rows } = attributes;

	const query = {
		category: categories.join( ',' ),
		per_page: rows * columns,
	};

	if ( 'price_desc' === orderby ) {
		query.orderby = 'price';
		query.order = 'desc';
	} else if ( 'price_asc' === orderby ) {
		query.orderby = 'price';
		query.order = 'asc';
	} else if ( 'title' === orderby ) {
		query.orderby = 'title';
		query.order = 'asc';
	} else {
		query.orderby = orderby;
	}

	return query;
}

/**
 * Component to handle edit mode of "Products by Category".
 */
class ProductByCategoryBlock extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			categoriesList: [],
			products: [],
			loaded: false,
		};
	}

	componentDidMount() {
		apiFetch( {
			path: addQueryArgs( '/wc/v3/products/categories', { per_page: -1 } ),
		} )
			.then( ( categoriesList ) => {
				this.setState( { categoriesList } );
			} )
			.catch( () => {
				this.setState( { categoriesList: [] } );
			} );
		if ( this.props.attributes.categories ) {
			this.getProducts();
		}
	}

	componentDidUpdate( prevProps ) {
		const hasChange = [ 'rows', 'columns', 'orderby', 'categories' ].reduce(
			( acc, key ) => {
				return acc || prevProps.attributes[ key ] !== this.props.attributes[ key ];
			},
			false
		);
		if ( hasChange ) {
			this.getProducts();
		}
	}

	getProducts() {
		this.setState( { products: [], loaded: false } );
		apiFetch( {
			path: addQueryArgs( '/wgbp/v3/products', getQuery( this.props.attributes ) ),
		} )
			.then( ( products ) => {
				this.setState( { products, loaded: true } );
			} )
			.catch( () => {
				this.setState( { products: [], loaded: true } );
			} );
	}

	getInspectorControls() {
		const { attributes, setAttributes } = this.props;
		const { columns, orderby, rows, categories } = attributes;
		const { categoriesList } = this.state;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Product Category' ) } initialOpen>
					<TreeSelect
						label={ __( 'Product Category' ) }
						tree={ categoriesList }
						selectedId={ categories }
						multiple
						onChange={ ( value ) => {
							setAttributes( { categories: value ? value : [] } );
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Layout' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ wc_product_block_data.min_columns }
						max={ wc_product_block_data.max_columns }
					/>
					<RangeControl
						label={ __( 'Rows' ) }
						value={ rows }
						onChange={ ( value ) => setAttributes( { rows: value } ) }
						min={ wc_product_block_data.min_rows }
						max={ wc_product_block_data.max_rows }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Order By' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Order products by' ) }
						value={ orderby }
						options={ [
							{
								label: __( 'Newness - newest first' ),
								value: 'date',
							},
							{
								label: __( 'Price - low to high' ),
								value: 'price_asc',
							},
							{
								label: __( 'Price - high to low' ),
								value: 'price_desc',
							},
							{
								label: __( 'Rating - highest first' ),
								value: 'rating',
							},
							{
								label: __( 'Sales - most first' ),
								value: 'popularity',
							},
							{
								label: __( 'Title - alphabetical' ),
								value: 'title',
							},
							{
								label: __( 'Menu Order' ),
								value: 'menu_order',
							},
						] }
						onChange={ ( value ) => setAttributes( { orderby: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	render() {
		const { columns } = this.props.attributes;
		const { loaded, products } = this.state;

		return (
			<Fragment>
				{ this.getInspectorControls() }
				<div className={ `wc-block-products-category cols-${ columns }` }>
					{ products.length ? (
						products.map( ( product ) => (
							<ProductPreview product={ product } key={ product.id } />
						) )
					) : (
						<Placeholder icon="category" label={ __( 'Products by Category' ) }>
							{ ! loaded ? <Spinner /> : __( 'No posts found.' ) }
						</Placeholder>
					) }
				</div>
			</Fragment>
		);
	}
}

ProductByCategoryBlock.propTypes = {
	/**
	 * The attributes for this block
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * A callback to update attributes
	 */
	setAttributes: PropTypes.func.isRequired,
};

export default ProductByCategoryBlock;

/**
 * Register and run the "Products by Category" block.
 */
registerBlockType( 'woocommerce/product-category', {
	title: __( 'Products by Category' ),
	icon: 'category',
	category: 'widgets',
	description: __( 'Display a grid of products from a variety of sources.' ),
	attributes: {
		...sharedAttributes,
		edit_mode: {
			type: 'boolean',
			default: true,
		},
		categories: {
			type: 'array',
			default: [],
		},
	},

	/**
	 * Renders and manages the block.
	 */
	edit( props ) {
		return <ProductByCategoryBlock { ...props } />;
	},

	/**
	 * Save the block content in the post content. Block content is saved as a products shortcode.
	 *
	 * @return string
	 */
	save() {
		return <RawHTML>Products in a category!</RawHTML>;
	},
} );
