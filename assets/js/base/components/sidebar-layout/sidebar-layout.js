/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ContainerQueryContextProvider } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import './style.scss';

const SidebarLayout = ( { children, className } ) => {
	return (
		<ContainerQueryContextProvider
			className={ classNames( 'wc-block-sidebar-layout', className ) }
		>
			{ children }
		</ContainerQueryContextProvider>
	);
};

SidebarLayout.propTypes = {
	className: PropTypes.string,
};

export default SidebarLayout;
