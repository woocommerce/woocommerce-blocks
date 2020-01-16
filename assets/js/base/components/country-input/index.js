/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CustomSelectControl } from 'wordpress-components';
import { SHIPPING_COUNTRIES } from '@woocommerce/block-settings';

/**
 * Internal dependencies
 */
import './style.scss';

const CountryInput = ( { className, label, onChange, value = '' } ) => {
	const options = Object.keys( SHIPPING_COUNTRIES ).map( ( key ) => ( {
		key,
		name: SHIPPING_COUNTRIES[ key ],
	} ) );

	return (
		<CustomSelectControl
			className={ classnames( 'wc-block-country-input', className, {
				'is-active': value,
			} ) }
			label={ label }
			options={ options }
			onChange={ ( { selectedItem } ) => {
				onChange( selectedItem.key );
			} }
			value={ {
				key: value,
				name: SHIPPING_COUNTRIES[ value ],
			} }
		/>
	);
};

CountryInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
};

export default CountryInput;
