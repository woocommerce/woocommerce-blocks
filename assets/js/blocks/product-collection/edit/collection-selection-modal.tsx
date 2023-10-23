/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Modal, Button } from '@wordpress/components';
import { isEmpty } from '@woocommerce/types';
import {
	type BlockInstance,
	// @ts-expect-error Type definitions for this function are missing in Guteberg
	store as blocksStore,
	cloneBlock,
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

const CollectionButton = ( { active, title, icon, description, onClick } ) => {
	const variant = active ? 'primary' : 'secondary';

	return (
		<Button variant={ variant } onClick={ onClick }>
			{ title }: { description }
		</Button>
	);
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

	const applyCollection = () => {
		const blocks = [];
		// Collection overrides the current block completely
		// so there's no need to apply current query to pattern
		if ( chosenCollection ) {
			replaceBlock( clientId, blocks );
			return;
		}

		const newBlocks = blocks.map( updateQueryAttributeOfPattern );
		replaceBlock( clientId, newBlocks );
	};

	const defaultCollection = blockCollections.length
		? blockCollections[ 0 ].name
		: '';

	const [ chosenCollection, selectCollection ] =
		useState( defaultCollection );

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
				<p className="wc-blocks-product-collection__selection-modal-subtitle">
					{ __(
						"Pick what products are shown. Don't worry, you can switch and tweak this collection any time.",
						'woo-gutenberg-products-block'
					) }
				</p>
				{ blockCollections.map(
					( { name, title, icon, description } ) => (
						<CollectionButton
							active={ chosenCollection === name }
							key={ name }
							title={ title }
							description={ description }
							icon={ icon }
							onClick={ () => selectCollection( name ) }
						/>
					)
				) }
				{ /* <BlockPatternsList
					blockPatterns={ blockPatterns }
					shownPatterns={ blockPatterns }
					onClickPattern={ onClickPattern }
				/> */ }
				<div>
					<Button
						variant="tertiary"
						onClick={ props.closePatternSelectionModal }
					>
						{ __( 'Cancel', 'woo-gutenberg-products-block' ) }
					</Button>
					<Button variant="primary" onClick={ applyCollection }>
						{ __( 'Continue', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default PatternSelectionModal;
