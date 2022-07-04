/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Icon, starEmpty } from '@wordpress/icons';
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import { blockAttributes } from './attributes';
import type { Attributes } from './types';

registerBlockType( metadata, {
	title: __( 'Filter Products by Rating', 'woo-gutenberg-products-block' ),
	description: __(
		'Allow customers to filter the grid by products rating. Works in combination with the All Products block.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: (
			<Icon
				icon={ starEmpty }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
		...blockAttributes,
	},
	edit,
	// Save the props to post content.
	save( { attributes }: { attributes: Attributes } ) {
		const {
			className,
			showCounts,
			heading,
			headingLevel,
			showFilterButton,
		} = attributes;
		const data: Record< string, unknown > = {
			'data-show-counts': showCounts,
			'data-heading': heading,
			'data-heading-level': headingLevel,
		};
		if ( showFilterButton ) {
			data[ 'data-show-filter-button' ] = showFilterButton;
		}
		return (
			<div
				{ ...useBlockProps.save( {
					className: classNames( 'is-loading', className ),
				} ) }
				{ ...data }
			>
				<span
					aria-hidden
					className="wc-block-product-rating-filter__placeholder"
				/>
			</div>
		);
	},
} );
