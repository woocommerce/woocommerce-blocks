/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useState,
	useCallback,
} from '@wordpress/element';
import { useStoreAddToCart } from '@woocommerce/base-hooks';

const AddToCartFormContext = createContext( {
	quantity: 1,
	variationId: 0,
	setQuantity: ( quantity ) => void { quantity },
	setVariationId: ( variationId ) => void { variationId },
	allowSubmit: false,
	onSubmit: () => void {},
} );

/**
 * Returns the add to cart form context values.
 *
 * @return {Object} The notice context value from the notice context.
 */
export const useAddToCartFormContext = () => {
	return useContext( AddToCartFormContext );
};

/**
 * Provides an interface for blocks within the Add to Cart Form context to control events.
 */
export const AddToCartFormContextProvider = ( { children, product } ) => {
	const [ quantity, setQuantity ] = useState( 1 );
	const [ variationId, setVariationId ] = useState( 0 );
	const { addToCart, addingToCart } = useStoreAddToCart( product.id );

	const onSubmit = useCallback( () => {
		addToCart( quantity );
	}, [ addToCart, quantity ] );

	const allowSubmit = ! addingToCart;

	const contextValue = {
		quantity,
		variationId,
		setQuantity,
		setVariationId,
		allowSubmit,
		onSubmit,
	};

	return (
		<AddToCartFormContext.Provider value={ contextValue }>
			{ children }
		</AddToCartFormContext.Provider>
	);
};
