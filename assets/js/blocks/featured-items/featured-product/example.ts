/**
 * External dependencies
 */
import { previewProducts } from '@woocommerce/resource-previews';
import { Block } from '@wordpress/blocks';

export const example: Block[ 'example' ] = {
	attributes: {
		productId: 'preview',
		previewProduct: previewProducts[ 0 ],
	},
} as const;
