import { canvas, deleteAllTemplates } from '@wordpress/e2e-test-utils';
import {
	BASE_URL,
	DEFAULT_TIMEOUT,
	getAllTemplates,
	goToTemplateEditor,
	goToTemplatesList,
	SELECTORS,
	useTheme,
	visitTemplateAndAddCustomParagraph,
} from '../../utils';

function defaultTemplateProps( templateTitle ) {
	return {
		templateTitle,
		addedBy: THEME_ID,
		hasActions: false,
	};
}

async function visitTemplateAndEditFirstParagraphBlock(
	templateSlug,
	newText
) {
	await goToTemplateEditor( {
		postId: `${ THEME_ID }//${ templateSlug }`,
	} );

	const BLOCK_SELECTOR = SELECTORS.blocks.byType( 'core/paragraph' );

	await page.waitForSelector( BLOCK_SELECTOR, DEFAULT_TIMEOUT );
	await page.$eval( BLOCK_SELECTOR, ( $el ) => ( $el.innerHTML = '' ) );
	await page.type( BLOCK_SELECTOR, newText );
	await saveTemplate();
}

const THEME_PARSED_ID = 'Theme with Woo Templates';
const THEME_ID = 'theme-with-woo-templates';

describe( 'Store Editing template fallbacks', () => {
	useTheme( THEME_ID );

	beforeAll( async () => {
		await deleteAllTemplates( 'wp_template' );
		await deleteAllTemplates( 'wp_template_part' );
	} );

	it( 'should use theme-provided `archive-product` template for missing category template', async () => {
		const EXPECTED_TEMPLATE = defaultTemplateProps(
			'Products by Category'
		);

		await goToTemplatesList();

		const templates = await getAllTemplates();

		try {
			expect( templates ).toContainEqual( EXPECTED_TEMPLATE );
		} catch ( ok ) {
			expect( templates ).toContainEqual( {
				...EXPECTED_TEMPLATE,
				addedBy: THEME_PARSED_ID,
			} );
		}
	} );

	it( 'should use the same edits applied to the `archive-product` to the eligible templates', async () => {
		const CUSTOMIZED_STRING = 'My awesome customization';

		await visitTemplateAndAddCustomParagraph( 'archive-product', {
			prefix: THEME_ID,
		} );

		await page.goto(
			new URL( '/product-category/uncategorized', BASE_URL )
		);

		await expect( page ).toMatchElement( 'p', {
			text: CUSTOMIZED_STRING,
			timeout: DEFAULT_TIMEOUT,
		} );
	} );

	it( 'should not use the edits on the `archive-product` for an eligible template if the theme provides it', async () => {
		const CUSTOMIZED_STRING = 'My awesome customization';

		await page.goto( new URL( '/product-tag/newest', BASE_URL ) );

		await expect( page ).not.toMatchElement( 'p', {
			text: CUSTOMIZED_STRING,
			timeout: DEFAULT_TIMEOUT,
		} );
	} );

	it.only( 'should use the edits applied specifically to the “cloned” category template over the ones to `archive-product`', async () => {
		const CUSTOMIZED_STRING = 'My custom product category template';
		// Note: `taxonomy-product_cat` is not provided by `theme-with-woo-templates` (or should not be).
		// Instead, it is cloned at runtime and appears to the user as it is there, unless something overrides
		// it in the hierarchy. As such, it is editable on its own.
		await visitTemplateAndEditFirstParagraphBlock(
			'taxonomy-product_cat',
			CUSTOMIZED_STRING
		);

		await page.goto(
			new URL( '/product-category/uncategorized', BASE_URL )
		);

		await expect( page ).toMatchElement( 'p', {
			text: CUSTOMIZED_STRING,
			timeout: DEFAULT_TIMEOUT,
		} );
	} );

	it.todo(
		'should use the original edits on `archive-product` even when a connected child template was modified'
	);

	it.todo(
		'should correctly clear all customizations from “cloned” templates as well'
	);
} );
