export async function clearAndFillInput( selector, text ) {
	await page.evaluate(
		( _selector ) => ( document.querySelector( _selector ).value = '' ),
		selector,
		text
	);
	await page.focus( selector );
	await page.keyboard.type( text );
}
