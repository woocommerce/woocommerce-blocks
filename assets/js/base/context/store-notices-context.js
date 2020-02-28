/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	createContext,
	useContext,
	useReducer,
	useMemo,
} from '@wordpress/element';
import StoreNoticesContainer from '@woocommerce/base-components/store-notices-container';

const StoreNoticesContext = createContext( {} );

export const useStoreNoticesContext = () => {
	return useContext( StoreNoticesContext );
};

const reducer = ( state, action ) => {
	return state; // @todo
};

const noticeTypes = [ 'default', 'error', 'warning', 'info', 'success' ];
const addDefault = ( text ) => ( { type: 'DEFAULT', text } );
const addError = ( text ) => ( { type: 'ERROR', text } );
const addWarning = ( text ) => ( { type: 'WARNING', text } );
const addInfo = ( text ) => ( { type: 'INFO', text } );
const addSuccess = ( text ) => ( { type: 'SUCCESS', text } );
const clearNotices = ( noticeType = null ) => ( {
	type: noticeType ? 'CLEAR' : 'CLEARALL',
	noticeType,
} );

/**
 * Provides an interface for blocks to add notices to the frontend UI.
 *
 * Statuses map to https://github.com/WordPress/gutenberg/tree/master/packages/components/src/notice
 *  - Default (no status)
 *  - Error
 *  - Warning
 *  - Info
 *  - Success
 */
const StoreNoticesProvider = ( {
	children,
	className = '',
	createNoticeContainer = true,
} ) => {
	const { notices, dispatch } = useReducer( reducer, {
		default: [],
		error: [],
		warning: [],
		info: [],
		success: [],
	} );

	const setNotice = useMemo(
		() => ( {
			default: ( text ) => void dispatch( addDefault( text ) ),
			error: ( text ) => void dispatch( addError( text ) ),
			warning: ( text ) => void dispatch( addWarning( text ) ),
			info: ( text ) => void dispatch( addInfo( text ) ),
			success: ( text ) => void dispatch( addSuccess( text ) ),
			clear: ( noticeType = null ) =>
				void dispatch( clearNotices( noticeType ) ),
		} ),
		[]
	);

	// Provides an API for consumers of this provider containing notices (the
	// state) and setNotice to interact with the state.
	const contextValue = { notices, setNotice, noticeTypes };

	return (
		<StoreNoticesContext.Provider value={ contextValue }>
			{ createNoticeContainer && (
				<StoreNoticesContainer
					className={ className }
					notices={ notices }
				/>
			) }
			{ children }
		</StoreNoticesContext.Provider>
	);
};

StoreNoticesProvider.propTypes = {
	className: PropTypes.string,
	createNoticeContainer: PropTypes.bool,
	children: PropTypes.node,
};

export default StoreNoticesProvider;
