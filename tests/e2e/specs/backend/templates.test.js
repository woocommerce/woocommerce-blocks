import {
	activateTheme,
	canvas,
	getCurrentSiteEditorContent,
	insertBlock,
	trashAllPosts,
} from '@wordpress/e2e-test-utils';
import { addQueryArgs } from '@wordpress/url';
import {
	getNormalPagePermalink,
	visitPostOfType,
} from '@woocommerce/blocks-test-utils';
import {
	DEFAULT_TIMEOUT,
	elementExists,
	getTextContent,
	goToSiteEditor,
	saveTemplate,
	waitForCanvas,
} from '../../utils';

function blockSelector( id ) {
	return `[data-type="${ id }"]`;
}

function defaultTemplateProps( templateTitle ) {
	return {
		templateTitle,
		addedBy: WOOCOMMERCE_ID,
		hasActions: false,
	};
}

function legacyBlockSelector( title ) {
	return `${ blockSelector(
		'woocommerce/legacy-template'
	) }[data-title="${ title }"]`;
}

const SELECTORS = {
	blocks: {
		paragraph: blockSelector( 'core/paragraph' ),
		singleProduct: legacyBlockSelector(
			'WooCommerce Single Product Block'
		),
	},
	templatesListTable: {
		actionsContainer: '.edit-site-list-table__actions',
		cells: '.edit-site-list-table-column',
		headings: 'thead th.edit-site-list-table-column',
		root: '.edit-site-list-table',
		rows: '.edit-site-list-table-row',
		templateTitle: '[data-wp-component="Heading"]',
	},
};

const CUSTOMIZED_STRING = 'My awesome customization';
const WOOCOMMERCE_ID = 'woocommerce/woocommerce';
const WOOCOMMERCE_PARSED_ID = 'WooCommerce';

async function getAllTemplates() {
	const { templatesListTable } = SELECTORS;

	const table = await page.$( templatesListTable.root );

	if ( ! table ) throw new Error( 'Templates table not found' );

	const rows = await table.$$( templatesListTable.rows );

	return Promise.all(
		rows.map( async ( row ) => ( {
			addedBy: (
				await getTextContent( templatesListTable.cells, row )
			 )[ 1 ],
			hasActions: await elementExists(
				templatesListTable.actionsContainer,
				row
			),
			templateTitle: (
				await getTextContent( templatesListTable.templateTitle, row )
			 )[ 0 ],
		} ) )
	);
}

describe( 'Store Editing Templates', () => {
	beforeAll( async () => {
		await activateTheme( 'emptytheme' );
		await trashAllPosts( 'wp_template' );
		await trashAllPosts( 'wp_template_part' );
	} );

	afterAll( async () => {
		await activateTheme( 'twentytwentyone' );
	} );

	describe( 'Single Product block template', () => {
		it( 'default template from WooCommerce Blocks is available on an FSE theme', async () => {
			const EXPECTED_TEMPLATE = defaultTemplateProps( 'Single Product' );

			await goToSiteEditor( 'postType=wp_template' );
			await page.waitForSelector( SELECTORS.templatesListTable.root );

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

		it( 'should contain the "WooCommerce Single Product Block" legacy template', async () => {
			const templateQuery = addQueryArgs( '', {
				postId: 'woocommerce/woocommerce//single-product',
				postType: 'wp_template',
			} );

			await goToSiteEditor( templateQuery );
			await waitForCanvas();

			const cvs = canvas();
			console.log( '??', cvs === page );

			await expect( canvas() ).toMatchElement(
				SELECTORS.blocks.singleProduct,
				{ timeout: DEFAULT_TIMEOUT }
			);
			expect( await getCurrentSiteEditorContent() ).toMatchSnapshot();
		} );

		it( 'should show the action menu if the template has been customized by the user', async () => {
			const EXPECTED_TEMPLATE = {
				...defaultTemplateProps( 'Single Product' ),
				hasActions: true,
			};

			const templateQuery = addQueryArgs( '', {
				postId: 'woocommerce/woocommerce//single-product',
				postType: 'wp_template',
			} );

			await goToSiteEditor( templateQuery );
			await waitForCanvas();
			await insertBlock( 'Paragraph' );
			await page.keyboard.type( CUSTOMIZED_STRING );
			await saveTemplate();

			await goToSiteEditor( 'postType=wp_template' );
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
			const templateQuery = addQueryArgs( '', {
				postId: 'woocommerce/woocommerce//single-product',
				postType: 'wp_template',
			} );

			await goToSiteEditor( templateQuery );
			await waitForCanvas();

			await expect( canvas() ).toMatchElement(
				SELECTORS.blocks.paragraph,
				{ text: CUSTOMIZED_STRING, timeout: DEFAULT_TIMEOUT }
			);
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
} );
