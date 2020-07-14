export async function clearAndFillInput( selector, text ) {
	await page.evaluate(
		( _selector, _text ) =>
			( document.querySelector( _selector ).value = _text ),
		selector,
		text
	);
}
