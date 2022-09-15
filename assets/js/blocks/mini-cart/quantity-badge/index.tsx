/**
 * External dependencies
 */
import { miniCart } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	count: number;
	colorClassNames?: string;
	iconSize: number;
	style?: Record< string, string | undefined >;
}

const QuantityBadge = ( {
	count,
	colorClassNames,
	iconSize,
	style,
}: Props ): JSX.Element => {
	return (
		<span className="wc-block-mini-cart__quantity-badge">
			<Icon
				className="wc-block-mini-cart__icon"
				size={ iconSize }
				icon={ miniCart }
			/>
			<span
				className={ `wc-block-mini-cart__badge ${ colorClassNames }` }
				style={ style }
			>
				{ count }
			</span>
		</span>
	);
};

export default QuantityBadge;
