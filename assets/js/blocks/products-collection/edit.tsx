/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export interface Attributes {
	className?: string;
}

const Edit = () => {
	const blockProps = useBlockProps();

	return <div { ...blockProps }>Product collection</div>;
};

export default Edit;
