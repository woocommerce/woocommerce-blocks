/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';
export const Edit = ( { attributes } ): JSX.Element => {
	const { className } = attributes;
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<Block className={ className } />
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
