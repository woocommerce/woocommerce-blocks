/**
 * External dependencies
 */
import { createContext, useContext, useState } from '@wordpress/element';

// @todo typdef for SignupDataContext
/**
 * @typedef {import('@woocommerce/type-defs/contexts').SignupDataContext} SignupDataContext
 */

const DEFAULT_STATE = {
	createAccount: false,
	username: '',
	password: '',
};

const SignupDataContext = createContext( DEFAULT_STATE );

/**
 * @return {SignupDataContext} Returns data and functions related to billing.
 */
export const useSignupDataContext = () => {
	return useContext( SignupDataContext );
};

export const SignupDataProvider = ( { children } ) => {
	const [ createAccount, setCreateAccount ] = useState(
		DEFAULT_STATE.createAccount
	);
	const [ username, setUsername ] = useState( DEFAULT_STATE.username );
	const [ password, setPassword ] = useState( DEFAULT_STATE.password );

	/**
	 * @type {SignupDataContext}
	 */
	const contextValue = {
		createAccount,
		setCreateAccount,
		username,
		setUsername,
		password,
		setPassword,
	};
	return (
		<SignupDataContext.Provider value={ contextValue }>
			{ children }
		</SignupDataContext.Provider>
	);
};
