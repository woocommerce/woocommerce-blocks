/**
 * External dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const Edit = ( { attributes } ) => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'core/heading' ],
		template: [
			[ 'core/heading', { level: 3, content: attributes.heading || '' } ],
			[
				`woocommerce/${ attributes.filterType }`,
				{
					heading: '',
				},
			],
		],
	} );

	return <div { ...innerBlocksProps } />;
};

export default Edit;
