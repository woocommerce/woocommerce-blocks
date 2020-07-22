/**
 * External dependencies
 */
import { useAddToCartFormContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import './style.scss';
import AttributePicker from './attribute-picker';
import { getAttributes, getVariationAttributes } from './utils';

/**
 * VariationAttributes component.
 */
const VariationAttributes = () => {
	const { product } = useAddToCartFormContext();
	const attributes = getAttributes( product.attributes );
	const variationAttributes = getVariationAttributes( product.variations );

	if (
		Object.keys( attributes ).length === 0 ||
		variationAttributes.length === 0
	) {
		return null;
	}

	return (
		<AttributePicker
			attributes={ attributes }
			variationAttributes={ variationAttributes }
		/>
	);
};

export default VariationAttributes;
