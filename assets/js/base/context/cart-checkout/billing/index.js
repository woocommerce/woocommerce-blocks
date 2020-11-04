/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';
import { useBillingData } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import { defaultBillingData } from './../../../shared';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').BillingDataContext} BillingDataContext
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

export const BillingDataProvider = ( { children } ) => {
	const { billingData, setBillingData } = useBillingData();

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
