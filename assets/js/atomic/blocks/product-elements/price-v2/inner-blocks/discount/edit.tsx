/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useProductDataContext } from '@woocommerce/shared-context';
import { useStyleProps } from '@woocommerce/base-hooks';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { discountAmountName } from './inner-blocks';
import { TEMPLATE } from './template';

export const Edit = ( { attributes, setAttributes } ): JSX.Element => {
	const { style, className } = useStyleProps( attributes );
	const { product } = useProductDataContext();
	const originalPrice = product?.prices?.regular_price;
	const currentPrice = product?.prices?.price;
	const showPrice = originalPrice && currentPrice !== originalPrice;
	useEffect( () => {
		if ( ! attributes?.style ) {
			setAttributes( { style: { spacing: { blockGap: '0' } } } );
		}
	}, [ attributes, setAttributes ] );
	return (
		<>
			{ showPrice && (
				<div className={ className } style={ style }>
					<InnerBlocks
						allowedBlocks={ [
							discountAmountName,
							'core/paragraph',
						] }
						template={ TEMPLATE }
					/>
				</div>
			) }
		</>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
