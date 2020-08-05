/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Exposed to payment methods for the label shown on checkout. Allows icons to be added as well as
 * text.
 *
 * @param {Object} props Component props.
 * @param {string} props.text Text shown next to icon.
 */
export const PaymentMethodLabel = ( { text = '' } ) => {
	const className = 'wc-block-components-payment-method-label';
	return <span className={ className }>{ text }</span>;
};

export default PaymentMethodLabel;
