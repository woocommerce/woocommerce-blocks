/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { Icon, done as doneIcon } from '@woocommerce/icons';
import { useState } from '@wordpress/element';
import { useAddToCartFormContext } from '@woocommerce/base-context';
import { useProductDataContext } from '@woocommerce/shared-context';

/**
 * Add to Cart Form Button Component.
 */
const AddToCartButton = () => {
	const {
		showFormElements,
		quantityInCart,
		formDisabled,
		formSubmitting,
		onSubmit,
	} = useAddToCartFormContext();
	const { product } = useProductDataContext( [
		'is_purchasable',
		'has_options',
		'add_to_cart',
	] );
	const isPurchasable = product.is_purchasable || true;
	const hasOptions = product.has_options || false;
	const addToCartButtonData = product.add_to_cart || {
		url: '',
		text: '',
	};

	// If we are showing form elements, OR if the product has no additional form options, we can show
	// a functional direct add to cart button, provided that the product is purchasable.
	// No link is required to the full form under these circumstances.
	if ( ( showFormElements || ! hasOptions ) && isPurchasable ) {
		return (
			<ButtonComponent
				className="wc-block-components-product-add-to-cart-button"
				quantityInCart={ quantityInCart }
				disabled={ formDisabled }
				loading={ formSubmitting }
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
	loading,
	disabled,
	onClick,
} ) => {
	const [ wasClicked, setWasClicked ] = useState( false );

	return (
		<Button
			className={ className }
			disabled={ disabled }
			showSpinner={ loading }
			onClick={ () => {
				onClick();
				setWasClicked( true );
			} }
		>
			{ quantityInCart > 0
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
			{ wasClicked && (
				<Icon
					srcElement={ doneIcon }
					alt={ __( 'Done', 'woo-gutenberg-products-block' ) }
				/>
			) }
		</Button>
	);
};

export default AddToCartButton;
