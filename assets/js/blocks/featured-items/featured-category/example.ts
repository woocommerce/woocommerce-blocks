/**
 * External dependencies
 */
import type { Block } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { previewCategories } from '~/resource-previews';

type ExampleBlock = Block[ 'example' ] & {
	attributes: {
		categoryId: 'preview' | number;
		previewCategory: typeof previewCategories[ number ];
		editMode: false;
	};
};

export const example: ExampleBlock = {
	attributes: {
		categoryId: 'preview',
		previewCategory: previewCategories[ 0 ],
		editMode: false,
	},
} as const;
