/**
 * External dependencies
 */
import { createContext, useContext } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { previewCart } from '@woocommerce/resource-previews';
import { SHIPPING_METHODS_EXIST } from '@woocommerce/block-settings';
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

/**
 * Editor provider
 *
 * @param {Object}  props                 Incoming props for the provider.
 * @param {*}       props.children        The children being wrapped.
 * @param {number}  [props.currentPostId] The post being edited.
 */
export const EditorProvider = ( { children, currentPostId = 0 } ) => {
	/**
	 * @type {number} editingPostId
	 */
	const editingPostId = useSelect(
		( select ) => {
			if ( ! currentPostId ) {
				const store = select( 'core/editor' );
				return store.getCurrentPostId();
			}
			return currentPostId;
		},
		[ currentPostId ]
	);

	/**
	 * @type {EditorDataContext}
	 */
	const editorData = {
		isEditor: true,
		currentPostId: editingPostId,
		previewCart: {
			...previewCart,
			shipping_rates: SHIPPING_METHODS_EXIST
				? previewCart.shipping_rates
				: [],
		},
	};

	return (
		<EditorContext.Provider value={ editorData }>
			{ children }
		</EditorContext.Provider>
	);
};
