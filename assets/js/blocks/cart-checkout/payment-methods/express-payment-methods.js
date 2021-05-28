/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useExpressPaymentMethods,
	usePaymentMethodInterface,
} from '@woocommerce/base-context/hooks';
import {
	cloneElement,
	isValidElement,
	useCallback,
	useRef,
} from '@wordpress/element';
import {
	useEditorContext,
	usePaymentMethodDataContext,
} from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import PaymentMethodErrorBoundary from './payment-method-error-boundary';

const ExpressPaymentMethods = () => {
	const { isEditor } = useEditorContext();
	const {
		setActivePaymentMethod,
		activePaymentMethod,
		paymentMethodData,
		setPaymentStatus,
	} = usePaymentMethodDataContext();
	const paymentMethodInterface = usePaymentMethodInterface();
	const { paymentMethods } = useExpressPaymentMethods();
	const previousActivePaymentMethod = useRef( activePaymentMethod );
	const previousPaymentMethodData = useRef( paymentMethodData );

	const onExpressPaymentClick = useCallback(
		( paymentMethodId ) => () => {
			previousActivePaymentMethod.current = activePaymentMethod;
			previousPaymentMethodData.current = paymentMethodData;
			setPaymentStatus().started( {} );
			setActivePaymentMethod( paymentMethodId );
		},
		[
			activePaymentMethod,
			paymentMethodData,
			setActivePaymentMethod,
			setPaymentStatus,
		]
	);

	const onExpressPaymentClose = useCallback( () => {
		setActivePaymentMethod( previousActivePaymentMethod.current );
		if ( previousPaymentMethodData.current.isSavedToken ) {
			setPaymentStatus().started( previousPaymentMethodData.current );
		}
	}, [ setActivePaymentMethod, setPaymentStatus ] );

	/**
	 * @todo Find a way to Memorize Express Payment Method Content
	 *
	 * Payment method content could potentially become a bottleneck if lots of logic is ran in the content component. It
	 * Currently re-renders excessively but is not easy to useMemo because paymentMethodInterface could become stale.
	 * paymentMethodInterface itself also updates on most renders.
	 */
	const entries = Object.entries( paymentMethods );
	const content =
		entries.length > 0 ? (
			entries.map( ( [ id, paymentMethod ] ) => {
				const expressPaymentMethod = isEditor
					? paymentMethod.edit
					: paymentMethod.content;
				return isValidElement( expressPaymentMethod ) ? (
					<li key={ id } id={ `express-payment-method-${ id }` }>
						{ cloneElement( expressPaymentMethod, {
							...paymentMethodInterface,
							onClick: onExpressPaymentClick( id ),
							onClose: onExpressPaymentClose,
						} ) }
					</li>
				) : null;
			} )
		) : (
			<li key="noneRegistered">
				{ __(
					'No registered Payment Methods',
					'woo-gutenberg-products-block'
				) }
			</li>
		);

	return (
		<PaymentMethodErrorBoundary isEditor={ isEditor }>
			<ul className="wc-block-components-express-payment__event-buttons">
				{ content }
			</ul>
		</PaymentMethodErrorBoundary>
	);
};

export default ExpressPaymentMethods;
