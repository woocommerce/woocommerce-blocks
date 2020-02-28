/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { createContext, useContext, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import StoreNoticesContainer from '@woocommerce/base-components/store-notices-container';
import { CORE_NOTICES_CONTEXT } from '@woocommerce/block-data';

const StoreNoticesContext = createContext( {} );

export const useStoreNoticesContext = () => {
	return useContext( StoreNoticesContext );
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
	const { createNotice } = useDispatch( 'core/notices' );

	const setNotice = useMemo(
		() => ( {
			default: ( text ) =>
				void createNotice( 'default', text, {
					context: CORE_NOTICES_CONTEXT,
					isDismissible: false,
				} ),
			error: ( text ) =>
				void createNotice( 'error', text, {
					context: CORE_NOTICES_CONTEXT,
					isDismissible: false,
				} ),
			warning: ( text ) =>
				void createNotice( 'warning', text, {
					context: CORE_NOTICES_CONTEXT,
					isDismissible: false,
				} ),
			info: ( text ) =>
				void createNotice( 'info', text, {
					context: CORE_NOTICES_CONTEXT,
					isDismissible: false,
				} ),
			success: ( text ) =>
				void createNotice( 'success', text, {
					context: CORE_NOTICES_CONTEXT,
					isDismissible: false,
				} ),
		} ),
		[ createNotice, CORE_NOTICES_CONTEXT ]
	);

	const { notices } = useSelect(
		( select ) => {
			return {
				notices: select( 'core/notices' ).getNotices(
					CORE_NOTICES_CONTEXT
				),
			};
		},
		[ CORE_NOTICES_CONTEXT ]
	);

	const contextValue = {
		notices,
		setNotice,
	};

	return (
		<StoreNoticesContext.Provider value={ contextValue }>
			{ createNoticeContainer && (
				<StoreNoticesContainer
					className={ className }
					notices={ contextValue.notices }
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
