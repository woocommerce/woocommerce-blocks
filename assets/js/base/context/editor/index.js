/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').EditorDataContext} EditorDataContext
 */

const EditorContext = createContext( {
	isEditor: false,
	currentPostId: 0,
	previewCart: {},
} );

/**
 * @return {EditorDataContext} Returns the editor data context value
 */
export const useEditorContext = () => {
	return useContext( EditorContext );
};

export const EditorContextProvider = EditorContext.Provider;
