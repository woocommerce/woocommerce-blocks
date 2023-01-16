/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'wc-block-catalog-sorting',
	} );

	return (
		<>
			<div { ...blockProps }>
				<Disabled>
					<Block />
				</Disabled>
			</div>
		</>
	);
};

export default Edit;
