/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import withComponentId from '@woocommerce/base-hocs/with-component-id';
import { Notice } from 'wordpress-components';

const Notices = ( { noticeType, notices, className } ) => {
	return notices.map( ( noticeText = '', i ) => (
		<Notice
			status={ noticeType }
			className={ className }
			key={ 'notice-' + noticeType + '-' + i }
		>
			{ noticeText }
		</Notice>
	) );
};

const StoreNoticesContainer = ( { className, notices, componentId } ) => {
	return (
		<div className={ className } key={ componentId }>
			<Notices
				notices={ notices.error }
				noticeType="error"
				className=""
			/>
			<Notices
				notices={ notices.warning }
				noticeType="warning"
				className=""
			/>
			<Notices notices={ notices.info } noticeType="info" className="" />
			<Notices
				notices={ notices.success }
				noticeType="success"
				className=""
			/>
			<Notices
				notices={ notices.default }
				noticeType="default"
				className=""
			/>
		</div>
	);
};

StoreNoticesContainer.propTypes = {
	className: PropTypes.string,
	notices: PropTypes.object,
	// from withComponentId
	componentId: PropTypes.number.isRequired,
};

export default withComponentId( StoreNoticesContainer );
