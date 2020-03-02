/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withComponentId from '@woocommerce/base-hocs/with-component-id';
import { Notice } from 'wordpress-components';
import { useDispatch } from '@wordpress/data';

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

const StoreNoticesContainer = ( {
	className,
	notices,
	componentId,
	context,
} ) => {
	const { removeNotice } = useDispatch( 'core/notices' );
	const wrapperClass = classnames( className, 'wc-block-components-notices' );

	return (
		<div className={ wrapperClass } key={ componentId }>
			{ notices.map(
				(
					props = { id: '', content: '', isDismissible: false },
					i
				) => (
					<Notice
						key={ 'store-notice-' + i }
						{ ...props }
						className={ classnames(
							'wc-block-components-notices__notice',
							getWooClassName( props )
						) }
						onRemove={ () => {
							if ( props.id && props.isDismissible ) {
								removeNotice( props.id, context );
							}
						} }
					>
						{ props.content }
					</Notice>
				)
			) }
		</div>
	);
};

StoreNoticesContainer.propTypes = {
	className: PropTypes.string,
	notices: PropTypes.array,
	context: PropTypes.string,
	// from withComponentId
	componentId: PropTypes.number.isRequired,
};

export default withComponentId( StoreNoticesContainer );
