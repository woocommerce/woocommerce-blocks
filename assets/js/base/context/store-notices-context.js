/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { createContext, useContext } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import StoreNoticesContainer from '@woocommerce/base-components/store-notices-container';

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
	context = 'wc/core',
} ) => {
	const { createNotice, removeNotice } = useDispatch( 'core/notices' );
	const { notices } = useSelect(
		( select ) => {
			return {
				notices: select( 'core/notices' ).getNotices( context ),
			};
		},
		[ context ]
	);
	const contextValue = {
		notices,
		createNotice,
		removeNotice,
		context,
	};

	return (
		<StoreNoticesContext.Provider value={ contextValue }>
			{ createNoticeContainer && (
				<StoreNoticesContainer
					className={ className }
					notices={ contextValue.notices }
					context={ contextValue.context }
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
	context: PropTypes.string,
};

export default StoreNoticesProvider;
