/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { Icon, done as doneIcon } from '@woocommerce/icons';
import { useState, useEffect } from '@wordpress/element';
import { useAddToCartFormContext } from '@woocommerce/base-context';
import { useStoreAddToCart } from '@woocommerce/base-hooks';

/**
 * Add to Cart Form Button Component.
 */
const AddToCartButton = () => {
	const {
		showFormElements,
		productIsPurchasable,
		productHasOptions,
		product,
		productType,
		isDisabled,
		isProcessing,
		eventRegistration,
		hasError,
		dispatchActions,
	} = useAddToCartFormContext();
	const { cartQuantity } = useStoreAddToCart( product.id || 0 );
	const [ addedToCart, setAddedToCart ] = useState( false );
	const addToCartButtonData = product.add_to_cart || {
		url: '',
		text: '',
	};

	// Subscribe to emitter for after processing.
	useEffect( () => {
		const onSuccess = () => {
			if ( ! hasError ) {
				setAddedToCart( true );
			}
			return true;
		};
		const unsubscribeProcessing = eventRegistration.onAddToCartAfterProcessingWithSuccess(
			onSuccess,
			0
		);
		return () => {
			unsubscribeProcessing();
		};
	}, [ eventRegistration, hasError ] );

	/**
	 * We can show a real button if we are:
	 *
	 *  	a) Showing a full add to cart form.
	 * 		b) The product doesn't have options and can therefore be added directly to the cart.
	 * 		c) The product is purchasable.
	 *
	 * Otherwise we show a link instead.
	 */
	const showButton =
		( showFormElements ||
			( ! productHasOptions && productType === 'simple' ) ) &&
		productIsPurchasable;

	return showButton ? (
		<ButtonComponent
			className="wc-block-components-product-add-to-cart-button"
			quantityInCart={ cartQuantity }
			isDisabled={ isDisabled }
			isProcessing={ isProcessing }
			isDone={ addedToCart }
			onClick={ () => dispatchActions.submitForm() }
		/>
	) : (
		<LinkComponent
			className="wc-block-components-product-add-to-cart-button"
			href={ addToCartButtonData.url }
			text={
				addToCartButtonData.text ||
				__( 'View Product', 'woo-gutenberg-products-block' )
			}
		/>
	);
};

/**
 * Button component for non-purchasable products.
 *
 * @param {Object} props           Incoming props.
 * @param {string} props.className Css classnames.
 * @param {string} props.href      Link for button.
 * @param {string} props.text      Text content for button.
 */
const LinkComponent = ( { className, href, text } ) => {
	return (
		<Button className={ className } href={ href } rel="nofollow">
			{ text }
		</Button>
	);
};

/**
 * Button for purchasable products.
 *
 * @param {Object} props                 Incoming props for component
 * @param {string} props.className       Incoming css class name.
 * @param {number} props.quantityInCart  Quantity of item in cart.
 * @param {boolean} props.isProcessing   Whether processing action is occurring.
 * @param {boolean} props.isDisabled     Whether the button is disabled or not.
 * @param {boolean} props.isDone         Whether processing is done.
 * @param {function():any} props.onClick Callback to execute when button is clicked.
 */
const ButtonComponent = ( {
	className,
	quantityInCart,
	isProcessing,
	isDisabled,
	isDone,
	onClick,
} ) => {
	return (
		<Button
			className={ className }
			disabled={ isDisabled }
			showSpinner={ isProcessing }
			onClick={ onClick }
		>
			{ isDone && quantityInCart > 0
				? sprintf(
						// translators: %s number of products in cart.
						_n(
							'%d in cart',
							'%d in cart',
							quantityInCart,
							'woo-gutenberg-products-block'
						),
						quantityInCart
				  )
				: __( 'Add to cart', 'woo-gutenberg-products-block' ) }
			{ !! isDone && (
				<Icon
					srcElement={ doneIcon }
					alt={ __( 'Done', 'woo-gutenberg-products-block' ) }
				/>
			) }
		</Button>
	);
};

export default AddToCartButton;
