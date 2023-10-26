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

/**
 * Internal dependencies
 */
import type { ProductCollectionEditComponentProps } from '../types';
import { getDefaultProductCollection } from '../utils';
import Icon from '../icon';

const ProductCollectionPlaceholder = (
	props: ProductCollectionEditComponentProps
) => {
	const { clientId, openPatternSelectionModal } = props;
	const blockProps = useBlockProps();

	// @ts-expect-error Missing types in Gutenberg
	const { replaceBlock } = useDispatch( blockEditorStore );

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
						'Use default collection',
						'woo-gutenberg-products-block'
					) }
				</Button>
			</Placeholder>
		</div>
	);
};

export default ProductCollectionPlaceholder;
