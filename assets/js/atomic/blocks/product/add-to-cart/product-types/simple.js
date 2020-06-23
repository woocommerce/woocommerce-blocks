/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useAddToCartFormContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import { AddToCartButton, QuantityInput, ProductUnavailable } from '../shared';

/**
 * Simple Product Add To Cart Form
 */
const Simple = () => {
	const {
		productId,
		productData,
		quantity,
		minQuantity,
		maxQuantity,
		setQuantity,
		formDisabled,
	} = useAddToCartFormContext();
	const { isPurchasable, isInStock } = productData;

	if ( productId && ! isPurchasable ) {
		return <ProductUnavailable />;
	}

	if ( productId && ! isInStock ) {
		return (
			<ProductUnavailable
				reason={ __(
					'This product is currently out of stock and cannot be purchased.',
					'woo-gutenberg-products-block'
				) }
			/>
		);
	}

	return (
		<>
			<QuantityInput
				value={ quantity }
				min={ minQuantity }
				max={ maxQuantity }
				disabled={ formDisabled }
				onChange={ setQuantity }
			/>
			<AddToCartButton />
		</>
	);
};

export default Simple;
