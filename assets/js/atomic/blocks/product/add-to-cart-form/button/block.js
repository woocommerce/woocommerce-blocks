/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { __, _n, sprintf } from '@wordpress/i18n';
import { useProductDataContext } from '@woocommerce/shared-context';
import Button from '@woocommerce/base-components/button';
import { isEmpty } from 'lodash';
import { Icon, done } from '@woocommerce/icons';
import { useEffect, useRef, useState } from '@wordpress/element';
import { triggerFragmentRefresh } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import { useAddToCartFormContext } from '../context';

/**
 * Add to Cart Form Qty + Button Block Component.
 *
 * @param {Object} props              Incoming props.
 * @param {string} [props.className]  CSS Class name for the component.
 * @param {Object} props.showQuantity Should qty selector be shown.
 * @param {Object} [props.product]    Optional product object. Product from context will be used if
 *                                    this is not provided.
 * @return {*} The component.
 */
const Block = ( { className, showQuantity = true, ...props } ) => {
	const {
		quantity,
		setQuantity,
		allowSubmit,
		onSubmit,
		addingToCart,
		cartQuantity,
	} = useAddToCartFormContext();
	const productDataContext = useProductDataContext();
	const product = props.product || productDataContext.product || {};
	const firstMount = useRef( true );

	const [ addedToCart, setAddedToCart ] = useState( false );

	useEffect( () => {
		// Avoid running on first mount when cart quantity is first set.
		if ( firstMount.current ) {
			firstMount.current = false;
			return;
		}
		triggerFragmentRefresh();
	}, [ cartQuantity ] );

	const qtyProps = {
		value: quantity,
		min: 1,
		max: product.quantity_limit || undefined,
		hidden: product.quantity_limit && product.quantity_limit === 1,
		disabled: ! allowSubmit,
		onChange: ( e ) => {
			setQuantity( e.target.value );
		},
	};

	const buttonProps = {
		disabled: ! allowSubmit,
		showSpinner: addingToCart,
		onClick: ( e ) => {
			e.preventDefault();
			onSubmit();
			setAddedToCart( true );
		},
	};

	if ( isEmpty( product ) ) {
		buttonProps.disabled = true;
		qtyProps.disabled = true;
	}

	const buttonText =
		addedToCart && Number.isFinite( cartQuantity ) && cartQuantity > 0
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
		<div
			className={ classnames(
				className,
				'wc-block-components-product-add-to-cart-form-button',
				{
					'wc-block-components-product-add-to-cart-form-button--placeholder': isEmpty(
						product
					),
				}
			) }
		>
			{ showQuantity && (
				<input
					className="wc-block-components-product-add-to-cart-form-button__qty"
					type="number"
					{ ...qtyProps }
				/>
			) }
			<Button
				className="wc-block-components-product-add-to-cart-form-button__button"
				{ ...buttonProps }
			>
				{ buttonText }
				{ addedToCart && (
					<Icon
						srcElement={ done }
						alt={ __( 'Done', 'woo-gutenberg-products-block' ) }
					/>
				) }
			</Button>
		</div>
	);
};

Block.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};

export default Block;
