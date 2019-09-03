/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
} from '@wordpress/editor';
import {
	PanelBody,
	withSpokenMessages,
	Disabled,
	Placeholder,
	Button,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import {
	renderHiddenContentPlaceholder,
	renderNoProductsPlaceholder,
	getBlockClassName,
} from '../utils';
import { getSharedContentControls, getSharedListControls } from '../edit';
import GridLayoutControl from '../../../components/grid-layout-control';
import { HAS_PRODUCTS } from '../../../constants';
import Block from './block';
import ProductGridItem from '../../../base/components/product-grid/product-grid-item';

/**
 * Component to handle edit mode of "All Products".
 */
class Editor extends Component {
	static propTypes = {
		/**
		 * The attributes for this block.
		 */
		attributes: PropTypes.object.isRequired,
		/**
		 * A callback to update attributes.
		 */
		setAttributes: PropTypes.func.isRequired,
		/**
		 * From withSpokenMessages.
		 */
		debouncedSpeak: PropTypes.func.isRequired,
	}

	getInspectorControls = () => {
		const { attributes, setAttributes } = this.props;
		const { columns, rows, alignButtons } = attributes;

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
					{ getSharedContentControls( attributes, setAttributes ) }
				</PanelBody>
				<PanelBody
					title={ __( 'List Settings', 'woo-gutenberg-products-block' ) }
					initialOpen
				>
					{ getSharedListControls( attributes, setAttributes ) }
				</PanelBody>
			</InspectorControls>
		);
	};

	render = () => {
		const { attributes } = this.props;
		const { contentVisibility } = attributes;

		const blockIcon = <Gridicon icon="grid" />;
		const blockTitle = __( 'All Products', 'woo-gutenberg-products-block' );
		const hasContent = 0 !== Object.values( contentVisibility ).filter( Boolean ).length;

		const ALLOWED_BLOCKS = [
			'woocommerce/product-grid-title',
			'woocommerce/product-grid-price',
			'woocommerce/product-grid-image',
			'woocommerce/product-grid-rating',
			'woocommerce/product-grid-button',
			'core/paragraph',
			'core/heading',
		];

		const BLOCKS_TEMPLATE = [
			[ 'woocommerce/product-grid-image', {} ],
			[ 'woocommerce/product-grid-title', {} ],
			[ 'woocommerce/product-grid-price', {} ],
			[ 'woocommerce/product-grid-rating', {} ],
			[ 'woocommerce/product-grid-button', {} ],
		];

		return (
			<div className={ getBlockClassName( 'wc-block-all-products', attributes ) }>
				{ this.getInspectorControls() }
				{ ! HAS_PRODUCTS && renderNoProductsPlaceholder( blockTitle, blockIcon ) }
				{ ! hasContent && renderHiddenContentPlaceholder( blockTitle, blockIcon ) }
				<Disabled>
					{ ( HAS_PRODUCTS && hasContent ) && ( <Block attributes={ attributes } children={ this.props.children } /> ) }
				</Disabled>
				<Placeholder
					icon={ blockIcon }
					label={ __( 'All Products', 'woo-gutenberg-products-block' ) }
				>
					{ __(
						'Shows all products. Edit the product template below for products shown in the grid.',
						'woo-gutenberg-products-block'
					) }
					<div className="wc-block-all-products-grid-item-template">
						<div className="wc-block-grid has-1-columns">
							<ul className="wc-block-grid__products">
								<ProductGridItem attributes={ attributes } product={ attributes.product }>
									<InnerBlocks
										template={ BLOCKS_TEMPLATE }
										templateLock={ false }
										allowedBlocks={ ALLOWED_BLOCKS }
									/>
								</ProductGridItem>
							</ul>
						</div>
						<Button isDefault onClick={ () => {} }>
							{ __( 'Done', 'woo-gutenberg-products-block' ) }
						</Button>
					</div>
				</Placeholder>
			</div>
		);
	}
}

export default withSpokenMessages( Editor );
