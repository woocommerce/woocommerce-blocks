/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

export const SingleProduct = () => {
	const blockProps = useBlockProps();

	return <div { ...blockProps }>Single Product</div>;
};

export default SingleProduct;
