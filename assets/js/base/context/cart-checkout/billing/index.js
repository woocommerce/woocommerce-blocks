/**
 * External dependencies
 */
import { createContext, useContext, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { DEFAULT_STATE, DEFAULT_BILLING_CONTEXT_DATA } from './constants';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').BillingDataContext} BillingDataContext
 */

const BillingDataContext = createContext( DEFAULT_BILLING_CONTEXT_DATA );

/**
 * @return {BillingDataContext} Returns data and functions related to billing.
 */
export const useBillingDataContext = () => {
	return useContext( BillingDataContext );
};

export const BillingDataProvider = ( { children } ) => {
	const { billingData, setBillingData } = useState( DEFAULT_STATE );

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
