/**
 * External dependencies
 */
import { Icon, miniCart } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import './style.scss';

const QuantityBadge = ( { count }: { count: number } ): JSX.Element => (
	<span className="wc-block-mini-cart__quantity-badge">
		<span className="wc-block-mini-cart__badge">{ count }</span>
		<Icon
			className="wc-block-mini-cart__icon"
			size={ 20 }
			srcElement={ miniCart }
		/>
	</span>
);

export default QuantityBadge;
