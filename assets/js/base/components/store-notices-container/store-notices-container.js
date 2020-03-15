/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Notice } from 'wordpress-components';
import { useStoreNoticesContext } from '@woocommerce/base-context';
import { filter } from 'lodash';

/**
 * Internal dependencies
 */
import './style.scss';

const getWooClassName = ( { status = 'default' } ) => {
	switch ( status ) {
		case 'error':
			return 'woocommerce-message woocommerce-error';
		case 'success':
			return 'woocommerce-message woocommerce-success';
		case 'info':
		case 'warning':
			return 'woocommerce-message woocommerce-info';
	}
	return '';
};

const StoreNoticesContainer = ( { className, notices } ) => {
	const { removeNotice } = useStoreNoticesContext();
	const wrapperClass = classnames( className, 'wc-block-components-notices' );

	if ( ! notices.length ) {
		return null;
	}

	const regularNotices = filter(
		notices,
		( notice ) => notice.type !== 'snackbar'
	);

	return (
		<div className={ wrapperClass }>
			{ regularNotices.map( ( props ) => (
				<Notice
					key={ 'store-notice-' + props.id }
					{ ...props }
					className={ classnames(
						'wc-block-components-notices__notice',
						getWooClassName( props )
					) }
					onRemove={ () => {
						if ( props.isDismissible ) {
							removeNotice( props.id );
						}
					} }
				>
					{ props.content }
				</Notice>
			) ) }
		</div>
	);
};

StoreNoticesContainer.propTypes = {
	className: PropTypes.string,
	notices: PropTypes.array,
};

export default StoreNoticesContainer;
