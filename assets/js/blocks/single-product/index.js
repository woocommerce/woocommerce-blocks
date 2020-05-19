/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import edit from './edit';
import blockAttributes from './attributes';
import './style.scss';
import {
	BLOCK_NAME,
	BLOCK_TITLE,
	BLOCK_ICON,
	BLOCK_DESCRIPTION,
} from './constants';

const settings = {
	title: BLOCK_TITLE,
	icon: {
		src: BLOCK_ICON,
		foreground: '#96588a',
	},
	category: 'woocommerce',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	description: BLOCK_DESCRIPTION,
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
	attributes: blockAttributes,
	edit,

	/**
	 * Save the props to post content.
	 */
	save( { attributes } ) {
		return (
			<div className={ classnames( 'is-loading', attributes.className ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

registerBlockType( BLOCK_NAME, settings );
