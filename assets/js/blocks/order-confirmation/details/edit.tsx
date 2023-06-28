/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-details',
	} );

	return <div { ...blockProps }>Details EDIT</div>;
};

export default Edit;
