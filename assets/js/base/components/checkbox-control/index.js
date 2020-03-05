/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckboxControl as WPCheckboxControl } from 'wordpress-components';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component used to show a checkbox control with styles.
 */
const CheckboxControl = ( {
	checked = [],
	className,
	label,
	onChange = () => {},
} ) => {
	return (
		<WPCheckboxControl
			checked={ checked }
			className={ classNames( 'wc-block-checkbox', className ) }
			label={ label }
			onChange={ onChange }
		/>
	);
};

CheckboxControl.propTypes = {
	checked: PropTypes.bool,
	className: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
};

export default CheckboxControl;
