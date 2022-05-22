/**
 * External dependencies
 */
import { previewCategories } from '@woocommerce/resource-previews';
import { Block } from '@wordpress/blocks';

export const example: Block[ 'example' ] = {
	attributes: {
		categoryId: 'preview',
		previewCategory: previewCategories[ 0 ],
	},
} as const;
