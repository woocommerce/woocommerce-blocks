/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useState,
	useCallback,
} from '@wordpress/element';
import {
	useStoreAddToCart,
	useTriggerFragmentRefresh,
} from '@woocommerce/base-hooks';
import { useProductDataContext } from '@woocommerce/shared-context';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').AddToCartFormContext} AddToCartFormContext
 */

const AddToCartFormContext = createContext( {
	productData: {
		isPurchasable: true,
		isInStock: true,
		quantityLimit: 99,
		variations: {},
		attributes: {},
	},
	productId: 0,
	variationId: 0,
	variationData: {},
	cartItemData: {},
	quantity: 1,
	minQuantity: 1,
	maxQuantity: 99,
	quantityInCart: 0,
	setQuantity: ( quantity ) => void { quantity },
	setVariationId: ( variationId ) => void { variationId },
	setVariationData: ( variationData ) => void { variationData },
	setCartItemData: ( cartItemData ) => void { cartItemData },
	showFormElements: false,
	formInitialized: false,
	formDisabled: true,
	formSubmitting: false,
	onChange: () => void null,
	onSubmit: () => void null,
	onSuccess: () => void null,
	onFail: () => void null,
} );

/**
 * @return {AddToCartFormContext} Returns the add to cart form context value.
 */
export const useAddToCartFormContext = () => {
	return useContext( AddToCartFormContext );
};

/**
 * Provides an interface for blocks to control the add to cart form for a product.
 *
 * @param {Object} props Incoming props for the provider.
 */
export const AddToCartFormContextProvider = ( {
	showFormElements,
	children,
} ) => {
	const { product } = useProductDataContext( [
		'id',
		'type',
		'quantity_limit',
		'is_purchasable',
		'is_in_stock',
		'variations',
		'attributes',
	] );
	const productId = product.id || 0;
	const isPurchasable = product.is_purchasable || true;
	const isInStock = product.is_in_stock || true;
	const quantityLimit = product.quantity_limit || 99;
	const variations = product.variations || {};
	const attributes = product.attributes || {};
	const [ variationId, setVariationId ] = useState( 0 );
	const [ variationData, setVariationData ] = useState( {} );
	const [ cartItemData, setCartItemData ] = useState( {} );
	const [ quantity, setQuantity ] = useState( 1 );
	const {
		addToCart: storeAddToCart,
		addingToCart: formSubmitting,
		cartQuantity: quantityInCart,
		cartIsLoading,
	} = useStoreAddToCart( productId );

	// This will ensure any add to cart events update legacy fragments using jQuery.
	useTriggerFragmentRefresh( quantityInCart );

	/**
	 * @todo Introduce Validation Emitter for the Add to Cart Form
	 *
	 * The add to cart form may have several inner form elements which need to run validation and
	 * change whether or not the form can be submitted. They may also need to show errors and
	 * validation notices.
	 */
	const formInitialized = ! cartIsLoading && productId > 0;
	const formDisabled = formSubmitting || ! formInitialized || ! isPurchasable;

	// Events.
	const onSubmit = useCallback( () => {
		/**
		 * @todo Surface add to cart errors in the single product block.
		 *
		 * If the addToCart function within useStoreAddToCart fails, a notice should be shown on the product page.
		 */
		storeAddToCart( quantity );
	}, [ storeAddToCart, quantity ] );

	/**
	 * @todo Add Event Callbacks to the Add to Cart Form.
	 *
	 * - onChange should trigger when a form element changes, so for example, a variation picker could indicate that it's ready.
	 * - onSuccess should trigger after a successful add to cart. This could be used to reset form elements, do a redirect, or show something to the user.
	 * - onFail should trigger when adding to cart fails. Form elements might show extra notices or reset. A fallback might be to redirect to the core product page in case of incompatibilities.
	 */
	const onChange = useCallback( () => {}, [] );
	const onSuccess = useCallback( () => {}, [] );
	const onFail = useCallback( () => {}, [] );

	/**
	 * @type {AddToCartFormContext}
	 */
	const contextValue = {
		productId,
		productData: {
			isPurchasable,
			isInStock,
			quantityLimit,
			variations,
			attributes,
		},
		variationId,
		variationData,
		cartItemData,
		quantity,
		minQuantity: 1,
		maxQuantity: quantityLimit,
		quantityInCart,
		setQuantity,
		setVariationId,
		setVariationData,
		setCartItemData,
		showFormElements,
		formInitialized,
		formDisabled,
		formSubmitting,
		onChange,
		onSubmit,
		onSuccess,
		onFail,
	};

	return (
		<AddToCartFormContext.Provider value={ contextValue }>
			{ children }
		</AddToCartFormContext.Provider>
	);
};
