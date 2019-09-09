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
	Disabled,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
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
import {
	getProductLayoutConfig,
	DEFAULT_PRODUCT_LIST_TEMPLATE,
	BLOCK_MAP,
} from '../../../atomic/utils';

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
		isEditing: false,
	};

	getTitle = () => {
		return __( 'All Products', 'woo-gutenberg-products-block' );
	}

	getIcon = () => {
		return <Gridicon icon="grid" />;
	}

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
	}

	renderEditMode = () => {
		const onDone = () => {
			const { block, setAttributes } = this.props;
			setAttributes( { layoutConfig: getProductLayoutConfig( block.innerBlocks ) } );
			this.togglePreview();
		};

		const onCancel = () => {
			this.togglePreview();
		};

		return (
			<Placeholder
				icon={ this.getIcon() }
				label={ this.getTitle() }
			>
				{ __(
					'Shows all products. Edit the product template below for products shown in the grid.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-all-products-grid-item-template">
					<div className="wc-block-grid has-1-columns">
						<ul className="wc-block-grid__products">
							<li className="wc-block-grid__product">
								<InnerBlocks
									template={ DEFAULT_PRODUCT_LIST_TEMPLATE }
									templateLock={ false }
									allowedBlocks={ Object.keys( BLOCK_MAP ) }
									renderAppender={ false }
								/>
							</li>
						</ul>
					</div>
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
					<Button
						className="wc-block-products-category__cancel-button"
						isTertiary
						onClick={ onCancel }
					>
						{ __( 'Cancel', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	}

	renderViewMode = () => {
		const { attributes } = this.props;

		return (
			<Disabled>
				<Block attributes={ attributes } />
			</Disabled>
		);
	}

	render = () => {
		const { attributes } = this.props;
		const { contentVisibility } = attributes;
		const { isEditing } = this.state;
		const hasContent = 0 !== Object.values( contentVisibility ).filter( Boolean ).length;
		const blockTitle = this.getTitle();
		const blockIcon = this.getIcon();

		if ( ! HAS_PRODUCTS ) {
			return renderNoProductsPlaceholder( blockTitle, blockIcon );
		}

		if ( ! hasContent ) {
			return renderHiddenContentPlaceholder( blockTitle, blockIcon );
		}

		return (
			<div className={ getBlockClassName( 'wc-block-all-products', attributes ) }>
				{ this.getBlockControls() }
				{ this.getInspectorControls() }
				{ isEditing ? this.renderEditMode() : this.renderViewMode() }
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
