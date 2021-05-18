/**
 * External dependencies
 */
import {
	useExpressPaymentMethods,
	usePaymentMethodInterface,
} from '@woocommerce/base-context/hooks';
import {
	cloneElement,
	isValidElement,
	useCallback,
	useRef,
	useMemo,
	useEffect,
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
	const currentPaymentMethodInterface = useRef( paymentMethodInterface );

	useEffect( () => {
		currentPaymentMethodInterface.current = paymentMethodInterface;
	}, [ paymentMethodInterface ] );

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

	const content = useMemo( () => {
		const entries = Object.entries( paymentMethods );

		if ( ! entries.length ) {
			return <li key="noneRegistered">No registered Payment Methods</li>;
		}

		return entries.map( ( [ id, paymentMethod ] ) => {
			const expressPaymentMethod = isEditor
				? paymentMethod.edit
				: paymentMethod.content;
			return isValidElement( expressPaymentMethod ) ? (
				<li key={ id } id={ `express-payment-method-${ id }` }>
					{ cloneElement( expressPaymentMethod, {
						...currentPaymentMethodInterface.current,
						onClick: onExpressPaymentClick( id ),
						onClose: onExpressPaymentClose,
					} ) }
				</li>
			) : null;
		} );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		paymentMethods,
		isEditor,
		onExpressPaymentClick,
		onExpressPaymentClose,
	] );

	return (
		<PaymentMethodErrorBoundary isEditor={ isEditor }>
			<ul className="wc-block-components-express-payment__event-buttons">
				{ content }
			</ul>
		</PaymentMethodErrorBoundary>
	);
};

export default ExpressPaymentMethods;
