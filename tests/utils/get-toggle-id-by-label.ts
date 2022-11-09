/**
 * Get the ID of the setting toogle so test can manipulate the toggle using
 * unsetCheckbox and setCheckbox utilities.
 *
 * We're using 'adaptive timeout' here as the id of the toggle is changed on
 * every render, so we wait a bit for the toggle to finish rerendering, then
 * check if the node still attached to the document before returning its
 * ID. If the node is detached, it means that the toggle is rendered, then
 * we retry by calling this funtion again with increased retry argument. We
 * will retry maximum 5 times before returning whatever ID we get.
 */
export const getToggleIdByLabel = async (
	label: string,
	retry = 0
): Promise< string > => {
	const labelElement = await page.waitForXPath(
		`//label[contains(text(), "${ label }") and contains(@class, "components-toggle-control__label")]`,
		{ visible: true }
	);
	const checkboxId = await page.evaluate(
		( toggleLabel ) => `#${ toggleLabel.getAttribute( 'for' ) }`,
		labelElement
	);
	// Wait a bit for toggle to finish rerendering.
	await page.waitForTimeout( 1000 );
	const checkbox = await page.$( checkboxId );
	if ( ! checkbox && retry < 5 ) {
		return await getToggleIdByLabel( label, retry + 1 );
	}
	return checkboxId;
};
