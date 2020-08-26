export async function findElementWithText( selector, pattern ) {
	const elements = await page.$$( selector );
	for ( let i = 0; i < elements.length; i++ ) {
		if (
			await elements[ i ].evaluate( ( tag, _pattern ) => {
				const regex = new RegExp( _pattern );
				return regex.test( tag.textContent );
			}, pattern )
		) {
			return elements[ i ];
		}
	}
}
