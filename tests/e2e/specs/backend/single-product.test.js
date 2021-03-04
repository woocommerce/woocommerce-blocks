/**
 * External dependencies
 */
import {
	insertBlock,
	getAllBlocks,
	switchUserToAdmin,
} from '@wordpress/e2e-test-utils';

import { visitBlockPage } from '@woocommerce/blocks-test-utils';
/**
 * Due to an issue with the Popover component not being scrollable
 * under certain conditions, Pupeteer cannot "see" the "Remove Block"
 * button. This is a workaround until that issue is resolved.
 *
 * see: https://github.com/WordPress/gutenberg/pull/14908#discussion_r284725956
 */
const clickOnBlockSettingsMenuRemoveBlockButton = async () => {
	await clickBlockToolbarButton( 'Options' );

	let isRemoveButton = false;

	let numButtons = await page.$$eval(
		'.block-editor-block-settings-menu__content button',
		( btns ) => btns.length
	);

	// Limit by the number of buttons available
	while ( --numButtons ) {
		await page.keyboard.press( 'Tab' );

		isRemoveButton = await page.evaluate( () => {
			return document.activeElement.innerText.includes( 'Remove block' );
		} );

		// Stop looping once we find the button
		if ( isRemoveButton ) {
			await pressKeyTimes( 'Enter', 1 );
			break;
		}
	}

	// Makes failures more explicit
	await expect( isRemoveButton ).toBe( true );
};
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE < 3 )
	// eslint-disable-next-line jest/no-focused-tests
	test.only( 'skipping all other things', () => {} );

const block = {
	name: 'Single Product',
	slug: 'woocommerce/single-product',
	class: '.wc-block-single-product',
};

describe( `${ block.name } Block`, () => {
	beforeAll( async () => {
		await switchUserToAdmin();
		await visitBlockPage( `${ block.name } Block` );
	} );

	it( 'can be inserted more than once', async () => {
		await insertBlock( block.name );
		expect( await getAllBlocks() ).toHaveLength( 2 );
		await clickOnBlockSettingsMenuRemoveBlockButton();
		expect( await getAllBlocks() ).toHaveLength( 1 );
	} );

	it( 'renders without crashing', async () => {
		await expect( page ).toRenderBlock( block );
	} );
} );
