/**
 * Internal dependencies
 */
import { selectBlockByName } from './select-block-by-name';

/**
 * Inserts an inner block into the currently selected block. If a parent block
 * is provided, it will be selected before inserting the inner block.
 *
 * @param  blockTitle      Block title, such as "Add to Cart Button".
 * @param  parentBlockName Parent block name, such as core/group.
 */
export const insertInnerBlock = async (
	blockTitle: string,
	parentBlockName = ''
) => {
	if ( parentBlockName ) {
		await selectBlockByName( parentBlockName );
	}
	const blockInserterButton = await page.waitForSelector(
		'.block-editor-inserter button'
	);
	await blockInserterButton.click();
	const blockInsertInput = await page.waitForSelector(
		'.block-editor-inserter__quick-inserter.has-search.has-expand .components-search-control__input'
	);
	await blockInsertInput.focus();
	await page.keyboard.type( blockTitle );
	const insertButton = await page.waitForXPath(
		`//button//span[contains(text(), '${ blockTitle }')]`
	);
	await insertButton.click();
};
