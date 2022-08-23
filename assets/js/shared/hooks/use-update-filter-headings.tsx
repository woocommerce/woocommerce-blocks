/**
 * External dependencies
 */
import { createBlock, BlockEditProps } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

interface Attributes {
	heading: string;
	headingLevel: number;
	clientId: string;
}

const useUpdateFilterHeadings = ( {
	heading,
	headingLevel,
	clientId,
	setAttributes,
}: Attributes & Pick< BlockEditProps< Attributes >, 'setAttributes' > ) => {
	const { insertBlock } = useDispatch( 'core/block-editor' );
	const { currentBlockIndex, currentParentBlockId } = useSelect(
		( select ) => {
			const store = select( 'core/block-editor' );
			return {
				currentBlockIndex: store.getBlockIndex( clientId ),
				currentParentBlockId: store.getBlockRootClientId( clientId ),
			};
		}
	);

	const updateBlock = () => {
		const headingBlock = createBlock( 'core/heading', {
			content: heading,
			level: headingLevel,
		} );
		insertBlock(
			headingBlock,
			currentBlockIndex,
			currentParentBlockId,
			false
		);
		setAttributes( {
			heading: '',
		} );
	};

	return updateBlock;
};

export default useUpdateFilterHeadings;
