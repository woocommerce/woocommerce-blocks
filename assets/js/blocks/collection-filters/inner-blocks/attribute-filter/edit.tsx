/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const Edit = () => {
	const blockProps = useBlockProps();

	return <div { ...blockProps }>Collection Attribute Filter</div>;
};

export default Edit;
