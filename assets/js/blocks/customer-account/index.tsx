/**
 * External dependencies
 */
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';
import { customerAccount } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import { Attributes } from './types';
import metadata from './block.json';
import edit from './edit';

if ( isExperimentalBuild() ) {
	registerBlockType( metadata, {
		icon: {
			src: (
				<Icon
					icon={ customerAccount }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		attributes: {
			...metadata.attributes,
		},
		edit,
		save( { attributes }: { attributes: Attributes } ) {
			const { className, displayStyle, iconStyle } = attributes;
			const data: Record< string, unknown > = {
				'data-display-style': displayStyle,
				'data-icon-style': iconStyle,
			};

			return (
				<div
					{ ...useBlockProps.save( {
						className,
					} ) }
					{ ...data }
				></div>
			);
		},
	} );
}
