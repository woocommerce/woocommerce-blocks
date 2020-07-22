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
		product,
		isDisabled,
		isProcessing,
		onSubmit,
		onAddToCartAfterProcessingWithSuccess,
		hasError,
	} = useAddToCartFormContext();
	const { cartQuantity } = useStoreAddToCart( product.id || 0 );
	const [ addedToCart, setAddedToCart ] = useState( false );
	const isPurchasable = product.is_purchasable || true;
	const hasOptions = product.has_options || false;
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
		const unsubscribeProcessing = onAddToCartAfterProcessingWithSuccess(
			onSuccess,
			0
		);
		return () => {
			unsubscribeProcessing();
		};
	}, [ onAddToCartAfterProcessingWithSuccess, hasError ] );

	// If we are showing form elements, OR if the product has no additional form options, we can show
	// a functional direct add to cart button, provided that the product is purchasable.
	// No link is required to the full form under these circumstances.
	if ( showFormElements || ( ! hasOptions && isPurchasable ) ) {
		return (
			<ButtonComponent
				className="wc-block-components-product-add-to-cart-button"
				quantityInCart={ cartQuantity }
				isDisabled={ isDisabled }
				isProcessing={ isProcessing }
				isDone={ addedToCart }
				onClick={ onSubmit }
			/>
		);
	}

	return (
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
 * Button for non-purchasable products.
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
			onClick={ () => {
				onClick();
			} }
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
