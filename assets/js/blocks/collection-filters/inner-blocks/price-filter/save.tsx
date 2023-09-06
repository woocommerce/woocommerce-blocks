/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';
import { EditProps } from './types';

const Save = ( { attributes }: EditProps ) => {
	return (
		<div { ...useBlockProps.save() }>
			<Block { ...attributes } />
		</div>
	);
};

export default Save;
