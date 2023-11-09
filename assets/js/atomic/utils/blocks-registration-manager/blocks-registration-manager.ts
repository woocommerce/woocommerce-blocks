/**
 * External dependencies
 */
import {
	BlockConfiguration,
	store as blocksStore,
	registerBlockType,
	unregisterBlockType,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import productGalleryBlockMetadata from '../../../blocks/product-gallery/block.json';
import { ProductGalleryBlockSettings } from '@woocommerce/blocks/product-gallery';
import {
	TemplateChangeDetector,
	TemplateChangeObserver,
} from './template-change-detector';
import { select } from '@wordpress/data';

interface RegisterBlockParameters {
	currentTemplateId: string;
	previousTemplateId: string;
}

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
	},
};

export class BlockRegistrationManager implements TemplateChangeObserver {
	private blocksWithRestriction: BlocksWithRestriction;
	private unregisteredBlocks: string[] = [];

	constructor () {
		this.blocksWithRestriction = BLOCKS_WITH_RESTRICTION;
	}

	registerBlocksAfterLeavingRestrictedTemplateOrTemplatePart () {
		for ( const unregisteredBlockName of this.unregisteredBlocks ) {
			console.log( { unregisteredBlocks: this.unregisteredBlocks } );
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

	unregisterBlocksBeforeEnteringRestrictedTemplateOrTemplatePart ( {
		currentTemplateId,
	}: {
		currentTemplateId: string;
	} ) {
		for ( const blockWithRestrictionName of Object.keys(
			BLOCKS_WITH_RESTRICTION
		) ) {
			if ( this.blocksWithRestriction[ blockWithRestrictionName ] ) {
				const allowedTemplatesForTheBlock =
					this.blocksWithRestriction[ blockWithRestrictionName ]
						.allowedTemplates;
				const allowedTemplatePartsForTheBlock =
					this.blocksWithRestriction[ blockWithRestrictionName ]
						.allowedTemplateParts;
				const shouldBeAvailableOnTemplate = Object.keys(
					allowedTemplatesForTheBlock
				).some( ( allowedTemplate ) =>
					currentTemplateId.startsWith( allowedTemplate )
				);
				const shouldBeAvailableOnTemplatePart = Object.keys(
					allowedTemplatePartsForTheBlock
				).some( ( allowedTemplate ) =>
					currentTemplateId.startsWith( allowedTemplate )
				);
				console.log( {
					currentTemplateId,
					name: blockWithRestrictionName,
					shouldBeAvailableOnTemplate,
					shouldBeAvailableOnTemplatePart,
				} );

				if (
					shouldBeAvailableOnTemplate ||
					shouldBeAvailableOnTemplatePart
				) {
					continue;
				}

				console.log( `unregistering ${ blockWithRestrictionName }` );
				unregisterBlockType( blockWithRestrictionName );
				this.unregisteredBlocks.push( blockWithRestrictionName );
			}
		}
	}

	run ( templateChangeDetector: TemplateChangeDetector ) {
		const blockTypes = select( blocksStore ).getBlockTypes();

		this.registerBlocksAfterLeavingRestrictedTemplateOrTemplatePart();
		this.unregisterBlocksBeforeEnteringRestrictedTemplateOrTemplatePart( {
			currentTemplateId: templateChangeDetector.getCurrentTemplateId() || '',
		} );
	}
}
