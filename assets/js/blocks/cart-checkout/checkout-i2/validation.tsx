/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { useStoreNotices } from '@woocommerce/base-context/hooks';
import {
	useCheckoutContext,
	useValidationContext,
	ValidationContextProvider,
	StoreNoticesProvider,
} from '@woocommerce/base-context';
import withScrollToTop from '@woocommerce/base-hocs/with-scroll-to-top';

const CheckoutValidation = ( {
	scrollToTop,
	children,
}: {
	scrollToTop: ( props: Record< string, unknown > ) => void;
	children: JSX.Element;
} ): JSX.Element => {
	const {
		hasError: checkoutHasError,
		isIdle: checkoutIsIdle,
	} = useCheckoutContext();
	const {
		hasValidationErrors,
		showAllValidationErrors,
	} = useValidationContext();
	const { hasNoticesOfType } = useStoreNotices();

	const hasErrorsToDisplay =
		checkoutIsIdle &&
		checkoutHasError &&
		( hasValidationErrors || hasNoticesOfType( 'default' ) );

	useEffect( () => {
		if ( hasErrorsToDisplay ) {
			showAllValidationErrors();
			scrollToTop( { focusableSelector: 'input:invalid' } );
		}
	}, [ hasErrorsToDisplay, scrollToTop, showAllValidationErrors ] );

	return (
		<StoreNoticesProvider context="wc/checkout">
			<ValidationContextProvider>{ children }</ValidationContextProvider>
		</StoreNoticesProvider>
	);
};

export default withScrollToTop( CheckoutValidation );
