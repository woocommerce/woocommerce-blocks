export function getProduct( product: Record< string, string > ) {
	return {
		type: 'GET_PRODUCT',
		product,
	};
}
