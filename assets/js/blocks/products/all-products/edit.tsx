/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, BlockInstance } from '@wordpress/blocks';
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	PanelBody,
	Placeholder,
	Button,
	ToolbarGroup,
	Disabled,
	Tip,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { Icon, grid } from '@wordpress/icons';
import GridLayoutControl from '@woocommerce/editor-components/grid-layout-control';
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { getBlockMap } from '@woocommerce/atomic-utils';
import { previewProducts } from '@woocommerce/resource-previews';
import { getSetting } from '@woocommerce/settings';
import { blocksConfig } from '@woocommerce/block-settings';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import { getBlockClassName } from '../utils';
import {
	renderHiddenContentPlaceholder,
	renderNoProductsPlaceholder,
} from '../edit-utils';
import {
	DEFAULT_PRODUCT_LIST_LAYOUT,
	getProductLayoutConfig,
} from '../base-utils';
import { getSharedContentControls, getSharedListControls } from '../edit';
import Block from './block';
import './editor.scss';

type Attributes = {
	columns: number;
	rows: number;
	alignButtons: boolean;
	layoutConfig: [ string, object? ][];
};

type Props = {
	contentVisibility: number;
	orderby: number;
	isPreview: number;
	clientId: string;
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
};

export default function Edit( props: Props ): JSX.Element {
	const [ isEditing, setIsEditing ] = useState< boolean >( false );
	const [ , setInnerBlocks ] = useState< BlockInstance[] | boolean >( false );
	const blockMap = getBlockMap( 'woocommerce/all-products' );

	const { clientId, attributes, setAttributes } = props;

	const { columns, rows, alignButtons, layoutConfig } = attributes;

	const { innerBlocks } = useSelect( ( select ) => {
		const { getBlock } = select( 'core/block-editor' );
		const block = getBlock( clientId );
		return {
			innerBlocks: block ? block.innerBlocks : [],
		};
	} );

	useEffect( () => {
		setInnerBlocks( innerBlocks );
	}, [] );

	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );
	const debouncedSpeak = useDebounce( speak );

	const getTitle = (): string => {
		return __( 'All Products', 'woo-gutenberg-products-block' );
	};

	const getIcon = (): JSX.Element => {
		return <Icon icon={ grid } />;
	};

	const togglePreview = (): void => {
		setIsEditing( ! isEditing );

		if ( ! isEditing ) {
			debouncedSpeak(
				__(
					'Showing All Products block preview.',
					'woo-gutenberg-products-block'
				)
			);
		}
	};

	const getInspectorControls = (): JSX.Element => {
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
						minColumns={ getSetting( 'min_columns', 1 ) as number }
						maxColumns={ getSetting( 'max_columns', 6 ) as number }
						minRows={ getSetting( 'min_rows', 1 ) as number }
						maxRows={ getSetting( 'max_rows', 6 ) as number }
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

	const getBlockControls = (): JSX.Element => {
		return (
			<BlockControls>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __(
								'Edit the layout of each product',
								'woo-gutenberg-products-block'
							),
							onClick: () => togglePreview(),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
		);
	};

	const renderEditMode = () => {
		const onDone = () => {
			setAttributes( {
				layoutConfig: getProductLayoutConfig( innerBlocks ),
			} );
			setInnerBlocks( innerBlocks );
			togglePreview();
		};

		const onCancel = () => {
			replaceInnerBlocks( clientId, innerBlocks, false );
			togglePreview();
		};

		const onReset = () => {
			const newBlocks: BlockInstance[] = [];
			DEFAULT_PRODUCT_LIST_LAYOUT.map( ( [ name, blockAttributes ] ) => {
				newBlocks.push( createBlock( name, blockAttributes ) );
				return true;
			} );
			replaceInnerBlocks( clientId, newBlocks, false );
			setInnerBlocks( innerBlocks );
		};

		const InnerBlockProps: {
			template: [ string, object? ][];
			templateLock: boolean;
			allowedBlocks: Array< string >;
			renderAppender?: undefined | boolean;
		} = {
			template: layoutConfig,
			templateLock: false,
			allowedBlocks: Object.keys( blockMap ),
		};

		if ( layoutConfig.length !== 0 ) {
			InnerBlockProps.renderAppender = false;
		}

		return (
			<Placeholder icon={ getIcon() } label={ getTitle() }>
				{ __(
					'Display all products from your store as a grid.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-all-products-grid-item-template">
					<Tip>
						{ __(
							'Edit the blocks inside the example below to change the content displayed for all products within the product grid.',
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
										isLoading={ false }
									>
										{ /* @ts-expect-error: `InnerBlocks` is a component that is typed in WordPress core*/ }
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
						<Button
							className="wc-block-all-products__reset-button"
							icon={ <Icon icon={ grid } /> }
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
						</Button>
					</div>
				</div>
			</Placeholder>
		);
	};

	const renderViewMode = () => {
		const hasContent = layoutConfig && layoutConfig.length !== 0;
		const blockTitle = getTitle();
		const blockIcon = getIcon();

		if ( ! hasContent ) {
			return renderHiddenContentPlaceholder( blockTitle, blockIcon );
		}

		return (
			<Disabled>
				{ /* @ts-expect-error: `Block` is a component that is typed in WordPress core*/ }
				<Block attributes={ attributes } />
			</Disabled>
		);
	};

	const blockTitle = getTitle();
	const blockIcon = getIcon();

	if ( blocksConfig.productCount === 0 ) {
		return renderNoProductsPlaceholder( blockTitle, blockIcon );
	}

	return (
		<div
			className={ getBlockClassName(
				'wc-block-all-products',
				attributes
			) }
		>
			{ getBlockControls() }
			{ getInspectorControls() }
			{ isEditing ? renderEditMode() : renderViewMode() }
		</div>
	);
}
