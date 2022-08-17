type Payload = {
	type: string;
	product: Record< string, string >;
};

const reducer = (
	state = { products: [] as Array< Record< string, string > > },
	payload: Payload
) => {
	switch ( payload.type ) {
		case 'GET_PRODUCT':
			return {
				...state,
				products: [ ...state.products, payload.product ],
			};
		default:
			return state;
	}
};

export default reducer;
