/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const Edit = () => {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( blockProps );

	return <div { ...innerBlockProps } />;
};

export default Edit;
