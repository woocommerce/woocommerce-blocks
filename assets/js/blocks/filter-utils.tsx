export const mapRawQueryToUseCollection = ( rawQuery ) => {
	// @todo requires more advanced mapping and covering edge cases

	// Handpicked Products
	const { post__in: include } = rawQuery;

	// Attributes
	const attributes = rawQuery.tax_query.reduce(
		( acc, { taxonomy, operator } ) => {
			if ( taxonomy === 'pa_color' ) {
				return [
					...acc,
					{
						attribute: taxonomy,
						operator: operator.toLowerCase(),
						slug: 'red', // hardcoded for demo purposes, it requires changing term id into slug
					},
				];
			}
			return acc;
		},
		[]
	);
	return { include, attributes };
};
