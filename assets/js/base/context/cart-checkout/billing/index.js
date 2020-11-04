/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useState,
	useCallback,
} from '@wordpress/element';
import { useStoreCart } from '@woocommerce/base-hooks';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').BillingDataContext} BillingDataContext
 * @typedef {import('@woocommerce/type-defs/billing').BillingData} BillingData
 */

/**
 * @type {BillingData}
 */
const defaultBillingData = {
	first_name: '',
	last_name: '',
	company: '',
	address_1: '',
	address_2: '',
	city: '',
	state: '',
	postcode: '',
	country: '',
	email: '',
	phone: '',
};

/**
 * Creates BillingDataContext
 */
const BillingDataContext = createContext( {
	billingData: defaultBillingData,
	setBillingData: () => null,
} );

/**
 * @return {BillingDataContext} Returns data and functions related to billing.
 */
export const useBillingDataContext = () => {
	return useContext( BillingDataContext );
};

/**
 * Billing Data context provider.
 *
 * @param {Object}  props          Incoming props for the provider.
 * @param {Object}  props.children The children being wrapped.
 */
export const BillingDataProvider = ( { children } ) => {
	const { billingAddress: initalBillingData } = useStoreCart();
	const [ billingData, setBillingDataState ] = useState( initalBillingData );

	const setBillingData = useCallback( ( newData ) => {
		setBillingDataState( ( prevState ) => ( {
			...prevState,
			...newData,
		} ) );
	}, [] );

	/**
	 * @type {BillingDataContext}
	 */
	const billingDataValue = {
		billingData,
		setBillingData,
	};

	return (
		<BillingDataContext.Provider value={ billingDataValue }>
			{ children }
		</BillingDataContext.Provider>
	);
};
