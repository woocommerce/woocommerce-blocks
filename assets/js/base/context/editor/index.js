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
} );

/**
 * @return {EditorDataContext} Returns the editor data context value
 */
export const useEditorContext = () => {
	return useContext( EditorContext );
};

/**
 * Editor provider
 *
 * @param {Object}  props              Incoming props for the provider.
 * @param {*}       props.children     The children being wrapped.
 * @param {number}  props.currentPostId The post being edited.
 */
export const EditorProvider = ( { children, currentPostId = 0 } ) => {
	/**
	 * @type {EditorDataContext}
	 */
	const editorData = {
		isEditor: true,
		currentPostId,
	};

	return (
		<EditorContext.Provider value={ editorData }>
			{ children }
		</EditorContext.Provider>
	);
};
