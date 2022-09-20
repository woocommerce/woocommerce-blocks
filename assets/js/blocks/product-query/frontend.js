/**
 * External dependencies
 */
import { options } from 'preact';
import { useEffect } from 'preact/hooks';

/**
 * Internal dependencies
 */
import { prefetch, navigate, directive } from './full-vdom';

// The `wp-client-navigation` directive.
directive( 'clientNavigation', ( props ) => {
	const {
		wp: { clientNavigation },
		href,
	} = props;
	const url = href.startsWith( '/' ) ? href : window.location.pathname + href;

	useEffect( () => {
		// Prefetch the page if it is in the directive options.
		if ( clientNavigation?.prefetch ) {
			prefetch( url );
		}
	}, [ url ] );

	// Don't do anything if it's falsy.
	if ( clientNavigation !== false ) {
		props.onclick = async ( event ) => {
			// Stop server-side navigation.
			event.preventDefault();
			// Start client-side navigation.
			await navigate( url, { scroll: clientNavigation?.scroll } );
		};
	}
} );

// Manually add the `wp-client-navigation` directive to the virtual nodes.
// TODO: Move this to the HTML once WP_HTML_Walker is available.
const clientNavigationClassNames = [
	'wp-block-query-pagination-next',
	'wp-block-query-pagination-previous',
	'page-numbers',
];
const old = options.vnode;
options.vnode = ( vnode ) => {
	if ( vnode.type === 'a' ) {
		clientNavigationClassNames.forEach( ( className ) => {
			if ( vnode.props.class?.includes( className ) ) {
				vnode.props.wp = {
					clientNavigation: {
						prefetch:
							className === 'page-numbers' ? false : 'eager',
						scroll: false,
					},
				};
			}
		} );
	}
	if ( old ) old( vnode );
};
