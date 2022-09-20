/**
 * External dependencies
 */
import { hydrate, render } from 'preact';

/**
 * Internal dependencies
 */
import { toVdom } from './vdom';

// Remove domain and hash from the URL. We are only interesting in the path and
// the query.
export const cleanUrl = ( url ) => {
	const u = new URL( url, 'http://a.bc' );
	return u.pathname + u.search;
};

// Helper to await until the CPU is idle.
export const idle = () =>
	new Promise( ( resolve ) => window.requestIdleCallback( resolve ) );

// Get the id class from a Product Query element.
const getQueryId = ( query ) =>
	Array.from( query.classList.values() ).find( ( className ) =>
		className.startsWith( 'query-id-' )
	);

// Root fragments where we will render the Product Query blocks.
const rootFragments = new Map();

// Create root fragments for each Product Query block.
export const createRootFragments = () => {
	document.querySelectorAll( '.woo-product-query' ).forEach( ( query ) => {
		rootFragments.set(
			getQueryId( query ),
			createRootFragment( query.parentElement, query )
		);
	} );
};

// Fetch a URL and return the HTML string.
const fetchUrl = async ( url ) => {
	return await window.fetch( url ).then( ( res ) => res.text() );
};

// Parse a DOM from an HTML string.
const parseDom = ( html ) => {
	return new window.DOMParser().parseFromString( html, 'text/html' );
};

// Fetch a page and return the virtual DOM of each Product Query block.
export const fetchPage = async ( url ) => {
	const html = await fetchUrl( url );
	const dom = parseDom( html );
	return toVdoms( dom );
};

// Build a virtual DOM for each Product Query block found in a document.
export const toVdoms = ( dom ) => {
	const vdoms = new Map();
	dom.querySelectorAll( '.woo-product-query' ).forEach( ( query ) => {
		vdoms.set( getQueryId( query ), toVdom( query ) );
	} );
	return vdoms;
};

// Render the virtual DOM of each Product Query block.
export const renderVdoms = ( vdoms, initial = false ) => {
	const r = initial ? hydrate : render;
	vdoms.forEach( ( vdom, id ) => {
		r( vdom, rootFragments.get( id ) );
	} );
};

// We use this for wrapperless hydration.
// See https://gist.github.com/developit/f4c67a2ede71dc2fab7f357f39cff28c
const createRootFragment = ( parent, replaceNode ) => {
	replaceNode = [].concat( replaceNode );
	const s = replaceNode[ replaceNode.length - 1 ].nextSibling;
	function insert( c, r ) {
		parent.insertBefore( c, r || s );
	}
	return ( parent.__k = {
		nodeType: 1,
		parentNode: parent,
		firstChild: replaceNode[ 0 ],
		childNodes: replaceNode,
		insertBefore: insert,
		appendChild: insert,
		removeChild( c ) {
			parent.removeChild( c );
		},
	} );
};
