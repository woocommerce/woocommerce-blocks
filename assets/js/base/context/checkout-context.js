/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useState,
	useMemo,
} from '@wordpress/element';

const CheckoutContext = createContext( {} );

export const useCheckoutContext = () => {
	return useContext( CheckoutContext );
};

const CheckoutProvider = ( { children, initialActivePaymentMethod } ) => {
	const [ successRedirectUrl, setSuccessRedirectUrl ] = useState( '' );
	const [ failureRedirectUrl, setFailureRedirectUrl ] = useState( '' );
	const [ checkoutComplete, setCheckoutComplete ] = useState( false );
	const [ checkoutHasError, setCheckoutHasError ] = useState( false );
	const [ notices, updateNotices ] = useState( [] );
	const [ isCalculating, setIsCalculating ] = useState( false );
	const [ activePaymentMethod, setActivePaymentMethod ] = useState(
		initialActivePaymentMethod
	);
	const contextValue = useMemo( () => {
		return {
			successRedirectUrl,
			setSuccessRedirectUrl,
			failureRedirectUrl,
			setFailureRedirectUrl,
			checkoutComplete,
			setCheckoutComplete,
			checkoutHasError,
			setCheckoutHasError,
			isCalculating,
			setIsCalculating,
			notices,
			updateNotices,
			activePaymentMethod,
			setActivePaymentMethod,
		};
	}, [
		successRedirectUrl,
		failureRedirectUrl,
		checkoutComplete,
		checkoutHasError,
		activePaymentMethod,
		notices,
	] );
	return (
		<CheckoutContext.Provider value={ contextValue }>
			{ children }
		</CheckoutContext.Provider>
	);
};

export default CheckoutProvider;
