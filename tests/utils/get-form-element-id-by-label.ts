/**
 * Internal dependencies
 */
import { getPageElement } from './get-page-element';

export const getFormElementIdByLabel = async (
	text: string,
	className: string
) => {
	const pageEl = getPageElement();
	const labelElement = await pageEl.waitForXPath(
		`//label[contains(text(), "${ text }") and contains(@class, "${ className }")]`,
		{ visible: true }
	);
	return await pageEl.evaluate(
		( label ) => `#${ label.getAttribute( 'for' ) }`,
		labelElement
	);
};
