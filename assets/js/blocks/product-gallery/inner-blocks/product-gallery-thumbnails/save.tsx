/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
