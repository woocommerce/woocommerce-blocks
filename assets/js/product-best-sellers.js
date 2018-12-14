/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import {
	BlockAlignmentToolbar,
	BlockControls,
	InspectorControls,
} from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import Gridicon from 'gridicons';
import {
	PanelBody,
	Placeholder,
	RangeControl,
	Spinner,
} from '@wordpress/components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import getQuery from './utils/get-query';
import ProductCategoryControl from './components/product-category-control';
import ProductPreview from './components/product-preview';

/**
 * Component to handle edit mode of "Best Selling Products".
 */
class ProductBestSellersBlock extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			products: [],
			loaded: false,
		};
	}

	componentDidMount() {
		if ( this.props.attributes.categories ) {
			this.getProducts();
		}
	}

	componentDidUpdate( prevProps ) {
		const hasChange = [ 'rows', 'columns', 'categories' ].reduce( ( acc, key ) => {
			return acc || prevProps.attributes[ key ] !== this.props.attributes[ key ];
		}, false );
		if ( hasChange ) {
			this.getProducts();
		}
	}

	getProducts() {
		apiFetch( {
			path: addQueryArgs( '/wc-pb/v3/products', getQuery( this.props.attributes, this.props.name ) ),
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
		const { columns, rows } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Layout', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<RangeControl
						label={ __( 'Columns', 'woo-gutenberg-products-block' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ wc_product_block_data.min_columns }
						max={ wc_product_block_data.max_columns }
					/>
					<RangeControl
						label={ __( 'Rows', 'woo-gutenberg-products-block' ) }
						value={ rows }
						onChange={ ( value ) => setAttributes( { rows: value } ) }
						min={ wc_product_block_data.min_rows }
						max={ wc_product_block_data.max_rows }
					/>
				</PanelBody>
				<PanelBody
					title={ __(
						'Filter by Product Category',
						'woo-gutenberg-products-block'
					) }
					initialOpen={ false }
				>
					<ProductCategoryControl
						selected={ attributes.categories }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							setAttributes( { categories: ids } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	render() {
		const { setAttributes } = this.props;
		const { columns, align } = this.props.attributes;
		const { loaded, products } = this.state;
		const classes = [ 'wc-block-products-grid', 'wc-block-best-selling-products' ];
		if ( columns ) {
			classes.push( `cols-${ columns }` );
		}
		if ( products && ! products.length ) {
			if ( ! loaded ) {
				classes.push( 'is-loading' );
			} else {
				classes.push( 'is-not-found' );
			}
		}

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						controls={ [ 'wide', 'full' ] }
						value={ align }
						onChange={ ( nextAlign ) => setAttributes( { align: nextAlign } ) }
					/>
				</BlockControls>
				{ this.getInspectorControls() }
				<div className={ classes.join( ' ' ) }>
					{ products.length ? (
						products.map( ( product ) => (
							<ProductPreview product={ product } key={ product.id } />
						) )
					) : (
						<Placeholder
							icon={ <Gridicon icon="stats-up-alt" /> }
							label={ __(
								'Best Selling Products',
								'woo-gutenberg-products-block'
							) }
						>
							{ ! loaded ? (
								<Spinner />
							) : (
								__( 'No products found.', 'woo-gutenberg-products-block' )
							) }
						</Placeholder>
					) }
				</div>
			</Fragment>
		);
	}
}

ProductBestSellersBlock.propTypes = {
	/**
	 * The attributes for this block
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes
	 */
	setAttributes: PropTypes.func.isRequired,
};

export default ProductBestSellersBlock;
