/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { Icon, box } from '@wordpress/icons';
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { isExperimentalBuild } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import type { Attributes } from './types';

if ( isExperimentalBuild() ) {
	registerBlockType( metadata, {
		icon: {
			src: (
				<Icon
					icon={ box }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		attributes: {
			...metadata.attributes,
		},
		edit: Edit,
		// Save the props to post content.
		save( { attributes }: { attributes: Attributes } ) {
			const { className } = attributes;

			return (
				<div
					{ ...useBlockProps.save( {
						className: classNames( 'is-loading', className ),
					} ) }
				/>
			);
		},
	} );
}
