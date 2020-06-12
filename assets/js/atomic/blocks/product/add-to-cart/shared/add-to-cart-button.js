/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { Icon, done as doneIcon } from '@woocommerce/icons';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useAddToCartFormContext } from './context';

/**
 * Add to Cart Form Qty + Button Block Component.
 */
const AddToCartButton = () => {
	const {
		product,
		showFormElements,
		cartQuantity,
		addToCart,
		canAddToCart,
		addingToCart,
	} = useAddToCartFormContext();

	const {
		is_purchasable: isPurchasable = true,
		has_options: hasOptions,
		add_to_cart: addToCartButtonData = {
			url: '',
			text: '',
		},
	} = product;

	if ( ( showFormElements || ! hasOptions ) && isPurchasable ) {
		return (
			<ButtonComponent
				className="wc-block-components-product-add-to-cart-button"
				cartQuantity={ cartQuantity }
				disabled={ ! canAddToCart }
				loading={ addingToCart }
				onClick={ addToCart }
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
	cartQuantity,
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
			onClick={ ( e ) => {
				e.preventDefault();
				onClick();
				setWasClicked( true );
			} }
		>
			{ cartQuantity > 0
				? sprintf(
						// translators: %s number of products in cart.
						_n(
							'%d in cart',
							'%d in cart',
							cartQuantity,
							'woo-gutenberg-products-block'
						),
						cartQuantity
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
