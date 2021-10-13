/**
 * External dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import type { ReactElement } from 'react';
import { formatPrice } from '@woocommerce/price-format';

/**
 * Internal dependencies
 */
import QuantityBadge from './quantity-badge';

const MiniCartBlock = (): ReactElement => {
	const blockProps = useBlockProps( {
		className: 'wc-block-mini-cart',
	} );

	const productCount = 0;
	const productTotal = 0;

	return (
		<div { ...blockProps }>
			<button className="wc-block-mini-cart__button">
				<span className="wc-block-mini-cart__amount">{ formatPrice( productTotal ) }</span>
				<span className="wc-block-mini-cart__count">
					{ sprintf(
						/* translators: %d is the number of products in the cart. */
						_n(
							'%d product',
							'%d products',
							productCount,
							'woo-gutenberg-products-block'
						),
						productCount
					) }
				</span>
				<QuantityBadge count={ productCount } />
			</button>
		</div>
	);
};

export default MiniCartBlock;
