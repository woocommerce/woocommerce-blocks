/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

const ProductListSaleBadge = ( { className, product, align } ) => {
	const alignClass =
		typeof align !== 'undefined'
			? 'wc-block-grid__product-onsale--align' + align
			: '';

	if ( product && product.onsale ) {
		return (
			<div
				className={ classnames(
					className,
					alignClass,
					'wc-block-grid__product-onsale'
				) }
			>
				<span className="wc-block-grid__product-onsale__text">
					{ __( 'Sale', 'woo-gutenberg-products-block' ) }
				</span>
			</div>
		);
	}

	return '';
};

export default ProductListSaleBadge;
