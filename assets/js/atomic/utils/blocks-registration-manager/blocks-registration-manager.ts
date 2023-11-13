/**
 * External dependencies
 */
import {
	BlockConfiguration,
	store as blocksStore,
	registerBlockType,
	unregisterBlockType,
} from '@wordpress/blocks';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	TemplateChangeDetector,
	TemplateChangeDetectorObserver,
} from './template-change-detector';
import {
	BlockRegistrationStrategy,
	BlockTypeStrategy,
	BlockVariationStrategy,
} from './block-registration-strategy';
import {
	BLOCKS_WITH_RESTRICTION,
	BlocksWithRestriction,
} from './blocks-with-restriction';

export class BlockRegistrationManager
	implements TemplateChangeDetectorObserver
{
	private blocksWithRestriction: BlocksWithRestriction;
	private unregisteredBlocks: string[] = [];
	private blockRegistrationStrategy: BlockRegistrationStrategy;

	constructor() {
		this.blocksWithRestriction = BLOCKS_WITH_RESTRICTION;
		this.blockRegistrationStrategy = new BlockTypeStrategy();
	}

	private blockShouldBeRegistered( {
		blockWithRestrictionName,
		currentTemplateId,
		isPostOrPage,
	}: {
		blockWithRestrictionName: string;
		currentTemplateId: string;
		isPostOrPage: boolean;
	} ) {
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

		return (
			shouldBeAvailableOnTemplate ||
			shouldBeAvailableOnTemplatePart ||
			shouldBeAvailableOnPostOrPageEditor
		);
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
				if (
					this.blockShouldBeRegistered( {
						blockWithRestrictionName,
						currentTemplateId,
						isPostOrPage,
					} )
				) {
					continue;
				}
				this.blockRegistrationStrategy = this.blocksWithRestriction[
					blockWithRestrictionName
				].isVariationBlock
					? new BlockVariationStrategy()
					: new BlockTypeStrategy();

				this.blockRegistrationStrategy.unregister(
					blockWithRestrictionName
				);
				unregisterBlockType( blockWithRestrictionName );
				this.unregisteredBlocks.push( blockWithRestrictionName );
			}
		}
	}

	registerBlocksAfterLeavingRestrictedArea() {
		for ( const unregisteredBlockName of this.unregisteredBlocks ) {
			const restrictedBlockData =
				this.blocksWithRestriction[ unregisteredBlockName ];
			this.blockRegistrationStrategy = this.blocksWithRestriction[
				unregisteredBlockName
			].isVariationBlock
				? new BlockVariationStrategy()
				: new BlockTypeStrategy();
			const isBlockRegistered = this.blockRegistrationStrategy.register(
				restrictedBlockData.blockMetadata,
				restrictedBlockData.blockSettings
			);
			this.unregisteredBlocks = isBlockRegistered
				? this.unregisteredBlocks.filter(
						( blockName ) => blockName !== unregisteredBlockName
				  )
				: this.unregisteredBlocks;
		}
	}

	run( templateChangeDetector: TemplateChangeDetector ) {
		const blockTypes = select( blocksStore ).getBlockTypes();

		this.registerBlocksAfterLeavingRestrictedArea();
		this.unregisterBlocksBeforeEnteringRestrictedArea( {
			currentTemplateId:
				templateChangeDetector.getCurrentTemplateId() || '',
			isPostOrPage: templateChangeDetector.getIsPostOrPage(),
		} );
	}
}
