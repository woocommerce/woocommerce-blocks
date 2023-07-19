/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Block from './block';
import './style.scss';

const Edit = ( {}: {
	setAttributes: ( attributes: BlockAttributes ) => void;
} ): JSX.Element | null => {
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
