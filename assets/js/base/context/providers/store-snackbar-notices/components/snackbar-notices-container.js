/**
 * External dependencies
 */
import { SnackbarList } from 'wordpress-components';
import classnames from 'classnames';
import { __experimentalApplyCheckoutFilter } from '@woocommerce/blocks-checkout';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useEditorContext } from '../../editor-context';

const EMPTY_SNACKBAR_NOTICES = {};

export const SnackbarNoticesContainer = ( {
	className,
	context = 'default',
} ) => {
	const { isEditor } = useEditorContext();

	if ( isEditor ) {
		return null;
	}

	const { notices } = useSelect( ( select ) => {
		const store = select( 'core/notices' );
		return {
			notices: store.getNotices( context ),
		};
	} );
	const { removeNotice } = useDispatch( 'core/notices' );
	const snackbarNotices = notices.filter(
		( notice ) => notice.type === 'snackbar'
	);

	const noticeVisibility =
		snackbarNotices.length > 0
			? snackbarNotices.reduce( ( acc, { content } ) => {
					acc[ content ] = true;
					return acc;
			  }, {} )
			: EMPTY_SNACKBAR_NOTICES;

	const filteredNotices = __experimentalApplyCheckoutFilter( {
		filterName: 'snackbarNoticeVisibility',
		defaultValue: noticeVisibility,
	} );

	const visibleNotices = snackbarNotices.filter(
		( notice ) => filteredNotices[ notice.content ] === true
	);

	const wrapperClass = classnames(
		className,
		'wc-block-components-notices__snackbar'
	);

	return (
		<SnackbarList
			notices={ visibleNotices }
			className={ wrapperClass }
			onRemove={ removeNotice }
		/>
	);
};
