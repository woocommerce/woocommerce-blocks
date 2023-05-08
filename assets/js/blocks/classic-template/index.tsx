/**
 * External dependencies
 */
import {
	createBlock,
	getBlockType,
	registerBlockType,
	unregisterBlockType,
} from '@wordpress/blocks';
import type { BlockEditProps } from '@wordpress/blocks';
import {
	isExperimentalBuild,
	WC_BLOCKS_IMAGE_URL,
} from '@woocommerce/block-settings';
import {
	useBlockProps,
	BlockPreview,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { Button, Placeholder, Popover } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { box, Icon } from '@wordpress/icons';
import { useDispatch, subscribe, useSelect, select } from '@wordpress/data';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import { BLOCK_SLUG, TEMPLATES, TYPES } from './constants';
import {
	isClassicTemplateBlockRegisteredWithAnotherTitle,
	hasTemplateSupportForClassicTemplateBlock,
	getTemplateDetailsBySlug,
} from './utils';
import {
	blockifiedProductCatalogConfig,
	blockifiedProductTaxonomyConfig,
} from './archive-product';
import * as blockifiedSingleProduct from './single-product';
import * as blockifiedProductSearchResults from './product-search-results';
import type { BlockifiedTemplateConfig } from './types';

type Attributes = {
	template: string;
	align: string;
};

const blockifiedFallbackConfig = {
	isConversionPossible: () => false,
	getBlockifiedTemplate: () => [],
	getDescription: () => '',
	getButtonLabel: () => '',
	onClickCallback: () => void 0,
};

const conversionConfig: { [ key: string ]: BlockifiedTemplateConfig } = {
	[ TYPES.productCatalog ]: blockifiedProductCatalogConfig,
	[ TYPES.productTaxonomy ]: blockifiedProductTaxonomyConfig,
	[ TYPES.singleProduct ]: blockifiedSingleProduct,
	[ TYPES.productSearchResults ]: blockifiedProductSearchResults,
	fallback: blockifiedFallbackConfig,
};

const pickBlockClientIds = ( blocks: Array< BlockInstance > ) =>
	blocks.reduce< Array< string > >( ( acc, block ) => {
		if ( block.name === 'core/template-part' ) {
			return acc;
		}

		return [ ...acc, block.clientId ];
	}, [] );

const Edit = ( {
	clientId,
	attributes,
	setAttributes,
}: BlockEditProps< Attributes > ) => {
	const { replaceBlock, selectBlock, replaceBlocks } =
		useDispatch( blockEditorStore );

	const { blocks } = useSelect( ( sel ) => {
		return {
			blocks: sel( blockEditorStore ).getBlocks(),
		};
	}, [] );

	const { createInfoNotice } = useDispatch( noticesStore );

	const clientIds = useMemo( () => pickBlockClientIds( blocks ), [ blocks ] );

	const blockProps = useBlockProps();
	const templateDetails = getTemplateDetailsBySlug(
		attributes.template,
		TEMPLATES
	);
	const templateTitle = templateDetails?.title ?? attributes.template;
	const templatePlaceholder = templateDetails?.placeholder ?? 'fallback';
	const templateType = templateDetails?.type ?? 'fallback';

	useEffect(
		() =>
			setAttributes( {
				template: attributes.template,
				align: attributes.align ?? 'wide',
			} ),
		[ attributes.align, attributes.template, setAttributes ]
	);

	const {
		isConversionPossible,
		getDescription,
		getButtonLabel,
		onClickCallback,
		getBlockifiedTemplate,
	} = conversionConfig[ templateType ];

	const canConvert = isConversionPossible();
	const placeholderDescription = getDescription( templateTitle, canConvert );
	const [ isPopoverOpen, setIsPopoverOpen ] = useState( false );

	return (
		<div { ...blockProps }>
			<Placeholder className="wp-block-woocommerce-classic-template__placeholder">
				<div className="wp-block-woocommerce-classic-template__placeholder-wireframe">
					<div className="wp-block-woocommerce-classic-template__placeholder-copy">
						<div className="wp-block-woocommerce-classic-template__placeholder-copy__icon-container">
							<Icon icon={ box } />
							<span>
								{ __(
									'Classic Product Template',
									'woo-gutenberg-products-block'
								) }
							</span>
						</div>
						<p>{ placeholderDescription }</p>
						{ canConvert && (
							<div className="wp-block-woocommerce-classic-template__placeholder-migration-button-container">
								<Button
									isPrimary
									onClick={ () => {
										onClickCallback( {
											clientId,
											blocks,
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
															replaceBlocks(
																clientIds,
																createBlock(
																	'core/group',
																	{
																		layout: {
																			inherit:
																				true,
																			type: 'constrained',
																		},
																	},
																	[
																		createBlock(
																			'woocommerce/legacy-template',
																			{
																				template:
																					attributes.template,
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
									onMouseEnter={ () =>
										setIsPopoverOpen( true )
									}
									onMouseLeave={ () =>
										setIsPopoverOpen( false )
									}
									text={ getButtonLabel() }
								>
									{ isPopoverOpen && (
										<Popover
											resize={ false }
											placement="right-end"
										>
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
													blocks={ getBlockifiedTemplate(
														attributes
													) }
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
						) }
					</div>
					<img
						className="wp-block-woocommerce-classic-template__placeholder-image"
						src={ `${ WC_BLOCKS_IMAGE_URL }template-placeholders/${ templatePlaceholder }.svg` }
						alt={ templateTitle }
					/>
				</div>
			</Placeholder>
		</div>
	);
};

const registerClassicTemplateBlock = ( {
	template,
	inserter,
}: {
	template?: string;
	inserter: boolean;
} ) => {
	/**
	 * The 'WooCommerce Legacy Template' block was renamed to 'WooCommerce Classic Template', however, the internal block
	 * name 'woocommerce/legacy-template' needs to remain the same. Otherwise, it would result in a corrupt block when
	 * loaded for users who have customized templates using the legacy-template (since the internal block name is
	 * stored in the database).
	 *
	 * See https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/5861 for more context
	 */
	registerBlockType( BLOCK_SLUG, {
		title:
			template && TEMPLATES[ template ]
				? TEMPLATES[ template ].title
				: __(
						'WooCommerce Classic Template',
						'woo-gutenberg-products-block'
				  ),
		icon: (
			<Icon
				icon={ box }
				className="wc-block-editor-components-block-icon"
			/>
		),
		category: 'woocommerce',
		apiVersion: 2,
		keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
		description: __(
			'Renders classic WooCommerce PHP templates.',
			'woo-gutenberg-products-block'
		),
		supports: {
			align: [ 'wide', 'full' ],
			html: false,
			multiple: false,
			reusable: false,
			inserter,
		},
		attributes: {
			/**
			 * Template attribute is used to determine which core PHP template gets rendered.
			 */
			template: {
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
			const newTemplate = template ?? attributes.template;

			return (
				<Edit
					attributes={ {
						...attributes,
						template: newTemplate,
					} }
					setAttributes={ setAttributes }
					clientId={ clientId }
				/>
			);
		},
		save: () => null,
	} );
};

// @todo Refactor when there will be possible to show a block according on a template/post with a Gutenberg API. https://github.com/WordPress/gutenberg/pull/41718

let currentTemplateId: string | undefined;

if ( isExperimentalBuild() ) {
	subscribe( () => {
		const previousTemplateId = currentTemplateId;
		const store = select( 'core/edit-site' );
		currentTemplateId = store?.getEditedPostId() as string | undefined;

		if ( previousTemplateId === currentTemplateId ) {
			return;
		}

		const parsedTemplate = currentTemplateId?.split( '//' )[ 1 ];

		if ( parsedTemplate === null || parsedTemplate === undefined ) {
			return;
		}

		const block = getBlockType( BLOCK_SLUG );

		if (
			block !== undefined &&
			( ! hasTemplateSupportForClassicTemplateBlock(
				parsedTemplate,
				TEMPLATES
			) ||
				isClassicTemplateBlockRegisteredWithAnotherTitle(
					block,
					parsedTemplate
				) )
		) {
			unregisterBlockType( BLOCK_SLUG );
			currentTemplateId = undefined;
			return;
		}

		if (
			block === undefined &&
			hasTemplateSupportForClassicTemplateBlock(
				parsedTemplate,
				TEMPLATES
			)
		) {
			registerClassicTemplateBlock( {
				template: parsedTemplate,
				inserter: true,
			} );
		}
	} );
} else {
	registerClassicTemplateBlock( {
		inserter: false,
	} );
}
