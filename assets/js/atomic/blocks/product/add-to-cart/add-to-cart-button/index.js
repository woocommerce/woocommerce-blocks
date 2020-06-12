/**
 * External dependencies
 */
import classnames from 'classnames';
import { __, _n, sprintf } from '@wordpress/i18n';
import Button from '@woocommerce/base-components/button';
import { isEmpty } from 'lodash';
import { Icon, done as doneIcon } from '@woocommerce/icons';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useAddToCartFormContext } from '../context';
import QuantityInput from './quantity-input';

/**
 * Add to Cart Form Qty + Button Block Component.
 *
 * @param {Object} props              Incoming props.
 * @param {Object} props.showQuantity Should qty selector be shown.
 * @param {Object} [props.product]    Optional product object. Product from context will be used if
 *                                    this is not provided.
 * @return {*} The component.
 */
const AddToCartButton = ( { showQuantity = true, product } ) => {
	const context = useAddToCartFormContext();
	const { is_purchasable: isPurchasable = true } = product;

	return (
		<div
			className={ classnames(
				'wc-block-components-product-add-to-cart-button',
				{
					'wc-block-components-product-add-to-cart-button--placeholder': isEmpty(
						product
					),
				}
			) }
		>
			{ showQuantity && isPurchasable && (
				<QuantityInput product={ product } context={ context } />
			) }
			<ButtonComponent product={ product } context={ context } />
		</div>
	);
};

const ButtonComponent = ( { product, context } ) => {
	const [ done, setDone ] = useState( false );
	const { onSubmit, addingToCart, cartQuantity, disabled } = context;

	const {
		is_purchasable: isPurchasable = true,
		add_to_cart: addToCart,
	} = product;

	// If not purchasable, link to the add to cart URL or product page.
	if ( ! isPurchasable ) {
		return (
			<Button
				className="wc-block-components-product-add-to-cart-button__button"
				href={ addToCart.url || product.permalink || '' }
				rel="nofollow"
			>
				{ addToCart.text }
			</Button>
		);
	}

	const addedToCart = Number.isFinite( cartQuantity ) && cartQuantity > 0;
	const buttonText = addedToCart
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
		: __( 'Add to cart', 'woo-gutenberg-products-block' );

	return (
		<Button
			className="wc-block-components-product-add-to-cart-button__button"
			disabled={ disabled }
			showSpinner={ addingToCart }
			onClick={ ( e ) => {
				e.preventDefault();
				onSubmit();
				setDone( true );
			} }
		>
			{ buttonText }
			{ done && (
				<Icon
					srcElement={ doneIcon }
					alt={ __( 'Done', 'woo-gutenberg-products-block' ) }
				/>
			) }
		</Button>
	);
};

export default AddToCartButton;
