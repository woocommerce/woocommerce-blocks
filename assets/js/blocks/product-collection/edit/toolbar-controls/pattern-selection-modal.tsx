/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { Modal } from '@wordpress/components';
import {
	store as blockEditorStore,
	__experimentalBlockPatternsList as BlockPatternsList,
} from '@wordpress/block-editor';
import {
	type BlockInstance,
	store as blocksStore,
	cloneBlock,
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	BlockVariation,
} from '@wordpress/blocks';
import { isEmpty } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import type {
	ProductCollectionQuery,
	ProductCollectionAttributes,
} from '../../types';
import { DEFAULT_QUERY } from '../../constants';
import { getDefaultValueOfInheritQueryFromTemplate } from '../../utils';

const blockName = 'woocommerce/product-collection';

const buildQuery = (
	blockQuery: ProductCollectionQuery | undefined,
	patternQuery: ProductCollectionQuery
) => {
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
		blockTypes: [ 'woocommerce/product-collection' ],
		categories: [ 'woo-commerce' ],
		collection: true,
		blocks: [
			createBlock(
				'woocommerce/product-collection',
				attributes,
				createBlocksFromInnerBlocksTemplate( innerBlocks )
			),
		],
	};
};

const DisplayLayoutControl = ( props: {
	clientId: string;
	attributes: ProductCollectionAttributes;
	closePatternSelectionModal: () => void;
} ) => {
	const { clientId, attributes } = props;
	const { query } = attributes;
	const { replaceBlock, selectBlock } = useDispatch( blockEditorStore );

	const applyQueryToPattern = ( block: BlockInstance ): BlockInstance => {
		const newInnerBlocks = block.innerBlocks.map( applyQueryToPattern );
		if ( block.name === blockName ) {
			const newQuery = buildQuery( query, block.attributes.query );
			return cloneBlock(
				block,
				{ query: newQuery, collection: attributes.collection },
				newInnerBlocks
			);
		}
		return cloneBlock( block, {}, newInnerBlocks );
	};

	// Get the Product Collection patterns
	const blockPatterns = useSelect(
		( select ) => {
			const { getBlockRootClientId, getPatternsByBlockTypes } =
				select( blockEditorStore );
			const rootClientId = getBlockRootClientId( clientId );
			return getPatternsByBlockTypes( blockName, rootClientId );
		},
		[ blockName, clientId ]
	);

	// Get the Product Collection collections
	const blockCollections = useSelect( ( select ) => {
		const { getBlockVariations } = select( blocksStore );
		return getBlockVariations( 'woocommerce/product-collection' );
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

		const newBlocks = blocks.map( applyQueryToPattern );

		replaceBlock( clientId, newBlocks );
		selectBlock( newBlocks[ 0 ].clientId );
	};

	return (
		<Modal
			overlayClassName="wc-blocks-product-collection__selection-modal"
			title={ __( 'Choose a pattern', 'woo-gutenberg-products-block' ) }
			onRequestClose={ props.closePatternSelectionModal }
			isFullScreen={ true }
		>
			<div className="wc-blocks-product-collection__selection-content">
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

export default DisplayLayoutControl;
