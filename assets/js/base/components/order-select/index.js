/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Label from '../label';
import './style.scss';

const OrderSelect = ( { componentId, defaultValue, label, onChange, options, screenReaderLabel, readOnly, value } ) => {
	const selectId = `wc-block-order-select__select-${ componentId }`;

	return (
		<p className="wc-block-order-select">
			<Label
				label={ label }
				screenReaderLabel={ screenReaderLabel }
				wrapperElement="label"
				wrapperProps={ {
					className: 'wc-block-order-select__label',
					htmlFor: selectId,
				} }
			/>
			<select // eslint-disable-line jsx-a11y/no-onchange
				id={ selectId }
				className="wc-block-order-select__select"
				defaultValue={ defaultValue }
				onChange={ onChange }
				readOnly={ readOnly }
				value={ value }
			>
				{ options.map( ( option ) => (
					<option key={ option.key } value={ option.key }>
						{ option.label }
					</option>
				) ) }
			</select>
		</p>
	);
};

OrderSelect.propTypes = {
	componentId: PropTypes.number.isRequired,
	defaultValue: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf( PropTypes.shape( {
		key: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	} ) ),
	readOnly: PropTypes.bool,
	screenReaderLabel: PropTypes.string,
	value: PropTypes.string,
};

export default OrderSelect;
