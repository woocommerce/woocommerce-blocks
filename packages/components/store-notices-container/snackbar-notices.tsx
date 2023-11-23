/**
 * External dependencies
 */
import classnames from 'classnames';
import { useDispatch } from '@wordpress/data';
import type { NoticeType } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import SnackbarList from '~/base/components/snackbar-list';

const SnackbarNotices = ( {
	className,
	notices,
}: {
	className: string;
	notices: NoticeType[];
} ): JSX.Element | null => {
	const { removeNotice } = useDispatch( 'core/notices' );

	return (
		<SnackbarList
			className={ classnames(
				className,
				'wc-block-components-notices__snackbar'
			) }
			notices={ notices }
			onRemove={ ( noticeId: string ) => {
				notices.forEach( ( notice ) => {
					if ( notice.explicitDismiss && notice.id === noticeId ) {
						removeNotice( notice.id, notice.context );
					} else if ( ! notice.explicitDismiss ) {
						removeNotice( notice.id, notice.context );
					}
				} );
			} }
		/>
	);
};

export default SnackbarNotices;
