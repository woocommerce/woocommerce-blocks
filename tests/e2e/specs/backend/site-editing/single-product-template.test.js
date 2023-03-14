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

import {
	BLOCK_DATA,
	CUSTOMIZED_STRING,
	defaultTemplateProps,
	SELECTORS,
	visitTemplateAndAddCustomParagraph,
	WOOCOMMERCE_PARSED_ID,
} from './utils';

describe( 'Single Product block template', () => {
	useTheme( 'emptytheme' );
	beforeAll( async () => {
		await deleteAllTemplates( 'wp_template' );
		await deleteAllTemplates( 'wp_template_part' );
	} );

	it( 'default template from WooCommerce Blocks is available on an FSE theme', async () => {
		const EXPECTED_TEMPLATE = defaultTemplateProps( 'Single Product' );

		await goToTemplatesList();

		const templates = await getAllTemplates();

		try {
			expect( templates ).toContainEqual( EXPECTED_TEMPLATE );
		} catch ( ok ) {
			// Depending on the speed of the execution and whether Chrome is headless or not
			// the id might be parsed or not

			expect( templates ).toContainEqual( {
				...EXPECTED_TEMPLATE,
				addedBy: WOOCOMMERCE_PARSED_ID,
			} );
		}
	} );

	it( 'should contain the "WooCommerce Single Product Block" classic template', async () => {
		await goToTemplateEditor( {
			postId: 'woocommerce/woocommerce//single-product',
		} );

		const [ classicBlock ] = await filterCurrentBlocks(
			( block ) => block.name === BLOCK_DATA[ 'single-product' ].name
		);

		// Comparing only the `template` property currently
		// because the other properties seem to be slightly unreliable.
		// Investigation pending.
		expect( classicBlock.attributes.template ).toBe(
			BLOCK_DATA[ 'single-product' ].attributes.template
		);
		expect( await getCurrentSiteEditorContent() ).toMatchSnapshot();
	} );

	it( 'should show the action menu if the template has been customized by the user', async () => {
		const EXPECTED_TEMPLATE = {
			...defaultTemplateProps( 'Single Product' ),
			hasActions: true,
		};

		await visitTemplateAndAddCustomParagraph( 'single-product' );

		await goToTemplatesList( { waitFor: 'actions' } );

		const templates = await getAllTemplates();

		try {
			expect( templates ).toContainEqual( EXPECTED_TEMPLATE );
		} catch ( ok ) {
			// Depending on the speed of the execution and whether Chrome is headless or not
			// the id might be parsed or not

			expect( templates ).toContainEqual( {
				...EXPECTED_TEMPLATE,
				addedBy: WOOCOMMERCE_PARSED_ID,
			} );
		}
	} );

	it( 'should preserve and correctly show the user customization on the back-end', async () => {
		await goToTemplateEditor( {
			postId: 'woocommerce/woocommerce//single-product',
		} );

		await expect( canvas() ).toMatchElement( SELECTORS.blocks.paragraph, {
			text: CUSTOMIZED_STRING,
			timeout: DEFAULT_TIMEOUT,
		} );
	} );

	it( 'should show the user customization on the front-end', async () => {
		const exampleProductName = 'Woo Single #1';

		await visitPostOfType( exampleProductName, 'product' );
		const permalink = await getNormalPagePermalink();

		await page.goto( permalink );

		await expect( page ).toMatchElement( 'p', {
			text: CUSTOMIZED_STRING,
			timeout: DEFAULT_TIMEOUT,
		} );
	} );
} );
