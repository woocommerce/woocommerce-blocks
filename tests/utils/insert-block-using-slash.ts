/**
 * External dependencies
 */
import { canvas, insertBlock } from '@wordpress/e2e-test-utils';
import { selectBlockByName } from '@woocommerce/blocks-test-utils';

/**
 * Internal dependencies
 */
import SELECTORS from './selectors';

export const insertBlockUsingSlash = async ( blockTitle: string ) => {
	await insertBlock( 'Paragraph' );
	await selectBlockByName( 'core/paragraph' );
	await canvas().keyboard.type( `/${ blockTitle }` );
	await canvas().waitForSelector( SELECTORS.popover );
	await canvas().keyboard.press( 'Enter' );
};
