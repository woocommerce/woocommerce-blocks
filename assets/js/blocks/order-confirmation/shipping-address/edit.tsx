/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-shipping-address',
	} );

	return <div { ...blockProps }>Shipping EDIT</div>;
};

export default Edit;
