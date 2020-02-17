/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import TextInput from '../text-input';
import Select from '../select';

const StateInput = ( {
	className,
	counties,
	country,
	label,
	onChange,
	autoComplete = 'off',
	value = '',
} ) => {
	const countryCounties = counties[ country ];
	if ( ! countryCounties || Object.keys( countryCounties ).length === 0 ) {
		return (
			<TextInput
				className={ className }
				label={ label }
				onChange={ onChange }
				autoComplete={ autoComplete }
				value={ value }
			/>
		);
	}

	const options = Object.keys( countryCounties ).map( ( key ) => ( {
		key,
		name: decodeEntities( countryCounties[ key ] ),
	} ) );

	return (
		<Select
			className={ className }
			label={ label }
			onChange={ onChange }
			options={ options }
			autoComplete={ autoComplete }
			value={ options.find( ( option ) => option.key === value ) }
		/>
	);
};

StateInput.propTypes = {
	counties: PropTypes.objectOf(
		PropTypes.oneOfType( [
			PropTypes.array,
			PropTypes.objectOf( PropTypes.string ),
		] )
	).isRequired,
	onChange: PropTypes.func.isRequired,
	autoComplete: PropTypes.string,
	className: PropTypes.string,
	country: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
};

export default StateInput;
