/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Modal, Button } from '@wordpress/components';
import {
	// @ts-expect-error Type definitions for this function are missing in Guteberg
	store as blocksStore,
	createBlock,
	// @ts-expect-error Type definitions for this function are missing in Guteberg
	createBlocksFromInnerBlocksTemplate,
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
import type { ProductCollectionAttributes } from '../types';
import blockJson from '../block.json';

type CollectionButtonProps = {
	active: boolean;
	title: string;
	icon: string;
	description: string;
	onClick: () => void;
};

const CollectionButton = ( {
	active,
	title,
	icon,
	description,
	onClick,
}: CollectionButtonProps ) => {
	const variant = active ? 'primary' : 'secondary';

	return (
		<Button variant={ variant } onClick={ onClick }>
			{ icon }
			{ title }: { description }
		</Button>
	);
};

const PatternSelectionModal = ( props: {
	clientId: string;
	attributes: ProductCollectionAttributes;
	closePatternSelectionModal: () => void;
} ) => {
	const { clientId } = props;
	// @ts-expect-error Type definitions for this function are missing
	// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/wordpress__blocks/store/actions.d.ts
	const { replaceBlock } = useDispatch( blockEditorStore );

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

	const [ chosenPatternName, selectPatternName ] = useState( '' );

	// Get Collections
	const blockCollections = useSelect( ( select ) => {
		// @ts-expect-error Type definitions are missing
		// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/wordpress__blocks/store/selectors.d.ts
		const { getBlockVariations } = select( blocksStore );
		return getBlockVariations( blockJson.name );
	}, [] );

	// Prepare Collections
	const defaultCollection = blockCollections.length
		? blockCollections[ 0 ].name
		: '';

	const [ chosenCollectionName, selectCollectionName ] =
		useState( defaultCollection );

	const applyCollection = () => {
		const chosenCollection = blockCollections.find(
			( { name }: { name: string } ) => name === chosenCollectionName
		);

		const chosenPattern = blockPatterns.find(
			( { name }: { name: string } ) => name === chosenPatternName
		);

		const newBlock = createBlock(
			blockJson.name,
			chosenCollection.attributes,
			createBlocksFromInnerBlocksTemplate( chosenCollection.innerBlocks )
		);

		// TODO: Need to apply pattern attributes and inner blocks structure
		// to the new Collection from a chosenPattern.

		replaceBlock( clientId, newBlock );
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
			<div className="wc-blocks-product-collection__content">
				<p className="wc-blocks-product-collection__subtitle">
					{ __(
						"Pick what products are shown. Don't worry, you can switch and tweak this collection any time.",
						'woo-gutenberg-products-block'
					) }
				</p>
				<div className="wc-blocks-product-collection__collections-section">
					{ blockCollections.map(
						( { name, title, icon, description } ) => (
							<CollectionButton
								active={ chosenCollectionName === name }
								key={ name }
								title={ title }
								description={ description }
								icon={ icon }
								onClick={ () => selectCollectionName( name ) }
							/>
						)
					) }
				</div>
				<div className="wc-blocks-product-collection__patterns-section">
					<h3>
						{ __(
							'Choose a pattern',
							'woo-gutenberg-products-block'
						) }
					</h3>
					<p className="wc-blocks-product-collection__subtitle">
						{ __(
							'Patterns are a great starting point that you can customise later.',
							'woo-gutenberg-products-block'
						) }
					</p>
					<BlockPatternsList
						blockPatterns={ blockPatterns }
						shownPatterns={ blockPatterns }
						onClickPattern={ ( { name } ) =>
							selectPatternName( name )
						}
					/>
				</div>
				<div className="wc-blocks-product-collection__footer">
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
