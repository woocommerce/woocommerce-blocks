/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useAddToCartFormContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import {
	AddToCartButton,
	QuantityInput,
	ProductUnavailable,
} from '../../shared';
import VariationAttributes from './variation-attributes';

/**
 * Variable Product Add To Cart Form
 *
 * @param {Object} props Component props.
 */
const Variable = ( props ) => {
	const {
		productId,
		isPurchasable,
		isInStock,
		quantity,
		minQuantity,
		maxQuantity,
		setQuantity,
		formDisabled,
	} = useAddToCartFormContext();

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
			<VariationAttributes { ...props } />
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

export default Variable;
