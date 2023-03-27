/**
 * External dependencies
 */
import { getQueryArg, getQueryArgs, addQueryArgs } from '@wordpress/url';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isBoolean } from '@woocommerce/types';

const filteringForPhpTemplate = getSettingWithCoercion(
	'is_rendering_php_template',
	false,
	isBoolean
);

export const supportsClientSideNavigation =
	document
		.querySelector( `meta[itemprop='woo-client-side-navigation']` )
		?.getAttribute( 'content' ) === 'active';

/**
 * Returns specified parameter from URL
 *
 * @param {string} name Parameter you want the value of.
 */

export const PREFIX_QUERY_ARG_QUERY_TYPE = 'query_type_';
export const PREFIX_QUERY_ARG_FILTER_TYPE = 'filter_';

export function getUrlParameter( name: string ) {
	if ( ! window ) {
		return null;
	}
	return getQueryArg( window.location.href, name );
}

/**
 * Change the URL and reload the page if filtering for PHP templates.
 *
 * @param {string} newUrl New URL to be set.
 */
export function changeUrl( newUrl: string ) {
	/**
	 * In order not to enqueue the Interactivity runtime if it is disabled, we
	 * cannot import `@woocommerce/interactivity` here. That's why we call
	 * `navigate` from `window.wc.__experimentalInteractivity` directly.
	 */
	if (
		supportsClientSideNavigation &&
		window.wc?.__experimentalInteractivity
	) {
		window.wc.__experimentalInteractivity.navigate( newUrl, {
			replace: true,
		} );
	} else if ( filteringForPhpTemplate ) {
		window.location.href = newUrl;
	} else {
		window.history.replaceState( {}, '', newUrl );
	}
}

/**
 * Run the query params through buildQueryString to normalise the params.
 *
 * @param {string} url URL to encode the search param from.
 */
export const normalizeQueryParams = ( url: string ) => {
	const queryArgs = getQueryArgs( url );
	return addQueryArgs( url, queryArgs );
};
