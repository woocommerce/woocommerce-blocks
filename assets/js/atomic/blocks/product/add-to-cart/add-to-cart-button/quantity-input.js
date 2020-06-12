/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * Quantity Input Component.
 */
const QuantityInput = ( { product, context } ) => {
	const { quantity_limit: quantityLimit = 99 } = product;
	const { quantity, addingToCart, setQuantity } = context;
	const qtyProps = {
		value: quantity,
		min: 1,
		max: quantityLimit,
		hidden: quantityLimit === 1,
		disabled: addingToCart || isEmpty( product ),
		onChange: ( e ) => {
			setQuantity( e.target.value );
		},
	};

	return (
		<input
			className="wc-block-components-product-add-to-cart-button__qty"
			type="number"
			{ ...qtyProps }
		/>
	);
};

export default QuantityInput;
