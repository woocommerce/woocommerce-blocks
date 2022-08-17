export const getProduct = (
	{
		products,
	}: {
		products: Array< Record< string, string > >;
	},
	id: string
) => {
	return products.find( ( product ) => product.id === id );
};
