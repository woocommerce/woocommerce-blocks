/**
 * External dependencies
 */
import { filter } from 'lodash';
import { SnackbarList } from 'wordpress-components';
import { useStoreNotices } from '@woocommerce/base-hooks';

const NoticesContainer = () => {
	const { notices, removeNotice } = useStoreNotices();
	const snackbarNotices = filter( notices, {
		type: 'snackbar',
	} );
	return (
		<SnackbarList
			notices={ snackbarNotices }
			className={ 'wc-block-notices__snackbar' }
			onRemove={ removeNotice }
		/>
	);
};

export default NoticesContainer;
