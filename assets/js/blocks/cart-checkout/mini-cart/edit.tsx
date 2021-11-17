/**
 * External dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import type { ReactElement } from 'react';
import { formatPrice } from '@woocommerce/price-format';
import { CartCheckoutCompatibilityNotice } from '@woocommerce/editor-components/compatibility-notices';
import { __ } from '@wordpress/i18n';
import { positionCenter, positionRight, positionLeft } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import QuantityBadge from './quantity-badge';

interface Attributes {
	align: string;
}

interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

const MiniCartBlock = ( {
	attributes,
	setAttributes,
}: Props ): ReactElement => {
	const { align } = attributes;
	const blockProps = useBlockProps( {
		className: `wc-block-mini-cart align-${ align }`,
	} );

	const productCount = 0;
	const productTotal = 0;

	return (
		<div { ...blockProps }>
			<BlockControls>
				<AlignmentControl
					value={ align }
					alignmentControls={ [
						{
							icon: positionLeft,
							title: __(
								'Align button left',
								'woo-gutenberg-products-block'
							),
							align: 'left',
						},
						{
							icon: positionCenter,
							title: __(
								'Align button center',
								'woo-gutenberg-products-block'
							),
							align: 'center',
						},
						{
							icon: positionRight,
							title: __(
								'Align button right',
								'woo-gutenberg-products-block'
							),
							align: 'right',
						},
					] }
					onChange={ ( newAlign: string ) =>
						setAttributes( { align: newAlign } )
					}
				/>
			</BlockControls>
			<button className="wc-block-mini-cart__button">
				<span className="wc-block-mini-cart__amount">
					{ formatPrice( productTotal ) }
				</span>
				<QuantityBadge count={ productCount } />
			</button>
			<CartCheckoutCompatibilityNotice blockName="mini-cart" />
		</div>
	);
};

export default MiniCartBlock;
