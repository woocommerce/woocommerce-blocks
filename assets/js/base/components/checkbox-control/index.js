/**
 * External dependencies
 */
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component used to show a checkbox control with styles.
 */
const CheckboxControl = ( {
	className,
	label,
	id,
	instanceId,
	onChange,
	...rest
} ) => {
	const checkboxId = id || `checkbox-control-${ instanceId }`;

	return (
		<label
			className={ classNames( 'wc-block-checkbox', className ) }
			htmlFor={ checkboxId }
		>
			<input
				id={ checkboxId }
				className="wc-block-checkbox__input"
				type="checkbox"
				onChange={ ( event ) => onChange( event.target.checked ) }
				{ ...rest }
			/>
			<svg
				className="wc-block-checkbox__mark"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="16px"
				height="16px"
			>
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
			</svg>
			<span className="wc-block-checkbox__label">{ label }</span>
		</label>
	);
};

CheckboxControl.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func,
};

export default withInstanceId( CheckboxControl );
