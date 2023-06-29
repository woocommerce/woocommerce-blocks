/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-status',
	} );

	return <div { ...blockProps }>STATUS EDIT</div>;
};

export default Edit;
