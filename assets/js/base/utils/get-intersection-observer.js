/**
 * Util that returns an IntersectionObserver if supported by the browser. If
 * it's not supported, it returns a shim object with the methods to prevent JS
 * errors. Notice it's a shim, not a polyfill. If the browser doesn't support
 * IntersectionObserver, the methods returned by this function will do nothing.
 *
 * @param {IntersectionObserverCallback} callback Callback function for the
 *                                                Intersection Observer.
 * @param {object}                       options  Intersection Observer options.
 * @return {object|IntersectionObserver} Intersection Observer if available,
 *                                       otherwise a shim object.
 */
export const getIntersectionObserver = ( callback, options ) => {
	if ( typeof IntersectionObserver !== 'function' ) {
		return {
			observe: () => void null,
			unobserve: () => void null,
		};
	}

	return new IntersectionObserver( callback, options );
};
