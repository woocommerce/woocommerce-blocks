/**
 * External dependencies
 */
import { createContext, useContext, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { assertValidContextValue } from './utils';

const validationMap = {
	blockName: {
		required: true,
		type: 'string',
	},
};

const InnerBlockParentNameContext = createContext( { blockName: null } );

export const useInnerBlockParentNameContext = () =>
	useContext( InnerBlockParentNameContext );
export const InnerBlockParentNameProvider = ( { value, children } ) => {
	useEffect( () => {
		assertValidContextValue(
			'InnerBlockParentNameProvider',
			validationMap,
			value
		);
	}, [ value ] );
	return (
		<InnerBlockParentNameContext.Provider value={ value }>
			{ children }
		</InnerBlockParentNameContext.Provider>
	);
};
