/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { Modal } from '@wordpress/components';
import { isEmpty } from '@woocommerce/types';
import {
	type BlockInstance,
	// @ts-expect-error Type definitions for this function are missing in Guteberg
	store as blocksStore,
	cloneBlock,
	createBlock,
	// @ts-expect-error Type definitions for this function are missing in Guteberg
	createBlocksFromInnerBlocksTemplate,
	BlockVariation,
} from '@wordpress/blocks';
/**
 * External dependencies
 */
import {
	store as blockEditorStore,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBlockPatternsList as BlockPatternsList,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import type {
	ProductCollectionQuery,
	ProductCollectionAttributes,
} from '../types';
import { DEFAULT_QUERY } from '../constants';
import { getDefaultValueOfInheritQueryFromTemplate } from '../utils';
import blockJson from '../block.json';

const buildFinalQueryFromBlockAndPatternQuery = ( {
	blockQuery,
	patternQuery,
}: {
	blockQuery: ProductCollectionQuery | undefined;
	patternQuery: ProductCollectionQuery;
} ) => {
	// If blockQuery is empty, it means it's the initial pattern/collection choice
	// and we should use DEFAULT_QUERY as a base for query.
	const baseQuery = isEmpty( blockQuery )
		? {
				...DEFAULT_QUERY,
				inherit: getDefaultValueOfInheritQueryFromTemplate(),
		  }
		: blockQuery;
	const { perPage, offset, pages } = patternQuery;

	return {
		...baseQuery,
		perPage,
		offset,
		pages,
	};
};

const mapCollectionToPattern = ( collection: BlockVariation ) => {
	const { name, title, attributes, innerBlocks } = collection;
	return {
		name,
		title,
		blockTypes: [ blockJson.name ],
		categories: [ 'WooCommerce' ],
		collection: true,
		blocks: [
			createBlock(
				blockJson.name,
				attributes,
				createBlocksFromInnerBlocksTemplate( innerBlocks )
			),
		],
	};
};

const PatternSelectionModal = ( props: {
	clientId: string;
	attributes: ProductCollectionAttributes;
	closePatternSelectionModal: () => void;
} ) => {
	const { clientId, attributes } = props;
	const { query } = attributes;
	// @ts-expect-error Type definitions for this function are missing
	// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/wordpress__blocks/store/actions.d.ts
	const { replaceBlock } = useDispatch( blockEditorStore );

	const updateQueryAttributeOfPattern = (
		block: BlockInstance
	): BlockInstance => {
		const newInnerBlocks =
			block.innerBlocks?.map( updateQueryAttributeOfPattern ) || [];

		if ( block.name === blockJson.name ) {
			const newQuery = buildFinalQueryFromBlockAndPatternQuery( {
				blockQuery: query,
				patternQuery: block.attributes.query,
			} );
			return cloneBlock(
				block,
				{ query: newQuery, collection: attributes.collection },
				newInnerBlocks
			);
		}
		return cloneBlock( block, {}, newInnerBlocks );
	};

	// Get Patterns
	const blockPatterns = useSelect(
		( select ) => {
			// @ts-expect-error Type definitions are missing
			// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/wordpress__blocks/store/selectors.d.ts
			const { getBlockRootClientId, getPatternsByBlockTypes } =
				select( blockEditorStore );
			const rootClientId = getBlockRootClientId( clientId );
			return getPatternsByBlockTypes( blockJson.name, rootClientId );
		},
		[ blockJson.name, clientId ]
	);

	// Get Collections
	const blockCollections = useSelect( ( select ) => {
		// @ts-expect-error Type definitions are missing
		// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/wordpress__blocks/store/selectors.d.ts
		const { getBlockVariations } = select( blocksStore );
		return getBlockVariations( blockJson.name );
	}, [] );

	const collectionsAsPatterns = blockCollections.map(
		mapCollectionToPattern
	);

	const onClickPattern = ( pattern, blocks: BlockInstance[] ) => {
		const { collection } = pattern;

		// Collection overrides the current block completely
		// so there's no need to apply current query to pattern
		if ( collection ) {
			replaceBlock( clientId, blocks );
			return;
		}

		const newBlocks = blocks.map( updateQueryAttributeOfPattern );
		replaceBlock( clientId, newBlocks );
	};

	return (
		<Modal
			overlayClassName="wc-blocks-product-collection__selection-modal"
			title={ __(
				'Choose a collection',
				'woo-gutenberg-products-block'
			) }
			onRequestClose={ props.closePatternSelectionModal }
			// @ts-expect-error Type definitions are missing in the version we are using i.e. 19.1.5,
			// Once we will update to the latest version, ts-expect-error should be removed
			isFullScreen
		>
			<div className="wc-blocks-product-collection__selection-content">
				<p>
					{ __(
						"Pick what products are shown. Don't worry, you can switch and tweak this collection any time.",
						'woo-gutenberg-products-block'
					) }
				</p>
				<BlockPatternsList
					blockPatterns={ [
						...blockPatterns,
						...collectionsAsPatterns,
					] }
					shownPatterns={ [
						...blockPatterns,
						...collectionsAsPatterns,
					] }
					onClickPattern={ onClickPattern }
				/>
			</div>
		</Modal>
	);
};

export default PatternSelectionModal;
