/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ExperimentalOrderMeta } from '@woocommerce/checkout';

const Sidebar = ( { children, className } ) => {
	return (
		<div
			className={ classNames( 'wc-block-components-sidebar', className ) }
		>
			<ExperimentalOrderMeta>Render me</ExperimentalOrderMeta>
			{ children }
		</div>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
};

export default Sidebar;
