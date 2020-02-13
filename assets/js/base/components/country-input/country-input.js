/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import Select from '../select';

const CountryInput = ( {
	className,
	countries,
	label,
	onChange,
	value = '',
} ) => {
	const options = Object.keys( countries ).map( ( key ) => ( {
		key,
		name: decodeEntities( countries[ key ] ),
	} ) );
	const formattedValue = value
		? {
				key: value,
				name: decodeEntities( countries[ value ] ),
		  }
		: null;

	return (
		<Select
			className={ className }
			label={ label }
			onChange={ onChange }
			options={ options }
			value={ formattedValue }
		/>
	);
};

CountryInput.propTypes = {
	countries: PropTypes.objectOf( PropTypes.string ).isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
};

export default CountryInput;
