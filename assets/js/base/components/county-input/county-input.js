/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import Select from '../select';

const CountyInput = ( {
	className,
	counties,
	country,
	label,
	onChange,
	value = '',
} ) => {
	const countryCounties = counties[ country ];
	if ( ! countryCounties || Object.keys( countryCounties ).length === 0 ) {
		return null;
	}

	const options = Object.keys( countryCounties ).map( ( key ) => ( {
		key,
		name: decodeEntities( countryCounties[ key ] ),
	} ) );
	const formattedValue = countryCounties[ value ]
		? {
				key: value,
				name: decodeEntities( countryCounties[ value ] ),
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

CountyInput.propTypes = {
	counties: PropTypes.objectOf(
		PropTypes.oneOfType( [
			PropTypes.array,
			PropTypes.objectOf( PropTypes.string ),
		] )
	).isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	country: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
};

export default CountyInput;
