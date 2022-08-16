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
	const currentBlockIndex = useSelect( ( select ) =>
		select( 'core/block-editor' ).getBlockIndex( clientId )
	);

	const updateBlock = () => {
		const headingBlock = createBlock( 'core/heading', {
			content: heading,
			level: headingLevel,
		} );
		insertBlock( headingBlock, currentBlockIndex );
		setAttributes( {
			heading: '',
		} );
	};

	return updateBlock;
};

export default useUpdateFilterHeadings;
