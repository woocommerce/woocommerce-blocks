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
 */
const getCheckoutFilters = ( filterName ) => {
	const namespaces = Object.keys( checkoutFilters );
	const filters = namespaces
		.map( ( namespace ) => checkoutFilters[ namespace ][ filterName ] )
		.filter( Boolean );
	return filters;
};

/**
 * Register a regular payment method.
 *
 * @param {string} filterName   Name of the filter to apply.
 * @param {any}    defaultValue Default value to filter.
 * @param {any}    args         Arguments to pass to registered functions.
 * @param {any}    [validate]   Function that needs to return true when the
 *                              filtered value is passed in order for the filter
 *                              to be applied.
 */
export const __experimentalApplyCheckoutFilter = (
	filterName,
	defaultValue,
	args = {},
	validate = () => true
) => {
	const filters = getCheckoutFilters( filterName );
	let value = defaultValue;
	filters.forEach( ( filter ) => {
		const newValue = filter( value, args );
		value = validate( newValue ) ? newValue : value;
	} );
	return value;
};
