/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { decodeEntities } from '@wordpress/html-entities';
import { useCallback } from '@wordpress/element';

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
	const options =
		countryCounties && Object.keys( countryCounties ).length > 0
			? Object.keys( countryCounties ).map( ( key ) => ( {
					key,
					name: decodeEntities( countryCounties[ key ] ),
			  } ) )
			: [];

	/**
	 * Handles state selection onChange events. Finds a matching state by key or value.
	 *
	 * @param {Object} event event data.
	 */
	const onChangeState = useCallback(
		( stateValue ) => {
			if ( options.length > 0 ) {
				const foundOption = options.find(
					( option ) =>
						option.key === stateValue || option.name === stateValue
				);

				onChange( foundOption ? foundOption.key : '' );
				return;
			}
			onChange( stateValue );
		},
		[ onChange, options ]
	);

	return (
		<>
			{ options.length > 0 ? (
				<Select
					className={ className }
					label={ label }
					onChange={ onChangeState }
					options={ options }
					value={ options.find( ( option ) => option.key === value ) }
				/>
			) : (
				<TextInput
					className={ className }
					label={ label }
					onChange={ onChangeState }
					value={ value }
				/>
			) }
			{ autoComplete !== 'off' && (
				<input
					type="text"
					aria-hidden={ true }
					autoComplete={ autoComplete }
					value={ value }
					onChange={ ( event ) =>
						onChangeState( event.target.value )
					}
					style={ {
						height: '0',
						border: '0',
						padding: '0',
					} }
				/>
			) }
		</>
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
