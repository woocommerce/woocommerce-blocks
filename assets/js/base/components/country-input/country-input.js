/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { decodeEntities } from '@wordpress/html-entities';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { ValidatedSelect } from '../select';

const CountryInput = ( {
	className,
	countries,
	id,
	label,
	onChange,
	value = '',
	autoComplete = 'off',
	required = false,
	errorId,
	errorMessage = __(
		'Please select a country.',
		'woo-gutenberg-products-block'
	),
} ) => {
	const options = Object.keys( countries ).map( ( key ) => ( {
		key,
		name: decodeEntities( countries[ key ] ),
	} ) );

	return (
		<div className={ classnames( className, 'wc-block-country-input' ) }>
			<ValidatedSelect
				id={ id }
				label={ label }
				onChange={ onChange }
				options={ options }
				value={ options.find( ( option ) => option.key === value ) }
				errorId={ errorId }
				errorMessage={ errorMessage }
				required={ required }
				autoComplete={ autoComplete }
			/>
		</div>
	);
};

CountryInput.propTypes = {
	countries: PropTypes.objectOf( PropTypes.string ).isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	autoComplete: PropTypes.string,
	errorId: PropTypes.string,
	errorMessage: PropTypes.string,
};

export default CountryInput;
