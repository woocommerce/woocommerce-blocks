/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';
import './style.scss';

const Edit = (): JSX.Element | null => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-shipping-address',
	} );

	return (
		<div { ...blockProps }>
			<Block />
		</div>
	);
};

export default Edit;
