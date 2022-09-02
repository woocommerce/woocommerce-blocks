/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import type { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Attributes } from './types';

const Edit = ( { attributes, clientId }: BlockEditProps< Attributes > ) => {
	const blockProps = useBlockProps();

	const innerBlockCount = useSelect( ( select ) => {
		const currentBlock = select( 'core/block-editor' ).getBlock( clientId );
		if ( ! currentBlock ) {
			return 0;
		}
		return currentBlock.innerBlocks.length;
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ [ 'core/heading' ] }
				template={ [
					[
						'core/heading',
						{ level: 3, content: attributes.heading || '' },
					],
					[
						`woocommerce/${ attributes.filterType }`,
						{
							heading: '',
						},
					],
				] }
				renderAppender={ () => {
					if ( innerBlockCount < 2 ) {
						return <InnerBlocks.ButtonBlockAppender />;
					}
					return null;
				} }
			/>
		</div>
	);
};

export default Edit;
