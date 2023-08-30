/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Attributes } from './types';

const Save = ( { attributes }: BlockEditProps< Attributes > ) => {
	const { className } = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				className: classNames( 'is-loading', className ),
			} ) }
		/>
	);
};

export default Save;
