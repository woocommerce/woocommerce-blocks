/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import './editor.scss';
export interface Attributes {
	className?: string;
}

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-received',
	} );

	return (
		<div { ...blockProps }>
			<span>HELLO!</span>
		</div>
	);
};

export default Edit;
