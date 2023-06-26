import { store } from '@woocommerce/interactivity';

store( {
	state: {
		woocommerce: {
			moreThanOneItem: ( { context } ) => {
				return true;
			},
			addToCartText: ( { context, state } ) => {
				if ( context.woocommerce.numberOfItems === 0 ) {
					return state.woocommerce.addToCart;
				}

				console.log( context.woocommerce.numberOfItems );
				console.log( state.woocommerce.inTheCart );

				return state.woocommerce.inTheCart.replace(
					'###',
					context.woocommerce.numberOfItems
				);
			},
		},
	},
	// actions: {
	//   woocommerce: {
	// 	addToCart: async ({ context, event, ref }) => {
	// 	  event.preventDefault();

	// 	  const data = ref.dataset.map(item => ...);

	// 	  context.woocommerce.isLoading = true;

	// 	  const res = await fetch(wc_add_to_cart_..., {
	// 		method: "POST",
	// 	  }).then(res => res.json());

	// 	  context.woocommerce.numberOfItems += 1;

	// 	  context.woocommerce.isLoading = false;

	// 	  redux.dispatch("UPDATE_CART"); // For the mini cart
	// 	}
	//   }
	// }
} );
