/**
 * External dependencies
 */
import { select } from '@wordpress/data';
import {
	BlockEditProps,
	createBlock,
	// @ts-expect-error Missing types in Gutenberg
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { ProductCollectionAttributes, ProductCollectionQuery } from './types';
import { DEFAULT_ATTRIBUTES, INNER_BLOCKS_TEMPLATE } from './constants';
import blockJson from './block.json';

/**
 * Sets the new query arguments of a Product Query block
 *
 * Shorthand for setting new nested query parameters.
 */
export function setQueryAttribute(
	block: BlockEditProps< ProductCollectionAttributes >,
	queryParams: Partial< ProductCollectionQuery >
) {
	const { query } = block.attributes;

	block.setAttributes( {
		query: {
			...query,
			...queryParams,
		},
	} );
}

export function getDefaultValueOfInheritQueryFromTemplate(): boolean {
	const ARCHIVE_PRODUCT_TEMPLATES = [
		'woocommerce/woocommerce//archive-product',
		'woocommerce/woocommerce//taxonomy-product_cat',
		'woocommerce/woocommerce//taxonomy-product_tag',
		'woocommerce/woocommerce//taxonomy-product_attribute',
		'woocommerce/woocommerce//product-search-results',
	];

	const editSiteStore = select( 'core/edit-site' );
	const currentTemplateId = editSiteStore?.getEditedPostId() as string;

	/**
	 * Set inherit value when Product Collection block is first added to the page.
	 * We want inherit value to be true when block is added to ARCHIVE_PRODUCT_TEMPLATES
	 * and false when added to somewhere else.
	 */
	const initialValue = currentTemplateId
		? ARCHIVE_PRODUCT_TEMPLATES.includes( currentTemplateId )
		: false;

	return initialValue;
}

export const getDefaultProductCollection = () =>
	createBlock(
		blockJson.name,
		{
			...DEFAULT_ATTRIBUTES,
			query: {
				...DEFAULT_ATTRIBUTES.query,
				inherit: getDefaultValueOfInheritQueryFromTemplate(),
			},
		},
		createBlocksFromInnerBlocksTemplate( INNER_BLOCKS_TEMPLATE )
	);
