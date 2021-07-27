interface lazyLoadScriptParams {
	handle: string;
	src: string;
	version?: string;
	after?: string;
	before?: string;
	translations?: string;
}

const lazyLoadScript = ( {
	handle,
	src,
	version,
	after,
	before,
	translations,
}: lazyLoadScriptParams ): Promise< void > => {
	return new Promise( ( resolve, reject ) => {
		// Translations
		if ( translations ) {
			const handleTranslationsElements = document.querySelectorAll(
				`#${ handle }-js-before`
			);
			if ( handleTranslationsElements.length === 0 ) {
				const handleTranslations = document.createElement( 'script' );
				handleTranslations.innerHTML = translations;
				handleTranslations.id = `${ handle }-js-translations`;
				document.body.appendChild( handleTranslations );
			}
		}
		// Before
		if ( before ) {
			const handleBeforeScriptElements = document.querySelectorAll(
				`#${ handle }-js-before`
			);
			if ( handleBeforeScriptElements.length === 0 ) {
				const handleBeforeScript = document.createElement( 'script' );
				handleBeforeScript.innerHTML = before;
				handleBeforeScript.id = `${ handle }-js-before`;
				document.body.appendChild( handleBeforeScript );
			}
		}

		// Script
		const handleScriptElements = document.querySelectorAll(
			`#${ handle }-js`
		);
		if ( handleScriptElements.length > 0 ) {
			resolve();
		} else {
			const handleScript = document.createElement( 'script' );
			handleScript.src = version ? `${ src }?${ version }` : src;
			handleScript.id = `${ handle }-js`;
			handleScript.onerror = reject;
			handleScript.onload = () => {
				// After
				if ( after ) {
					const handleAfterScriptElements = document.querySelectorAll(
						`#${ handle }-js-after`
					);
					if ( handleAfterScriptElements.length === 0 ) {
						const handleAfterScript = document.createElement(
							'script'
						);
						handleAfterScript.innerHTML = after;
						handleAfterScript.id = `${ handle }-js-after`;
						document.body.appendChild( handleAfterScript );
					}
				}
				resolve();
			};
			document.body.appendChild( handleScript );
		}
	} );
};

export default lazyLoadScript;
