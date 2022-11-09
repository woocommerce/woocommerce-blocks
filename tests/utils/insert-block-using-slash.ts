/**
 * External dependencies
 */
import { canvas, insertBlock } from '@wordpress/e2e-test-utils';

export const insertBlockUsingSlash = async ( blockTitle: string ) => {
	await insertBlock( 'Paragraph' );
	await canvas().type( `/${ blockTitle }` );
	await canvas().keyboard.press( 'Enter' );
};
