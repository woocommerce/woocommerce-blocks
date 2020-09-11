/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Disabled, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/editor';
import PropTypes from 'prop-types';
import GridContentControl from '@woocommerce/editor-components/grid-content-control';
import GridLayoutControl from '@woocommerce/editor-components/grid-layout-control';
import ProductCategoryControl from '@woocommerce/editor-components/product-category-control';
import { gridBlockPreview } from '@woocommerce/resource-previews';

/**
 * Component to handle edit mode of "Best Selling Products".
 */
class ProductBestSellersBlock extends Component {
	getInspectorControls() {
		const { attributes, setAttributes } = this.props;
		const {
			categories,
			catOperator,
			columns,
			contentVisibility,
			rows,
			alignButtons,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Layout', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<GridLayoutControl
						columns={ columns }
						rows={ rows }
						alignButtons={ alignButtons }
						setAttributes={ setAttributes }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					<GridContentControl
						settings={ contentVisibility }
						onChange={ ( value ) =>
							setAttributes( { contentVisibility: value } )
						}
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
						selected={ categories }
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
			</InspectorControls>
		);
	}

	render() {
		const { attributes, name } = this.props;

		if ( attributes.isPreview ) {
			return gridBlockPreview;
		}

		return (
			<Fragment>
				{ this.getInspectorControls() }
				<Disabled>
					<ServerSideRender
						block={ name }
						attributes={ attributes }
					/>
				</Disabled>
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
