/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';
const Select = ( {
	className,
	feedback,
	id,
	label,
	onChange,
	options,
	value,
	...rest
} ) => {
	return (
		<div className={ classnames( 'wc-block-select', className ) }>
			<label htmlFor={ id }>{ label }</label>
			<select
				id={ id }
				onChange={ ( { target } ) => {
					onChange( target.value );
				} }
				onBlur={ ( { target } ) => {
					onChange( target.value );
				} }
				value={ value?.key }
				{ ...rest }
			>
				{ options.map( ( { name, key } ) => (
					<option value={ key } key={ key }>
						{ name }
					</option>
				) ) }
			</select>
			{ feedback }
		</div>
	);
};

Select.propTypes = {
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			key: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		} ).isRequired
	).isRequired,
	className: PropTypes.string,
	feedback: PropTypes.node,
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.shape( {
		key: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	} ),
};

export default Select;
export { default as ValidatedSelect } from './validated';
