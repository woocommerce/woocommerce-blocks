/**
 * Internal dependencies
 */
import './style.scss';
import Cart from './cart.svg';

const QuantityBadge = ( { count }: { count: number } ): JSX.Element => (
	<span className="quantity-badge">
		<span className="badge">{ count }</span>
		<Cart />
	</span>
);

export default QuantityBadge;
