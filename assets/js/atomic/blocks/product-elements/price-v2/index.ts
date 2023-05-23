/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared/config';
import edit from './edit';
import { save } from './save';
import attributes from './attributes';
import { supports } from './supports';
import {
	BLOCK_TITLE as title,
	BLOCK_ICON as icon,
	BLOCK_DESCRIPTION as description,
} from './constants';

const { ancestor, ...configuration } = sharedConfig;

const blockConfig = {
	...configuration,
	apiVersion: 2,
	title,
	description,
	usesContext: [ 'postId', 'queryId' ],
	providesContext: {
		'woocommerce/isDescendentOfSingleProductTemplate':
			'isDescendentOfSingleProductTemplate',
		'woocommerce/isDescendentOfSingleProductBlock':
			'isDescendentOfSingleProductBlock',
	},
	icon: { src: icon },
	attributes,
	supports,
	edit,
	save,
};

registerBlockType( 'woocommerce/product-price-v2', blockConfig );
