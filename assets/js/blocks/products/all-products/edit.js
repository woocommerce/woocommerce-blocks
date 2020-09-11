/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { withDispatch, withSelect } from '@wordpress/data';
import {
	PanelBody,
	withSpokenMessages,
	Placeholder,
	Button,
	IconButton,
	Toolbar,
	Disabled,
	Tip,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import PropTypes from 'prop-types';
import { Icon, grid } from '@woocommerce/icons';
import GridLayoutControl from '@woocommerce/editor-components/grid-layout-control';
import { HAS_PRODUCTS } from '@woocommerce/block-settings';
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { getBlockMap } from '@woocommerce/atomic-utils';
import { previewProducts } from '@woocommerce/resource-previews';

/**
 * Internal dependencies
 */
import {
	renderHiddenContentPlaceholder,
	renderNoProductsPlaceholder,
	getBlockClassName,
} from '../utils';
import {
	DEFAULT_PRODUCT_LIST_LAYOUT,
	getProductLayoutConfig,
} from '../base-utils';
import { getSharedContentControls, getSharedListControls } from '../edit';
import Block from './block';

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
	};

	state = {
		isEditing: false,
		innerBlocks: [],
	};

	blockMap = getBlockMap( 'woocommerce/all-products' );

	componentDidMount = () => {
		const { block } = this.props;
		this.setState( { innerBlocks: block.innerBlocks } );
	};

	getTitle = () => {
		return __( 'All Products', 'woo-gutenberg-products-block' );
	};

	getIcon = () => {
		return <Icon srcElement={ grid } />;
	};

	togglePreview = () => {
		const { debouncedSpeak } = this.props;

		this.setState( { isEditing: ! this.state.isEditing } );

		if ( ! this.state.isEditing ) {
			debouncedSpeak(
				__(
					'Showing All Products block preview.',
					'woo-gutenberg-products-block'
				)
			);
		}
	};

	getInspectorControls = () => {
		const { attributes, setAttributes } = this.props;
		const { columns, rows, alignButtons } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __(
						'Layout Settings',
						'woo-gutenberg-products-block'
					) }
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
					title={ __(
						'Content Settings',
						'woo-gutenberg-products-block'
					) }
				>
					{ getSharedContentControls( attributes, setAttributes ) }
					{ getSharedListControls( attributes, setAttributes ) }
				</PanelBody>
			</InspectorControls>
		);
	};

	getBlockControls = () => {
		const { isEditing } = this.state;

		return (
			<BlockControls>
				<Toolbar
					controls={ [
						{
							icon: 'edit',
							title: __( 'Edit', 'woo-gutenberg-products-block' ),
							onClick: () => this.togglePreview(),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
		);
	};

	renderEditMode = () => {
		const onDone = () => {
			const { block, setAttributes } = this.props;
			setAttributes( {
				layoutConfig: getProductLayoutConfig( block.innerBlocks ),
			} );
			this.setState( { innerBlocks: block.innerBlocks } );
			this.togglePreview();
		};

		const onCancel = () => {
			const { block, replaceInnerBlocks } = this.props;
			const { innerBlocks } = this.state;
			replaceInnerBlocks( block.clientId, innerBlocks, false );
			this.togglePreview();
		};

		const onReset = () => {
			const { block, replaceInnerBlocks } = this.props;
			const newBlocks = [];
			DEFAULT_PRODUCT_LIST_LAYOUT.map( ( [ name, attributes ] ) => {
				newBlocks.push( createBlock( name, attributes ) );
				return true;
			} );
			replaceInnerBlocks( block.clientId, newBlocks, false );
			this.setState( { innerBlocks: block.innerBlocks } );
		};

		const InnerBlockProps = {
			template: this.props.attributes.layoutConfig,
			templateLock: false,
			allowedBlocks: Object.keys( this.blockMap ),
		};

		if ( this.props.attributes.layoutConfig.length !== 0 ) {
			InnerBlockProps.renderAppender = false;
		}

		return (
			<Placeholder icon={ this.getIcon() } label={ this.getTitle() }>
				{ __(
					'Display all products from your store as a grid.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-all-products-grid-item-template">
					<Tip>
						{ __(
							'Edit the blocks inside the preview below to change the content displayed for each product within the product grid.',
							'woo-gutenberg-products-block'
						) }
					</Tip>
					<InnerBlockLayoutContextProvider
						parentName="woocommerce/all-products"
						parentClassName="wc-block-grid"
					>
						<div className="wc-block-grid wc-block-layout has-1-columns">
							<ul className="wc-block-grid__products">
								<li className="wc-block-grid__product">
									<ProductDataContextProvider
										product={ previewProducts[ 0 ] }
									>
										<InnerBlocks { ...InnerBlockProps } />
									</ProductDataContextProvider>
								</li>
							</ul>
						</div>
					</InnerBlockLayoutContextProvider>
					<div className="wc-block-all-products__actions">
						<Button
							className="wc-block-all-products__done-button"
							isPrimary
							isLarge
							onClick={ onDone }
						>
							{ __( 'Done', 'woo-gutenberg-products-block' ) }
						</Button>
						<Button
							className="wc-block-all-products__cancel-button"
							isTertiary
							onClick={ onCancel }
						>
							{ __( 'Cancel', 'woo-gutenberg-products-block' ) }
						</Button>
						<IconButton
							className="wc-block-all-products__reset-button"
							icon={ <Icon srcElement={ grid } /> }
							label={ __(
								'Reset layout to default',
								'woo-gutenberg-products-block'
							) }
							onClick={ onReset }
						>
							{ __(
								'Reset Layout',
								'woo-gutenberg-products-block'
							) }
						</IconButton>
					</div>
				</div>
			</Placeholder>
		);
	};

	renderViewMode = () => {
		const { attributes } = this.props;
		const { layoutConfig } = attributes;
		const hasContent = layoutConfig && layoutConfig.length !== 0;
		const blockTitle = this.getTitle();
		const blockIcon = this.getIcon();

		if ( ! hasContent ) {
			return renderHiddenContentPlaceholder( blockTitle, blockIcon );
		}

		return (
			<Disabled>
				<Block attributes={ attributes } />
			</Disabled>
		);
	};

	render = () => {
		const { attributes } = this.props;
		const { isEditing } = this.state;
		const blockTitle = this.getTitle();
		const blockIcon = this.getIcon();

		if ( ! HAS_PRODUCTS ) {
			return renderNoProductsPlaceholder( blockTitle, blockIcon );
		}

		return (
			<div
				className={ getBlockClassName(
					'wc-block-all-products',
					attributes
				) }
			>
				{ this.getBlockControls() }
				{ this.getInspectorControls() }
				{ isEditing ? this.renderEditMode() : this.renderViewMode() }
			</div>
		);
	};
}

export default compose(
	withSpokenMessages,
	withSelect( ( select, { clientId } ) => {
		const { getBlock } = select( 'core/block-editor' );
		return {
			block: getBlock( clientId ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		return {
			replaceInnerBlocks,
		};
	} )
)( Editor );
