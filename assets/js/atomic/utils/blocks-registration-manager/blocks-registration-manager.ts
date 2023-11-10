/**
 * External dependencies
 */
import {
	BlockConfiguration,
	store as blocksStore,
	registerBlockType,
	unregisterBlockType,
} from '@wordpress/blocks';
import { ProductGalleryBlockSettings } from '@woocommerce/blocks/product-gallery/settings';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import productGalleryBlockMetadata from '../../../blocks/product-gallery/block.json';
import {
	TemplateChangeDetector,
	TemplateChangeObserver,
} from './template-change-detector';

interface BlocksWithRestriction {
	[ key: string ]: {
		blockMetadata: Partial< BlockConfiguration >;
		blockSettings: Partial< BlockConfiguration >;
		allowedTemplates: {
			[ key: string ]: boolean;
		};
		allowedTemplateParts: {
			[ key: string ]: boolean;
		};
		availableInPostOrPageEditor: false;
	};
}

const BLOCKS_WITH_RESTRICTION: BlocksWithRestriction = {
	[ productGalleryBlockMetadata.name ]: {
		blockMetadata: productGalleryBlockMetadata,
		blockSettings: ProductGalleryBlockSettings,
		allowedTemplates: {
			'single-product': true,
		},
		allowedTemplateParts: {
			'product-gallery': true,
		},
		availableInPostOrPageEditor: false,
	},
};

export class BlockRegistrationManager implements TemplateChangeObserver {
	private blocksWithRestriction: BlocksWithRestriction;
	private unregisteredBlocks: string[] = [];

	constructor() {
		this.blocksWithRestriction = BLOCKS_WITH_RESTRICTION;
	}

	registerBlocksAfterLeavingRestrictedArea() {
		for ( const unregisteredBlockName of this.unregisteredBlocks ) {
			const restrictedBlockData =
				this.blocksWithRestriction[ unregisteredBlockName ];
			const isBlockRegistered = Boolean(
				registerBlockType(
					restrictedBlockData.blockMetadata,
					restrictedBlockData.blockSettings
				)
			);
			this.unregisteredBlocks = isBlockRegistered
				? this.unregisteredBlocks.filter(
						( blockName ) => blockName !== unregisteredBlockName
				  )
				: this.unregisteredBlocks;
		}
	}

	unregisterBlocksBeforeEnteringRestrictedArea( {
		currentTemplateId,
		isPostOrPage,
	}: {
		currentTemplateId: string;
		isPostOrPage: boolean;
	} ) {
		for ( const blockWithRestrictionName of Object.keys(
			BLOCKS_WITH_RESTRICTION
		) ) {
			if ( this.blocksWithRestriction[ blockWithRestrictionName ] ) {
				const {
					allowedTemplates,
					allowedTemplateParts,
					availableInPostOrPageEditor,
				} = this.blocksWithRestriction[ blockWithRestrictionName ];
				const shouldBeAvailableOnTemplate = Object.keys(
					allowedTemplates
				).some( ( allowedTemplate ) =>
					currentTemplateId.startsWith( allowedTemplate )
				);
				const shouldBeAvailableOnTemplatePart = Object.keys(
					allowedTemplateParts
				).some( ( allowedTemplate ) =>
					currentTemplateId.startsWith( allowedTemplate )
				);
				const shouldBeAvailableOnPostOrPageEditor =
					isPostOrPage && availableInPostOrPageEditor;

				if (
					shouldBeAvailableOnTemplate ||
					shouldBeAvailableOnTemplatePart ||
					shouldBeAvailableOnPostOrPageEditor
				) {
					continue;
				}

				unregisterBlockType( blockWithRestrictionName );
				this.unregisteredBlocks.push( blockWithRestrictionName );
			}
		}
	}

	run( templateChangeDetector: TemplateChangeDetector ) {
		console.log( {
			currentTemplateId: templateChangeDetector.getCurrentTemplateId(),
			previousTemplateId: templateChangeDetector.getPreviousTemplateId(),
		} );
		const blockTypes = select( blocksStore ).getBlockTypes();

		this.registerBlocksAfterLeavingRestrictedArea();
		this.unregisterBlocksBeforeEnteringRestrictedArea( {
			currentTemplateId:
				templateChangeDetector.getCurrentTemplateId() || '',
			isPostOrPage: templateChangeDetector.getIsPostOrPage(),
		} );
	}
}
