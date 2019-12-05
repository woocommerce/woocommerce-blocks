/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import './style.scss';

const CheckoutForm = ( { className, children } ) => {
	return (
		<form
			className={ classnames( [
				'wc-components-checkout-form',
				className,
			] ) }
		>
			{ children }
		</form>
	);
};

export default CheckoutForm;
