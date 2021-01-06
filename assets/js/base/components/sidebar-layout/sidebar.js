/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
	ExperimentalOrderMeta,
	TotalsItem,
} from '@woocommerce/blocks-checkout';

const Sidebar = ( { children, className } ) => {
	return (
		<div
			className={ classNames( 'wc-block-components-sidebar', className ) }
		>
			<ExperimentalOrderMeta>
				<TotalsItem label="My extension" value={ <span>0</span> } />
			</ExperimentalOrderMeta>
			{ children }
		</div>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
};

export default Sidebar;
