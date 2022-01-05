/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared/config';
import attributes from './attributes';
import supports from './supports';
import edit from './edit';

import {
	BLOCK_TITLE as title,
	BLOCK_ICON as icon,
	BLOCK_DESCRIPTION as description,
} from './constants';

const blockConfig = {
	apiVersion: 2,
	title,
	description,
	icon: { src: icon },
	attributes,
	supports,
	edit,
};

registerBlockType( 'woocommerce/product-image', {
	...sharedConfig,
	...blockConfig,
} );
