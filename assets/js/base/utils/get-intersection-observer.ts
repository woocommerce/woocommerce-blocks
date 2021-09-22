/** @typedef {import('window').IntersectionObserverCallback} IntersectionObserverCallback */
/**
 * Util that returns an IntersectionObserver.
 *
 * The shim was removed in favor of dropping support in WordPress 5.8
 * and WooCommerce in parallel.
 *
 * @see https://developer.woocommerce.com/2021/05/24/developer-advisory-plan-to-remove-ie-11-support-in-woocommerce/
 *
 * @param {IntersectionObserver} callback Callback function for the Intersection Observer.
 * @param {Object}               options  Intersection Observer options
 * @return {IntersectionObserver} Intersection Observer.
 */
export const getIntersectionObserver = (
	callback: IntersectionObserverCallback,
	options: Record< string, unknown >
): IntersectionObserver => {
	return new IntersectionObserver( callback, options );
};
