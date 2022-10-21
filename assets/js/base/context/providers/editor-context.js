/**
 * External dependencies
 */
import {
	createContext,
	useContext,
	useCallback,
	useState,
} from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEffect } from 'react';

/**
 * @typedef {import('@woocommerce/type-defs/contexts').EditorDataContext} EditorDataContext
 * @typedef {import('@woocommerce/type-defs/cart').CartData} CartData
 */

const EditorContext = createContext( {
	isEditor: false,
	currentPostId: 0,
	currentView: '',
	previewData: {},
	getPreviewData: () => void null,
	setCurrentView: () => void null,
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
 * @param {Object} props                 Incoming props for the provider.
 * @param {*}      props.children        The children being wrapped.
 * @param {Object} [props.previewData]   The preview data for editor.
 * @param {number} [props.currentPostId] The post being edited.
 * @param {string} [props.currentView]   Current view, if using a view switcher.
 */
export const EditorProvider = ( {
	children,
	currentPostId = 0,
	currentView: initialView = null,
	previewData = {},
} ) => {
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
	const getPreviewData = useCallback(
		( name ) => {
			if ( name in previewData ) {
				return previewData[ name ];
			}
			return {};
		},
		[ previewData ]
	);
	const setCurrentView = ( view ) => {
		setView( view );
	};

	const [ currentView, setView ] = useState( initialView );
	useEffect( () => {
		setView( initialView );
	}, [ initialView ] );

	/**
	 * @type {EditorDataContext}
	 */
	const editorData = {
		isEditor: true,
		currentPostId: editingPostId,
		currentView,
		previewData,
		getPreviewData,
		setCurrentView,
	};

	return (
		<EditorContext.Provider value={ editorData }>
			{ children }
		</EditorContext.Provider>
	);
};
