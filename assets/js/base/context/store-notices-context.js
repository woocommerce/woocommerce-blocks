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

const addDefault = ( text ) => ( { type: 'DEFAULT', text } );
const addError = ( text ) => ( { type: 'ERROR', text } );
const addWarning = ( text ) => ( { type: 'WARNING', text } );
const addInfo = ( text ) => ( { type: 'INFO', text } );
const addSuccess = ( text ) => ( { type: 'SUCCESS', text } );
const clearNotices = ( noticeType = null ) => ( {
	type: noticeType ? 'CLEAR' : 'CLEARALL',
	noticeType,
} );

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'DEFAULT':
			state = {
				...state,
				default: state.default.concat( [ action.text ] ),
			};
			break;
		case 'ERROR':
			state = {
				...state,
				error: state.error.concat( [ action.text ] ),
			};
			break;
		case 'WARNING':
			state = {
				...state,
				warning: state.warning.concat( [ action.text ] ),
			};
			break;
		case 'INFO':
			state = {
				...state,
				info: state.info.concat( [ action.text ] ),
			};
			break;
		case 'SUCCESS':
			state = {
				...state,
				success: state.success.concat( [ action.text ] ),
			};
			break;
		case 'CLEAR':
			const newState = {};
			newState[ action.noticeType ] = {};
			state = {
				...state,
				...newState,
			};
			break;
		case 'CLEARALL':
			state = {};
			break;
	}
	return state;
};

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
	const [ notices, dispatch ] = useReducer( reducer, {
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
		[
			dispatch,
			addDefault,
			addError,
			addWarning,
			addInfo,
			addSuccess,
			clearNotices,
		]
	);

	// Provides an API for consumers of this provider containing notices (the
	// state) and setNotice to interact with the state.
	const contextValue = { notices, setNotice };

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
