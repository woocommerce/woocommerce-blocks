/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';

/**
 * Collection data context is used for the query state store.
 *
 * Defaults to 'page-collection-data' for general global querystate shared
 * among all blocks in a view.
 *
 * @var  {React.Context}  CollectionDataContext A react context object
 */
const CollectionDataContext = createContext( 'page-collection-data' );

export const useCollectionDataContext = () =>
	useContext( CollectionDataContext );
export const CollectionDataContextProvider = CollectionDataContext.Provider;
