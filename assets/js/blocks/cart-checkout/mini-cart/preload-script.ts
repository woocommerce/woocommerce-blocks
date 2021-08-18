interface preloadScriptParams {
	handle: string;
	src: string;
	version?: string;
}

const preloadScript = ( {
	handle,
	src,
	version,
}: preloadScriptParams ): void => {
	const handleScriptElements = document.querySelectorAll(
		`#${ handle }-js, #${ handle }-js-prefetch`
	);

	if ( handleScriptElements.length === 0 ) {
		const prefetchLink = document.createElement( 'link' );
		prefetchLink.href = version ? `${ src }?${ version }` : src;
		prefetchLink.rel = 'preload';
		prefetchLink.as = 'script';
		prefetchLink.id = `${ handle }-js-prefetch`;
		document.head.appendChild( prefetchLink );
	}
};

export default preloadScript;
