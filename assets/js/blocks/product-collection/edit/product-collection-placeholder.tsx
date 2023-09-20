/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	store as blockEditorStore,
	useBlockProps,
} from '@wordpress/block-editor';
import { Placeholder, Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import {
	createBlock,
	// @ts-expect-error Missing types in Gutenberg
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Icon from '../icon';
import type { ProductCollectionEditComponentProps } from '../types';
import { DEFAULT_ATTRIBUTES, INNER_BLOCKS_TEMPLATE } from '../constants';
import { getDefaultValueOfInheritQueryFromTemplate } from '../utils';
import blockJson from '../block.json';

const getDefaultProductCollection = () =>
	createBlock(
		blockJson.name,
		{
			...DEFAULT_ATTRIBUTES,
			query: {
				...DEFAULT_ATTRIBUTES.query,
				inherit: getDefaultValueOfInheritQueryFromTemplate(),
			},
		},
		createBlocksFromInnerBlocksTemplate( INNER_BLOCKS_TEMPLATE )
	);

const ProductCollectionPlaceholder = (
	props: ProductCollectionEditComponentProps
) => {
	const { clientId, openPatternSelectionModal } = props;
	const blockProps = useBlockProps();

	// @ts-expect-error Missing types in Gutenberg
	const { replaceBlock } = useDispatch( blockEditorStore );

	// TODO: This is temporary action that will be changed into
	// "Add custom collection"
	const addDefaultProductCollection = () => {
		const defaultProductCollection = getDefaultProductCollection();
		replaceBlock( clientId, defaultProductCollection );
	};

	return (
		<div { ...blockProps }>
			<Placeholder
				icon={ Icon }
				label={ __(
					'Product Collection',
					'woo-gutenberg-products-block'
				) }
				instructions={ __(
					'Choose from pre-existing collections or add default one.',
					'woo-gutenberg-products-block'
				) }
			>
				<Button variant="primary" onClick={ openPatternSelectionModal }>
					{ __(
						'Choose Collection',
						'woo-gutenberg-products-block'
					) }
				</Button>
				<Button
					variant="tertiary"
					onClick={ addDefaultProductCollection }
				>
					{ __(
						'Add default Product Collection',
						'woo-gutenberg-products-block'
					) }
				</Button>
			</Placeholder>
		</div>
	);
};

export default ProductCollectionPlaceholder;
