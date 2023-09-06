/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import type { HTMLAttributes, CSSProperties } from 'react';
import { useProductDataContext } from '@woocommerce/shared-context';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import DiscountBlock from './block';

interface Attributes {
	style: CSSProperties;
}

type Props = {
	attributes: Attributes;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	context?: { 'woocommerce/isDescendentOfSingleProductTemplate': boolean };
} & HTMLAttributes< HTMLDivElement >;

const DiscountEdit = ( { attributes, context }: Props ): JSX.Element => {
	const blockProps = useBlockProps();
	const { product } = useProductDataContext();
	const isDescendentOfSingleProductTemplate =
		context && context[ 'woocommerce/isDescendentOfSingleProductTemplate' ];
	const originalPrice = product?.prices?.regular_price;
	const currentPrice = product?.prices?.price;
	const showPrice =
		( originalPrice && currentPrice !== originalPrice ) ||
		isDescendentOfSingleProductTemplate;
	const currency = isDescendentOfSingleProductTemplate
		? getCurrencyFromPriceResponse()
		: getCurrencyFromPriceResponse( product?.prices );
	const blockAttrs = {
		attributes,
		currency,
		context,
		originalPrice,
		currentPrice,
		isDescendentOfSingleProductTemplate,
	};
	return (
		<>
			{ showPrice && (
				<div { ...blockProps }>
					<DiscountBlock { ...blockAttrs } />
				</div>
			) }
		</>
	);
};

export default DiscountEdit;
