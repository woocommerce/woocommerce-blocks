/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export interface Attributes {
	className?: string;
}

const Edit = () => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( {
		className: 'wc-block-post-template',
	} );

	return (
		<div { ...blockProps }>
			<li { ...innerBlocksProps } />;
		</div>
	);
};

export default Edit;
