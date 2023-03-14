/* eslint-disable jest/no-conditional-expect */
/**
 * External dependencies
 */
import { URL } from 'url';
import {
	canvas,
	deleteAllTemplates,
	getCurrentSiteEditorContent,
	insertBlock,
} from '@wordpress/e2e-test-utils';
import {
	getNormalPagePermalink,
	visitPostOfType,
} from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import {
	BASE_URL,
	DEFAULT_TIMEOUT,
	filterCurrentBlocks,
	getAllTemplates,
	goToTemplateEditor,
	goToTemplatesList,
	saveTemplate,
	useTheme,
} from '../../../utils';

export async function visitTemplateAndAddCustomParagraph(
	templateSlug,
	customText = CUSTOMIZED_STRING
) {
	await goToTemplateEditor( {
		postId: `woocommerce/woocommerce//${ templateSlug }`,
	} );

	await insertBlock( 'Paragraph' );
	await page.keyboard.type( customText );
	await saveTemplate();
}

function blockSelector( id ) {
	return `[data-type="${ id }"]`;
}

export function defaultTemplateProps( templateTitle ) {
	return {
		templateTitle,
		addedBy: WOOCOMMERCE_ID,
		hasActions: false,
	};
}

export function classicBlockSelector( title ) {
	return `${ blockSelector(
		'woocommerce/legacy-template'
	) }[data-title="${ title }"]`;
}

export const BLOCK_DATA = {
	'archive-product': {
		attributes: {
			placeholder: 'archive-product',
			template: 'archive-product',
			title: 'WooCommerce Product Grid Block',
		},
		name: 'woocommerce/legacy-template',
	},
	'single-product': {
		attributes: {
			placeholder: 'single-product',
			template: 'single-product',
			title: 'WooCommerce Single Product Block',
		},
		name: 'woocommerce/legacy-template',
	},
	'taxonomy-product_cat': {
		attributes: {
			placeholder: 'archive-product',
			template: 'taxonomy-product_cat',
			title: 'WooCommerce Product Taxonomy Block',
		},
		name: 'woocommerce/legacy-template',
	},
	'taxonomy-product_tag': {
		attributes: {
			placeholder: 'archive-product',
			template: 'taxonomy-product_tag',
			title: 'WooCommerce Product Tag Block',
		},
		name: 'woocommerce/legacy-template',
	},
	'taxonomy-product_attribute': {
		attributes: {
			placeholder: 'archive-product',
			template: 'taxonomy-product_attribute',
			title: 'WooCommerce Product Attribute Block',
		},
		name: 'woocommerce/legacy-template',
	},
	'product-search-results': {
		attributes: {
			title: 'WooCommerce Product Search Results Block',
			template: 'product-search-results',
			placeholder: 'archive-product',
		},
		name: 'woocommerce/legacy-template',
	},
};

export const SELECTORS = {
	blocks: {
		paragraph: blockSelector( 'core/paragraph' ),
		productArchive: classicBlockSelector(
			'WooCommerce Product Grid Block'
		),
		singleProduct: classicBlockSelector(
			'WooCommerce Single Product Block'
		),
	},
	templates: {
		templateActions:
			'[aria-label="Templates list - Content"] [aria-label="Actions"]',
	},
};

export const CUSTOMIZED_STRING = 'My awesome customization';
export const WOOCOMMERCE_ID = 'woocommerce/woocommerce';
export const WOOCOMMERCE_PARSED_ID = 'WooCommerce';
