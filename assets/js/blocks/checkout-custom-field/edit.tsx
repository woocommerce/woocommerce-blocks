/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export const Edit = (): JSX.Element => {
	return <div>Custom Field!</div>;
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
