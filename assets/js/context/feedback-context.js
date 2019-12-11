/**
 * External dependencies
 */
import { createContext, useContext, useEffect } from '@wordpress/element';
import { assertValidContextValue } from '@woocommerce/base-context/utils';

const validationMap = {
	text: {
		required: true,
		type: 'string',
	},
};

/**
 * FeedbackContext is a configuration object used to display a feedback prompt
 * in the editor sidebar.
 *
 * @member {Object} FeedbackContext A react context object
 */
const FeedbackContext = createContext( {
	text: '',
} );

export const useFeedbackContext = () => useContext( FeedbackContext );
export const FeedbackContextProvider = ( { value, children } ) => {
	useEffect( () => {
		assertValidContextValue(
			'FeedbackContextProvider',
			validationMap,
			value
		);
	}, [ value ] );
	return (
		<FeedbackContext.Provider value={ value }>
			{ children }
		</FeedbackContext.Provider>
	);
};
