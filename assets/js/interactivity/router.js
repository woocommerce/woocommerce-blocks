import { hydrate, render } from 'preact';
import { toVdom, hydratedIslands } from './vdom';
import { createRootFragment } from './utils';
import { csnMetaTagItemprop, directivePrefix } from './constants';

// The root to render the vdom (document.body).
let rootFragment;

// The cache of visited and prefetched pages, stylesheets and scripts.
const pages = new Map();
const stylesheets = new Map();
const scripts = new Map();

// Helper to remove domain and hash from the URL. We are only interesting in
// caching the path and the query.
const cleanUrl = ( url ) => {
	const u = new URL( url, window.location );
	return u.pathname + u.search;
};

// Helper to check if a page can do client-side navigation.
export const canDoClientSideNavigation = ( dom ) =>
	dom
		.querySelector( `meta[itemprop='${ csnMetaTagItemprop }']` )
		?.getAttribute( 'content' ) === 'active';

/**
 * Finds the elements in the document that match the selector and fetch them.
 * For each element found, fetch the content and store it in the cache.
 * Returns an array of elements to add to the document.
 *
 * @param {Document}         document
 * @param {string}           selector        - CSS selector used to find the elements.
 * @param {'href'|'src'}     attribute       - Attribute that determines where to fetch
 *                                           the styles or scripts from. Also used as the key for the cache.
 * @param {Map}              cache           - Cache to use for the elements. Can be `stylesheets` or `scripts`.
 * @param {'style'|'script'} elementToCreate - Element to create for each fetched
 *                                           item. Can be 'style' or 'script'.
 * @return {Promise<Array<HTMLElement>>} - Array of elements to add to the document.
 */
const fetchScriptOrStyle = async (
	document,
	selector,
	attribute,
	cache,
	elementToCreate
) => {
	const fetchedItems = await Promise.all(
		[].map.call( document.querySelectorAll( selector ), ( el ) => {
			const attributeValue = el.getAttribute( attribute );
			if ( ! cache.has( attributeValue ) )
				cache.set(
					attributeValue,
					fetch( attributeValue ).then( ( r ) => r.text() )
				);
			return cache.get( attributeValue );
		} )
	);

	return fetchedItems.map( ( item ) => {
		const element = document.createElement( elementToCreate );
		element.textContent = item;
		return element;
	} );
};

// Fetch styles of a new page.
const fetchAssets = async ( document ) => {
	const stylesFromSheets = await fetchScriptOrStyle(
		document,
		'link[rel=stylesheet]',
		'href',
		stylesheets,
		'style'
	);
	const scriptTags = await fetchScriptOrStyle(
		document,
		'script[src]',
		'src',
		scripts,
		'script'
	);
	const moduleScripts = await fetchScriptOrStyle(
		document,
		'script[type=module]',
		'src',
		scripts,
		'script'
	);
	moduleScripts.forEach( ( script ) =>
		script.setAttribute( 'type', 'module' )
	);

	return [
		...scriptTags,
		document.querySelector( 'title' ),
		...document.querySelectorAll( 'style' ),
		...stylesFromSheets,
	];
};

// Fetch a new page and convert it to a static virtual DOM.
const fetchPage = async ( url ) => {
	let dom;
	try {
		const res = await window.fetch( url );
		if ( res.status !== 200 ) return false;
		const html = await res.text();
		dom = new window.DOMParser().parseFromString( html, 'text/html' );
	} catch ( e ) {
		return false;
	}
	const regions = {};
	dom.querySelectorAll( '[data-wc-navigation-id]' ).forEach( ( region ) => {
		const id = region.attributes[ 'data-wc-navigation-id' ];
		regions[ id ] = toVdom( region );
	} );

	return { regions };
};

// Prefetch a page. We store the promise to avoid triggering a second fetch for
// a page if a fetching has already started.
export const prefetch = ( url ) => {
	url = cleanUrl( url );
	if ( ! pages.has( url ) ) {
		pages.set( url, fetchPage( url ) );
	}
};

// Navigate to a new page.
export const navigate = async ( href, { replace = false } = {} ) => {
	const url = cleanUrl( href );
	prefetch( url );
	const page = await pages.get( url );
	if ( page ) {
		document
			.querySelectorAll( '[data-wc-navigation-id]' )
			.forEach( ( region ) => {
				const id = region.attributes[ 'data-wc-navigation-id' ];
				const fragment = createRootFragment(
					region.parentElement,
					region
				);
				render( page.regions[ id ], fragment );
			} );
		window.history[ replace ? 'replaceState' : 'pushState' ](
			{},
			'',
			href
		);
	} else {
		window.location.assign( href );
	}
};

// Listen to the back and forward buttons and restore the page if it's in the
// cache.
window.addEventListener( 'popstate', async () => {
	const url = cleanUrl( window.location ); // Remove hash.
	const page = pages.has( url ) && ( await pages.get( url ) );
	if ( page ) {
		document.head.replaceChildren( ...page.head );
		render( page.body, rootFragment );
	} else {
		window.location.reload();
	}
} );

// Initialize the router with the initial DOM.
export const init = async () => {
	document
		.querySelectorAll( `[data-${ directivePrefix }-interactive]` )
		.forEach( ( node ) => {
			if ( ! hydratedIslands.has( node ) ) {
				const fragment = createRootFragment( node.parentNode, node );
				const vdom = toVdom( node );
				hydrate( vdom, fragment );
			}
		} );

	// Event handler for all links
	let onClick = ( e ) => {
		let link = e.target.closest( 'a' );
		if (
			link &&
			link instanceof HTMLAnchorElement &&
			link.href &&
			( ! link.target || link.target === '_self' ) &&
			link.origin === location.origin &&
			! link.hasAttribute( 'download' ) &&
			e.button === 0 && // left clicks only
			! e.metaKey && // open in new tab (mac)
			! e.ctrlKey && // open in new tab (windows)
			! e.altKey && // download
			! e.shiftKey &&
			! e.defaultPrevented
		) {
			e.preventDefault();
			navigate( link.href );
		}
	};

	document.addEventListener( 'click', onClick );
};
