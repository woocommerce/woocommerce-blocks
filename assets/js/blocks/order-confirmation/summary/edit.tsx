/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-summary',
	} );

	return <div { ...blockProps }>CONFIRMATION EDIT</div>;
};

export default Edit;
