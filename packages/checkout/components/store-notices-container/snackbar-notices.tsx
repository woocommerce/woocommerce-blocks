/**
 * External dependencies
 */
import classnames from 'classnames';
import { SnackbarList } from 'wordpress-components';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import type { NoticeType, NoticeOptions } from './types';

const SnackbarNotices = ( {
	className,
	context,
	notices,
}: {
	context: string;
	className: string;
	notices: Array< NoticeType & NoticeOptions >;
} ): JSX.Element | null => {
	const { removeNotice } = useDispatch( 'core/notices' );

	if ( ! notices.length ) {
		return null;
	}

	return (
		<SnackbarList
			className={ classnames(
				className,
				'wc-block-components-notices__snackbar'
			) }
			notices={ notices.map( ( notice ) => {
				return {
					...notice,
					className: 'components-snackbar--status-' + notice.status,
				};
			} ) }
			onRemove={ ( noticeId: string ) => {
				notices.forEach( ( notice ) => {
					if ( notice.explicitDismiss && notice.id === noticeId ) {
						removeNotice( notice.id, context );
					} else {
						removeNotice( notice.id, context );
					}
				} );
			} }
		/>
	);
};

export default SnackbarNotices;
