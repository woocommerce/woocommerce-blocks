/**
 * Internal dependencies
 */
import {
	createRootFragments,
	cleanUrl,
	fetchPage,
	toVdoms,
	renderVdoms,
} from './router-helpers';

// The cache of all the visited or prefetched pages.
const pages = new Map();

// Prefetch a page. We store the promise to avoid triggering a second fetch for
// a page if a fetching has already started.
export const prefetch = ( url ) => {
	url = cleanUrl( url );
	if ( ! pages.has( url ) ) {
		pages.set( url, fetchPage( url ) );
	}
};

// Navigate to a new page.
export const navigate = async ( href, { scroll } = { scroll: false } ) => {
	const url = cleanUrl( href ); // Remove hash.

	// Get the new page and render each Product Query block.
	prefetch( url );
	const vdoms = await pages.get( url );
	renderVdoms( vdoms );

	// Change the history.
	window.history.pushState( {}, '', href );

	// Update the scroll, depending on the option. True by default.
	if ( scroll === 'smooth' ) {
		window.scrollTo( { top: 0, left: 0, behavior: 'smooth' } );
	} else if ( scroll !== false ) {
		window.scrollTo( 0, 0 );
	}
};

// Listen to the back and forward buttons and restore the page if it's in
// the cache. If not, refresh the page.
window.addEventListener( 'popstate', async () => {
	const previousUrl = cleanUrl( window.location ); // Remove hash.
	if ( pages.has( previousUrl ) ) {
		const vdoms = await pages.get( previousUrl );
		renderVdoms( vdoms );
	} else {
		window.location.reload();
	}
} );

// Initialize the router.
document.addEventListener( 'DOMContentLoaded', async () => {
	// Create root fragments for each Product Query block.
	createRootFragments();

	// Get the virtual DOM of each Product Query block and store them in the
	// cache.
	const vdoms = toVdoms( document.body );
	pages.set( cleanUrl( window.location ), Promise.resolve( vdoms ) );

	// Render the virtual DOM of each Product Query block.
	renderVdoms( vdoms, true );
} );
