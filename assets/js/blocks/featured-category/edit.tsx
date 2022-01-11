/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';

export const Edit = ( props: unknown ) => {
	const blockProps = useBlockProps();

	const { color, ...styles } = blockProps.style;

	return (
		<div { ...blockProps } style={ styles }>
			<Block { ...props } />
		</div>
	);
};
