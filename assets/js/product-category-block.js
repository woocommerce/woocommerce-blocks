/**
 * External dependencies
 */
import { __, _n } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import {
	BlockAlignmentToolbar,
	BlockControls,
	InspectorControls,
} from '@wordpress/editor';
import {
	Button,
	PanelBody,
	Placeholder,
	RangeControl,
	Spinner,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import getQuery from './utils/get-query';
import ProductAttributeControl from './components/product-attribute-control';
import ProductCategoryControl from './components/product-category-control';
import ProductOrderbyControl from './components/product-orderby-control';
import ProductPreview from './components/product-preview';

/**
 * Component to handle edit mode of "Products by Category".
 */
class ProductByCategoryBlock extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			products: [],
			loaded: false,
		};

		this.debouncedGetProducts = debounce( this.getProducts.bind( this ), 200 );
	}

	componentDidMount() {
		if ( this.props.attributes.categories ) {
			this.getProducts();
		}
	}

	componentDidUpdate( prevProps ) {
		const hasChange = [
			'categories',
			'catOperator',
			'columns',
			'orderby',
			'rows',
		].reduce( ( acc, key ) => {
			return acc || prevProps.attributes[ key ] !== this.props.attributes[ key ];
		}, false );
		if ( hasChange ) {
			this.debouncedGetProducts();
		}
	}

	getProducts() {
		apiFetch( {
			path: addQueryArgs(
				'/wc-pb/v3/products',
				getQuery( this.props.attributes, this.props.name )
			),
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
		const { columns, catOperator, orderby, rows } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Product Category', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductCategoryControl
						selected={ attributes.categories }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							setAttributes( { categories: ids } );
						} }
						operator={ catOperator }
						onOperatorChange={ ( value = 'any' ) =>
							setAttributes( { catOperator: value } )
						}
					/>
				</PanelBody>
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
					title={ __( 'Order By', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductOrderbyControl
						setAttributes={ setAttributes }
						value={ orderby }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Filter by Attribute', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductAttributeControl
						selected={ attributes.attributes }
						onChange={ ( value = [] ) => {
							const selected = value.map( ( { id, attr_slug } ) => ( { id, attr_slug } ) ); // eslint-disable-line camelcase
							setAttributes( { attributes: selected } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	renderEditMode() {
		const { attributes, debouncedSpeak, setAttributes } = this.props;
		const onDone = () => {
			setAttributes( { editMode: false } );
			debouncedSpeak(
				__( 'Showing product block preview.', 'woo-gutenberg-products-block' )
			);
		};

		return (
			<Placeholder
				icon="category"
				label={ __( 'Products by Category', 'woo-gutenberg-products-block' ) }
				className="wc-block-products-grid wc-block-products-category"
			>
				{ __(
					'Display a grid of products from your selected categories',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-products-category__selection">
					<ProductCategoryControl
						selected={ attributes.categories }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							setAttributes( { categories: ids } );
						} }
						operator={ attributes.catOperator }
						onOperatorChange={ ( value = 'any' ) =>
							setAttributes( { catOperator: value } )
						}
					/>
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	}

	render() {
		const { setAttributes } = this.props;
		const { align, categories, columns, editMode } = this.props.attributes;
		const { loaded, products } = this.state;
		const classes = [ 'wc-block-products-grid', 'wc-block-products-category' ];
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
					<Toolbar
						controls={ [
							{
								icon: 'edit',
								title: __( 'Edit' ),
								onClick: () => setAttributes( { editMode: ! editMode } ),
								isActive: editMode,
							},
						] }
					/>
				</BlockControls>
				{ this.getInspectorControls() }
				{ editMode ? (
					this.renderEditMode()
				) : (
					<div className={ classes.join( ' ' ) }>
						{ products.length ? (
							products.map( ( product ) => (
								<ProductPreview product={ product } key={ product.id } />
							) )
						) : (
							<Placeholder
								icon="category"
								label={ __(
									'Products by Category',
									'woo-gutenberg-products-block'
								) }
							>
								{ ! loaded ? (
									<Spinner />
								) : (
									_n(
										'No products in this category.',
										'No products in these categories.',
										categories.length,
										'woo-gutenberg-products-block'
									)
								) }
							</Placeholder>
						) }
					</div>
				) }
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
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes
	 */
	setAttributes: PropTypes.func.isRequired,
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
};

export default withSpokenMessages( ProductByCategoryBlock );
