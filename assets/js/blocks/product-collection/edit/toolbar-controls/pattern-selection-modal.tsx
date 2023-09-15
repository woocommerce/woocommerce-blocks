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
import { type BlockInstance, cloneBlock } from '@wordpress/blocks';
import { isEmpty } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import { ProductCollectionQuery } from '../../types';
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

const DisplayLayoutControl = ( props: {
	clientId: string;
	query?: ProductCollectionQuery;
	closePatternSelectionModal: () => void;
} ) => {
	const { clientId, query } = props;
	const { replaceBlock, selectBlock } = useDispatch( blockEditorStore );

	const transformBlock = ( block: BlockInstance ): BlockInstance => {
		const newInnerBlocks = block.innerBlocks.map( transformBlock );
		if ( block.name === blockName ) {
			const newQuery = buildQuery( query, block.attributes.query );
			return cloneBlock( block, { query: newQuery }, newInnerBlocks );
		}
		return cloneBlock( block, {}, newInnerBlocks );
	};

	const blockPatterns = useSelect(
		( select ) => {
			const { getBlockRootClientId, getPatternsByBlockTypes } =
				select( blockEditorStore );
			const rootClientId = getBlockRootClientId( clientId );
			return getPatternsByBlockTypes( blockName, rootClientId );
		},
		[ blockName, clientId ]
	);

	const onClickPattern = ( pattern, blocks: BlockInstance[] ) => {
		const newBlocks = blocks.map( transformBlock );

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
					blockPatterns={ blockPatterns }
					shownPatterns={ blockPatterns }
					onClickPattern={ onClickPattern }
				/>
			</div>
		</Modal>
	);
};

export default DisplayLayoutControl;
