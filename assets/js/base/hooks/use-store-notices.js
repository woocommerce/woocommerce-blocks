/**
 * External dependencies
 */
import { useStoreNoticesContext } from '@woocommerce/base-context/store-notices-context';
import { useMemo } from '@wordpress/element';

export const useStoreNotices = () => {
	const {
		notices,
		context,
		createNotice,
		removeNotice,
	} = useStoreNoticesContext();

	const noticesApi = useMemo(
		() => ( {
			addDefaultNotice: ( text, noticeProps = {} ) =>
				void createNotice( 'default', text, {
					...noticeProps,
					context,
				} ),
			addErrorNotice: ( text, noticeProps = {} ) =>
				void createNotice( 'error', text, {
					...noticeProps,
					context,
				} ),
			addWarningNotice: ( text, noticeProps = {} ) =>
				void createNotice( 'warning', text, {
					...noticeProps,
					context,
				} ),
			addInfoNotice: ( text, noticeProps = {} ) =>
				void createNotice( 'info', text, {
					...noticeProps,
					context,
				} ),
			addSuccessNotice: ( text, noticeProps = {} ) =>
				void createNotice( 'success', text, {
					...noticeProps,
					context,
				} ),
			removeNotices: ( type = null ) => {
				notices.map( ( notice ) => {
					if ( type === null || notice.status === type ) {
						removeNotice( notice.id, context );
					}
					return true;
				} );
			},
		} ),
		[ createNotice, context ]
	);

	return {
		notices,
		...noticesApi,
	};
};
