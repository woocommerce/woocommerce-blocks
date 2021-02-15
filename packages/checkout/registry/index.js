/**
 * External dependencies
 */
import { useMemo, useCallback, useRef } from '@wordpress/element';
import { CURRENT_USER_IS_ADMIN } from '@woocommerce/block-settings';
import { isShallowEqualObjects } from '@wordpress/is-shallow-equal';
let checkoutFilters = {};

/**
 * Register filters for a specific extension.
 *
 * @param {string} namespace Name of the extension namespace.
 * @param {Object} filters   Object of filters for that namespace. Each key of
 *                           the object is the name of a filter.
 */
export const __experimentalRegisterCheckoutFilters = ( namespace, filters ) => {
	checkoutFilters = {
		...checkoutFilters,
		[ namespace ]: filters,
	};
};

/**
 * Get all filters with a specific name.
 *
 * @param {string} filterName   Name of the filter to search for.
 * @return {Function[]} Array of functions that are registered for that filter
 *                      name.
 */
const getCheckoutFilters = ( filterName ) => {
	const namespaces = Object.keys( checkoutFilters );
	const filters = namespaces
		.map( ( namespace ) => checkoutFilters[ namespace ][ filterName ] )
		.filter( Boolean );
	return filters;
};

/**
 * Apply a filter.
 *
 * @param {Object} o                Object of arguments.
 * @param {string} o.filterName     Name of the filter to apply.
 * @param {any}    o.defaultValue   Default value to filter.
 * @param {Object} [o.extensions]   Values extend to REST API response.
 * @param {any}    [o.arg]          Argument to pass to registered functions.
 *                                  If several arguments need to be passed, use
 *                                  an object.
 * @param {Function} [o.validation] Function that needs to return true when
 *                                  the filtered value is passed in order for
 *                                  the filter to be applied.
 * @return {any} Filtered value.
 */
export const __experimentalApplyCheckoutFilter = ( {
	filterName,
	defaultValue,
	extensions = {},
	arg: _arg = null,
	validation: _validation = () => true,
} ) => {
	const filters = getCheckoutFilters( filterName );

	/* validation is a pure function, so we know that it won't change
	 * and it has no deps.
	 */
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const validation = useCallback( ( value ) => _validation( value ), [] );

	/* arg is a custom object that changes a lot, passing it directly to
	 * the main useMemo would cause it to reload each render calc. We
	 * wrap it in its own useMemo with special comparison.
	 * We do this by saving previous value in a ref, and only passing in
	 * a new value when the old and new one are not the same.
	 */
	const previousArg = useRef( _arg );
	const arg = useMemo( () => {
		if (
			typeof previousArg.current === 'object' &&
			typeof _arg === 'object' &&
			! isShallowEqualObjects( previousArg.current, _arg )
		) {
			return _arg;
		}
		return previousArg.current;
	}, [ _arg ] );

	/**
	 * Calling filter can be costly because it's a third party code that
	 * might be expensive or effectful, that's why we wrap this in a memo
	 * and only update it when we need to.
	 */
	return useMemo( () => {
		let value = defaultValue;
		filters.forEach( ( filter ) => {
			try {
				const newValue = filter( value, extensions, arg );
				value = validation( newValue ) ? newValue : value;
			} catch ( e ) {
				if ( CURRENT_USER_IS_ADMIN ) {
					throw e;
				} else {
					// eslint-disable-next-line no-console
					console.error( e );
				}
			}
		} );
		return value;
	}, [ defaultValue, filters, validation, arg, extensions ] );
};
