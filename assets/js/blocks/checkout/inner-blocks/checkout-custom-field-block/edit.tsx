/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export const Edit = (): JSX.Element | null => {
	return <div>Hey test</div>;
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
