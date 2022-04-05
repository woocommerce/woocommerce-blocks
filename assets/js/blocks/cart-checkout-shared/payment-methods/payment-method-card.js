/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useCheckoutContext,
	useEditorContext,
} from '@woocommerce/base-context';
import { CheckboxControl } from '@woocommerce/blocks-checkout';
import PropTypes from 'prop-types';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import PaymentMethodErrorBoundary from './payment-method-error-boundary';
import { STORE_KEY as PAYMENT_METHOD_DATA_STORE_KEY } from '../../../data/payment-method-data/constants';

/**
 * Component used to render the contents of a payment method card.
 *
 * @param {Object}  props                Incoming props for the component.
 * @param {boolean} props.showSaveOption Whether that payment method allows saving
 *                                       the data for future purchases.
 * @param {Object}  props.children       Content of the payment method card.
 *
 * @return {*} The rendered component.
 */
const PaymentMethodCard = ( { children, showSaveOption } ) => {
	const { isEditor } = useEditorContext();
	const { shouldSavePaymentMethod } = useSelect( ( select ) => {
		const store = select( PAYMENT_METHOD_DATA_STORE_KEY );
		return {
			shouldSavePaymentMethod: store.shouldSavePaymentMethod(),
		};
	} );
	const { setShouldSavePaymentMethod } = useDispatch(
		PAYMENT_METHOD_DATA_STORE_KEY
	);
	const { customerId } = useCheckoutContext();

	return (
		<PaymentMethodErrorBoundary isEditor={ isEditor }>
			{ children }
			{ customerId > 0 && showSaveOption && (
				<CheckboxControl
					className="wc-block-components-payment-methods__save-card-info"
					label={ __(
						'Save payment information to my account for future purchases.',
						'woo-gutenberg-products-block'
					) }
					checked={ shouldSavePaymentMethod }
					onChange={ () =>
						setShouldSavePaymentMethod( ! shouldSavePaymentMethod )
					}
				/>
			) }
		</PaymentMethodErrorBoundary>
	);
};

PaymentMethodCard.propTypes = {
	showSaveOption: PropTypes.bool,
	children: PropTypes.node,
};

export default PaymentMethodCard;
