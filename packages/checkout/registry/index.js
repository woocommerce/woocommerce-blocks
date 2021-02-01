let checkoutFilters = {};
export const __experimentalRegisterCheckoutFilters = ( namespace, filters ) => {
	checkoutFilters = {
		...checkoutFilters,
		[ namespace ]: filters,
	};
};

const getCheckoutFilters = ( filterName ) => {
	const namespaces = Object.keys( checkoutFilters );
	const filters = namespaces
		.map( ( namespace ) => checkoutFilters[ namespace ][ filterName ] )
		.filter( Boolean );
	return filters;
};

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
