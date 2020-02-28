/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import withComponentId from '@woocommerce/base-hocs/with-component-id';
import { Notice } from 'wordpress-components';

const getWooClassName = ( { status = 'default' } ) => {
	switch ( status ) {
		case 'error':
			return 'woocommerce-error';
		case 'success':
			return 'woocommerce-success';
		case 'info':
		case 'warning':
			return 'woocommerce-info';
	}
	return '';
};

const StoreNoticesContainer = ( { className, notices, componentId } ) => {
	return (
		<div className={ className } key={ componentId }>
			{ notices.map( ( props = { content: '' }, i ) => (
				<Notice
					key={ 'store-notice-' + i }
					{ ...props }
					className={ getWooClassName( props ) }
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
	// from withComponentId
	componentId: PropTypes.number.isRequired,
};

export default withComponentId( StoreNoticesContainer );
