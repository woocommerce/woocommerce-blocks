/**
 * External dependencies
 */
import {
	BlockInstance,
	createBlock,
	registerBlockType,
} from '@wordpress/blocks';
import type { BlockEditProps } from '@wordpress/blocks';
import { WC_BLOCKS_IMAGE_URL } from '@woocommerce/block-settings';
import {
	useBlockProps,
	BlockPreview,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { Button, Placeholder, Popover } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { box, Icon } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import { woo } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import { TEMPLATES, TYPES } from './constants';
import { getTemplateDetailsBySlug } from './utils';
import * as blockifiedCheckout from './checkout';
import * as blockifiedCart from './cart';

import type { BlockifiedTemplateConfig } from './types';

type Attributes = {
	shortcode: string;
	align: string;
};

const blockifiedFallbackConfig = {
	isConversionPossible: () => false,
	getBlockifiedTemplate: () => [],
	getDescription: () => '',
	onClickCallback: () => void 0,
};

const conversionConfig: { [ key: string ]: BlockifiedTemplateConfig } = {
	[ TYPES.cart ]: blockifiedCart,
	[ TYPES.checkout ]: blockifiedCheckout,
	fallback: blockifiedFallbackConfig,
};

const pickBlockClientIds = ( blocks: Array< BlockInstance > ) =>
	blocks.reduce< Array< string > >( ( acc, block ) => {
		if ( block.name === 'core/template-part' ) {
			return acc;
		}

		return [ ...acc, block.clientId ];
	}, [] );

const ConvertTemplate = ( { blockifyConfig, clientId, attributes } ) => {
	const { getButtonLabel, onClickCallback, getBlockifiedTemplate } =
		blockifyConfig;

	const [ isPopoverOpen, setIsPopoverOpen ] = useState( false );
	const { replaceBlock, selectBlock, replaceBlocks } =
		useDispatch( blockEditorStore );

	const { getBlocks } = useSelect( ( sel ) => {
		return {
			getBlocks: sel( blockEditorStore ).getBlocks,
		};
	}, [] );

	const { createInfoNotice } = useDispatch( noticesStore );

	return (
		<div className="wp-block-woocommerce-classic-shortcode__placeholder-migration-button-container">
			<Button
				variant="primary"
				onClick={ () => {
					onClickCallback( {
						clientId,
						getBlocks,
						attributes,
						replaceBlock,
						selectBlock,
					} );
					createInfoNotice(
						__(
							'Template transformed into blocks!',
							'woo-gutenberg-products-block'
						),
						{
							actions: [
								{
									label: __(
										'Undo',
										'woo-gutenberg-products-block'
									),
									onClick: () => {
										const clientIds = pickBlockClientIds(
											getBlocks()
										);

										replaceBlocks(
											clientIds,
											createBlock(
												'core/group',
												{
													layout: {
														inherit: true,
														type: 'constrained',
													},
												},
												[
													createBlock(
														'woocommerce/classic-shortcode',
														{
															shortcode:
																attributes.shortcode,
														}
													),
												]
											)
										);
									},
								},
							],
							type: 'snackbar',
						}
					);
				} }
				onMouseEnter={ () => setIsPopoverOpen( true ) }
				onMouseLeave={ () => setIsPopoverOpen( false ) }
				text={ getButtonLabel ? getButtonLabel() : '' }
			>
				{ isPopoverOpen && (
					<Popover resize={ false } placement="right-end">
						<div
							style={ {
								minWidth: '250px',
								width: '250px',
								maxWidth: '250px',
								minHeight: '300px',
								height: '300px',
								maxHeight: '300px',
								cursor: 'pointer',
							} }
						>
							<BlockPreview
								blocks={ getBlockifiedTemplate( attributes ) }
								viewportWidth={ 1200 }
								additionalStyles={ [
									{
										css: 'body { padding: 20px !important; height: fit-content !important; overflow:hidden}',
									},
								] }
							/>
						</div>
					</Popover>
				) }
			</Button>
		</div>
	);
};

const Edit = ( { clientId, attributes }: BlockEditProps< Attributes > ) => {
	const blockProps = useBlockProps();

	const templateDetails = getTemplateDetailsBySlug(
		attributes.shortcode,
		TEMPLATES
	);
	const templateTitle = attributes.shortcode;
	const templatePlaceholder = templateDetails?.placeholder ?? 'fallback';
	const templateType = templateDetails?.type ?? 'fallback';

	const { isConversionPossible, getDescription, getTitle, blockifyConfig } =
		conversionConfig[ templateType ];

	const canConvert = isConversionPossible();
	const placeholderTitle = getTitle
		? getTitle()
		: __( 'Classic Shortcode Placeholder', 'woo-gutenberg-products-block' );
	const placeholderDescription = getDescription( templateTitle, canConvert );

	return (
		<div { ...blockProps }>
			<Placeholder className="wp-block-woocommerce-classic-shortcode__placeholder">
				<div className="wp-block-woocommerce-classic-shortcode__placeholder-wireframe">
					<img
						className="wp-block-woocommerce-classic-shortcode__placeholder-image"
						src={ `${ WC_BLOCKS_IMAGE_URL }template-placeholders/${ templatePlaceholder }.svg` }
						alt={ templateTitle }
					/>
				</div>
				<div className="wp-block-woocommerce-classic-shortcode__placeholder-copy">
					<div className="wp-block-woocommerce-classic-shortcode__placeholder-copy__icon-container">
						<span className="woo-icon">
							<Icon icon={ woo } />{ ' ' }
							{ __(
								'WooCommerce',
								'woo-gutenberg-products-block'
							) }
						</span>
						<span>{ placeholderTitle }</span>
					</div>
					<p
						dangerouslySetInnerHTML={ {
							__html: placeholderDescription,
						} }
					/>
					<p>
						{ __(
							'You cannot edit the content of this block. However, you can move it and place other blocks around it.',
							'woo-gutenberg-products-block'
						) }
					</p>
					{ canConvert && blockifyConfig && (
						<ConvertTemplate
							clientId={ clientId }
							blockifyConfig={ blockifyConfig }
							attributes={ attributes }
						/>
					) }
				</div>
			</Placeholder>
		</div>
	);
};

registerBlockType( 'woocommerce/classic-shortcode', {
	title: __( 'Classic Shortcode', 'woo-gutenberg-products-block' ),
	icon: (
		<Icon icon={ box } className="wc-block-editor-components-block-icon" />
	),
	category: 'woocommerce',
	apiVersion: 2,
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: __(
		'Renders classic WooCommerce shortcodes.',
		'woo-gutenberg-products-block'
	),

	supports: {
		align: true,
		html: false,
		multiple: false,
		reusable: false,
		inserter: true,
	},
	attributes: {
		/**
		 * Shortcode attribute is used to determine which shortcode gets rendered.
		 */
		shortcode: {
			type: 'string',
			default: 'any',
		},
		align: {
			type: 'string',
			default: 'wide',
		},
	},
	edit: ( {
		attributes,
		clientId,
		setAttributes,
	}: BlockEditProps< Attributes > ) => {
		return (
			<Edit
				attributes={ attributes }
				setAttributes={ setAttributes }
				clientId={ clientId }
			/>
		);
	},
	save: () => null,
} );
