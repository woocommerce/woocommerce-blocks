/**
 * External dependencies
 */
import type { BlockConfiguration } from '@wordpress/blocks';
import { registerBlockSingleProductTemplate } from '@woocommerce/atomic-utils';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import sharedConfig from '../shared/config';
import edit from './edit';
import { BLOCK_ICON as icon } from './constants';
import metadata from './block.json';
import { supports } from './support';

const blockAttributes = {
	productId: {
		type: 'number',
		default: 0,
	},
	isDescendentOfQueryLoop: {
		type: 'boolean',
		default: false,
	},
	textAlign: {
		type: 'string',
		default: '',
	},
	isDescendentOfSingleProductBlock: {
		type: 'boolean',
		default: false,
	},
	isDescendentOfSingleProductTemplate: {
		type: 'boolean',
		default: false,
	},
};

const blockConfig: BlockConfiguration = {
	...sharedConfig,
	ancestor: [
		'woocommerce/all-products',
		'woocommerce/single-product',
		'core/post-template',
		'woocommerce/product-template',
	],
	icon: { src: icon },
	deprecated: [
		{
			attributes: blockAttributes,
			supports,
			migrate( attributes, innerBlocks ) {
				const { style, ...newAttributes } = attributes;
				return [
					attributes,
					[
						createBlock(
							'core/group',
							{
								layout: { type: 'flex', flexWrap: 'nowrap' },
								style: { spacing: { blockGap: '10px' } },
							},
							[
								createBlock(
									'woocommerce/product-rating-stars',
									{
										...newAttributes,
									}
								),
								createBlock(
									'woocommerce/product-rating-counter',
									{
										...newAttributes,
									}
								),
							]
						),
						...innerBlocks,
					],
				];
			},
			save() {
				return null;
			},
		},
	],
	supports,
	edit,
	save: () => {
		const blockProps = useBlockProps.save();

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

registerBlockSingleProductTemplate( {
	blockName: 'woocommerce/product-rating',
	blockMetadata: metadata,
	blockSettings: blockConfig,
	isAvailableOnPostEditor: true,
} );
