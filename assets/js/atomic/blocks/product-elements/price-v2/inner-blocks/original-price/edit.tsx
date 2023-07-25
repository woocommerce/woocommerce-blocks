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
import PriceBlock from './block';

interface Attributes {
	style: CSSProperties;
}

type Props = {
	attributes: Attributes;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	context?: { 'woocommerce/isDescendentOfSingleProductTemplate': boolean };
} & HTMLAttributes< HTMLDivElement >;

const OriginalPriceEdit = ( { attributes, context }: Props ): JSX.Element => {
	const blockProps = useBlockProps();
	const { product } = useProductDataContext();
	const isDescendentOfSingleProductTemplate =
		( context &&
			context[ 'woocommerce/isDescendentOfSingleProductTemplate' ] ) ||
		false;
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
		rawPrice: originalPrice,
		priceType: 'original',
	};
	return (
		<>
			{ showPrice && (
				<div { ...blockProps }>
					<PriceBlock { ...blockAttrs } />
				</div>
			) }
		</>
	);
};

export default OriginalPriceEdit;
