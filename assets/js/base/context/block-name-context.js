/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';

const BlockNameContext = createContext( { blockName: null } );

export const useBlockNameContext = () => useContext( BlockNameContext );
export const BlockNameContextProvider = BlockNameContext.Provider;
