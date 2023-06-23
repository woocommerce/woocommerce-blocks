/**
 * External dependencies
 */
import { BlockData } from '@woocommerce/e2e-types';
import { test, expect } from '@woocommerce/e2e-playwright-utils';

/**
 * Internal dependencies
 */
import {
	getProductsNameFromClassicTemplate,
	getProductsNameFromProductQuery,
} from './utils';

const blockData: BlockData = {
	name: 'core/query',
	mainClass: '.wc-block-price-filter',
	selectors: {
		frontend: {},
		editor: {},
	},
};

const templates = {
	'taxonomy-product_attribute': {
		templateTitle: 'Product Attribute',
		slug: 'taxonomy-product_attribute',
		frontendPage: '/product-attribute/color/',
		legacyBlockName: 'woocommerce/legacy-template',
	},
	'taxonomy-product_cat': {
		templateTitle: 'Product Category',
		slug: 'taxonomy-product_cat',
		frontendPage: '/product-category/music/',
		legacyBlockName: 'woocommerce/legacy-template',
	},
	// We don't have products with tags in the test site. Uncomment this when we have products with tags.
	// 'taxonomy-product_tag': {
	// 	templateTitle: 'Product Tag',
	// 	slug: 'taxonomy-product_tag',
	// 	frontendPage: '/product-tag/hoodie/',
	// },
	'archive-product': {
		templateTitle: 'Product Catalog',
		slug: 'archive-product',
		frontendPage: '/shop/',
		legacyBlockName: 'woocommerce/legacy-template',
	},
	'product-search-results': {
		templateTitle: 'Product Search Results',
		slug: 'product-search-results',
		frontendPage: '/?s=shirt&post_type=product',
		legacyBlockName: 'woocommerce/legacy-template',
	},
};

test.describe( `${ blockData.name } Block `, () => {
	test( 'when Inherit Query from template is enabled all the settings that customize the query should be hidden', async ( {
		admin,
		editorUtils,
		editor,
		page,
	} ) => {
		await admin.visitSiteEditor( {
			postId: 'woocommerce/woocommerce//archive-product',
			postType: 'wp_template',
		} );

		await editor.canvas.click( 'body' );

		const block = await editorUtils.getBlockByName( blockData.name );
		await editor.selectBlocks( block );

		await editor.openDocumentSettingsSidebar();

		const advancedFilterOption = await page.getByLabel(
			'Advanced Filters options'
		);
		const inheritQueryFromTemplateOption = await page.getByLabel(
			'Inherit query from template'
		);

		await expect( advancedFilterOption ).not.toBeVisible();
		await expect( inheritQueryFromTemplateOption ).toBeVisible();
	} );
	test( 'when Inherit Query from template is disabled all the settings that customize the query should be visble', async ( {
		admin,
		editorUtils,
		editor,
		page,
	} ) => {
		await admin.visitSiteEditor( {
			postId: 'woocommerce/woocommerce//archive-product',
			postType: 'wp_template',
		} );

		await editor.canvas.click( 'body' );

		const block = await editorUtils.getBlockByName( blockData.name );
		await editor.selectBlocks( block );

		await editor.openDocumentSettingsSidebar();

		const advancedFilterOption = await page.getByLabel(
			'Advanced Filters options'
		);
		const inheritQueryFromTemplateOption = await page.getByLabel(
			'Inherit query from template'
		);

		await inheritQueryFromTemplateOption.click();

		await expect( advancedFilterOption ).toBeVisible();
		await expect( inheritQueryFromTemplateOption ).toBeVisible();
	} );
} );

for ( const {
	templateTitle,
	slug,
	frontendPage,
	legacyBlockName,
} of Object.values( templates ) ) {
	test.describe( `${ templateTitle } template`, () => {
		test.afterAll( async ( { requestUtils } ) => {
			await requestUtils.deleteAllTemplates( 'wp_template' );
			await requestUtils.deleteAllTemplates( 'wp_template_part' );
		} );
		test( 'Products block matches with classic template block', async ( {
			admin,
			editor,
			page,
			editorUtils,
		} ) => {
			await admin.visitSiteEditor( {
				postId: `woocommerce/woocommerce//${ slug }`,
				postType: 'wp_template',
			} );

			await editor.canvas.click( 'body' );
			await editor.canvas.waitForLoadState( 'networkidle' );
			const block = await editorUtils.getBlockByName( blockData.name );
			const clientId = ( await block.getAttribute( 'data-block' ) ) ?? '';
			const parentClientId =
				( await editorUtils.getBlockRootClientId( clientId ) ) ?? '';
			await editor.selectBlocks( block );
			await editorUtils.insertBlock(
				{ name: legacyBlockName },
				undefined,
				parentClientId
			);

			await editor.saveSiteEditorEntities();
			// @todo This is a workaround to wait for the save button to be enabled. It works only without Gutenberg enabled. We have to refactor this.
			await page
				.locator(
					"button.edit-site-save-button__button[aria-label='Save'][aria-disabled='true']"
				)
				.waitFor( {
					state: 'visible',
				} );

			await page.waitForResponse( ( response ) =>
				response.url().includes( 'wp-json/wp/v2/templates/' )
			);

			await page.goto( frontendPage, {
				waitUntil: 'load',
			} );

			const classicProducts = await getProductsNameFromClassicTemplate(
				page
			);
			const productQueryProducts = await getProductsNameFromProductQuery(
				page
			);

			expect( classicProducts ).toEqual( productQueryProducts );
		} );
	} );
}
