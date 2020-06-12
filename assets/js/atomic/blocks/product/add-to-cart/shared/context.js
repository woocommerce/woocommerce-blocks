/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useState,
	useCallback,
	useRef,
	useEffect,
} from '@wordpress/element';
import { useStoreAddToCart } from '@woocommerce/base-hooks';
import { triggerFragmentRefresh } from '@woocommerce/base-utils';
import { isEmpty } from 'lodash';

const AddToCartFormContext = createContext( {
	quantity: 1,
	cartQuantity: 0,
	variationId: 0,
	setQuantity: ( quantity ) => void { quantity },
	setVariationId: ( variationId ) => void { variationId },
	onSubmit: () => void {},
	addingToCart: false,
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
export const AddToCartFormContextProvider = ( {
	children,
	product,
	showFormElements,
} ) => {
	const firstMount = useRef( true );
	const [ quantity, setQuantity ] = useState( 1 );
	const [ variationId, setVariationId ] = useState( 0 );
	const {
		addToCart: storeAddToCart,
		addingToCart,
		cartQuantity,
	} = useStoreAddToCart( product.id || 0 );

	// @todo Add Notices to Single Product Block to catch add to cart errors
	const addToCart = useCallback( () => {
		storeAddToCart( quantity );
	}, [ storeAddToCart, quantity ] );

	// This will ensure any add to cart events update legacy fragments using jQuery.
	useEffect( () => {
		// Avoid running on first mount when cart quantity is first set.
		if ( firstMount.current ) {
			firstMount.current = false;
			return;
		}
		triggerFragmentRefresh();
	}, [ cartQuantity ] );

	const { type = 'simple', is_purchasable: isPurchasable = false } = product;

	// If dealing with a variable product, a variation needs to be selected.
	const needsVariationPicker = type === 'variable';
	const needsVariation = needsVariationPicker && variationId === 0;

	const hasProduct = ! isEmpty( product );

	// The cart button is disabled when loading or when the form is incomplete.
	const canAddToCart =
		! addingToCart && hasProduct && isPurchasable && ! needsVariation;

	const contextValue = {
		hasProduct,
		product,
		showFormElements,
		// Qty selected and in cart.
		quantity,
		setQuantity,
		cartQuantity,
		// Variation data.
		variationId,
		setVariationId,
		needsVariationPicker,
		needsVariation,
		// Cart button.
		addingToCart,
		canAddToCart,
		addToCart,
	};

	return (
		<AddToCartFormContext.Provider value={ contextValue }>
			{ children }
		</AddToCartFormContext.Provider>
	);
};
