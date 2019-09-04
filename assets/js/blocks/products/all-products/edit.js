/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/editor';
import { withSelect } from '@wordpress/data';
import {
	PanelBody,
	withSpokenMessages,
	Placeholder,
	Button,
	Toolbar,
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
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
import ProductImage from '../../../base/components/product-grid/product-grid-image';
import ProductButton from '../../../base/components/product-grid/product-grid-button';
import ProductRating from '../../../base/components/product-grid/product-grid-rating';
import ProductPrice from '../../../base/components/product-grid/product-grid-price';
import ProductTitle from '../../../base/components/product-grid/product-grid-title';

const mapBlockToComponent = {
	'woocommerce/product-grid-image': ProductImage,
	'woocommerce/product-grid-price': ProductPrice,
	'woocommerce/product-grid-title': ProductTitle,
	'woocommerce/product-grid-rating': ProductRating,
	'woocommerce/product-grid-button': ProductButton,
};

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

	state = {
		showPreview: true,
	};

	getProductLayoutConfig = ( innerBlocks ) => {
		// loop through innerblocks and trigger the layout config from it.
		return innerBlocks.map( ( block ) => {
			return {
				component: mapBlockToComponent[ block.name ],
				props: {
					...block.attributes,
					children: block.innerBlocks.length > 0 ?
						this.getProductLayoutConfig( block.innerBlocks ) :
						[],
				},
			};
		} );
	};

	togglePreview = () => {
		this.setState( { showPreview: ! this.state.showPreview } );
	};

	renderPreview = () => {
		const { attributes, block } = this.props;
		return <Block attributes={ attributes } layoutConfig={ this.getProductLayoutConfig( block.innerBlocks ) } />;
	};

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
		const { showPreview } = this.state;

		const blockIcon = <Gridicon icon="grid" />;
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

		const blockTitle = __( 'All Products', 'woo-gutenberg-products-block' );

		return (
			<div className={ getBlockClassName( 'wc-block-all-products', attributes ) }>
				<BlockControls>
					<Toolbar
						controls={ [
							{
								icon: 'edit',
								title: __( 'Edit', 'woo-gutenberg-products-block' ),
								onClick: () => this.togglePreview(),
								isActive: ! showPreview,
							},
						] }
					/>
				</BlockControls>
				{ showPreview ? (
					<Fragment>
						{ this.renderPreview() }
					</Fragment>
				) : (
					<Fragment>
						{ this.getInspectorControls() }
						{ ! HAS_PRODUCTS && renderNoProductsPlaceholder( blockTitle, blockIcon ) }
						{ ! hasContent && renderHiddenContentPlaceholder( blockTitle, blockIcon ) }
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
								<Button isDefault onClick={ this.togglePreview }>
									{ __( 'Done', 'woo-gutenberg-products-block' ) }
								</Button>
							</div>
						</Placeholder>
					</Fragment>
				) }
			</div>
		);
	}
}

export default compose(
	withSpokenMessages,
	withSelect( ( select, { clientId } ) => {
		const { getBlock } = select( 'core/block-editor' );
		return {
			block: getBlock( clientId ),
		};
	} ),
)( Editor );
